import Image from "next/image";
import type * as React from "react";
import { ArrowRight, Phone } from "lucide-react";

import type { LandingContent, LandingVariant } from "./booking-content";

export type BookingHeroProps = {
  hero: LandingContent["hero"];
  variant: LandingVariant;
};

const TITLE_BREAK_WORDS: Record<LandingVariant, number> = {
  general: 4,
  selective: 4,
  scholarship: 3,
};

export function BookingHero({
  hero,
  variant,
}: BookingHeroProps): React.ReactNode {
  const titleWords = hero.title.split(" ");
  const titleBreak = TITLE_BREAK_WORDS[variant];
  const titleLines = [
    titleWords.slice(0, titleBreak).join(" "),
    titleWords.slice(titleBreak).join(" "),
  ];

  return (
    <section className="academic-hero">
      <div className="hero-media-mask">
        <Image
          src="/images/booking-hero-academic-momentum.webp"
          alt="Student working through practice material"
          width={1536}
          height={1024}
          priority
          quality={90}
          sizes="100vw"
          className="hero-study-image object-cover"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      <div className="academic-hero__inner">
        <p className="hero-eyebrow">{hero.eyebrow}</p>

        <div className="academic-hero__copy">
          <h1 className="hero-display" aria-label={hero.title}>
            <span className="hero-line">
              <span>{titleLines[0]}</span>
            </span>
            <span className="hero-line">
              <span>{titleLines[1]}</span>
            </span>
          </h1>

          <div className="hero-support">
            <p className="hero-description">{hero.description}</p>
            <div className="hero-actions">
              <a
                href="#booking"
                data-track-event="cta_clicked"
                data-track-label="Book my free assessment"
                data-track-location="hero"
                className="hero-action hero-action--primary"
              >
                <span>Book my free assessment</span>
                <ArrowRight aria-hidden="true" size={18} strokeWidth={2} />
              </a>
              <a
                href="tel:0403474343"
                data-track-event="phone_clicked"
                data-track-location="hero"
                className="hero-action hero-action--secondary"
              >
                <Phone aria-hidden="true" size={17} strokeWidth={2} />
                <span>Call the Caroline Springs campus</span>
              </a>
            </div>
            <p className="hero-detail">{hero.detail}</p>
          </div>
        </div>

        <ol className="learning-path" aria-label="Assessment process">
          <li>Assess</li>
          <li>Plan</li>
          <li>Progress</li>
        </ol>
      </div>
    </section>
  );
}
