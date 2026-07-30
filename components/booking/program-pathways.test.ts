import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { PROGRAMS, getLandingContent } from "./booking-content";
import { ProgramPathways } from "./program-pathways";

const bookingDirectory = dirname(fileURLToPath(import.meta.url));

describe("ProgramPathways", () => {
  it("renders large fixed-size markers in stable responsive tracks", () => {
    const markup = renderToStaticMarkup(
      createElement(ProgramPathways, {
        variant: "general",
        pathway: getLandingContent("general").pathway,
        programs: PROGRAMS,
      }),
    );

    expect(markup.match(/program-number-mask/g)).toHaveLength(3);
    expect(markup.match(/grid-cols-\[64px_1fr\]/g)).toHaveLength(3);
    expect(markup.match(/sm:grid-cols-\[80px_1fr\]/g)).toHaveLength(3);
    expect(markup.match(/lg:grid-cols-\[96px_1fr\]/g)).toHaveLength(3);
    expect(markup.match(/text-\[42px\]/g)).toHaveLength(3);
    expect(markup.match(/sm:text-\[50px\]/g)).toHaveLength(3);
    expect(markup.match(/lg:text-\[58px\]/g)).toHaveLength(3);
    expect(markup).not.toContain("program-number-mask text-sm");
  });

  it("forces focused motion content into its final state immediately", () => {
    const css = readFileSync(
      resolve(bookingDirectory, "../../app/globals.css"),
      "utf8",
    );

    expect(css).toMatch(
      /html\[data-motion="enabled"\]\s+\[data-motion-kind="program"\]:focus-within,[\s\S]*html\[data-motion="enabled"\]\s+\[data-motion-kind="pathway"\]:focus-within,[\s\S]*html\[data-motion="enabled"\]\s+\[data-motion-kind="pathway"\]:focus-visible\s*\{[\s\S]*?opacity: 1;[\s\S]*?transform: translateY\(0\);[\s\S]*?transition: none;[\s\S]*?\}/,
    );
  });
});
