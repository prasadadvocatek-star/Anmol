import { useEffect, useRef } from 'react';

export const CursorParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Array<any>>([]);
  const mouse = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (x: number, y: number) => {
      return {
        x,
        y,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        color: 'rgba(212, 255, 106, 0.4)', // Match --color-neon
        life: 1,
      };
    };

    const updateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new particle at mouse position with some randomness
      if (mouse.current.x > 0) {
        if (Math.random() > 0.7) {
          particles.current.push(createParticle(mouse.current.x, mouse.current.y));
        }
      }

      particles.current.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.life -= 0.01;

        if (particle.life <= 0) {
          particles.current.splice(index, 1);
        } else {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color.replace('0.3', (particle.life * 0.3).toString());
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(updateParticles);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();
    updateParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      id="cursor-particles"
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] opacity-40 mix-blend-screen"
    />
  );
};
