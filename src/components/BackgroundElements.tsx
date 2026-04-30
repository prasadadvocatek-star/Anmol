import { motion } from 'motion/react';

export const BackgroundElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-forest">
      {/* Primary Dynamic Mesh Gradients */}
      <motion.div 
        animate={{
          x: [0, 40, -40, 0],
          y: [0, -30, 30, 0],
          scale: [1, 1.3, 0.8, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        style={{
          left: '5%',
          top: '10%',
          background: 'radial-gradient(circle, rgba(212, 255, 106, 0.07) 0%, rgba(212, 255, 106, 0) 75%)',
        }}
        className="absolute w-[70vw] h-[70vw] blur-[140px] rounded-full"
      />
      <motion.div 
        animate={{
          x: [0, -60, 60, 0],
          y: [0, 50, -50, 0],
          scale: [1, 1.2, 1.4, 1],
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{
          right: '0%',
          bottom: '10%',
          background: 'radial-gradient(circle, rgba(29, 61, 47, 0.6) 0%, rgba(29, 61, 47, 0) 80%)',
        }}
        className="absolute w-[60vw] h-[60vw] blur-[100px] rounded-full"
      />

      <motion.div 
        animate={{
          x: [0, 40, -40, 0],
          y: [0, 30, -30, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        style={{
          left: '35%',
          top: '35%',
          background: 'radial-gradient(circle, rgba(212, 255, 106, 0.04) 0%, rgba(212, 255, 106, 0) 65%)',
        }}
        className="absolute w-[50vw] h-[50vw] blur-[150px] rounded-full"
      />

      {/* Floating Particles/Dust */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: 0,
            scale: 0
          }}
          animate={{ 
            y: ["0%", "100%"],
            opacity: [0, 0.3, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: 20 + Math.random() * 15,
            repeat: Infinity,
            delay: i * 2.5,
            ease: "linear"
          }}
          className="absolute w-[2px] h-[2px] bg-neon/30 rounded-full"
        />
      ))}

      {/* Dynamic Grid Pulse */}
      <motion.div 
        animate={{ opacity: [0.01, 0.04, 0.01] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(212, 255, 106, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 255, 106, 0.15) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}
      />
    </div>
  );
};
