type TickCallback = (dt: number, now: number) => void;

type Subscriber = {
  id: string;
  fn: TickCallback;
  active: boolean;
};

const subscribers = new Map<string, Subscriber>();
let rafId = 0;
let lastTime = 0;
let running = false;

function loop(now: number) {
  const dt = lastTime ? now - lastTime : 16;
  lastTime = now;
  subscribers.forEach((sub) => {
    if (sub.active) sub.fn(dt, now);
  });
  rafId = requestAnimationFrame(loop);
}

function ensureRunning() {
  if (running || subscribers.size === 0) return;
  running = true;
  lastTime = 0;
  rafId = requestAnimationFrame(loop);
}

function maybeStop() {
  const anyActive = [...subscribers.values()].some((s) => s.active);
  if (!anyActive && running) {
    cancelAnimationFrame(rafId);
    running = false;
    lastTime = 0;
  }
}

export function subscribeAnimationTicker(id: string, fn: TickCallback, active = true): () => void {
  subscribers.set(id, { id, fn, active });
  ensureRunning();
  return () => {
    subscribers.delete(id);
    maybeStop();
  };
}

export function setTickerActive(id: string, active: boolean) {
  const sub = subscribers.get(id);
  if (!sub) return;
  sub.active = active;
  if (active) ensureRunning();
  else maybeStop();
}
