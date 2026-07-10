"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { type CSSProperties, type PointerEvent, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Github,
  ImageIcon,
  Instagram,
  Maximize2,
  Pause,
  Play,
  Scissors,
  Sparkles,
  Twitter,
  Wand2,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import image1 from "@/assets/sourse/image1.webp";
import image2 from "@/assets/sourse/image2.webp";
import image3 from "@/assets/sourse/image3.webp";
import image4 from "@/assets/sourse/image4.webp";
import image5 from "@/assets/sourse/image5.webp";
import image6 from "@/assets/sourse/image6.webp";
import image7 from "@/assets/sourse/image7.webp";
import image8 from "@/assets/sourse/image8.webp";
import image9 from "@/assets/sourse/image9.webp";
import image10 from "@/assets/sourse/image10.webp";
import image11 from "@/assets/sourse/image11.webp";
import image12 from "@/assets/sourse/image12.webp";
import image13 from "@/assets/sourse/image13.webp";
import image14 from "@/assets/sourse/image14.webp";
import image15 from "@/assets/sourse/image15.webp";
import image16 from "@/assets/sourse/image16.webp";
import upscaleImage from "@/assets/sourse/4k upscale img/Upscale img.png";
import { MarketingHeader } from "@/components/site/MarketingHeader";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const galleryImages = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
  image13,
  image14,
  image15,
  image16,
] as StaticImageData[];

const heroPreviewImages = [image12, image6, image15, image3, image10] as StaticImageData[];
const showcaseVideo = "/landing/video-showcase.mp4";
const bgRemovalVideo = "/landing/bg-remover.mp4";

const rainTiles = Array.from({ length: 210 }, (_, index) => {
  const depth = (index % 7) + 1;
  const column = (index * 37) % 100;
  const start = -34 - ((index * 19) % 90);
  const end = 114 + ((index * 23) % 80);
  const size = 64 + ((index * 29) % 132);

  return {
    id: index,
    src: galleryImages[index % galleryImages.length],
    left: column,
    top: start,
    end,
    size,
    depth,
    rotate: ((index * 43) % 54) - 27,
    drift: ((index * 17) % 56) - 28,
    blur: index % 5 === 0 ? 2.5 : index % 9 === 0 ? 1.25 : 0,
    opacity: 0.46 + (depth / 7) * 0.46,
  };
});

const stats = [
  ["1.2M+", "images generated this week"],
  ["4K", "upscale-ready exports"],
  ["2 sec", "average creation flow"],
] as const;

const featureCards = [
  {
    icon: ImageIcon,
    title: "Image generation",
    body: "Style-consistent worlds, campaign visuals, thumbnails, concepts, and creator packs.",
  },
  {
    icon: Maximize2,
    title: "4K upscaling",
    body: "Recover texture, sharpen details, and prepare AI artwork for premium production.",
  },
  {
    icon: Scissors,
    title: "Background removal",
    body: "Cut subjects cleanly for product shots, profiles, posters, and marketplace assets.",
  },
] as const;

function splitChars(text: string) {
  return text.split("").map((char, index) => (
    <span
      key={`${char}-${index}`}
      className="zen-char inline-block will-change-transform"
      aria-hidden="true"
    >
      {char === " " ? "\u00a0" : char}
    </span>
  ));
}

function splitWords(text: string) {
  return text.split(" ").map((word, index) => (
    <span key={`${word}-${index}`} className="zen-word inline-block overflow-hidden align-bottom">
      <span className="inline-block will-change-transform">{word}&nbsp;</span>
    </span>
  ));
}

function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }

  return (
    <div className="landing-video-shell section-reveal">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={showcaseVideo}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/5" />
      <button
        type="button"
        onClick={togglePlayback}
        className="landing-play-button"
        aria-label={playing ? "Pause video showcase" : "Play video showcase"}
      >
        {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-0.5" />}
      </button>
      <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/35 px-4 py-3 text-sm text-white/80 backdrop-blur-xl">
        <span className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-200">
          cinematic render stream
        </span>
        <span>Prompt to motion, framed for launch-ready campaigns.</span>
      </div>
    </div>
  );
}

function ImageComparison({ image, kind }: { image: StaticImageData; kind: "upscale" }) {
  const [split, setSplit] = useState(58);
  const shellRef = useRef<HTMLDivElement>(null);
  const style = { "--split": `${split}%` } as CSSProperties;

  function updateSplit(event: PointerEvent<HTMLDivElement>) {
    const bounds = shellRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const next = ((event.clientX - bounds.left) / bounds.width) * 100;
    setSplit(Math.min(88, Math.max(12, next)));
  }

  return (
    <div
      ref={shellRef}
      className="compare-shell section-reveal"
      style={style}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        updateSplit(event);
      }}
      onPointerMove={(event) => {
        if (event.buttons === 1) updateSplit(event);
      }}
    >
      <Image
        src={image}
        alt="Low resolution AI artwork before upscaling"
        className="compare-base compare-lowres"
        fill
        sizes="(max-width: 768px) 92vw, 48vw"
        priority
      />
      <div className="compare-after">
        <Image
          src={image}
          alt="Enhanced 4K AI artwork"
          className="h-full w-full object-cover"
          fill
          sizes="(max-width: 768px) 92vw, 48vw"
        />
      </div>
      <div className="compare-divider">
        <span />
      </div>
      <div className="compare-label compare-label-left">Before</div>
      <div className="compare-label compare-label-right">4K AI</div>
    </div>
  );
}

function VideoComparison() {
  const [split, setSplit] = useState(56);
  const shellRef = useRef<HTMLDivElement>(null);
  const style = { "--split": `${split}%` } as CSSProperties;

  function updateSplit(event: PointerEvent<HTMLDivElement>) {
    const bounds = shellRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const next = ((event.clientX - bounds.left) / bounds.width) * 100;
    setSplit(Math.min(88, Math.max(12, next)));
  }

  return (
    <div
      ref={shellRef}
      className="compare-shell compare-video section-reveal"
      style={style}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        updateSplit(event);
      }}
      onPointerMove={(event) => {
        if (event.buttons === 1) updateSplit(event);
      }}
    >
      <div className="compare-checker" />
      <video
        className="compare-base compare-video-before"
        src={bgRemovalVideo}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="compare-after">
        <video className="h-full w-full object-cover" src={bgRemovalVideo} autoPlay muted loop playsInline />
      </div>
      <div className="compare-divider">
        <span />
      </div>
      <div className="compare-label compare-label-left">Original</div>
      <div className="compare-label compare-label-right">Removed</div>
    </div>
  );
}

export function PremiumLandingPage() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set([".zen-char", ".zen-word > span", ".section-reveal", ".rain-tile"], {
          clearProps: "all",
          opacity: 1,
        });
        return;
      }

      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .from(".hero-kicker", { y: 22, opacity: 0, duration: 0.6 })
        .from(".zenivra-title .zen-char", {
          yPercent: 115,
          rotateX: -72,
          opacity: 0,
          duration: 1.05,
          stagger: 0.018,
          ease: "expo.out",
        })
        .from(".hero-copy", { y: 24, opacity: 0, duration: 0.72 }, "-=0.62")
        .from(
          ".hero-actions > *",
          { y: 18, opacity: 0, scale: 0.96, duration: 0.6, stagger: 0.08 },
          "-=0.45",
        )
        .from(".hero-stat", { y: 22, opacity: 0, duration: 0.6, stagger: 0.08 }, "-=0.35")
        .from(
          ".hero-art-card",
          { y: 60, opacity: 0, scale: 0.9, rotate: 6, duration: 0.9, stagger: 0.08 },
          "-=0.8",
        );

      gsap.to(".hero-orb", {
        xPercent: 12,
        yPercent: -10,
        scale: 1.12,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.4,
      });

      gsap.to(".hero-art-card", {
        y: (index) => (index % 2 === 0 ? -18 : 18),
        rotate: (index) => (index % 2 === 0 ? -2 : 2),
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      });

      gsap.to(".hero-parallax", {
        yPercent: 16,
        ease: "none",
        scrollTrigger: {
          trigger: ".landing-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".section-title").forEach((title) => {
        gsap.from(title.querySelectorAll(".zen-word > span"), {
          yPercent: 112,
          opacity: 0,
          duration: 0.85,
          stagger: 0.035,
          ease: "power3.out",
          scrollTrigger: { trigger: title, start: "top 82%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".section-reveal").forEach((item) => {
        gsap.from(item, {
          y: 46,
          opacity: 0,
          scale: 0.98,
          filter: "blur(14px)",
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 86%" },
        });
      });

      gsap.from(".feature-glass-card", {
        y: 36,
        opacity: 0,
        scale: 0.96,
        duration: 0.72,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".feature-glass-grid", start: "top 82%" },
      });

      gsap.utils.toArray<HTMLElement>(".rain-tile").forEach((tile) => {
        const speed = Number(tile.dataset.speed ?? 1);
        const end = Number(tile.dataset.end ?? 130);
        const drift = Number(tile.dataset.drift ?? 0);

        gsap.fromTo(
          tile,
          {
            y: "-42vh",
            x: 0,
            opacity: 0,
            scale: 0.62,
            rotate: Number(tile.dataset.rotate ?? 0),
          },
          {
            y: `${end}vh`,
            x: drift,
            opacity: Number(tile.dataset.opacity ?? 0.7),
            scale: 0.84 + speed * 0.07,
            rotate: `+=${80 + speed * 18}`,
            ease: "none",
            scrollTrigger: {
              trigger: ".image-rain-section",
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );
      });

      gsap.to(".footer-glow", {
        rotate: 360,
        duration: 24,
        repeat: -1,
        ease: "none",
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={root} className="zen-landing min-h-screen overflow-hidden bg-[#05050a] text-white">
      <MarketingHeader />

      <section className="landing-hero relative isolate min-h-[calc(100vh-4rem)] overflow-hidden">
        <div className="hero-parallax absolute inset-0 -z-20">
          <div className="hero-orb absolute left-[-12%] top-[-18%] h-[34rem] w-[34rem] rounded-full bg-cyan-500/22 blur-3xl" />
          <div className="hero-orb absolute right-[-10%] top-[12%] h-[32rem] w-[32rem] rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="hero-orb absolute bottom-[-24%] left-[28%] h-[38rem] w-[38rem] rounded-full bg-violet-500/18 blur-3xl" />
        </div>
        <div className="landing-grid absolute inset-0 -z-10 opacity-40" />
        <div className="landing-particles absolute inset-0 -z-10" />

        <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.02fr_0.98fr] lg:py-24">
          <div className="max-w-3xl">
            <div className="hero-kicker inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-cyan-100 shadow-[0_0_36px_rgba(34,211,238,0.18)] backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.95)]" />
              AI image generation, upscaling, and background removal
            </div>

            <h1 className="zenivra-title mt-6 max-w-4xl overflow-hidden text-[clamp(4rem,12vw,9.5rem)] font-semibold leading-[0.82] tracking-normal text-white">
              <span className="sr-only">vares</span>
              {splitChars("vares")}
            </h1>
            <p className="hero-copy mt-7 max-w-2xl text-lg leading-8 text-white/68 md:text-xl">
              A premium web3 AI creation suite for cinematic images, crisp 4K detail, and production-ready
              cutouts. Generate beautiful visuals with the polish of a launch campaign.
            </p>

            <div className="hero-actions mt-9 flex flex-wrap items-center gap-3">
              <Link href="/auth/signup" className="landing-primary-button group">
                Connect Wallet
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/explore" className="landing-secondary-button">
                Explore gallery
              </Link>
            </div>

            <div className="mt-12 grid max-w-2xl grid-cols-3 gap-3">
              {stats.map(([value, label]) => (
                <div key={value} className="hero-stat rounded-lg border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl">
                  <p className="font-display text-2xl font-semibold text-white">{value}</p>
                  <p className="mt-1 text-xs leading-5 text-white/48">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden min-h-[620px] lg:block">
            <div className="absolute left-[8%] top-[7%] h-[520px] w-[520px] rounded-full border border-white/10 bg-white/[0.03] blur-[1px]" />
            {heroPreviewImages.map((src, index) => (
              <div
                key={src.src}
                className="hero-art-card absolute overflow-hidden rounded-lg border border-white/12 bg-white/[0.06] p-2 shadow-[0_32px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl"
                style={{
                  width: index === 0 ? 270 : index === 1 ? 210 : 180,
                  height: index === 0 ? 340 : index === 1 ? 260 : 220,
                  left: `${[30, 4, 55, 18, 62][index]}%`,
                  top: `${[20, 10, 6, 58, 48][index]}%`,
                  zIndex: [5, 3, 4, 2, 1][index],
                  transform: `rotate(${[-7, 9, -12, 12, -4][index]}deg)`,
                }}
              >
                <Image
                  src={src}
                  alt=""
                  className="h-full w-full rounded-md object-cover"
                  sizes="280px"
                  priority={index < 2}
                />
              </div>
            ))}
            <div className="hero-art-card absolute bottom-[10%] left-[3%] z-10 rounded-lg border border-cyan-200/20 bg-black/55 px-4 py-3 text-sm text-cyan-50 shadow-[0_0_50px_rgba(34,211,238,0.16)] backdrop-blur-2xl">
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-cyan-200" />
                <span>Prompt fidelity 98.7%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="feature-glass-grid grid gap-4 md:grid-cols-3">
          {featureCards.map((feature) => (
            <div key={feature.title} className="feature-glass-card rounded-lg border border-white/10 bg-white/[0.055] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-200/30 hover:bg-white/[0.075]">
              <feature.icon className="h-5 w-5 text-cyan-200" />
              <h2 className="mt-6 font-display text-xl font-semibold tracking-normal">{feature.title}</h2>
              <p className="mt-3 text-sm leading-6 text-white/58">{feature.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="image-rain-section relative min-h-[185vh] overflow-hidden border-y border-white/10 bg-[#070711]">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(34,211,238,0.16),transparent_36%),radial-gradient(circle_at_70%_70%,rgba(217,70,239,0.14),transparent_34%)]" />
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <p className="section-reveal font-mono text-xs uppercase tracking-[0.32em] text-cyan-200/80">
              image rain showcase
            </p>
            <h2 className="section-title mt-5 overflow-hidden font-display text-5xl font-semibold leading-tight tracking-normal md:text-7xl">
              {splitWords("Thousands of worlds, falling into place.")}
            </h2>
            <p className="section-reveal mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/58">
              Scroll through a storm of generated concepts, portraits, products, and surreal scenes.
              Each frame feels like another branch of your imagination.
            </p>
          </div>
          <div className="pointer-events-none absolute inset-0">
            {rainTiles.map((tile) => (
              <div
                key={tile.id}
                className="rain-tile absolute rounded-md border border-white/10 bg-white/[0.04] p-1 shadow-[0_18px_44px_rgba(0,0,0,0.45)] backdrop-blur-sm will-change-transform"
                data-speed={tile.depth}
                data-end={tile.end}
                data-drift={tile.drift}
                data-rotate={tile.rotate}
                data-opacity={tile.opacity}
                style={{
                  left: `${tile.left}%`,
                  top: `${tile.top}%`,
                  width: `clamp(54px, ${tile.size / 12}vw, ${tile.size}px)`,
                  height: `clamp(54px, ${tile.size / 12}vw, ${tile.size}px)`,
                  filter: tile.blur ? `blur(${tile.blur}px)` : undefined,
                  zIndex: tile.depth,
                }}
              >
                <Image src={tile.src} alt="" className="h-full w-full rounded-[5px] object-cover" sizes="160px" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-reveal font-mono text-xs uppercase tracking-[0.32em] text-fuchsia-200/80">
            video showcase
          </p>
          <h2 className="section-title mt-5 overflow-hidden font-display text-4xl font-semibold leading-tight tracking-normal md:text-6xl">
            {splitWords("A cinematic canvas for AI motion.")}
          </h2>
          <p className="section-reveal mt-5 text-lg leading-8 text-white/58">
            vares turns visual ideas into polished moving scenes, ready for launches, ads, reels,
            and creator drops.
          </p>
        </div>
        <div className="mt-14">
          <VideoShowcase />
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/10 bg-white/[0.025] px-6 py-24 md:py-32">
        <div className="absolute left-[-12%] top-[20%] h-96 w-96 rounded-full bg-cyan-400/12 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.88fr_1.12fr]">
          <div>
            <p className="section-reveal font-mono text-xs uppercase tracking-[0.32em] text-cyan-200/80">
              4K image upscaler
            </p>
            <h2 className="section-title mt-5 overflow-hidden font-display text-4xl font-semibold leading-tight tracking-normal md:text-6xl">
              {splitWords("Turn soft generations into gallery-grade detail.")}
            </h2>
            <p className="section-reveal mt-6 text-lg leading-8 text-white/60">
              Drag across the artwork to feel the upgrade: sharper textures, cleaner edges, and
              richer contrast without losing the original composition.
            </p>
            <Link href="/app/upscale" className="landing-primary-button section-reveal mt-8 inline-flex">
              Upscale an image
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ImageComparison image={upscaleImage} kind="upscale" />
        </div>
      </section>

      <section className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:py-32 lg:grid-cols-[1.08fr_0.92fr]">
        <VideoComparison />
        <div>
          <p className="section-reveal font-mono text-xs uppercase tracking-[0.32em] text-fuchsia-200/80">
            background removal
          </p>
          <h2 className="section-title mt-5 overflow-hidden font-display text-4xl font-semibold leading-tight tracking-normal md:text-6xl">
            {splitWords("Clean subject cutouts in one fluid pass.")}
          </h2>
          <p className="section-reveal mt-6 text-lg leading-8 text-white/60">
            Product shots, avatars, campaign art, and profile assets get instant transparent-ready
            results with a premium interactive preview.
          </p>
          <Link href="/app/remove-bg" className="landing-secondary-button section-reveal mt-8 inline-flex">
            Remove a background
          </Link>
        </div>
      </section>

      <footer className="relative overflow-hidden border-t border-white/10 px-6 py-20 md:py-28">
        <div className="footer-glow absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_90deg,rgba(34,211,238,0.2),rgba(217,70,239,0.22),rgba(139,92,246,0.18),rgba(34,211,238,0.2))] opacity-70 blur-3xl" />
        <div className="landing-grid absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-7xl">
          <div className="section-reveal max-w-4xl">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-cyan-200/80">
              create without friction
            </p>
            <h2 className="section-title mt-5 overflow-hidden font-display text-5xl font-semibold leading-tight tracking-normal md:text-7xl">
              {splitWords("Start Creating with vares")}
            </h2>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/auth/signup" className="landing-primary-button">
                Start free
                <Sparkles className="h-4 w-4" />
              </Link>
              <Link href="/pricing" className="landing-secondary-button">
                View pricing
              </Link>
            </div>
          </div>

          <div className="mt-20 grid gap-10 border-t border-white/10 pt-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-md bg-white text-black">
                  <Wand2 className="h-4 w-4" />
                </div>
                <span className="font-display text-xl font-semibold">vares</span>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-6 text-white/50">
                Premium AI generation for creators, brands, and teams building visual stories.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-white/45">Product</p>
              <nav className="mt-4 grid gap-2 text-sm text-white/68">
                <Link href="/app/generate">Generate</Link>
                <Link href="/app/upscale">Upscale</Link>
                <Link href="/app/remove-bg">Remove BG</Link>
              </nav>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-white/45">Company</p>
              <nav className="mt-4 grid gap-2 text-sm text-white/68">
                <Link href="/models">Models</Link>
                <Link href="/marketplace">Marketplace</Link>
                <Link href="/developers">Developers</Link>
              </nav>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-white/45">Social</p>
              <div className="mt-4 flex gap-2">
                {[Twitter, Instagram, Github].map((Icon, index) => (
                  <Link
                    key={index}
                    href="/"
                    className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/[0.055] text-white/70 transition hover:border-cyan-200/40 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/42">
            <span>Copyright 2026 vares Labs</span>
            <span className="font-mono">all systems operational</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
