import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

import dessertAsk from "@/assets/dessert-ask.jpeg.asset.json";
import usHome from "@/assets/us-home.jpeg.asset.json";
import balloons from "@/assets/balloons.jpeg.asset.json";
import expoBoat from "@/assets/expo-boat.jpeg.asset.json";
import expoKeta from "@/assets/expo-keta.jpeg.asset.json";
import himExpo from "@/assets/him-expo.jpeg.asset.json";
import ourClip from "@/assets/our-clip.mp4.asset.json";

/**
 * The day it all began. Two years later = the anniversary being celebrated.
 * Update this date (and the copy below) to personalise the keepsake.
 */
const START_DATE = new Date("2024-08-30T00:00:00");

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Two Whole Years — You & Me" },
      {
        name: "description",
        content:
          "A keepsake of our two years together — golden light, long dinners, and the small ordinary that turned into everything.",
      },
      { property: "og:title", content: "Two Whole Years — You & Me" },
      {
        property: "og:description",
        content:
          "A keepsake of our two years together — golden light, long dinners, and the small ordinary that turned into everything.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Keepsake,
});

/** Reveals its children with a gentle rise as it scrolls into view. */
function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "p" | "h1" | "h2" | "figure" | "blockquote";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      // @ts-expect-error — ref typing across the union of allowed tags
      ref={ref}
      className={`${shown ? "reveal-in" : "reveal"} ${className}`.trim()}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

type TimeUnit = { label: string; value: number; tone: string };

function useTimeTogether() {
  const [units, setUnits] = useState<TimeUnit[]>(() => snapshot(START_DATE));

  useEffect(() => {
    const tick = () => setUnits(snapshot(START_DATE));
    const id = window.setInterval(tick, 1000 * 30);
    return () => window.clearInterval(id);
  }, []);

  return units;
}

function snapshot(start: Date): TimeUnit[] {
  const diff = Date.now() - start.getTime();
  const totalMinutes = Math.max(0, Math.floor(diff / 60000));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;
  return [
    { label: "Days", value: days, tone: "text-amber" },
    { label: "Hours", value: hours, tone: "text-rose" },
    { label: "Minutes", value: minutes, tone: "text-azure" },
  ];
}

const milestones = [
  {
    when: "October 2024 · The first date",
    title: "Astra Lumina",
    body: '"Dress warm — I want to take you to an outdoor event." A Saturday night under the lights. It turned out nicely.',
    dot: "bg-amber",
  },
  {
    when: "November 2024 · His world",
    title: "The marine career expo",
    body: "Boats, badges and lanyards — the internship that had him on the water, and me right there beside him.",
    dot: "bg-azure",
  },
  {
    when: "The question",
    title: '"Will you be my girlfriend?"',
    body: "Written in chocolate on a plate of doughnuts, with a strawberry and a little purple flower. The easiest yes.",
    dot: "bg-rose",
  },
  {
    when: "Since then · The small stuff",
    title: "Balloons, couches and water bottles",
    body: "Sunrise fields full of hot air balloons, quiet afternoons at home, and a hundred ordinary days we kept anyway.",
    dot: "bg-ochre",
  },
];

const frames = [
  { src: dessertAsk.url, caption: "will you be my girlfriend?", date: "the question", rotate: "-rotate-3" },
  { src: balloons.url, caption: "hot air balloons at sunrise", date: "the balloon field", rotate: "rotate-2" },
  { src: expoBoat.url, caption: "at the helm together", date: "November 2024", rotate: "-rotate-2" },
  { src: usHome.url, caption: "an ordinary afternoon", date: "just us", rotate: "rotate-1" },
  { src: himExpo.url, caption: "him, at the expo", date: "November 2024", rotate: "-rotate-1" },
  { src: expoKeta.url, caption: "me, by the KETA", date: "November 2024", rotate: "rotate-3" },
];

const notes = [
  '"You make even a quiet Tuesday feel like the coast at golden hour."',
  '"Two years is only the beginning of all the ordinary we\'ll keep."',
  '"Wherever the road goes, I\'ll be the one beside you in it."',
];

function Keepsake() {
  const timeUnits = useTimeTogether();

  return (
    <div className="min-h-screen overflow-x-hidden bg-cream font-body text-ink selection:bg-amber/30">
      {/* HERO — Riviera travel poster label panel */}
      <header className="relative bg-cream">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <span className="keepsake-petal absolute left-[18%] top-24 size-2.5 -rotate-12 rounded-full bg-rose/70" />
          <span className="keepsake-petal absolute left-[64%] top-10 size-3 rounded-full bg-amber/60 [animation-delay:4s]" />
          <span className="keepsake-petal absolute left-[82%] top-40 size-2 -rotate-45 rounded-full bg-rose/60 [animation-delay:9s]" />
        </div>

        <div className="mx-auto max-w-5xl px-6 pt-12 sm:pt-16">
          <div className="grid items-end gap-8 md:grid-cols-12">
            {/* poster label */}
            <Reveal className="md:col-span-5" delay={60}>
              <div className="relative rounded-[min(1.4vw,18px)] border border-ink/15 bg-cream2/60 p-7">
                <div
                  className="absolute inset-3 rounded-[min(1vw,12px)] border border-ink/10"
                  aria-hidden="true"
                />
                <div className="relative">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-azure">
                    Two Years — together
                  </p>
                  <p className="mt-4 font-serif text-xl italic leading-snug text-ink/80">
                    A Riviera
                    <br />
                    of us
                  </p>
                  <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
                    Est. 30 August
                  </p>
                </div>
              </div>
            </Reveal>

            {/* big name */}
            <div className="md:col-span-7 md:pl-6">
              <Reveal as="p" className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber" delay={120}>
                You & Me
              </Reveal>
              <Reveal as="h1" delay={180}>
                <span className="mt-3 block font-display text-[clamp(3.2rem,9vw,7rem)] uppercase leading-[0.92] tracking-tight text-ink text-balance">
                  Two
                  <br />
                  Whole
                  <br />
                  Years
                </span>
              </Reveal>
              <Reveal as="p" className="mt-5 max-w-[36ch] text-sm text-ink/70 text-pretty" delay={260}>
                730 days of golden light, long dinners, and the small ordinary that turns into
                everything. A keepsake of our first two years on the coast.
              </Reveal>
              <Reveal delay={340}>
                <a
                  href="#story"
                  className="group mt-7 inline-flex items-center gap-3 rounded-full bg-amber px-5 py-3 text-sm font-medium text-cream ring-1 ring-amber/50 transition-colors hover:bg-ink/90 hover:text-cream"
                >
                  <span className="transition-transform group-hover:translate-x-1">Open our story</span>
                  <span className="text-cream/80" aria-hidden="true">↓</span>
                </a>
              </Reveal>
            </div>
          </div>
        </div>

        {/* LIVE COUNTER band */}
        <div className="mt-12 border-y border-ink/10 bg-cream2/40">
          <div className="mx-auto flex max-w-5xl flex-wrap items-end justify-between gap-6 px-6 py-6">
            <div>
              <p className="font-serif text-lg italic text-ink/80">
                Together since the sun first hit the sea
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50">
                Live · updated as you read
              </p>
            </div>
            <div className="flex items-end gap-5 sm:gap-8">
              {timeUnits.map((u, i) => (
                <div key={u.label} className="text-right">
                  <span
                    className={`keepsake-tick ${u.tone} block font-display text-4xl tabular-nums sm:text-5xl`}
                    style={{ animationDelay: `${500 + i * 120}ms` }}
                  >
                    {String(u.value).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">
                    {u.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* STORY INTRO */}
      <section id="story" className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-amber">
              (a) Our story
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-balance sm:text-5xl">
              Two years, pressed flat like a flower between pages.
            </h2>
          </Reveal>
          <Reveal className="md:col-span-6 md:col-start-7 text-pretty">
            <p className="leading-relaxed text-ink/75">
              It began the way the coast does — quietly, then all at once. A hello that outstayed
              itself, a first dinner we neither wanted to end, slow afternoons that taught us the
              language of each other.
            </p>
            <p className="mt-4 leading-relaxed text-ink/75">
              Twenty-four months later, every ordinary day carries a little of the light it first
              had. This is what two whole years look like, kept carefully.
            </p>
            <p className="mt-6 font-serif text-lg italic text-rose">— yours, always</p>
          </Reveal>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-amber">
            (b) The year, in order
          </p>
          <h2 className="mt-4 font-display text-5xl uppercase tracking-tight text-balance sm:text-6xl">
            Milestones
          </h2>
        </Reveal>

        <div className="relative mt-12 pl-10 sm:pl-14">
          <div
            className="absolute bottom-1 top-1 w-px bg-ink/15 sm:left-[11px] left-[7px]"
            aria-hidden="true"
          />

          {milestones.map((m, i) => (
            <Reveal key={m.title} className={`relative ${i === milestones.length - 1 ? "" : "pb-10"}`}>
              <span
                className={`absolute -left-10 top-1.5 size-3.5 rounded-full ring-4 ring-cream sm:-left-14 ${m.dot}`}
                aria-hidden="true"
              />
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-azure">{m.when}</p>
              <p className="mt-1 font-serif text-2xl">{m.title}</p>
              <p className="mt-1 max-w-[42ch] text-sm text-ink/70 text-pretty">{m.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* GALLERY — overlapping polaroids */}
      <section className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-amber">
            (c) Kept & pinned
          </p>
          <h2 className="mt-4 font-display text-5xl uppercase tracking-tight text-balance sm:text-6xl">
            A few frames
          </h2>
        </Reveal>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-2 -space-y-4">
          {frames.map((f, i) => (
            <Reveal as="figure" key={f.src} delay={i * 120}>
              <figure
                className={`w-44 rounded-[min(1vw,10px)] bg-cream p-3 pb-11 outline-1 -outline-offset-1 outline-black/5 transition-transform duration-500 hover:rotate-0 sm:w-52 ${f.rotate} ${i === 0 ? "" : "-mt-10"}`}
              >
                <img
                  src={f.src}
                  alt={f.caption}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="aspect-square w-full rounded-[min(0.7vw,8px)] bg-cream2 object-cover outline-1 -outline-offset-1 outline-black/5"
                />
                <figcaption className="mt-3 text-center font-serif text-sm italic text-ink/70">
                  {f.date}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* THE CLIP */}
      <section className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-amber">
            (c·2) Moving picture
          </p>
          <h2 className="mt-4 font-display text-5xl uppercase tracking-tight text-balance sm:text-6xl">
            One little clip
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-8 rounded-[min(1.4vw,18px)] border border-ink/15 bg-cream2/60 p-3">
            <video
              src={ourClip.url}
              controls
              playsInline
              preload="metadata"
              className="w-full rounded-[min(1vw,12px)] bg-ink/5"
            />
            <p className="mt-3 text-center font-serif text-sm italic text-ink/70">
              press play — you know exactly which night this was
            </p>
          </div>
        </Reveal>
      </section>


      {/* LOVE NOTES */}
      <section className="border-y border-ink/10 bg-cream2/40">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-amber">
              (d) Marginalia
            </p>
          </Reveal>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {notes.map((n, i) => (
              <Reveal
                as="blockquote"
                key={n}
                className="font-serif text-xl italic leading-relaxed text-ink/80 text-pretty"
                delay={i * 80}
              >
                {n}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CARD */}
      <section className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <Reveal>
          <div className="relative rounded-[min(2vw,24px)] border border-ink/15 bg-cream2/60 p-10 text-center sm:p-14">
            <div
              className="absolute inset-3 rounded-[min(1.4vw,18px)] border border-ink/10"
              aria-hidden="true"
            />
            <div className="relative">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-azure">To us</p>
              <p className="mt-6 font-display text-5xl uppercase tracking-tight text-balance sm:text-6xl">
                Happy
                <br />
                two years
              </p>
              <p className="mt-6 font-serif text-xl italic text-ink/80 text-balance">
                Here's to the next season of the same light, the same sea, and you.
              </p>
              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-amber">
                You & Me · 30 August
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
