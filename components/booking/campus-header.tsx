import Image from "next/image";
import type * as React from "react";
import { ArrowRight, Phone } from "lucide-react";

export function CampusHeader(): React.ReactNode {
  return (
    <>
      <p className="campus-offer">
        Start with a free initial assessment. New students can join during term
        with pro-rata fees for the remaining lessons.
      </p>

      <header className="campus-header">
        <div className="campus-header__inner">
          <a
            href="#top"
            className="campus-brand"
          >
            <Image
              src="/images/north-shore-logo.png"
              alt="North Shore Coaching College"
              width={376}
              height={211}
              priority
              className="campus-brand__logo"
            />
            <span className="campus-brand__location">
              <strong>Caroline Springs Campus</strong>
              <span>Lakeview Senior College</span>
            </span>
          </a>

          <nav className="campus-nav" aria-label="Primary navigation">
            <a href="#programs">Programs</a>
            <a href="#booking">How it works</a>
            <a href="#location">Location</a>
          </nav>

          <div className="campus-header__actions">
            <a
              href="tel:0403474343"
              data-track-event="phone_clicked"
              data-track-location="header"
              className="campus-phone"
            >
              <Phone aria-hidden="true" size={16} strokeWidth={2} />
              <span>0403 474 343</span>
            </a>
            <a
              href="#booking"
              data-track-event="cta_clicked"
              data-track-label="Book free assessment"
              data-track-location="header"
              className="campus-booking campus-booking--desktop"
            >
              <span>Book free assessment</span>
              <ArrowRight aria-hidden="true" size={17} strokeWidth={2} />
            </a>
            <a
              href="#booking"
              data-track-event="cta_clicked"
              data-track-label="Book free assessment"
              data-track-location="header"
              className="campus-booking campus-booking--mobile"
              aria-label="Book free assessment"
            >
              <ArrowRight aria-hidden="true" size={20} strokeWidth={2} />
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
