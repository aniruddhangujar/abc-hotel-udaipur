export const SEQUENCE_ASSET_VERSION = "4";

export interface SequenceConfig {
  id: string;
  basePath: string;
  frameCount: number;
  extension?: string;
  criticalCount?: number;
  startDelayMs?: number;
}

export interface SequenceProgress {
  id: string;
  loaded: number;
  total: number;
  criticalReady: boolean;
}

export interface BracketingFrames {
  base: HTMLImageElement | null;
  overlay: HTMLImageElement | null;
  overlayAlpha: number;
}

function isFrameReady(img: HTMLImageElement | null | undefined): img is HTMLImageElement {
  return Boolean(img && img.complete && img.naturalWidth > 0);
}

/**
 * Generates zero-padded, cache-versioned frame paths (frame-001.webp?v=4, ...)
 */
export function getFrameUrl(config: SequenceConfig, index: number): string {
  const padded = String(index + 1).padStart(3, "0");
  const ext = config.extension ?? "webp";
  return `${config.basePath}/frame-${padded}.${ext}?v=${SEQUENCE_ASSET_VERSION}`;
}

/**
 * Finds the closest already-decoded frame when scrubbing ahead of progressive preload,
 * ensuring the canvas never renders an empty blank frame.
 */
export function resolveClosestFrame(
  frames: (HTMLImageElement | null)[],
  targetIndex: number
): HTMLImageElement | null {
  const clamped = Math.max(0, Math.min(frames.length - 1, Math.round(targetIndex)));
  if (isFrameReady(frames[clamped])) return frames[clamped];

  for (let offset = 1; offset < frames.length; offset++) {
    const prev = clamped - offset;
    if (prev >= 0 && isFrameReady(frames[prev])) {
      return frames[prev];
    }
    const next = clamped + offset;
    if (next < frames.length && isFrameReady(frames[next])) {
      return frames[next];
    }
  }
  return null;
}

/**
 * Resolves surrounding decoded frames for sub-frame optical crossfade blending,
 * eliminating discrete frame stair-stepping even while sequences stream in.
 */
export function resolveBracketingFrames(
  frames: (HTMLImageElement | null)[],
  exactIndex: number
): BracketingFrames {
  const count = frames.length;
  if (count === 0) {
    return { base: null, overlay: null, overlayAlpha: 0 };
  }

  const clamped = Math.max(0, Math.min(count - 1, exactIndex));
  const floorIdx = Math.floor(clamped);

  let leftIdx = -1;
  for (let i = floorIdx; i >= 0; i--) {
    if (isFrameReady(frames[i])) {
      leftIdx = i;
      break;
    }
  }

  let rightIdx = -1;
  const startRight = clamped === floorIdx ? floorIdx : floorIdx + 1;
  for (let i = startRight; i < count; i++) {
    if (isFrameReady(frames[i])) {
      rightIdx = i;
      break;
    }
  }

  if (leftIdx === -1 && rightIdx === -1) {
    return { base: null, overlay: null, overlayAlpha: 0 };
  }
  if (leftIdx === -1) {
    return { base: frames[rightIdx], overlay: null, overlayAlpha: 0 };
  }
  if (rightIdx === -1 || leftIdx === rightIdx) {
    return { base: frames[leftIdx], overlay: null, overlayAlpha: 0 };
  }

  const span = rightIdx - leftIdx;
  if (span <= 8) {
    const alpha = Math.max(0, Math.min(1, (clamped - leftIdx) / span));
    if (alpha < 0.015) {
      return { base: frames[leftIdx], overlay: null, overlayAlpha: 0 };
    }
    if (alpha > 0.985) {
      return { base: frames[rightIdx], overlay: null, overlayAlpha: 0 };
    }
    return {
      base: frames[leftIdx],
      overlay: frames[rightIdx],
      overlayAlpha: alpha,
    };
  }

  const closerIdx = clamped - leftIdx <= rightIdx - clamped ? leftIdx : rightIdx;
  return { base: frames[closerIdx], overlay: null, overlayAlpha: 0 };
}

/**
 * Loads frame 0 immediately, pre-decodes images off the paint thread, staggers lower
 * sections so hero frames never contend on HTTP sockets, and streams remaining frames
 * in quad-interleaved stride order.
 */
export function loadImageSequence(
  config: SequenceConfig,
  onProgress?: (state: {
    loaded: number;
    total: number;
    criticalReady: boolean;
  }) => void,
  onFrameReady?: (index: number) => void
): {
  frames: (HTMLImageElement | null)[];
  cancel: () => void;
} {
  const frames: (HTMLImageElement | null)[] = new Array(config.frameCount).fill(null);
  const criticalCount = Math.min(config.criticalCount ?? 24, config.frameCount);
  let cancelled = false;
  let loaded = 0;
  let criticalLoaded = 0;
  let criticalMarkedReady = false;

  const notify = () => {
    if (cancelled) return;
    if (!criticalMarkedReady && criticalLoaded >= criticalCount) {
      criticalMarkedReady = true;
    }
    onProgress?.({
      loaded,
      total: config.frameCount,
      criticalReady: criticalMarkedReady,
    });
  };

  const loadSingleFrame = (index: number): Promise<void> => {
    return new Promise((resolve) => {
      if (cancelled) {
        resolve();
        return;
      }
      const img = new Image();
      img.decoding = "async";

      const commitLoaded = (ok: boolean) => {
        if (cancelled) {
          resolve();
          return;
        }
        if (ok) {
          frames[index] = img;
          onFrameReady?.(index);
        }
        loaded += 1;
        if (index < criticalCount) criticalLoaded += 1;
        notify();
        resolve();
      };

      img.onload = () => {
        if (cancelled) {
          resolve();
          return;
        }
        if (typeof img.decode === "function") {
          img
            .decode()
            .then(() => commitLoaded(true))
            .catch(() => commitLoaded(true));
        } else {
          commitLoaded(true);
        }
      };

      img.onerror = () => {
        commitLoaded(false);
      };

      img.src = getFrameUrl(config, index);
    });
  };

  const runPool = async (indices: number[], concurrency: number) => {
    let cursor = 0;
    const workerCount = Math.min(concurrency, indices.length);
    const workers = Array.from({ length: workerCount }, async () => {
      while (!cancelled && cursor < indices.length) {
        const nextIdx = indices[cursor++];
        await loadSingleFrame(nextIdx);
      }
    });
    await Promise.all(workers);
  };

  const runQueue = async () => {
    // Load frame 0 immediately so the first canvas frame paints without delay
    await loadSingleFrame(0);
    if (cancelled) return;

    // Stagger lower-fold sequences so the arrival gates own the initial 6 HTTP sockets
    if (config.startDelayMs && config.startDelayMs > 0) {
      await new Promise<void>((resolve) => window.setTimeout(resolve, config.startDelayMs));
      if (cancelled) return;
    }

    // Stream remaining opening frames (1..criticalCount-1) with controlled concurrency
    const criticalRest: number[] = [];
    for (let i = 1; i < criticalCount; i++) criticalRest.push(i);
    if (criticalRest.length > 0) {
      await runPool(criticalRest, 6);
      if (cancelled) return;
    }

    // Quad-interleaved stride loading so progressive scrubbing doubles smoothness continuously
    const remaining: number[] = [];
    for (const offset of [0, 2, 1, 3]) {
      for (let i = criticalCount + offset; i < config.frameCount; i += 4) {
        remaining.push(i);
      }
    }

    if (remaining.length > 0) {
      await runPool(remaining, 6);
    }
  };

  void runQueue();

  return {
    frames,
    cancel: () => {
      cancelled = true;
    },
  };
}
