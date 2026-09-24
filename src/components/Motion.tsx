"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Intro timeline, scroll reveals and magnetic buttons. Renders nothing. */
export default function Motion() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const cleanups: (() => void)[] = [];

    const ctx = gsap.context(() => {
      gsap.set(".rv", { opacity: 0, y: 24 });
      gsap.timeline({ defaults: { ease: "expo.out" } })
        .from("#h1 .w>span", { yPercent: 115, duration: 1.1, stagger: 0.09 })
        .to(".hero .rv", { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, "-=.7");

      ScrollTrigger.batch("section:not(.hero) .rv", {
        start: "top 88%", once: true,
        onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 0.8, stagger: 0.07, ease: "expo.out" }),
      });

      if (matchMedia("(hover:hover)").matches) {
        document.querySelectorAll<HTMLElement>(".mag").forEach((el) => {
          const move = (e: PointerEvent) => {
            const b = el.getBoundingClientRect();
            gsap.to(el, { x: (e.clientX - b.left - b.width / 2) * 0.22, y: (e.clientY - b.top - b.height / 2) * 0.3, duration: 0.3, ease: "power3.out", overwrite: "auto" });
          };
          const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          cleanups.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); });
        });
      }
    });

    return () => { cleanups.forEach((f) => f()); ctx.revert(); };
  }, []);

  return null;
}
