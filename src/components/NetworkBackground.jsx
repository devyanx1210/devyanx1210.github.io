import { useEffect, useRef } from "react";

export default function NetworkBackground({ opacity = 1 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let nodes = [];
    let running = true;

    const getConfig = () => {
      const w = canvas.offsetWidth;
      const isMobile = w < 768;
      const isTablet = w >= 768 && w < 1024;
      return {
        nodeCount: isMobile ? 20 : isTablet ? 35 : 55,
        maxDist: isMobile ? 80 : isTablet ? 110 : 140,
        speed: isMobile ? 0.3 : 0.45,
      };
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const init = () => {
      resize();
      const { nodeCount, speed } = getConfig();
      nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        r: Math.random() * 1.8 + 0.8,
      }));
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { maxDist } = getConfig();

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.28 * opacity;
            ctx.strokeStyle = `rgba(151, 71, 255, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(151, 71, 255, ${0.55 * opacity})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running) draw();
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    init();
    draw();

    const onResize = () => init();
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, [opacity]);

  return <canvas ref={canvasRef} className="network-bg" />;
}