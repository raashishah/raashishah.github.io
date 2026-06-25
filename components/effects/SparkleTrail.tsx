type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
};

export class SparkleTrail {
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private mouse = { x: 0, y: 0 };
  private running = false;
  private raf = 0;
  private pool: Particle[] = [];
  private maxParticles = 50;

  constructor(private canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2d not supported");
    this.ctx = ctx;
    this.resize();
    window.addEventListener("resize", this.resize);
    window.addEventListener("mousemove", this.onMove);
  }

  private resize = () => {
    const dpr = Math.min(window.devicePixelRatio, 2);
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  private onMove = (e: MouseEvent) => {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
    this.emit(3);
  };

  private emit(count: number, burst = false) {
    for (let i = 0; i < count; i++) {
      if (this.particles.length >= this.maxParticles) break;
      const p = this.pool.pop() ?? ({} as Particle);
      const angle = Math.random() * Math.PI * 2;
      const speed = burst ? Math.random() * 2 + 1 : Math.random() * 1.2;
      p.x = this.mouse.x;
      p.y = this.mouse.y;
      p.vx = Math.cos(angle) * speed;
      p.vy = Math.sin(angle) * speed;
      p.life = 0;
      p.maxLife = burst ? 500 : 400 + Math.random() * 200;
      p.size = burst ? Math.random() * 3 + 2 : Math.random() * 2 + 1;
      p.hue = 40 + Math.random() * 30;
      this.particles.push(p);
    }
  }

  start() {
    if (this.running) return;
    this.running = true;
    const tick = () => {
      if (!this.running) return;
      this.update();
      this.draw();
      this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);

    document.querySelectorAll("a, button, [data-sparkle-burst]").forEach((el) => {
      el.addEventListener("mouseenter", () => this.emit(8, true));
    });
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.resize);
    window.removeEventListener("mousemove", this.onMove);
  }

  private update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life += 16;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.02;
      if (p.life >= p.maxLife) {
        this.pool.push(p);
        this.particles.splice(i, 1);
      }
    }
  }

  private draw() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (const p of this.particles) {
      const alpha = 1 - p.life / p.maxLife;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${alpha * 0.8})`;
      this.ctx.fill();
    }
  }
}
