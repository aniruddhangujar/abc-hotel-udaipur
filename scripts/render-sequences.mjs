import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const PLATES_DIR = path.join(ROOT, "public", "images", "plates");
const ROOMS_DIR = path.join(ROOT, "public", "images", "rooms");
const EXP_DIR = path.join(ROOT, "public", "images", "experiences");
const SEQ_DIR = path.join(ROOT, "public", "sequences");

function clamp(v, min, max) {
  return v < min ? min : v > max ? max : v;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function smoothstep(edge0, edge1, x) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeInOutSine(t) {
  return 0.5 - 0.5 * Math.cos(Math.PI * clamp(t, 0, 1));
}

/**
 * Computes pixel-accurate portal mask from palace-gate-closed.jpg using BFS
 * region-growing inside the central archway so every scalloped sandstone lobe
 * remains crisp and intact without any clipping or gap.
 */
function buildExactGateMask(data, W, H) {
  const mask = new Float32Array(W * H); // 0 = stone facade, 1 = wooden door / portal
  const visited = new Uint8Array(W * H);

  const sx = W / 1376;
  const sy = H / 768;
  const minX = Math.floor(571 * sx);
  const maxX = Math.ceil(807 * sx);
  const minY = Math.floor(244 * sy);
  const maxY = Math.ceil(675 * sy);

  const seedX = Math.floor(689 * sx);
  const seedY = Math.floor(500 * sy);

  const isDoorPixel = (x, y) => {
    const i = (y * W + x) * 4;
    const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    // Strict dark-teak wood threshold above spring line; wider below capitals
    const threshold = y < 405 * sy ? 64 : 102;
    return lum < threshold || (x > 610 * sx && x < 768 * sx && y > 385 * sy && y < 660 * sy);
  };

  const queue = new Int32Array(W * H);
  let head = 0;
  let tail = 0;
  const seedIdx = seedY * W + seedX;
  queue[tail++] = seedIdx;
  visited[seedIdx] = 1;

  while (head < tail) {
    const cur = queue[head++];
    const cx = cur % W;
    const cy = (cur - cx) / W;
    mask[cur] = 1.0;

    const neighbors = [
      cx > minX ? cur - 1 : -1,
      cx < maxX ? cur + 1 : -1,
      cy > minY ? cur - W : -1,
      cy < maxY ? cur + W : -1,
    ];

    for (let k = 0; k < 4; k++) {
      const n = neighbors[k];
      if (n < 0 || visited[n]) continue;
      visited[n] = 1;
      const nx = n % W;
      const ny = (n - nx) / W;
      if (isDoorPixel(nx, ny)) {
        queue[tail++] = n;
      }
    }
  }

  const midX = Math.round(689 * sx);
  const springY = Math.floor(405 * sy);
  const archTopY = Math.floor(247 * sy);
  const fullHalfW = Math.round(115 * sx);
  const leftEdge = new Int32Array(H).fill(-1);
  const rightEdge = new Int32Array(H).fill(-1);
  const spans = new Int32Array(H).fill(0);

  for (let y = minY; y <= maxY; y++) {
    let r = -1;
    let l = -1;
    for (let x = minX; x <= maxX; x++) {
      if (mask[y * W + x] > 0.5) {
        if (l === -1) l = x;
        r = x;
      }
    }
    if (l !== -1 && r !== -1) {
      const rightSpan = Math.max(0, r - midX);
      const leftSpan = Math.max(0, midX - l);
      let span = y < springY ? rightSpan : Math.round((rightSpan + leftSpan) * 0.5);
      if (y < springY) {
        // Pointed Rajput arch envelope prevents dark lintel shadows from flaring horizontally above cusps
        const archT = clamp((y - archTopY) / Math.max(1, springY - archTopY), 0, 1);
        const envelope = Math.round(fullHalfW * Math.pow(archT, 0.54));
        span = Math.min(span, envelope);
      }
      spans[y] = span;
    }
  }

  // Enforce monotonic narrowing upward from springY so scalloped cusps never bulge wider near top
  let runningMax = fullHalfW;
  for (let y = springY; y >= minY; y--) {
    if (spans[y] > 0) {
      runningMax = Math.min(runningMax, spans[y]);
      spans[y] = runningMax;
    }
  }

  for (let y = minY; y <= maxY; y++) {
    const span = spans[y];
    if (span > 0) {
      const symL = clamp(midX - span, minX, midX);
      const symR = clamp(midX + span, midX, maxX);
      leftEdge[y] = symL;
      rightEdge[y] = symR;
      for (let x = minX; x <= maxX; x++) {
        mask[y * W + x] = x >= symL && x <= symR ? 1.0 : 0.0;
      }
    } else {
      for (let x = minX; x <= maxX; x++) {
        mask[y * W + x] = 0.0;
      }
    }
  }

  // Separable 2D smooth pass over portal mask so 3.5x zoomed scalloped arch edges stay silky anti-aliased
  const tmp = new Float32Array(mask.length);
  const feathered = new Float32Array(mask.length);
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const idx = y * W + x;
      const ml = x > 0 ? mask[idx - 1] : 0;
      const mr = x < W - 1 ? mask[idx + 1] : 0;
      tmp[idx] = ml * 0.25 + mask[idx] * 0.5 + mr * 0.25;
    }
  }
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const idx = y * W + x;
      const mu = y > 0 ? tmp[idx - W] : 0;
      const md = y < H - 1 ? tmp[idx + W] : 0;
      feathered[idx] = mu * 0.25 + tmp[idx] * 0.5 + md * 0.25;
    }
  }

  return { mask: feathered, leftEdge, rightEdge, minX, maxX, minY, maxY };
}

function sampleMaskBilinear(mask, w, h, x, y) {
  const cx = clamp(x, 0, w - 1.001);
  const cy = clamp(y, 0, h - 1.001);
  const x0 = cx | 0;
  const y0 = cy | 0;
  const fx = cx - x0;
  const fy = cy - y0;
  const i00 = y0 * w + x0;
  return (
    mask[i00] * (1 - fx) * (1 - fy) +
    mask[i00 + 1] * fx * (1 - fy) +
    mask[i00 + w] * (1 - fx) * fy +
    mask[i00 + w + 1] * fx * fy
  );
}

/**
 * Fast bilinear pixel sampler writing directly into destination buffer
 */
function sampleBilinear(buf, w, h, x, y, outOffset, dst, shade = 1.0) {
  const cx = x < 0 ? 0 : x > w - 1.001 ? w - 1.001 : x;
  const cy = y < 0 ? 0 : y > h - 1.001 ? h - 1.001 : y;
  const x0 = cx | 0;
  const y0 = cy | 0;
  const fx = cx - x0;
  const fy = cy - y0;
  const w00 = (1 - fx) * (1 - fy);
  const w10 = fx * (1 - fy);
  const w01 = (1 - fx) * fy;
  const w11 = fx * fy;

  const i00 = (y0 * w + x0) * 4;
  const i10 = i00 + 4;
  const i01 = i00 + w * 4;
  const i11 = i01 + 4;

  dst[outOffset] = clamp(
    (buf[i00] * w00 + buf[i10] * w10 + buf[i01] * w01 + buf[i11] * w11) * shade,
    0,
    255
  );
  dst[outOffset + 1] = clamp(
    (buf[i00 + 1] * w00 + buf[i10 + 1] * w10 + buf[i01 + 1] * w01 + buf[i11 + 1] * w11) * shade,
    0,
    255
  );
  dst[outOffset + 2] = clamp(
    (buf[i00 + 2] * w00 + buf[i10 + 2] * w10 + buf[i01 + 2] * w01 + buf[i11 + 2] * w11) * shade,
    0,
    255
  );
  dst[outOffset + 3] = 255;
}

async function loadRawRGBA(filePath) {
  const { data, info } = await sharp(filePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height };
}

function applyGoldenDustMotes(dst, outW, outH, t, intensity = 1.0) {
  if (intensity <= 0.02) return;
  const moteCount = 30;
  for (let m = 0; m < moteCount; m++) {
    const seedX = ((m * 197 + 53) % 1000) / 1000;
    const seedY = ((m * 313 + 97) % 1000) / 1000;
    const cx = ((seedX + t * (0.035 + (m % 5) * 0.01)) % 1.0) * outW;
    const cy = ((seedY - t * (0.02 + (m % 3) * 0.008) + 1.0) % 1.0) * outH;
    const radius = 1.3 + (m % 3) * 0.75;
    const alpha = (0.12 + 0.12 * Math.sin(t * Math.PI * 3 + m)) * intensity;

    const minX = Math.max(0, Math.floor(cx - radius - 1));
    const maxX = Math.min(outW - 1, Math.ceil(cx + radius + 1));
    const minY = Math.max(0, Math.floor(cy - radius - 1));
    const maxY = Math.min(outH - 1, Math.ceil(cy + radius + 1));

    for (let py = minY; py <= maxY; py++) {
      for (let px = minX; px <= maxX; px++) {
        const dist = Math.hypot(px - cx, py - cy);
        if (dist <= radius) {
          const w = (1 - dist / radius) * alpha;
          const idx = (py * outW + px) * 4;
          dst[idx] = clamp(dst[idx] + 245 * w, 0, 255);
          dst[idx + 1] = clamp(dst[idx + 1] + 225 * w, 0, 255);
          dst[idx + 2] = clamp(dst[idx + 2] + 178 * w, 0, 255);
        }
      }
    }
  }
}

async function bakeArrivalSequence(dirName, frameCount, outW, outH, cropMode = "desktop") {
  const targetDir = path.join(SEQ_DIR, dirName);
  await fs.rm(targetDir, { recursive: true, force: true });
  await fs.mkdir(targetDir, { recursive: true });

  const gate = await loadRawRGBA(path.join(PLATES_DIR, "palace-gate-closed.jpg"));
  const courtyard = await loadRawRGBA(path.join(PLATES_DIR, "courtyard-axis.jpg"));
  const portal = buildExactGateMask(gate.data, gate.width, gate.height);

  const W = gate.width;
  const H = gate.height;
  const sx = W / 1376;
  const sy = H / 768;

  const leftHinge = 572 * sx;
  const midSeam = 689 * sx;
  const rightHinge = 806 * sx;
  const doorWidth = midSeam - leftHinge;
  const horizonY = 535 * sy;
  const bottomThreshold = 675 * sy;

  const baseCover =
    cropMode === "mobile"
      ? Math.max(outW / (W * 0.56), outH / H)
      : Math.max(outW / W, outH / H);

  for (let f = 0; f < frameCount; f++) {
    const outBuf = Buffer.alloc(outW * outH * 4);
    const t = frameCount === 1 ? 0 : f / (frameCount - 1);

    const doorLin = clamp((t - 0.004) / 0.48, 0, 1);
    const doorT = lerp(doorLin, doorLin * doorLin * (3 - 2 * doorLin), 0.3);
    const theta = doorT * (84 * Math.PI / 180);
    const cosT = Math.cos(theta);
    const sinT = Math.sin(theta);

    const moveEase = easeInOutSine(clamp((t - 0.03) / 0.97, 0, 1));
    const facadeZoom = lerp(1.0, cropMode === "mobile" ? 4.4 : 3.55, moveEase);
    const courtyardZoom = lerp(0.86, 1.0, easeInOutSine(clamp((t - 0.12) / 0.88, 0, 1)));
    const courtyardBleed = smoothstep(0.82, 1.0, t);

    const centerOutX = outW * 0.5;
    const centerOutY = outH * 0.5;

    // Anchor Y strictly starts at H/2 (384) so full frame fills 0..H with zero bottom/top voids,
    // then shifts smoothly to the portal center (490) only as zoom rises!
    const anchorGateX = lerp(W * 0.5, midSeam, smoothstep(0.0, 0.5, moveEase));
    const anchorGateY = lerp(H * 0.5, 492 * sy, moveEase);

    const leftInnerEdge = leftHinge + doorWidth * cosT;
    const rightInnerEdge = rightHinge - doorWidth * cosT;
    const depthShrink = 1 / (1 + sinT * 0.24);

    for (let oy = 0; oy < outH; oy++) {
      for (let ox = 0; ox < outW; ox++) {
        const outOffset = (oy * outW + ox) * 4;

        const gx = anchorGateX + (ox - centerOutX) / (baseCover * facadeZoom);
        const gy = anchorGateY + (oy - centerOutY) / (baseCover * facadeZoom);

        const cx = courtyard.width * 0.5 + (ox - centerOutX) / (baseCover * courtyardZoom);
        const cy = courtyard.height * 0.5 + (oy - centerOutY) / (baseCover * courtyardZoom);

        if (courtyardBleed >= 0.999) {
          sampleBilinear(courtyard.data, courtyard.width, courtyard.height, cx, cy, outOffset, outBuf, 1.0);
          continue;
        }

        if (doorT <= 0.002) {
          sampleBilinear(gate.data, W, H, gx, gy, outOffset, outBuf, 1.0);
          continue;
        }

        const portalWeight = sampleMaskBilinear(portal.mask, W, H, gx, gy);
        const igy = clamp(Math.round(gy), 0, H - 1);

        if (portalWeight <= 0.01) {
          // Exterior carved sandstone palace facade
          sampleBilinear(gate.data, W, H, gx, gy, outOffset, outBuf, 1.0);

          // Warm sunlight threshold spill on exterior stone paving when doors open
          if (doorT > 0.05 && gy >= bottomThreshold && gy <= bottomThreshold + 32 * sy && gx > leftHinge && gx < rightHinge) {
            const spillFade = (1 - (gy - bottomThreshold) / (32 * sy)) * doorT * 0.16;
            outBuf[outOffset] = clamp(outBuf[outOffset] + 245 * spillFade, 0, 255);
            outBuf[outOffset + 1] = clamp(outBuf[outOffset + 1] + 210 * spillFade, 0, 255);
            outBuf[outOffset + 2] = clamp(outBuf[outOffset + 2] + 150 * spillFade, 0, 255);
          }
        } else {
          // Inside exact portal aperture:
          // Render deeper courtyard with natural warm interior exposure & subtle upper arch soffit shadow
          const upperSoffitShadow = gy < 325 * sy
            ? lerp(0.68, 1.0, smoothstep(248 * sy, 325 * sy, gy))
            : 1.0;
          const thresholdBrightness = lerp(0.82, 1.0, smoothstep(0.18, 0.72, t)) * lerp(upperSoffitShadow, 1.0, moveEase);
          sampleBilinear(courtyard.data, courtyard.width, courtyard.height, cx, cy, outOffset, outBuf, thresholdBrightness);

          // Subtle ambient occlusion along left/right sandstone arch thickness (6px jamb shadow)
          const rowL = portal.leftEdge[igy];
          const rowR = portal.rightEdge[igy];
          if (rowL !== -1 && rowR !== -1) {
            const jambDist = Math.min(gx - rowL, rowR - gx);
            if (jambDist >= 0 && jambDist < 7 * sx) {
              const ao = lerp(0.56, 1.0, jambDist / (7 * sx));
              outBuf[outOffset] *= ao;
              outBuf[outOffset + 1] *= ao;
              outBuf[outOffset + 2] *= ao;
            }
          }

          // Render swinging carved teakwood gate leaves in 3D perspective
          if (doorT < 0.985) {
            if (gx >= leftHinge && gx <= leftInnerEdge && leftInnerEdge > leftHinge + 1) {
              const u = (gx - leftHinge) / (leftInnerEdge - leftHinge);
              const perspShrink = lerp(1.0, depthShrink, u);
              const srcGy = horizonY + (gy - horizonY) / perspShrink;
              const srcGx = leftHinge + u * doorWidth;
              const doorMaskVal = sampleMaskBilinear(portal.mask, W, H, srcGx, srcGy);

              if (doorMaskVal > 0.35) {
                const doorShade = 1.0 - 0.50 * sinT * (0.35 + 0.65 * u);
                sampleBilinear(gate.data, W, H, srcGx, srcGy, outOffset, outBuf, doorShade);
              }
            } else if (gx >= rightInnerEdge && gx <= rightHinge && rightHinge > rightInnerEdge + 1) {
              const u = (rightHinge - gx) / (rightHinge - rightInnerEdge);
              const perspShrink = lerp(1.0, depthShrink, u);
              const srcGy = horizonY + (gy - horizonY) / perspShrink;
              const srcGx = rightHinge - u * doorWidth;
              const doorMaskVal = sampleMaskBilinear(portal.mask, W, H, srcGx, srcGy);

              if (doorMaskVal > 0.35) {
                const doorShade = 1.0 - 0.50 * sinT * (0.35 + 0.65 * u);
                sampleBilinear(gate.data, W, H, srcGx, srcGy, outOffset, outBuf, doorShade);
              }
            }
          }

          // Anti-aliased bilinear contact blend right along portal stone edges
          if (portalWeight < 0.99) {
            const pR = outBuf[outOffset];
            const pG = outBuf[outOffset + 1];
            const pB = outBuf[outOffset + 2];
            sampleBilinear(gate.data, W, H, gx, gy, outOffset, outBuf, 1.0);
            outBuf[outOffset] = clamp(lerp(outBuf[outOffset], pR, portalWeight), 0, 255);
            outBuf[outOffset + 1] = clamp(lerp(outBuf[outOffset + 1], pG, portalWeight), 0, 255);
            outBuf[outOffset + 2] = clamp(lerp(outBuf[outOffset + 2], pB, portalWeight), 0, 255);
          }
        }

        if (courtyardBleed > 0.001) {
          const pR = outBuf[outOffset];
          const pG = outBuf[outOffset + 1];
          const pB = outBuf[outOffset + 2];
          sampleBilinear(courtyard.data, courtyard.width, courtyard.height, cx, cy, outOffset, outBuf, 1.0);
          outBuf[outOffset] = clamp(lerp(pR, outBuf[outOffset], courtyardBleed), 0, 255);
          outBuf[outOffset + 1] = clamp(lerp(pG, outBuf[outOffset + 1], courtyardBleed), 0, 255);
          outBuf[outOffset + 2] = clamp(lerp(pB, outBuf[outOffset + 2], courtyardBleed), 0, 255);
        }
      }
    }

    applyGoldenDustMotes(outBuf, outW, outH, t, 1 - moveEase * 0.75);

    const frameFile = path.join(targetDir, `frame-${String(f + 1).padStart(3, "0")}.webp`);
    await sharp(outBuf, { raw: { width: outW, height: outH, channels: 4 } })
      .webp({ quality: 78, effort: 2 })
      .toFile(frameFile);
  }

  console.log(`Baked ${dirName}: ${frameCount} frames (${outW}x${outH})`);
}

async function bakeCourtyardSequence(dirName, frameCount, outW, outH, cropMode = "desktop") {
  const targetDir = path.join(SEQ_DIR, dirName);
  await fs.rm(targetDir, { recursive: true, force: true });
  await fs.mkdir(targetDir, { recursive: true });

  const courtyard = await loadRawRGBA(path.join(PLATES_DIR, "courtyard-axis.jpg"));
  const lobby = await loadRawRGBA(path.join(PLATES_DIR, "lobby-sanctum.jpg"));

  const baseCover =
    cropMode === "mobile"
      ? Math.max(outW / (courtyard.width * 0.65), outH / courtyard.height)
      : Math.max(outW / courtyard.width, outH / courtyard.height);

  for (let f = 0; f < frameCount; f++) {
    const outBuf = Buffer.alloc(outW * outH * 4);
    const t = frameCount === 1 ? 0 : f / (frameCount - 1);
    const travelEase = easeInOutCubic(t);

    const courtyardZoom = lerp(1.0, cropMode === "mobile" ? 2.55 : 2.35, travelEase);
    const courtyardCenterX = courtyard.width * 0.5;
    const courtyardCenterY = courtyard.height * lerp(0.5, 0.555, travelEase);

    const transitionT = smoothstep(0.48, 0.95, t);
    const lobbyZoom = lerp(0.94, 1.14, smoothstep(0.45, 1.0, t));
    const lobbyCenterX = lobby.width * 0.5;
    const lobbyCenterY = lobby.height * 0.51;

    const centerOutX = outW * 0.5;
    const centerOutY = outH * 0.5;

    for (let oy = 0; oy < outH; oy++) {
      for (let ox = 0; ox < outW; ox++) {
        const outOffset = (oy * outW + ox) * 4;
        const cx = courtyardCenterX + (ox - centerOutX) / (baseCover * courtyardZoom);
        const cy = courtyardCenterY + (oy - centerOutY) / (baseCover * courtyardZoom);

        if (transitionT <= 0.001) {
          sampleBilinear(courtyard.data, courtyard.width, courtyard.height, cx, cy, outOffset, outBuf, 1.0);
        } else if (transitionT >= 0.999) {
          const lx = lobbyCenterX + (ox - centerOutX) / (baseCover * lobbyZoom);
          const ly = lobbyCenterY + (oy - centerOutY) / (baseCover * lobbyZoom);
          sampleBilinear(lobby.data, lobby.width, lobby.height, lx, ly, outOffset, outBuf, 1.0);
        } else {
          const distFromAxis = Math.abs(ox - centerOutX) / (outW * 0.5);
          const curtainAperture = easeInOutCubic(transitionT) * 1.18;
          const inLobbyZone = smoothstep(curtainAperture - 0.24, curtainAperture + 0.04, distFromAxis);
          const lobbyWeight = 1 - inLobbyZone;
          const finalWeight = lerp(lobbyWeight, transitionT, 0.45);

          sampleBilinear(courtyard.data, courtyard.width, courtyard.height, cx, cy, outOffset, outBuf, 1.0);
          const cr = outBuf[outOffset];
          const cg = outBuf[outOffset + 1];
          const cb = outBuf[outOffset + 2];

          const lx = lobbyCenterX + (ox - centerOutX) / (baseCover * lobbyZoom);
          const ly = lobbyCenterY + (oy - centerOutY) / (baseCover * lobbyZoom);
          sampleBilinear(lobby.data, lobby.width, lobby.height, lx, ly, outOffset, outBuf, 1.0);

          outBuf[outOffset] = clamp(lerp(cr, outBuf[outOffset], finalWeight), 0, 255);
          outBuf[outOffset + 1] = clamp(lerp(cg, outBuf[outOffset + 1], finalWeight), 0, 255);
          outBuf[outOffset + 2] = clamp(lerp(cb, outBuf[outOffset + 2], finalWeight), 0, 255);
        }
      }
    }

    applyGoldenDustMotes(outBuf, outW, outH, t + 0.3, 0.55);

    const frameFile = path.join(targetDir, `frame-${String(f + 1).padStart(3, "0")}.webp`);
    await sharp(outBuf, { raw: { width: outW, height: outH, channels: 4 } })
      .webp({ quality: 78, effort: 2 })
      .toFile(frameFile);
  }

  console.log(`Baked ${dirName}: ${frameCount} frames (${outW}x${outH})`);
}

async function bakeDepartureSequence(dirName, frameCount, outW, outH, cropMode = "desktop") {
  const targetDir = path.join(SEQ_DIR, dirName);
  await fs.rm(targetDir, { recursive: true, force: true });
  await fs.mkdir(targetDir, { recursive: true });

  const sunset = await loadRawRGBA(path.join(PLATES_DIR, "palace-sunset-exterior.jpg"));

  const baseCover =
    cropMode === "mobile"
      ? Math.max(outW / (sunset.width * 0.65), outH / sunset.height)
      : Math.max(outW / sunset.width, outH / sunset.height);

  for (let f = 0; f < frameCount; f++) {
    const outBuf = Buffer.alloc(outW * outH * 4);
    const t = frameCount === 1 ? 0 : f / (frameCount - 1);
    const ease = easeInOutCubic(t);

    const zoom = lerp(cropMode === "mobile" ? 2.25 : 2.0, 1.0, ease);
    const centerX = sunset.width * lerp(0.51, 0.5, ease);
    const centerY = sunset.height * lerp(0.49, 0.5, ease);
    const warmth = lerp(1.06, 1.0, ease);

    const centerOutX = outW * 0.5;
    const centerOutY = outH * 0.5;

    for (let oy = 0; oy < outH; oy++) {
      for (let ox = 0; ox < outW; ox++) {
        const outOffset = (oy * outW + ox) * 4;
        const sx = centerX + (ox - centerOutX) / (baseCover * zoom);
        const sy = centerY + (oy - centerOutY) / (baseCover * zoom);
        sampleBilinear(sunset.data, sunset.width, sunset.height, sx, sy, outOffset, outBuf, warmth);
      }
    }

    const frameFile = path.join(targetDir, `frame-${String(f + 1).padStart(3, "0")}.webp`);
    await sharp(outBuf, { raw: { width: outW, height: outH, channels: 4 } })
      .webp({ quality: 78, effort: 2 })
      .toFile(frameFile);
  }

  console.log(`Baked ${dirName}: ${frameCount} frames (${outW}x${outH})`);
}

async function bakeExperienceDetails() {
  await sharp(path.join(PLATES_DIR, "palace-sunset-exterior.jpg"))
    .extract({ left: 170, top: 215, width: 680, height: 510 })
    .resize(1200, 900, { fit: "cover" })
    .modulate({ brightness: 1.04, saturation: 1.06 })
    .jpeg({ quality: 88 })
    .toFile(path.join(EXP_DIR, "sunset-terrace.jpg"));

  await sharp(path.join(PLATES_DIR, "courtyard-axis.jpg"))
    .extract({ left: 40, top: 210, width: 640, height: 480 })
    .resize(1200, 900, { fit: "cover" })
    .modulate({ brightness: 0.78, saturation: 1.05 })
    .tint({ r: 235, g: 196, b: 148 })
    .jpeg({ quality: 88 })
    .toFile(path.join(EXP_DIR, "traditional-music.jpg"));

  await sharp(path.join(PLATES_DIR, "palace-gate-closed.jpg"))
    .extract({ left: 320, top: 40, width: 736, height: 552 })
    .resize(1200, 900, { fit: "cover" })
    .jpeg({ quality: 88 })
    .toFile(path.join(EXP_DIR, "architecture-tours.jpg"));

  await sharp(path.join(PLATES_DIR, "lobby-sanctum.jpg"))
    .extract({ left: 0, top: 220, width: 580, height: 435 })
    .resize(1200, 900, { fit: "cover" })
    .jpeg({ quality: 88 })
    .toFile(path.join(EXP_DIR, "cultural-experiences.jpg"));

  await sharp(path.join(ROOMS_DIR, "maharaja-residence.jpg"))
    .extract({ left: 260, top: 80, width: 880, height: 660 })
    .resize(1200, 900, { fit: "cover" })
    .modulate({ brightness: 0.88 })
    .jpeg({ quality: 88 })
    .toFile(path.join(EXP_DIR, "private-celebrations.jpg"));

  console.log("Baked 5 cohesive Experience architectural plates");
}

async function main() {
  const onlyArrival = process.argv.includes("--only-arrival");
  console.log("Starting ABC HOTEL cinematic sequence & plate pipeline...");
  if (!onlyArrival) {
    await bakeExperienceDetails();
  }
  await bakeArrivalSequence("arrival-desktop", 240, 1280, 720, "desktop");
  await bakeArrivalSequence("arrival-mobile", 120, 720, 1040, "mobile");
  if (!onlyArrival) {
    await bakeCourtyardSequence("courtyard-desktop", 180, 1280, 720, "desktop");
    await bakeCourtyardSequence("courtyard-mobile", 90, 720, 1040, "mobile");
    await bakeDepartureSequence("departure-desktop", 160, 1280, 720, "desktop");
    await bakeDepartureSequence("departure-mobile", 80, 720, 1040, "mobile");
  }
  console.log("All ABC HOTEL visual sequences baked cleanly.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
