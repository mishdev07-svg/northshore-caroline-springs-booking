"use client";

import { useEffect } from "react";

import { getMotionDelay, type MotionKind } from "./motion-config";

export function ScrollMotionController() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-motion-kind]"),
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => {
        node.dataset.motionState = "visible";
      });
      return;
    }

    nodes.forEach((node) => {
      const kind = node.dataset.motionKind as MotionKind;
      const index = Number(node.dataset.motionIndex ?? 0);
      node.style.setProperty(
        "--motion-delay",
        `${getMotionDelay(kind, index)}ms`,
      );
      node.dataset.motionState = "pending";
    });

    document.documentElement.dataset.motion = "enabled";

    const observer = new IntersectionObserver(
      (entries) => {
        const revealNode = (node: HTMLElement) => {
          node.dataset.motionState = "visible";
          observer.unobserve(node);
        };

        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const node = entry.target as HTMLElement;
          revealNode(node);

          if (node.dataset.motionKind === "program") {
            const number = node.querySelector<HTMLElement>(
              '[data-motion-kind="program-number"]',
            );
            const programLine = document.querySelector<HTMLElement>(
              '[data-motion-kind="path-line"][data-motion-index="0"]',
            );

            if (number) revealNode(number);
            if (programLine) revealNode(programLine);
          }

          if (node.dataset.motionKind === "pathway") {
            const pathwayLine = document.querySelector<HTMLElement>(
              '[data-motion-kind="path-line"][data-motion-index="1"]',
            );

            if (pathwayLine) revealNode(pathwayLine);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
      delete document.documentElement.dataset.motion;
    };
  }, []);

  return null;
}
