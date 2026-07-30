import {
  PROGRAMS,
  type LandingContent,
  type LandingVariant,
} from "./booking-content";

type ProgramPathwaysProps = {
  variant: LandingVariant;
  pathway: LandingContent["pathway"];
  programs: typeof PROGRAMS;
};

export function ProgramPathways({
  variant,
  pathway,
  programs,
}: ProgramPathwaysProps) {
  return (
    <div className="program-pathways">
      <div className="learning-path-rail">
        <span
          aria-hidden="true"
          data-motion-kind="path-line"
          data-motion-index="0"
        />
        <span
          aria-hidden="true"
          data-motion-kind="path-line"
          data-motion-index="1"
        />
      </div>

      <section
        id="programs"
        className="program-pathways__programs px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <p className="text-xs font-bold uppercase leading-5 text-primary">
              Find the right fit
            </p>
            <h2 className="mt-3 max-w-xl font-display text-[38px] font-semibold leading-[1.05] tracking-normal text-balance sm:text-[48px]">
              Support that starts with understanding.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
              The assessment gives your family a practical starting point. The
              Caroline Springs team then recommends the program that best
              matches your child&apos;s year level and learning priorities.
            </p>
          </div>

          <div className="border-t border-foreground">
            {programs.map((program, index) => (
              <article
                className="grid grid-cols-[64px_1fr] gap-3 border-b border-border py-6 sm:grid-cols-[80px_1fr] sm:gap-5 lg:grid-cols-[96px_1fr]"
                data-motion-kind="program"
                data-motion-index={index}
                key={program.title}
              >
                <span className="program-number-mask font-display text-[42px] font-normal leading-none text-primary tabular-nums sm:text-[50px] lg:text-[58px]">
                  <span
                    data-motion-kind="program-number"
                    data-motion-index={index}
                  >
                    {program.number}
                  </span>
                </span>
                <div>
                  <h3 className="font-display text-2xl font-semibold leading-7 tracking-normal">
                    {program.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                    {program.description}
                  </p>
                  {variant === "general" ? (
                    <a
                      href={program.href}
                      data-track-event="service_link_clicked"
                      data-track-label={program.title}
                      data-track-location="programs"
                      className="mt-3 inline-flex min-h-11 items-center text-sm font-bold text-primary underline decoration-primary/35 underline-offset-4 transition hover:decoration-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-4"
                    >
                      View this program
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="program-pathways__pathway border-t border-border px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
          <div
            data-motion-kind="pathway"
            data-motion-index="0"
          >
            <p className="text-xs font-bold uppercase leading-5 text-primary">
              {pathway.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-[36px] font-semibold leading-[1.05] tracking-normal text-balance sm:text-[46px]">
              {pathway.title}
            </h2>
          </div>
          <div>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              {pathway.description}
            </p>
            <a
              href={pathway.href}
              data-motion-kind="pathway"
              data-motion-index="0"
              data-track-event="cta_clicked"
              data-track-label={pathway.cta}
              data-track-location="pathway"
              className="mt-5 inline-flex min-h-11 items-center justify-center rounded-[4px] bg-primary px-5 text-sm font-bold text-primary-foreground transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              {pathway.cta}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
