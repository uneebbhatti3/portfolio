"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Fixed full-screen wireframe scene: reacts to the pointer and to scroll progress. */
export default function Scene3D() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    gsap.registerPlugin(ScrollTrigger);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const S = { s: 0, mx: 0, my: 0 };

    const renderer = new THREE.WebGLRenderer({
      canvas: cv,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    cam.position.z = 7;
    const group = new THREE.Group();
    scene.add(group);

    const m1 = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.3 });
    const m2 = new THREE.LineBasicMaterial({
      transparent: true,
      opacity: 0.55,
    });
    const m3 = new THREE.PointsMaterial({
      size: 0.035,
      transparent: true,
      opacity: 0.4,
    });
    const g1 = new THREE.WireframeGeometry(
      new THREE.IcosahedronGeometry(1.7, 1),
    );
    const g2 = new THREE.WireframeGeometry(
      new THREE.OctahedronGeometry(0.8, 0),
    );
    const outer = new THREE.LineSegments(g1, m1);
    const inner = new THREE.LineSegments(g2, m2);

    const n = 520,
      p = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const u = Math.random() * 2 - 1,
        t = Math.random() * Math.PI * 2;
      const rad = 2.4 + Math.random() * 1.2,
        q = Math.sqrt(1 - u * u);
      p[i * 3] = rad * q * Math.cos(t);
      p[i * 3 + 1] = rad * u;
      p[i * 3 + 2] = rad * q * Math.sin(t);
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute("position", new THREE.BufferAttribute(p, 3));
    const pts = new THREE.Points(pg, m3);
    group.add(outer, inner, pts);

    const applyColors = () => {
      const c =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--acc")
          .trim() || "#3552f5";
      [m1, m2, m3].forEach((m) => m.color.set(c));
    };
    applyColors();
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const onScheme = () => setTimeout(applyColors, 30);
    mq.addEventListener("change", onScheme);

    let bx = 0,
      by = 0.2;
    const size = () => {
      const w = innerWidth,
        h = innerHeight,
        wide = w / h > 1.1;
      renderer.setSize(w, h, false);
      cam.aspect = w / h;
      cam.updateProjectionMatrix();
      bx = wide ? 2.6 : 0;
      by = wide ? 0.1 : 1.6;
      group.scale.setScalar(wide ? 1 : 0.75);
      m1.opacity = wide ? 0.3 : 0.2;
      m2.opacity = wide ? 0.55 : 0.35;
    };
    size();
    addEventListener("resize", size);

    let cx = 0,
      cy = 0,
      raf = 0;
    const frame = (t: number) => {
      cx += (S.mx - cx) * 0.05;
      cy += (S.my - cy) * 0.05;
      const s = S.s;
      group.position.x = bx * Math.cos(s * Math.PI * 3);
      group.position.y = by - s * 1.4;
      group.rotation.y = t * 0.00014 + s * Math.PI * 4 + cx * 0.6;
      group.rotation.x = cy * 0.4 + s * 1.2;
      outer.rotation.z = t * 0.00008;
      inner.rotation.y = -t * 0.0004;
      inner.rotation.x = t * 0.0003;
      pts.rotation.y = -t * 0.00006;
      renderer.render(scene, cam);
      if (!reduce) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    const onScroll = () => requestAnimationFrame(frame);
    if (reduce) addEventListener("scroll", onScroll, { passive: true });

    const onMove = (e: PointerEvent) => {
      S.mx = (e.clientX / innerWidth) * 2 - 1;
      S.my = (e.clientY / innerHeight) * 2 - 1;
    };
    if (!reduce && matchMedia("(hover:hover)").matches)
      addEventListener("pointermove", onMove);

    const tween = gsap.to(S, {
      s: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
      },
    });

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", size);
      removeEventListener("scroll", onScroll);
      removeEventListener("pointermove", onMove);
      mq.removeEventListener("change", onScheme);
      tween.scrollTrigger?.kill();
      tween.kill();
      [g1, g2, pg, m1, m2, m3].forEach((o) => o.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 size-full opacity-60"
    />
  );
}
