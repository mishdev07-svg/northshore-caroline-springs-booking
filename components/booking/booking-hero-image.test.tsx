import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/image", async () => {
  const imageShim = await import("vinext/shims/image");
  return { default: imageShim.default };
});

import { BookingHero } from "./booking-hero";

const temporaryProfiles: string[] = [];

function findBrowserExecutable(): string {
  const candidates = [
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    process.env.CHROME_PATH,
    process.env.PROGRAMFILES &&
      join(process.env.PROGRAMFILES, "Google", "Chrome", "Application", "chrome.exe"),
    process.env["PROGRAMFILES(X86)"] &&
      join(
        process.env["PROGRAMFILES(X86)"],
        "Microsoft",
        "Edge",
        "Application",
        "msedge.exe",
      ),
    process.env.LOCALAPPDATA &&
      join(
        process.env.LOCALAPPDATA,
        "Google",
        "Chrome",
        "Application",
        "chrome.exe",
      ),
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ].filter((candidate): candidate is string => Boolean(candidate));

  const executable = candidates.find((candidate) => existsSync(candidate));
  if (!executable) {
    throw new Error(
      "A Chromium browser is required to verify responsive currentSrc selection.",
    );
  }

  return executable;
}

function readCurrentSrc(
  markup: string,
  width: number,
  height: number,
): { currentSrc: URL; viewportWidth: number } {
  const profile = mkdtempSync(join(tmpdir(), "booking-hero-current-src-"));
  temporaryProfiles.push(profile);
  const browserDocument = [
    "<!doctype html>",
    '<html data-current-src="">',
    "<head>",
    '<base href="http://127.0.0.1:4173/">',
    '<meta http-equiv="Content-Security-Policy" content="img-src \'none\'">',
    "</head>",
    `<body>${markup}`,
    "<script>",
    'const image = document.querySelector(".hero-study-image");',
    "document.documentElement.dataset.currentSrc = image.currentSrc;",
    "document.documentElement.dataset.viewport = String(window.innerWidth);",
    "</script>",
    "</body></html>",
  ].join("");
  const dataUrl = `data:text/html;charset=utf-8,${encodeURIComponent(browserDocument)}`;
  const renderedDocument = execFileSync(
    findBrowserExecutable(),
    [
      "--headless=new",
      "--disable-background-networking",
      "--disable-component-update",
      "--disable-default-apps",
      "--disable-extensions",
      "--disable-gpu",
      "--disable-logging",
      "--disable-sync",
      "--log-level=3",
      "--metrics-recording-only",
      "--no-first-run",
      "--no-sandbox",
      `--user-data-dir=${profile}`,
      `--window-size=${width},${height}`,
      "--force-device-scale-factor=1",
      "--dump-dom",
      dataUrl,
    ],
    { encoding: "utf8", timeout: 15_000 },
  );
  const currentSrc = renderedDocument.match(/data-current-src="([^"]+)"/)?.[1];
  const viewportWidth = Number(
    renderedDocument.match(/data-viewport="([^"]+)"/)?.[1],
  );

  if (!currentSrc || !viewportWidth) {
    throw new Error(`Chromium did not resolve currentSrc:\n${renderedDocument}`);
  }

  try {
    return {
      currentSrc: new URL(
        currentSrc.replaceAll("&amp;", "&"),
        "http://127.0.0.1:4173/",
      ),
      viewportWidth,
    };
  } catch {
    throw new Error(`Chromium resolved an invalid currentSrc: ${currentSrc}`);
  }
}

afterEach(() => {
  while (temporaryProfiles.length > 0) {
    rmSync(temporaryProfiles.pop()!, { force: true, recursive: true });
  }
});

describe("academic momentum hero image", () => {
  it(
    "renders a desktop currentSrc candidate at least as wide as its viewport",
    () => {
      const markup = renderToStaticMarkup(
        <BookingHero
          hero={{
            eyebrow: "North Shore Coaching College Caroline Springs",
            title: "Build the habits behind stronger academic momentum.",
            description: "A focused learning plan.",
            detail: "Free initial assessment.",
          }}
          variant="general"
        />,
      );
      const { currentSrc, viewportWidth } = readCurrentSrc(markup, 1440, 900);

      expect(viewportWidth).toBeGreaterThanOrEqual(1400);
      expect(currentSrc.origin).toBe("http://127.0.0.1:4173");
      expect(currentSrc.pathname).toBe("/_vinext/image");
      expect(currentSrc.searchParams.get("url")).toBe(
        "/images/booking-hero-academic-momentum.webp",
      );
      expect(Number(currentSrc.searchParams.get("w"))).toBeGreaterThanOrEqual(
        viewportWidth,
      );
    },
    15_000,
  );
});
