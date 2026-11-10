"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/cn";
import type { Mood } from "./bloop-mood";

export type BloopProps = {
  /** Which of the four moods to show. Changing it blends smoothly; nothing is rebuilt. */
  mood?: Mood;
  /** Body colour as an sRGB hex string. */
  color?: string;
  /** Jelly wobble multiplier, 0 to 2. */
  jiggle?: number;
  /** Opacity of the ground shadow. Raise it on dark backgrounds. */
  shadowOpacity?: number;
  /** Size Bloop from the outside: the component fills its parent. */
  className?: string;
  label?: string;
  onPoke?: () => void;
};

const W = 72; // sphere width segments
const H = 54; // sphere height segments
const FLOOR = -1;
const BASE_Y = 0.82;
const BOT = -0.78;
const MOODS: Mood[] = ["idle", "listening", "thinking", "speaking"];

export default function Bloop({
  mood = "idle",
  color = "#4fdba5",
  jiggle = 1,
  shadowOpacity = 0.3,
  className,
  label = "Bloop, the portfolio assistant. Press Enter to poke it.",
  onPoke,
}: BloopProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  // The scene is built once. Props are mirrored into a ref and read inside the
  // animation loop, so a mood change never restarts WebGL.
  const live = useRef({ mood, color, jiggle, shadowOpacity, onPoke });
  useEffect(() => {
    live.current = { mood, color, jiggle, shadowOpacity, onPoke };
  });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return; // no WebGL: render nothing
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    const el = renderer.domElement;
    el.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
    host.appendChild(el);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);

    /* Studio-style reflections for the glossy skin */
    try {
      const c = document.createElement("canvas");
      c.width = 512;
      c.height = 256;
      const g = c.getContext("2d")!;
      const grad = g.createLinearGradient(0, 0, 0, 256);
      grad.addColorStop(0, "#ffffff");
      grad.addColorStop(0.5, "#9fb4bd");
      grad.addColorStop(1, "#2b3a41");
      g.fillStyle = grad;
      g.fillRect(0, 0, 512, 256);
      g.fillStyle = "#ffffff";
      g.fillRect(380, 46, 90, 56);
      g.fillRect(300, 36, 50, 40);
      g.fillStyle = "#cfe9f0";
      g.fillRect(110, 60, 60, 80);
      const envTex = new THREE.CanvasTexture(c);
      envTex.mapping = THREE.EquirectangularReflectionMapping;
      envTex.colorSpace = THREE.SRGBColorSpace;
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromEquirectangular(envTex).texture;
      pmrem.dispose();
      envTex.dispose();
    } catch {
      /* lights alone still look fine */
    }

    // Current three uses physical light units, so intensities carry a factor of PI
    // compared with the r128 prototype.
    scene.add(new THREE.HemisphereLight(0xffffff, 0x8aa3ad, 0.4 * Math.PI));
    const key = new THREE.DirectionalLight(0xffffff, 0.85 * Math.PI);
    key.position.set(-2.5, 4, 4);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xcfffee, 0.6 * Math.PI);
    rim.position.set(3, 1.5, -3);
    scene.add(rim);

    /* ---------- Body ---------- */
    const geo = new THREE.SphereGeometry(1, W, H);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const count = pos.count;
    const base = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const l = Math.sqrt(x * x + y * y + z * z) || 1;
      base[i * 3] = x / l;
      base[i * 3 + 1] = y / l;
      base[i * 3 + 2] = z / l;
    }

    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(live.current.color),
      roughness: 0.32,
      metalness: 0,
      clearcoat: 1,
      clearcoatRoughness: 0.18,
      envMapIntensity: 0.75,
    });
    const blobTarget = new THREE.Color(live.current.color);
    let lastColor = live.current.color;

    const creature = new THREE.Group();
    const body = new THREE.Mesh(geo, bodyMat);
    body.frustumCulled = false;
    const face = new THREE.Group();
    creature.add(body, face);
    scene.add(creature);

    const P = { ph: 0, amp: 0.02, sway: 0, swayZ: 0 };
    const _p = new THREE.Vector3();
    const _n = new THREE.Vector3();
    const Z = new THREE.Vector3(0, 0, 1);

    // One function describes the skin, so vertices and face features share it.
    const surf = (dx: number, dy: number, dz: number, out: THREE.Vector3) => {
      const wd = 1 + 0.12 * (0.2 - dy);
      const x = dx * wd;
      const z = dz * wd;
      let y = dy;
      if (y < BOT) y = BOT + (y - BOT) * 0.16;
      const ph = P.ph;
      const wob =
        Math.sin(dx * 3.4 + ph * 2.1) * Math.cos(dy * 2.9 - ph * 1.7) +
        0.6 * Math.sin(dz * 3.8 + dy * 2.3 + ph * 2.6);
      const att = 0.25 + 0.75 * Math.min(1, Math.max(0, (y + 0.5) / 1.0));
      const r = 1 + wob * P.amp * att;
      const h = (y + 0.82) * 0.55;
      out.set(x * r + P.sway * h * h, y * r, z * r + P.swayZ * h * h);
    };

    const fixSeams = () => {
      const nrm = geo.attributes.normal as THREE.BufferAttribute;
      const a = nrm.array as Float32Array;
      const row = W + 1;
      for (let iy = 1; iy < H; iy++) {
        const i0 = iy * row * 3;
        const i1 = (iy * row + W) * 3;
        const nx = a[i0] + a[i1];
        const ny = a[i0 + 1] + a[i1 + 1];
        const nz = a[i0 + 2] + a[i1 + 2];
        const l = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
        a[i0] = a[i1] = nx / l;
        a[i0 + 1] = a[i1 + 1] = ny / l;
        a[i0 + 2] = a[i1 + 2] = nz / l;
      }
      for (const iy of [0, H]) {
        let sx = 0;
        let sy = 0;
        let sz = 0;
        for (let ix = 0; ix <= W; ix++) {
          const i = (iy * row + ix) * 3;
          sx += a[i];
          sy += a[i + 1];
          sz += a[i + 2];
        }
        const l = Math.sqrt(sx * sx + sy * sy + sz * sz) || 1;
        for (let ix = 0; ix <= W; ix++) {
          const i = (iy * row + ix) * 3;
          a[i] = sx / l;
          a[i + 1] = sy / l;
          a[i + 2] = sz / l;
        }
      }
      nrm.needsUpdate = true;
    };

    const updateBody = () => {
      const arr = pos.array as Float32Array;
      for (let i = 0, j = 0; i < count; i++, j += 3) {
        surf(base[j], base[j + 1], base[j + 2], _p);
        arr[j] = _p.x;
        arr[j + 1] = _p.y;
        arr[j + 2] = _p.z;
      }
      pos.needsUpdate = true;
      geo.computeVertexNormals();
      fixSeams();
    };

    /* ---------- Face ---------- */
    const navy = new THREE.MeshStandardMaterial({ color: "#0d1b24", roughness: 0.18, metalness: 0 });
    const white = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const mouthInner = new THREE.MeshStandardMaterial({ color: "#3a1220", roughness: 0.4 });
    const cheekMat = new THREE.MeshBasicMaterial({
      color: "#ff8fae",
      transparent: true,
      opacity: 0.88,
      depthWrite: false,
    });

    const makeEye = () => {
      const g = new THREE.Group();
      const ball = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 24), navy);
      ball.scale.set(0.118, 0.2, 0.075); // 3 : 5 vertical oval
      const hl = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 12), white);
      hl.scale.set(0.034, 0.05, 0.02);
      hl.position.set(0.035, 0.075, 0.062);
      const hl2 = new THREE.Mesh(new THREE.SphereGeometry(1, 12, 10), white);
      hl2.scale.set(0.016, 0.02, 0.01);
      hl2.position.set(-0.03, -0.07, 0.066);
      g.add(ball, hl, hl2);
      return g;
    };
    const eyeL = makeEye();
    const eyeR = makeEye();
    face.add(eyeL, eyeR);

    const makeCheek = () => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 14), cheekMat);
      m.scale.set(0.1, 0.06, 0.03);
      const g = new THREE.Group();
      g.add(m);
      return g;
    };
    const cheekL = makeCheek();
    const cheekR = makeCheek();
    face.add(cheekL, cheekR);

    const mouth = new THREE.Group();
    const smile = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.016, 10, 28, Math.PI), navy);
    smile.rotation.z = Math.PI;
    smile.position.y = 0.035;
    const mouthOpen = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 16), mouthInner);
    mouthOpen.visible = false;
    mouth.add(smile, mouthOpen);
    face.add(mouth);

    const place = (obj: THREE.Object3D, yaw: number, pitch: number, lift: number) => {
      const cp = Math.cos(pitch);
      const dx = Math.sin(yaw) * cp;
      const dy = Math.sin(pitch);
      const dz = Math.cos(yaw) * cp;
      surf(dx, dy, dz, _p);
      _n.set(dx, dy, dz);
      obj.position.copy(_p).addScaledVector(_n, lift);
      obj.quaternion.setFromUnitVectors(Z, _n);
    };

    /* ---------- Thought dots (thinking) ---------- */
    const dotMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(live.current.color),
      roughness: 0.3,
      transparent: true,
      opacity: 0.92,
    });
    const dotSpec = [
      { x: 0.68, y: 0.92, r: 0.055 },
      { x: 0.92, y: 1.1, r: 0.085 },
      { x: 1.2, y: 1.28, r: 0.13 },
    ];
    const dots = dotSpec.map(() => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 16), dotMat);
      m.visible = false;
      scene.add(m);
      return m;
    });

    /* ---------- Ground shadow ---------- */
    const shCanvas = document.createElement("canvas");
    shCanvas.width = shCanvas.height = 128;
    const sg = shCanvas.getContext("2d")!;
    const rg = sg.createRadialGradient(64, 64, 0, 64, 64, 64);
    rg.addColorStop(0, "rgba(255,255,255,1)");
    rg.addColorStop(0.5, "rgba(255,255,255,0.55)");
    rg.addColorStop(1, "rgba(255,255,255,0)");
    sg.fillStyle = rg;
    sg.fillRect(0, 0, 128, 128);
    const shTex = new THREE.CanvasTexture(shCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shTex,
      color: 0x000000,
      transparent: true,
      opacity: 0.3,
      depthWrite: false,
    });
    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), shadowMat);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = FLOOR + 0.003;
    scene.add(shadow);

    /* ---------- State ---------- */
    const weights: Record<Mood, number> = { idle: 1, listening: 0, thinking: 0, speaking: 0 };
    let prevMood: Mood = live.current.mood;

    const ptr = { x: 0, y: 0 };
    const glance = { x: 0, y: 0 };
    const gaze = { x: 0, y: 0 };
    let lagX = 0;
    let lastPointer = -10;
    let nextGlance = 2;
    let clock = 0;

    let energy = 0.3;
    let s = 0; // squash amount: positive = squashed, negative = stretched
    let sv = 0;
    let sTarget = 0;
    const J = { y: 0, vy: 0, air: false };
    let pokeTimer = -1;

    let blinkT = -1;
    let nextBlink = 1.8;
    let doubleDone = false;

    const poke = () => {
      live.current.onPoke?.();
      if (J.air || pokeTimer >= 0) {
        energy = Math.min(1, energy + 0.4);
        return;
      }
      pokeTimer = reduce ? 0.05 : 0.09;
    };

    /* ---------- Per-frame update ---------- */
    const update = (dt: number) => {
      const props = live.current;
      clock += dt;
      const t = clock;
      P.ph += dt * (1 + energy * 1.5);

      if (props.mood !== prevMood) {
        prevMood = props.mood;
        energy = Math.max(energy, 0.35);
      }
      const km = 1 - Math.exp(-dt * 5);
      for (const k of MOODS) weights[k] += ((k === props.mood ? 1 : 0) - weights[k]) * km;
      const L = weights.listening;
      const Th = weights.thinking;
      const S = weights.speaking;

      /* gaze: follow the cursor, wander when nobody is around */
      const recent = t - lastPointer < 4;
      if (!recent && t > nextGlance) {
        glance.x = (Math.random() * 2 - 1) * 0.55;
        glance.y = (Math.random() * 2 - 1) * 0.3;
        nextGlance = t + 1.6 + Math.random() * 2.6;
      }
      let tx = recent ? ptr.x : glance.x;
      let ty = recent ? ptr.y : glance.y;
      const keep = (1 - 0.8 * L) * (1 - 0.4 * S);
      tx *= keep;
      ty *= keep;
      tx = tx * (1 - Th) + 0.9 * Th;
      ty = ty * (1 - Th) + 0.85 * Th;
      const kg = 1 - Math.exp(-dt * 7);
      gaze.x += (tx - gaze.x) * kg;
      gaze.y += (ty - gaze.y) * kg;
      lagX += (gaze.x - lagX) * (1 - Math.exp(-dt * 3));

      /* jelly energy */
      const jig = Math.max(0, Math.min(2, props.jiggle));
      energy *= Math.exp(-dt * 1.8);
      P.amp = (reduce ? 0.3 : 1) * jig * (0.016 + energy * 0.06 + S * 0.014 + Th * 0.006);
      P.sway = (lagX - gaze.x) * 0.4 * jig;
      P.swayZ = L * 0.15 + S * 0.03 * Math.sin(t * 10.5);

      /* poke, jump, squash */
      if (pokeTimer >= 0) {
        pokeTimer -= dt;
        sTarget = 0.28;
        if (pokeTimer < 0) {
          energy = Math.min(1, energy + 0.5);
          if (reduce) {
            sTarget = 0;
            sv = 2;
          } else {
            J.vy = 5.2;
            J.air = true;
            sTarget = -0.14;
            sv = -3.5;
          }
        }
      } else if (J.air) {
        J.vy -= 24 * dt;
        J.y += J.vy * dt;
        sTarget = J.vy > 0 ? -0.12 : -0.06;
        if (J.y <= 0 && J.vy < 0) {
          J.y = 0;
          J.vy = 0;
          J.air = false;
          sTarget = 0;
          s = 0.1;
          sv = 4;
          energy = 1;
        }
      } else {
        sTarget = 0;
      }
      sv += (-170 * (s - sTarget) - 12 * sv) * dt;
      s += sv * dt;

      const breath = Math.sin(t * 1.9) * 0.012 + S * Math.sin(t * 10.5) * 0.02;
      const sy = 1 - s + breath;
      const sx = 1 + s * 0.5 - breath * 0.5;
      creature.scale.set(sx, sy, sx);
      creature.position.y = FLOOR + BASE_Y * sy + J.y;
      creature.rotation.y = gaze.x * 0.3;
      creature.rotation.x = -gaze.y * 0.14;
      creature.rotation.z = L * 0.08 - Th * 0.06 + (lagX - gaze.x) * 0.15;

      updateBody();

      /* blinking */
      if (blinkT < 0 && t > nextBlink) blinkT = 0;
      let closed = 0;
      if (blinkT >= 0) {
        blinkT += dt;
        const u = blinkT / 0.16;
        if (u >= 1) {
          blinkT = -1;
          if (!doubleDone && Math.random() < 0.25) {
            doubleDone = true;
            nextBlink = t + 0.12;
          } else {
            doubleDone = false;
            nextBlink = t + 2 + Math.random() * 3;
          }
        } else {
          closed = Math.sin(u * Math.PI);
        }
      }

      /* eyes */
      const eyeYaw = 0.285;
      const ey = 0.04 + gaze.y * 0.12;
      place(eyeL, -eyeYaw + gaze.x * 0.2, ey, -0.02);
      place(eyeR, eyeYaw + gaze.x * 0.2, ey, -0.02);
      const esx = (1 + 0.05 * L) * (1 + 0.15 * closed);
      const esy = (1 + 0.16 * L - 0.04 * Th) * (1 - 0.92 * closed);
      eyeL.scale.set(esx, esy, 1);
      eyeR.scale.set(esx, esy, 1);

      /* cheeks */
      place(cheekL, -0.6 + gaze.x * 0.1, -0.16 + gaze.y * 0.05, 0);
      place(cheekR, 0.6 + gaze.x * 0.1, -0.16 + gaze.y * 0.05, 0);

      /* mouth */
      const talk =
        S *
        (0.3 + 0.7 * Math.abs(Math.sin(t * 10.5)) * (0.6 + 0.4 * Math.abs(Math.sin(t * 3.3 + 0.8))));
      const open = Math.max(talk, L * 0.18);
      place(mouth, gaze.x * 0.12 + Th * 0.15, -0.3 + gaze.y * 0.06, 0.004);
      const isOpen = open > 0.07;
      smile.visible = !isOpen;
      mouthOpen.visible = isOpen;
      mouthOpen.scale.set(0.045 + 0.03 * open, 0.012 + 0.07 * open, 0.03);
      mouthOpen.position.y = -open * 0.02;

      /* colour follows the prop */
      if (props.color !== lastColor) {
        lastColor = props.color;
        blobTarget.set(props.color);
      }
      bodyMat.color.lerp(blobTarget, 1 - Math.exp(-dt * 8));
      bodyMat.emissive.copy(bodyMat.color).multiplyScalar(0.1);
      dotMat.color.copy(bodyMat.color);

      /* thought dots */
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const sp = dotSpec[i];
        d.visible = Th > 0.02;
        d.position.set(sp.x, sp.y + Math.sin(t * 2.4 + i * 0.9) * 0.04 + J.y * 0.5, 0.2);
        d.scale.setScalar(sp.r * Th * (1 + 0.12 * Math.sin(t * 3 + i)));
      }

      /* shadow shrinks as the blob leaves the ground */
      const lift = Math.min(J.y, 1);
      shadow.scale.set(2.3 * sx * (1 - lift * 0.35), 1.3 * sx * (1 - lift * 0.35), 1);
      shadowMat.opacity = props.shadowOpacity * (1 - lift * 0.8);
    };

    /* ---------- Input ---------- */
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.52;
      // Normalise against the viewport so the eyes follow the cursor across the whole page.
      const sc = Math.max(window.innerWidth, window.innerHeight) * 0.45;
      const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / sc));
      const ny = Math.max(-1, Math.min(1, -(e.clientY - cy) / sc));
      const sp = Math.hypot(nx - ptr.x, ny - ptr.y);
      if (energy < 0.5) energy = Math.min(0.5, energy + sp * 0.35);
      ptr.x = nx;
      ptr.y = ny;
      lastPointer = clock;
    };
    const onLeave = () => {
      ptr.x = 0;
      ptr.y = 0;
    };
    const onDown = (e: PointerEvent) => {
      onMove(e);
      poke();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        poke();
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    host.addEventListener("pointerdown", onDown);
    host.addEventListener("keydown", onKey);

    /* ---------- Size, visibility, loop ---------- */
    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const fit = Math.max(1, 0.95 / camera.aspect);
      camera.position.set(0, 0.3, 5.3 * fit);
      camera.lookAt(0, -0.05, 0);
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    let onScreen = true;
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    });
    io.observe(host);

    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!onScreen || document.hidden) return;
      update(dt);
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
      host.removeEventListener("keydown", onKey);
      ro.disconnect();
      io.disconnect();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose();
        const mat = m.material;
        if (mat) (Array.isArray(mat) ? mat : [mat]).forEach((x) => x.dispose());
      });
      scene.environment?.dispose();
      shTex.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      el.remove();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className={cn(
        "relative size-full cursor-pointer touch-manipulation rounded-full outline-none focus-visible:ring-2 focus-visible:ring-acc",
        className,
      )}
      role="button"
      tabIndex={0}
      aria-label={label}
    />
  );
}