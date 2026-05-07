import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Camera, ArrowRight, ArrowDown, ChevronRight, Menu, X, MessageCircle, Ghost, Play, ArrowLeft, ArrowUp, Mail, Linkedin, MessageSquare, Volume2, VolumeX, Star, Trash2, Send } from 'lucide-react';
import { useState, useEffect, ReactNode, MouseEvent, useRef, useCallback } from 'react';
import { cn } from '@/src/lib/utils';
import { CursorParticles } from './components/CursorParticles';
import { BackgroundElements } from './components/BackgroundElements';

// --- Assets ---
const SOUNDS = {
  click: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c813739a8a.mp3',
  swipe: 'https://cdn.pixabay.com/audio/2022/03/24/audio_3879dfbf52.mp3', // Ghish/Swipe sound
  hover: 'https://cdn.pixabay.com/audio/2022/03/15/audio_733560b411.mp3', // Subtle hover
  whoosh: 'https://cdn.pixabay.com/audio/2022/03/10/audio_f34542d2a4.mp3', // Section entrance
};

// --- Hooks ---
const useSound = () => {
  const playClick = useCallback(() => {
    const audio = new Audio(SOUNDS.click);
    audio.volume = 0.5;
    audio.play().catch(e => console.log('Audio play failed', e));
  }, []);

  const playSwipe = useCallback(() => {
    const audio = new Audio(SOUNDS.swipe);
    audio.volume = 0.4;
    audio.play().catch(e => console.log('Audio play failed', e));
  }, []);

  const playHover = useCallback(() => {
    const audio = new Audio(SOUNDS.hover);
    audio.volume = 0.2;
    audio.play().catch(e => console.log('Audio play failed', e));
  }, []);

  const playWhoosh = useCallback(() => {
    const audio = new Audio(SOUNDS.whoosh);
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio play failed', e));
  }, []);

  return { playClick, playSwipe, playHover, playWhoosh };
};

// --- Animation Variants ---
const fADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const sTAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const rEVEAL_TEXT = {
  hidden: { y: "100%" },
  visible: { 
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  }
};

// --- Components ---

const LiquidGlassWrapper = ({ children, className }: { children: ReactNode, className?: string }) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div 
      className={cn("liquid-glass-container", className)}
      onMouseMove={handleMouseMove}
      style={{ 
        '--mouse-x': `${mousePos.x}%`, 
        '--mouse-y': `${mousePos.y}%` 
      } as any}
    >
      {children}
      <div className="liquid-glass-spot" />
    </div>
  );
};

const PORTFOLIO_ITEMS = [
  { title: "Minecraft", category: "PVP Thumbnail", img: "https://i.ibb.co/Q3CPhVr3/use-these-tips-to-improve-your-pvp-20260421-123247-0000-1.png", type: 'image' },
  { title: "Free Fire", category: "Thumbnail", img: "https://i.ibb.co/Zp4ZVpt4/20251213-103953-0000-1.png", type: 'image' },
  { title: "Resident Evil 9", category: "Gaming Thumbnail", img: "https://i.ibb.co/1fkHW8mT/2K2K3KG7.png", type: 'image' },
  { 
    title: "Lyrical Edit", 
    category: "Hardstyle Edit", 
    img: "https://i.ibb.co/1fkHW8mT/2K2K3KG7.png", 
    video: "https://ik.imagekit.io/glhpm5baop/1000039994.mp4", 
    type: 'video' 
  },
  { 
    title: "Self Improvement", 
    category: "Thumbnail", 
    img: "https://i.ibb.co/ZRvphZHB/learn-20251212-210740-0000.png", 
    type: 'image' 
  },
];

const Navbar = ({ onNavigate, currentView }: { onNavigate: (view: 'home' | 'portfolio' | 'contact' | 'testimonials' | 'terms' | 'policies' | 'cookies') => void, currentView: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { playClick, playHover } = useSound();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience & Work', href: '#experience' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, href?: string) => {
    playClick();
    if (currentView !== 'home') {
      e.preventDefault();
      onNavigate('home');
      setTimeout(() => {
        const element = document.querySelector(href!);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500 py-6 px-6 md:px-12",
          isScrolled ? "bg-forest/90 backdrop-blur-lg border-b border-neon/20 py-4" : "bg-transparent border-b border-neon/10"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer" 
            onMouseEnter={playHover}
            onClick={() => { playClick(); onNavigate('home'); }}
          >
            <span className="font-display font-black tracking-widest text-2xl text-off-white uppercase">PORTFOLIO</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link, i) => (
              <a
                key={`${link.name}-${i}`}
                href={link.href || '#'}
                onClick={(e) => handleLinkClick(e, link.href)}
                onMouseEnter={playHover}
                className="text-neon hover:text-white font-display font-bold text-xs tracking-[0.2em] uppercase transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <button 
            onClick={() => { playClick(); setMobileMenuOpen(!mobileMenuOpen); }}
            onMouseEnter={playHover}
            className="md:hidden text-neon p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={mobileMenuOpen ? "open" : "closed"}
        variants={{
          open: { clipPath: "circle(150% at 100% 0%)", opacity: 1 },
          closed: { clipPath: "circle(0% at 100% 0%)", opacity: 0 }
        }}
        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
        className="fixed inset-0 z-40 bg-forest flex flex-col items-center justify-center gap-8 md:hidden"
      >
        {navLinks.map((link, i) => (
          <motion.a
            key={`${link.name}-${i}`}
            href={link.href || '#'}
            onClick={(e) => { 
              playClick(); 
              setMobileMenuOpen(false); 
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={mobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: i * 0.1 }}
            className="text-4xl font-display font-black text-neon hover:text-white transition-colors uppercase"
          >
            {link.name}
          </motion.a>
        ))}
      </motion.div>
    </>
  );
};

const Hero = ({ onNavigate }: { onNavigate: (view: 'home' | 'portfolio' | 'contact' | 'testimonials' | 'terms' | 'policies' | 'cookies') => void }) => {
  const { playClick, playWhoosh, playHover } = useSound();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    playWhoosh();
  }, [playWhoosh]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20 px-6">
      {/* Parallax Background Elements */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute top-20 left-[-10%] w-[40vw] h-[40vw] bg-neon/[0.03] rounded-full blur-[100px] pointer-events-none" 
      />
      <motion.div 
        style={{ y: y2, rotate, opacity }}
        className="absolute bottom-20 right-[-5%] w-[300px] h-[300px] border border-neon/[0.05] rounded-full pointer-events-none hidden md:block" 
      />
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute top-1/4 right-[5%] font-display font-black text-[20vw] text-neon/[0.02] leading-none select-none pointer-events-none uppercase"
      >
        Digital
      </motion.div>
      
      <div className="glow-overlay absolute inset-0 z-0"></div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8 z-20">
          <motion.div
            variants={sTAGGER_CONTAINER}
            initial="hidden"
            animate="visible"
          >
            <h1 className="overflow-hidden mb-8">
              <motion.span 
                variants={rEVEAL_TEXT}
                className="text-[12vw] md:text-[110px] font-display font-black leading-[0.85] tracking-[-0.05em] text-neon uppercase drop-shadow-2xl block"
              >
                ANMOL
              </motion.span>
              <motion.span 
                variants={rEVEAL_TEXT}
                className="text-[12vw] md:text-[110px] font-display font-black leading-[0.85] tracking-[-0.05em] text-neon uppercase drop-shadow-2xl block"
              >
                PAL
              </motion.span>
            </h1>
            <motion.div variants={fADE_UP} className="flex flex-wrap items-center gap-6">
              <motion.button
                onClick={() => { playClick(); onNavigate('testimonials'); }}
                onMouseEnter={playHover}
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(212, 255, 106, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-neon text-forest px-8 py-4 rounded-[4px] font-black uppercase tracking-widest text-[10px] shadow-xl transition-all"
              >
                View Testimonials
              </motion.button>
              <div className="flex gap-4">
                {[
                  { Icon: MessageCircle, href: 'https://wa.me/917317621663' },
                  { Icon: Ghost, href: 'https://www.snapchat.com/add/aslimogerhuyawr?share_id=0iWNZZTQLwU&locale=en-IN' }
                ].map(({ Icon, href }, i) => (
                  <motion.a
                    key={i}
                    href={href || '#'}
                    onMouseEnter={playHover}
                    target={href && href.startsWith('http') ? '_blank' : undefined}
                    rel={href && href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    onClick={(e) => {
                      playClick();
                      if (href && !href.startsWith('http')) {
                        e.preventDefault();
                        const element = document.querySelector(href);
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    whileHover={{ color: '#D4FF6A', y: -2 }}
                    className="text-neon/50 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="md:col-span-4 flex justify-center md:justify-end relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative w-full max-w-sm aspect-[4/6] z-10 editorial-arch border border-neon/30 overflow-hidden bg-olive shadow-2xl"
          >
            <LiquidGlassWrapper className="w-full h-full">
              <img
                src="https://i.ibb.co/VcTs2f6L/file-00000000d9787207a6925a46f57bbea9-1.png"
                alt="Anmol Pal Portrait"
                className="w-full h-full object-cover transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </LiquidGlassWrapper>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-neon/40"
      >
        <ArrowDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
};

const About = () => {
  const { playWhoosh } = useSound();
  return (
    <section id="why-choose-me" className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={sTAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          onViewportEnter={() => playWhoosh()}
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-12 gap-8 items-start"
        >
          <motion.div
            variants={fADE_UP}
            className="md:col-span-12 lg:col-span-4"
          >
            <span className="text-neon font-display font-black text-[10px] uppercase tracking-[0.3em] mb-6 block">Why should you choose me</span>
            <p className="text-off-white/80 text-2xl font-medium leading-tight mb-10">
              I help creators to turn their ideas into engaging videos. With 4 years of experience and 20+ projects, I deliver polished edits and thumbnails that capture attention and keep viewers watching.
            </p>
          </motion.div>

          <div className="md:col-span-12 lg:col-span-8 grid md:grid-cols-2 gap-12">
              <motion.div 
                variants={fADE_UP}
                className="p-8 border-t border-neon/20"
              >
                <h4 className="text-5xl font-display font-black text-neon mb-2">4+</h4>
                <p className="text-stone-500 text-[10px] uppercase tracking-[0.3em] font-black">History // Years</p>
              </motion.div>
              <motion.div 
                variants={fADE_UP}
                className="p-8 border-t border-neon/20"
              >
                <h4 className="text-5xl font-display font-black text-neon mb-2">20+</h4>
                <p className="text-stone-500 text-[10px] uppercase tracking-[0.3em] font-black">Curation // Projects</p>
              </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Works = () => {
  const { playClick, playHover, playWhoosh } = useSound();
  const projects = [
    { year: '2025', title: 'Thumbnail making ( 1 years)', desc: '', highlight: false },
    { year: '2024', title: 'Vlog editing ( 2 years)', desc: '', highlight: false },
    { year: '2023', title: 'Gaming video editing (3 years)', desc: '', highlight: false },
    { year: '2022', title: 'Anime editing ( 4 years)', desc: '', highlight: false },
    { year: '2023', title: 'Cinematic edit ( 2 years)', desc: '', highlight: false },
    { year: '2025', title: 'Web designing (8 months)', desc: '', highlight: false },
  ];

  return (
    <section id="experience" className="py-32 px-6 relative">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        onViewportEnter={() => playWhoosh()}
        variants={sTAGGER_CONTAINER}
        className="max-w-7xl mx-auto"
      >
        <motion.div variants={fADE_UP} className="flex flex-col mb-16">
            <span className="text-neon font-display font-black tracking-[0.3em] mb-4 block uppercase text-[10px]">Work</span>
            <h2 className="text-7xl md:text-9xl font-display font-extrabold text-off-white leading-[0.85] uppercase tracking-tighter">Experience</h2>
        </motion.div>

        <motion.div variants={fADE_UP} className="border-t border-neon/20">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              onClick={playClick}
              onMouseEnter={playHover}
              whileHover={{ 
                scale: 1.02, 
                backgroundColor: 'rgba(212, 255, 106, 0.1)',
                boxShadow: "0 0 50px rgba(212, 255, 106, 0.15), inset 0 0 20px rgba(212, 255, 106, 0.05)",
                zIndex: 10
              }}
              className={cn(
                "flex justify-between items-baseline py-8 border-b border-neon/10 transition-all duration-300 cursor-pointer relative group",
                project.highlight ? "bg-neon/5 px-8" : "px-6"
              )}
            >
              <div className="flex items-baseline gap-12">
                <span className="font-display font-bold text-xs text-neon/60 group-hover:text-neon transition-colors">{project.year}</span>
                <div className="overflow-hidden">
                  <motion.h3 
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className={cn(
                      "text-lg md:text-2xl font-black uppercase text-white group-hover:text-neon group-hover:drop-shadow-[0_0_15px_rgba(212,255,106,0.6)] transition-all duration-300 transform group-hover:translate-x-2"
                    )}
                  >
                    {project.title}
                  </motion.h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

const VideoCard = ({ src }: { src: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { playClick } = useSound();

  const togglePlay = () => {
    playClick();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        videoRef.current.muted = false;
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div 
      className="gallery-card w-32 h-44 bg-olive border border-neon/10 rounded-lg overflow-hidden flex-shrink-0 relative group/card cursor-pointer"
      onClick={togglePlay}
    >
      <video 
        ref={videoRef}
        src={src}
        className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover/card:opacity-100 group-hover/card:scale-110 transition-all duration-700"
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-forest/40 opacity-0 group-hover/card:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
        <motion.span 
          initial={{ y: 10, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          className="text-[8px] font-black uppercase tracking-[0.2em] text-neon border border-neon/30 px-2 py-1 rounded"
        >
          Watch
        </motion.span>
      </div>
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/card:bg-transparent transition-colors z-10 pointer-events-none">
          <Play fill="currentColor" className="w-8 h-8 text-neon opacity-70 group-hover/card:opacity-100 transition-opacity" />
        </div>
      )}
    </div>
  );
};

const Gallery = ({ onNavigate, onPlayVideo, onViewImage, isPaused = false }: { 
  onNavigate: (view: 'home' | 'portfolio' | 'contact' | 'terms' | 'policies' | 'cookies') => void,
  onPlayVideo: (video: { src: string, title: string }) => void,
  onViewImage: (image: { src: string, title: string }) => void,
  isPaused?: boolean
}) => {
  const { playClick, playSwipe, playHover } = useSound();
  const [activeFilter, setActiveFilter] = useState<'all' | 'image' | 'video'>('all');

  const flexItems = PORTFOLIO_ITEMS.filter(item => 
    activeFilter === 'all' ? true : item.type === activeFilter
  );

  return (
    <section id="gallery" className="py-32 px-6 relative">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto"
      >
         <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div className="flex flex-col gap-6">
              <div className="flex items-baseline gap-6">
                <h2 className="text-7xl md:text-9xl font-display font-black text-off-white uppercase leading-[0.8] tracking-tighter">Gallery</h2>
                <motion.button
                  whileHover={{ x: 10 }}
                  onMouseEnter={playHover}
                  onClick={() => { playClick(); onNavigate('portfolio'); }}
                  className="hidden md:flex items-center gap-2 text-neon font-display font-black text-xs uppercase tracking-widest pb-4 group"
                >
                  View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
              <div className="flex gap-4">
                {(['all', 'image', 'video'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => { playSwipe(); setActiveFilter(f); }}
                    onMouseEnter={playHover}
                    className={cn(
                      "relative text-[8px] uppercase font-black tracking-[0.2em] transition-all pb-1",
                      activeFilter === f ? "text-neon" : "text-neon/20 hover:text-neon/50"
                    )}
                  >
                    {activeFilter === f && (
                      <motion.div 
                        layoutId="activeFilterHome"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-neon"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {f === 'image' ? 'Images' : f === 'video' ? 'Videos' : 'All'}
                  </button>
                ))}
              </div>
            </div>
            <div className="gallery-mini flex gap-4 w-full md:w-auto overflow-x-auto pb-4 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {flexItems.map((item, i) => (
                  <motion.div 
                    layout
                    key={item.title}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="gallery-card w-32 h-44 bg-olive border border-neon/10 relative rounded-lg overflow-hidden flex-shrink-0 group/card cursor-pointer"
                    onClick={() => { 
                      playClick(); 
                      if (item.type === 'video' && item.video) {
                        onPlayVideo({ src: item.video, title: item.title });
                      } else {
                        onViewImage({ src: item.img, title: item.title });
                      }
                    }}
                  >
                    {item.type === 'video' ? (
                      <VideoPreview 
                        src={item.video || ''} 
                        size="sm"
                        className="absolute inset-0 opacity-80"
                        paused={isPaused}
                      />
                    ) : (
                      <img 
                        src={item.img} 
                        className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover/card:opacity-100 group-hover/card:grayscale-0 group-hover/card:scale-110 transition-all duration-700 pointer-events-none select-none"
                        alt={item.title}
                        onContextMenu={(e) => e.preventDefault()}
                      />
                    )}
                    <div className="absolute inset-0 bg-forest/40 opacity-0 group-hover/card:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                      <span className="text-[8px] font-black uppercase tracking-[0.2em] text-neon border border-neon/30 px-2 py-1 rounded translate-y-2 group-hover/card:translate-y-0 transition-transform">
                        {item.type === 'video' ? 'Play' : 'View'}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
         </div>
         
         <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           onMouseEnter={playHover}
           className="w-full aspect-[2/1] bg-olive border border-neon/10 rounded-[2rem] overflow-hidden group/featured cursor-pointer"
           onClick={() => { 
             playClick(); 
             onViewImage({ 
               src: "https://i.ibb.co/1fkHW8mT/2K2K3KG7.png", 
               title: "Resident Evil 9" 
             });
           }}
         >
           <LiquidGlassWrapper className="w-full h-full group">
             <div className="relative w-full h-full">
               <img 
                 src="https://i.ibb.co/1fkHW8mT/2K2K3KG7.png" 
                 className="w-full h-full object-cover opacity-90 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 pointer-events-none select-none"
                 alt="Resident Evil 9 Thumbnail"
                 referrerPolicy="no-referrer"
                 onContextMenu={(e) => e.preventDefault()}
               />
               <div className="absolute inset-0 bg-forest/40 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center backdrop-blur-md">
                 <div className="bg-neon text-forest px-10 py-4 rounded-full font-black uppercase text-xs tracking-[0.3em] shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-500">
                   View Project
                 </div>
               </div>
             </div>
           </LiquidGlassWrapper>
         </motion.div>
       </motion.div>
    </section>
  );
};

const Contact = ({ onNavigate }: { onNavigate: (view: 'home' | 'portfolio' | 'contact' | 'terms' | 'policies' | 'cookies') => void }) => {
  const { playClick, playHover, playWhoosh } = useSound();
  return (
    <section id="about" className="py-40 px-6 relative overflow-hidden">
       <div className="glow-overlay absolute inset-0 z-0"></div>
       
         <motion.div
           initial="hidden"
           whileInView="visible"
           onViewportEnter={() => playWhoosh()}
           viewport={{ once: true }}
           variants={sTAGGER_CONTAINER}
           className="w-full max-w-5xl mx-auto bg-olive/20 backdrop-blur-sm rounded-[3rem] relative overflow-hidden group border border-neon/10 shadow-2xl"
         >
          <LiquidGlassWrapper className="p-12 md:p-24 w-full h-full">
            <div className="relative z-10 text-center">
              <motion.span variants={fADE_UP} className="text-neon font-display font-black text-[10px] uppercase tracking-[0.5em] mb-6 block">About</motion.span>
              <motion.h2 variants={fADE_UP} className="text-3xl md:text-5xl font-display font-black text-white mb-10 uppercase leading-snug tracking-tighter max-w-4xl mx-auto">
                hi, i am <span className="text-neon">anmol</span> from India, Uttar Pradesh, With over 4 years of experience and 20+ projects completed. if you re intrested <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(212,255,106,1)' }}>purchase your order</span> or click on start conversation
              </motion.h2>
              <div className="flex flex-col items-center gap-10">
                  <motion.button
                    variants={fADE_UP}
                    onClick={() => { playClick(); onNavigate('contact'); }}
                    onMouseEnter={playHover}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-neon text-forest px-12 py-4 rounded-[4px] font-black uppercase tracking-[0.2em] text-xs flex items-center gap-3 shadow-2xl transition-all"
                  >
                    Start The Conversation <ChevronRight className="w-5 h-5" strokeWidth={3} />
                  </motion.button>
                  
                  <motion.div variants={fADE_UP} className="flex flex-wrap justify-center gap-x-10 gap-y-4 items-center">
                      {[
                        { name: 'WhatsApp', href: 'https://wa.me/917317621663' },
                        { name: 'Snapchat', href: 'https://www.snapchat.com/add/aslimogerhuyawr?share_id=0iWNZZTQLwU&locale=en-IN' },
                        { name: 'LinkedIn', href: 'https://www.linkedin.com/in/shadow-undefined-2259413b3?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' }
                      ].map(social => (
                        <a 
                          key={social.name} 
                          href={social.href} 
                          target={social.href !== '#' ? '_blank' : undefined}
                          rel={social.href !== '#' ? 'noopener noreferrer' : undefined}
                          onClick={() => playClick()} 
                          onMouseEnter={playHover}
                          className="text-neon/40 hover:text-white transition-colors uppercase text-[10px] tracking-[0.4em] font-display font-bold"
                        >
                          {social.name}
                        </a>
                      ))}
                  </motion.div>
              </div>
            </div>

            <motion.div
               variants={fADE_UP}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="mt-20 relative h-72 w-full flex items-center justify-center drop-shadow-[0_40px_60px_rgba(0,0,0,0.8)] px-12"
            >
               <img
                 src="https://i.ibb.co/wNYcJX78/IMG-20251229-WA0083.jpg"
                 alt="Anmol in creative space"
                 className="h-full object-contain editorial-arch border border-neon/20 shadow-2xl"
                 referrerPolicy="no-referrer"
               />
            </motion.div>
          </LiquidGlassWrapper>
         </motion.div>
    </section>
  );
};


const Footer = ({ onNavigate }: { onNavigate: (view: 'home' | 'portfolio' | 'contact' | 'testimonials' | 'terms' | 'policies' | 'cookies') => void }) => {
  const { playClick, playHover } = useSound();
  return (
    <footer id="contact" className="py-24 px-6 relative overflow-hidden border-t border-neon/10">
      <div className="max-w-7xl mx-auto flex flex-col gap-24 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-16">
          <div className="flex flex-col items-center md:items-start max-w-md">
             <div className="flex items-center gap-3 mb-8 group cursor-pointer" 
              onMouseEnter={playHover}
              onClick={() => { playClick(); onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              <span className="font-display font-black tracking-tighter text-4xl text-off-white uppercase">CONTACT</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-20 gap-y-8">
             <div className="flex flex-col gap-4">
                <p className="text-neon text-[10px] uppercase tracking-[0.4em] font-black mb-2">Explore</p>
                {['About', 'Experience & Work', 'Gallery', 'Contact'].map((l, i) => (
                   <a 
                    key={i} 
                    href={l === 'Experience & Work' ? '#experience' : l === 'About' ? '#about' : l === 'Gallery' ? '#gallery' : '#contact'} 
                    onClick={(e) => {
                      playClick();
                      if (window.location.hash || document.location.pathname !== '/') {
                        // If we are not on home, or have a hash, navigate home first then scroll
                        // Actually just let the default behavior work if we are on home, 
                        // but handle view state
                      }
                    }} 
                    onMouseEnter={playHover}
                    className="text-off-white/40 hover:text-neon transition-colors text-[10px] uppercase tracking-[0.2em]"
                  >
                    {l}
                  </a>
                ))}
             </div>
             <div className="flex flex-col gap-4">
                <p className="text-neon text-[10px] uppercase tracking-[0.4em] font-black mb-2">Contact</p>
                {[
                  { label: 'India, UP', href: '#' },
                  { label: 'a28217295@gmail.com', href: 'mailto:a28217295@gmail.com' },
                  { label: '+91 7317621663', href: 'https://wa.me/917317621663' },
                  { label: 'Snapchat', href: 'https://www.snapchat.com/add/aslimogerhuyawr?share_id=0iWNZZTQLwU&locale=en-IN' }
                ].map((item, i) => (
                  <a 
                    key={i} 
                    href={item.href} 
                    target={item.href.startsWith('http') || item.href.startsWith('mailto') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    onClick={() => playClick()} 
                    onMouseEnter={playHover}
                    className="text-off-white/40 hover:text-neon transition-colors text-[10px] uppercase tracking-[0.2em]"
                  >
                    {item.label}
                  </a>
                ))}
             </div>
             <div className="hidden sm:flex flex-col gap-4">
                <p className="text-neon text-[10px] uppercase tracking-[0.4em] font-black mb-2">Legal</p>
                {['Terms', 'Policy', 'Cookies'].map(l => (
                   <a 
                    key={l} 
                    href="#" 
                    onClick={(e) => { 
                      e.preventDefault();
                      playClick(); 
                      if (l === 'Terms') onNavigate('terms');
                      if (l === 'Policy') onNavigate('policies');
                      if (l === 'Cookies') onNavigate('cookies');
                    }} 
                    onMouseEnter={playHover}
                    className="text-off-white/40 hover:text-neon transition-colors text-[10px] uppercase tracking-[0.2em]"
                  >
                    {l}
                  </a>
                ))}
             </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-neon/5 gap-8">
          <p className="text-neon/30 text-[10px] uppercase tracking-[0.5em] font-black">© 2026 ANMOL PAL • PORTFOLIO</p>
          <div className="flex gap-8">
            {[
              { Icon: MessageCircle, href: 'https://wa.me/917317621663' },
              { Icon: Ghost, href: 'https://www.snapchat.com/add/aslimogerhuyawr?share_id=0iWNZZTQLwU&locale=en-IN' }
            ].map((item, i) => (
              <a 
                key={i} 
                href={item.href || '#'} 
                target={item.href ? '_blank' : undefined}
                rel={item.href ? 'noopener noreferrer' : undefined}
                onMouseEnter={playHover}
                onClick={(e) => {
                  playClick();
                }} 
                className="p-3 bg-neon/5 rounded-full text-neon/40 hover:text-neon hover:bg-neon/10 transition-all border border-neon/10"
              >
                <item.Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 pointer-events-none select-none w-full opacity-[0.03]">
         <h2 className="text-[25vw] font-display font-black whitespace-nowrap text-center leading-none text-neon tracking-tighter">ANMOLPAL</h2>
      </div>
    </footer>
  );
};

// --- Main Page ---

// --- Pages ---

const ContactPage = ({ onBack }: { onBack: () => void }) => {
  const { playClick, playHover, playWhoosh } = useSound();
  useEffect(() => {
    window.scrollTo(0, 0);
    playWhoosh();
  }, [playWhoosh]);

  return (
    <div className="min-h-screen bg-forest pt-32 pb-20 px-6">
      <BackgroundElements />
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={sTAGGER_CONTAINER}
        className="max-w-7xl mx-auto"
      >
        <motion.button
          variants={fADE_UP}
          onClick={() => { playClick(); onBack(); }}
          onMouseEnter={playHover}
          className="flex items-center gap-3 text-neon font-display font-black text-xs uppercase tracking-widest mb-16 hover:gap-5 transition-all group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" /> Back to Home
        </motion.button>

        <header className="mb-24 overflow-hidden">
          <motion.span
            variants={fADE_UP}
            className="text-neon/60 font-display font-black text-[10px] uppercase tracking-[0.5em] block mb-4"
          >
            Connect
          </motion.span>
          <motion.h1
            variants={rEVEAL_TEXT}
            className="text-7xl md:text-[120px] font-display font-black text-white uppercase leading-[0.8] tracking-tighter"
          >
            Start <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(212,255,106,1)' }}>Conversation</span>
          </motion.h1>
        </header>

        <div className="grid lg:grid-cols-2 gap-20">
          <motion.div
            variants={sTAGGER_CONTAINER}
          >
            <motion.p variants={fADE_UP} className="text-neon/60 font-display font-bold text-lg mb-12 leading-relaxed">
              Have a project in mind? Looking for high-quality edits that stand out? 
              Choose your favorite way to connect and let's build something epic.
            </motion.p>

            <div className="flex flex-col gap-6">
              {[
                { name: 'Email', value: 'a28217295@gmail.com', link: 'mailto:a28217295@gmail.com', Icon: Mail },
                { name: 'WhatsApp', value: '+91 7317621663', link: 'https://wa.me/917317621663', Icon: MessageSquare },
                { name: 'Snapchat', value: '@aslimoggerhuyawr', link: 'https://www.snapchat.com/add/aslimogerhuyawr?share_id=0iWNZZTQLwU&locale=en-IN', Icon: Ghost },
                { name: 'LinkedIn', value: 'Anmol Pal', link: 'https://www.linkedin.com/in/shadow-undefined-2259413b3?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', Icon: Linkedin }
              ].map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.link}
                  variants={fADE_UP}
                  onMouseEnter={playHover}
                  target={item.link.startsWith('http') ? '_blank' : undefined}
                  rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  onClick={() => playClick()}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 0 30px rgba(212, 255, 106, 0.15)",
                    borderColor: "rgba(212, 255, 106, 0.5)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-6 p-8 bg-olive/10 border border-neon/10 rounded-2xl transition-colors group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-neon/0 via-neon/5 to-neon/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <div className="w-14 h-14 bg-forest border border-neon/20 rounded-xl flex items-center justify-center group-hover:border-neon group-hover:bg-neon/10 transition-all">
                    <item.Icon className="w-6 h-6 text-neon group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-neon/40 text-[10px] uppercase tracking-widest font-black mb-1">{item.name}</span>
                    <span className="text-2xl font-display font-black text-off-white group-hover:text-neon transition-colors truncate">{item.value}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-neon/0 group-hover:text-neon group-hover:translate-x-2 transition-all ml-auto" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="hidden lg:block relative aspect-square bg-olive rounded-[3rem] overflow-hidden border border-neon/10"
          >
            <LiquidGlassWrapper className="w-full h-full">
              <img 
                src="https://i.ibb.co/VcTs2f6L/file-00000000d9787207a6925a46f57bbea9-1.png" 
                className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 hover:scale-105 transition-all duration-1000"
                alt="Connect with Anmol"
              />
            </LiquidGlassWrapper>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const VideoPreview = ({ src, className, size = 'md', paused = false }: { src: string, className?: string, size?: 'sm' | 'md', paused?: boolean }) => {
  const [muted, setMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { playClick, playHover } = useSound();

  useEffect(() => {
    if (videoRef.current) {
      if (paused) {
        videoRef.current.pause();
      } else if (hasStarted) {
        videoRef.current.play().catch(err => console.log("Playback failed:", err));
      }
    }
  }, [paused, hasStarted]);

  const toggleMute = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (videoRef.current) {
      const newMuted = !muted;
      videoRef.current.muted = newMuted;
      setMuted(newMuted);
      
      if (!newMuted && !paused) {
        videoRef.current.play().catch((err) => console.log("Playback failed:", err));
      }
    }
    playClick();
  };

  return (
    <div className={cn("relative w-full h-full bg-forest/20 overflow-hidden", className)}>
      {isLoading && !hasStarted && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-forest/40">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className={cn(
              "border-2 border-neon/20 border-t-neon rounded-full",
              size === 'sm' ? "w-4 h-4" : "w-8 h-8"
            )}
          />
        </div>
      )}
      <video 
        ref={videoRef}
        src={src}
        autoPlay={!paused}
        muted={muted}
        loop
        playsInline
        preload="auto"
        controlsList="nodownload"
        onContextMenu={(e) => e.preventDefault()}
        onLoadStart={() => setIsLoading(true)}
        onCanPlay={() => {
          setIsLoading(false);
          setHasStarted(true);
        }}
        onPlaying={() => {
          setIsLoading(false);
          setHasStarted(true);
        }}
        className={cn(
          "w-full h-full object-cover group-hover:scale-105 transition-all duration-700 pointer-events-none",
          !hasStarted ? "opacity-0" : "opacity-100"
        )}
      />
      {hasStarted && (
        <button
          onClick={toggleMute}
          onMouseEnter={playHover}
          className={cn(
            "absolute bg-neon text-forest rounded-full hover:scale-110 active:scale-95 transition-all shadow-xl z-20 backdrop-blur-sm",
            size === 'sm' ? "bottom-2 right-2 p-1.5" : "bottom-6 right-6 p-3"
          )}
        >
          {muted ? (
            <VolumeX className={size === 'sm' ? "w-3 h-3" : "w-5 h-5"} />
          ) : (
            <Volume2 className={size === 'sm' ? "w-3 h-3" : "w-5 h-5"} />
          )}
        </button>
      )}
    </div>
  );
};

const VideoModal = ({ src, onClose, title }: { src: string, onClose: () => void, title: string }) => {
  const { playClick, playWhoosh, playHover } = useSound();
  const [isLoading, setIsLoading] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    playWhoosh();
  }, [playWhoosh]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-forest/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10"
      onClick={() => { playClick(); onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-6xl aspect-video bg-black rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl relative border border-white/5"
        onClick={(e) => e.stopPropagation()}
      >
        {isLoading && !hasStarted && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-30 bg-black/60">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-neon/20 border-t-neon rounded-full"
            />
            <p className="text-neon font-display font-black text-xs uppercase tracking-widest animate-pulse">Syncing Content...</p>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-30 p-10 text-center bg-black/90">
            <X className="w-16 h-16 text-neon/20" />
            <div className="space-y-2">
              <p className="text-neon font-display font-black text-xl uppercase tracking-tighter">Playback Error</p>
              <p className="text-white/40 text-sm max-w-xs mx-auto">We encountered an issue loading the video. This might be due to a slow connection or a temporary server issue. Please try again.</p>
            </div>
            <button 
              onClick={() => { playClick(); onClose(); }}
              onMouseEnter={playHover}
              className="px-8 py-3 bg-neon text-forest rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-transform"
            >
              Close Preview
            </button>
          </div>
        )}

        <video 
          key={src}
          src={src} 
          className={cn(
            "w-full h-full object-contain transition-opacity duration-700 pointer-events-none select-none",
            !hasStarted ? "opacity-0" : "opacity-100"
          )} 
          autoPlay 
          loop
          controls 
          playsInline
          preload="auto"
          controlsList="nodownload"
          onContextMenu={(e) => e.preventDefault()}
          onLoadStart={() => setIsLoading(true)}
          onCanPlay={() => {
            setIsLoading(false);
            setHasStarted(true);
            setError(null);
          }}
          onPlaying={() => {
            setIsLoading(false);
            setHasStarted(true);
          }}
          onError={() => {
            setIsLoading(false);
            setError("Failed to load video");
          }}
        />
        <button
          onClick={() => { playClick(); onClose(); }}
          onMouseEnter={playHover}
          className="absolute top-4 right-4 md:top-8 md:right-8 p-3 md:p-5 bg-neon text-forest rounded-full hover:scale-110 transition-transform z-40 shadow-xl"
        >
          <X className="w-5 h-5 md:w-7 md:h-7" strokeWidth={3} />
        </button>
        {hasStarted && !error && (
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none">
            <h3 className="text-neon font-display font-black text-lg md:text-3xl uppercase tracking-tighter drop-shadow-lg">{title}</h3>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const ImageModal = ({ src, onClose, title }: { src: string, onClose: () => void, title: string }) => {
  const { playClick, playWhoosh, playHover } = useSound();

  useEffect(() => {
    playWhoosh();
  }, [playWhoosh]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-forest/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10"
      onClick={() => { playClick(); onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-6xl max-h-[80vh] bg-black rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl relative border border-white/5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full h-full flex items-center justify-center">
          <img 
            src={src} 
            alt={title}
            className="max-w-full max-h-[75vh] object-contain pointer-events-none select-none"
            referrerPolicy="no-referrer"
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
        <button
          onClick={() => { playClick(); onClose(); }}
          onMouseEnter={playHover}
          className="absolute top-4 right-4 md:top-8 md:right-8 p-3 md:p-5 bg-neon text-forest rounded-full hover:scale-110 transition-transform z-40 shadow-xl"
        >
          <X className="w-5 h-5 md:w-7 md:h-7" strokeWidth={3} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none">
          <h3 className="text-neon font-display font-black text-lg md:text-3xl uppercase tracking-tighter drop-shadow-lg">{title}</h3>
        </div>
      </motion.div>
    </motion.div>
  );
};

const PortfolioPage = ({ onBack, isPaused = false }: { onBack: () => void, isPaused?: boolean }) => {
  const { playClick, playSwipe, playHover } = useSound();
  const [activeFilter, setActiveFilter] = useState<'all' | 'image' | 'video'>('all');
  const [selectedVideo, setSelectedVideo] = useState<{ src: string, title: string } | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ src: string, title: string } | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredItems = PORTFOLIO_ITEMS.filter(item => 
    activeFilter === 'all' ? true : item.type === activeFilter
  );

  return (
    <div className="min-h-screen bg-forest pt-32 pb-20 px-6">
      <BackgroundElements />
      <AnimatePresence>
        {selectedVideo && (
          <VideoModal 
            src={selectedVideo.src} 
            title={selectedVideo.title} 
            onClose={() => setSelectedVideo(null)} 
          />
        )}
        {selectedImage && (
          <ImageModal 
            src={selectedImage.src} 
            title={selectedImage.title} 
            onClose={() => setSelectedImage(null)} 
          />
        )}
      </AnimatePresence>
      <div className="max-w-7xl mx-auto">
        <motion.button
          onClick={() => { playClick(); onBack(); }}
          onMouseEnter={playHover}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 text-neon font-display font-black text-xs uppercase tracking-widest mb-16 hover:gap-5 transition-all group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" /> Back to Home
        </motion.button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-24">
          <header className="overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-neon/60 font-display font-black text-[10px] uppercase tracking-[0.5em] block mb-4"
            >
              Showcase
            </motion.span>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="text-7xl md:text-[120px] font-display font-black text-white uppercase leading-[0.8] tracking-tighter"
              >
                Gallery <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(212,255,106,1)' }}>Detail</span>
              </motion.h1>
            </div>
          </header>

          <div className="flex bg-olive/30 backdrop-blur-sm p-1.5 rounded-full border border-neon/10 relative">
            {(['all', 'image', 'video'] as const).map((f) => (
              <button
                key={f}
                onClick={() => { playSwipe(); setActiveFilter(f); }}
                onMouseEnter={playHover}
                className={cn(
                  "relative z-10 px-6 py-2 rounded-full text-[10px] uppercase font-black tracking-widest transition-all",
                  activeFilter === f ? "text-forest" : "text-neon/40 hover:text-neon"
                )}
              >
                {activeFilter === f && (
                  <motion.div 
                    layoutId="activeFilterMain"
                    className="absolute inset-0 bg-neon rounded-full -z-10 shadow-lg"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                {f === 'image' ? 'Images' : f === 'video' ? 'Videos' : 'All'}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 gap-10"
        >
          <AnimatePresence mode="popLayout text-forest">
            {filteredItems.map((item, i) => (
              <motion.div
                layout
                key={item.title}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ 
                  duration: 0.4,
                  type: 'spring',
                  stiffness: 260,
                  damping: 25
                }}
                onClick={() => {
                  playClick();
                  if (item.type === 'video' && item.video) {
                    setSelectedVideo({ src: item.video, title: item.title });
                  } else {
                    setSelectedImage({ src: item.img, title: item.title });
                  }
                }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 30px rgba(212, 255, 106, 0.1)"
                }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[16/10] bg-olive/30 border border-neon/10 rounded-[2rem] overflow-hidden mb-8">
                  <LiquidGlassWrapper className="w-full h-full">
                    {item.type === 'video' ? (
                      <VideoPreview 
                        src={item.video || ''} 
                        paused={isPaused || !!selectedVideo}
                      />
                    ) : (
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 pointer-events-none select-none" 
                        referrerPolicy="no-referrer"
                        onContextMenu={(e) => e.preventDefault()}
                      />
                    )}
                  </LiquidGlassWrapper>
                  <div className="absolute inset-0 bg-forest/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-md">
                    <motion.span 
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      className="bg-neon text-forest px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-[0.3em] shadow-neon/20 shadow-xl"
                    >
                      {item.type === 'video' ? 'Play Video' : 'View Project'}
                    </motion.span>
                  </div>
                </div>
                <div className="overflow-hidden">
                  <motion.h3 
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.05 }}
                    viewport={{ once: true }}
                    className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tight mb-2 group-hover:text-neon group-hover:drop-shadow-[0_0_15px_rgba(212,255,106,0.6)] transition-all duration-300 transform group-hover:scale-[1.02] origin-left"
                  >
                    {item.title}
                  </motion.h3>
                </div>
                <div className="overflow-hidden">
                  <motion.p 
                    initial={{ y: "100%", opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
                    viewport={{ once: true }}
                    className="text-neon/40 font-display font-bold text-[10px] uppercase tracking-[0.3em]"
                  >
                    {item.category}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

const TestimonialsPage = ({ onBack }: { onBack: () => void }) => {
  const { playClick, playHover } = useSound();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-forest pt-32 pb-20 px-6 relative flex items-center justify-center overflow-hidden">
      <BackgroundElements />
      <div className="max-w-4xl mx-auto text-center z-10">
        <motion.button
          onClick={() => { playClick(); onBack(); }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 text-neon font-display font-black text-xs uppercase tracking-widest mb-12 mx-auto hover:gap-5 transition-all group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" /> Back to Home
        </motion.button>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="bg-olive/20 backdrop-blur-xl border border-neon/10 p-12 md:p-20 rounded-[3rem] shadow-2xl relative"
        >
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-10 -right-10 w-24 h-24 bg-neon/20 blur-3xl rounded-full"
          />
          
          <span className="text-neon block font-display font-black text-[10px] uppercase tracking-[0.5em] mb-8">Coming Soon</span>
          <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase leading-tight mb-8 tracking-tighter">
            I forget to get <span className="text-neon">testimonials</span> from clients...
          </h2>
          <p className="text-neon/60 font-display italic text-lg md:text-xl max-w-2xl mx-auto mb-12">
            "Place your first order, and let me add your reviews :)"
          </p>


        </motion.div>
      </div>
    </div>
  );
};

const TermsPage = ({ onBack }: { onBack: () => void }) => {
  const { playClick, playHover, playWhoosh } = useSound();
  useEffect(() => {
    window.scrollTo(0, 0);
    playWhoosh();
  }, [playWhoosh]);

  const sections = [
    {
      title: "1. Services Offered",
      content: "I provide video editing services including cuts, transitions, color grading, sound design, and thumbnail creation. I do not offer ad production or advanced graphic design services."
    },
    {
      title: "2. Project Scope",
      content: "All project details (style, duration, deadlines, revisions) must be agreed upon before work begins. Any additional requests beyond the agreed scope may require extra charges."
    },
    {
      title: "3. Payment Terms",
      content: "A 50% advance payment is required before starting the project.\nThe remaining 50% must be paid before final delivery.\nNo raw or final files will be delivered until full payment is received."
    },
    {
      title: "4. Revisions Policy",
      content: "Up to 2–3 free revisions are included.\nAdditional revisions may be charged depending on complexity.\nMajor changes after final approval will be treated as a new project."
    },
    {
      title: "5. Turnaround Time",
      content: "Delivery time depends on project complexity and will be discussed beforehand. Delays caused by late client responses or unclear instructions are not my responsibility."
    },
    {
      title: "6. Client Responsibilities",
      content: "Clients must provide all required assets (footage, audio, references) before the project starts. Clear instructions help ensure better results."
    },
    {
      title: "7. File Delivery",
      content: "Final files will be delivered in the agreed format and resolution. Raw project files are not included unless requested (additional cost may apply)."
    },
    {
      title: "8. Cancellation & Refunds",
      content: "If the client cancels after work has started, the advance payment is non-refundable.\nIf I am unable to complete the project, a partial or full refund will be issued depending on progress."
    },
    {
      title: "9. Usage Rights",
      content: "Clients receive rights to use the final video after full payment.\nI reserve the right to showcase the work in my portfolio unless agreed otherwise."
    },
    {
      title: "10. Communication",
      content: "Clear and respectful communication is expected from both sides to ensure smooth workflow."
    }
  ];

  return (
    <div className="min-h-screen bg-forest pt-32 pb-20 px-6">
      <BackgroundElements />
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={sTAGGER_CONTAINER}
        className="max-w-4xl mx-auto"
      >
        <motion.button
          variants={fADE_UP}
          onClick={() => { playClick(); onBack(); }}
          onMouseEnter={playHover}
          className="flex items-center gap-3 text-neon font-display font-black text-xs uppercase tracking-widest mb-16 hover:gap-5 transition-all group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" /> Back to Home
        </motion.button>

        <header className="mb-24 overflow-hidden">
          <motion.span
            variants={fADE_UP}
            className="text-neon/60 font-display font-black text-[10px] uppercase tracking-[0.5em] block mb-4"
          >
            Legal
          </motion.span>
          <motion.h1
            variants={rEVEAL_TEXT}
            className="text-6xl md:text-8xl font-display font-black text-white uppercase leading-[0.8] tracking-tighter"
          >
            Terms & <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(212,255,106,1)' }}>Conditions</span>
          </motion.h1>
        </header>

        <div className="grid gap-12">
          {sections.map((section, idx) => (
            <motion.div 
              key={idx}
              variants={fADE_UP}
              className="p-8 bg-olive/10 border border-neon/10 rounded-2xl"
            >
              <h3 className="text-neon font-display font-black text-xl uppercase mb-4 tracking-tighter">{section.title}</h3>
              <p className="text-off-white/70 font-display font-medium leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const PoliciesPage = ({ onBack }: { onBack: () => void }) => {
  const { playClick, playHover, playWhoosh } = useSound();
  useEffect(() => {
    window.scrollTo(0, 0);
    playWhoosh();
  }, [playWhoosh]);

  const sections = [
    {
      title: "1. Work Process Policy",
      content: "Every project follows a structured workflow:\nBrief → Review requirements → Editing → Preview → Revisions → Final Delivery.\nWork begins only after agreement on scope and payment confirmation."
    },
    {
      title: "2. Revision Policy",
      content: "I include a limited number of revisions (usually 2–3).\nRevisions cover small adjustments (cuts, timing, color, text).\nMajor changes (new concept, new footage, style change) are treated as a new project."
    },
    {
      title: "3. Delivery Policy",
      content: "Projects are delivered digitally in the agreed format (MP4, MOV, etc.).\nDelivery timelines depend on project complexity and will be defined before starting.\nFaster delivery (rush work) may include additional charges."
    },
    {
      title: "4. Payment Policy",
      content: "Advance payment is required to confirm the project.\nFull payment must be completed before final files are delivered.\nNo exceptions for unpaid work."
    },
    {
      title: "5. Communication Policy",
      content: "Clients should provide clear instructions and references.\nDelays in response from the client may affect delivery time.\nProfessional and respectful communication is expected at all times."
    },
    {
      title: "6. Content Policy",
      content: "I can edit most types of videos (YouTube, reels, gaming, cinematic, etc.).\nI do not work on content that is illegal, harmful, or violates platform guidelines."
    },
    {
      title: "7. Asset Responsibility Policy",
      content: "Clients must provide all necessary files (videos, audio, logos).\nI am not responsible for low-quality or missing assets affecting the final output."
    },
    {
      title: "8. File Storage Policy",
      content: "Project files are stored for a limited time (e.g., 7–14 days after delivery).\nAfter that, files may be deleted unless agreed otherwise."
    },
    {
      title: "9. Refund Policy",
      content: "Advance payments are non-refundable once work has started.\nRefunds may only apply if the project is canceled before significant work is completed."
    },
    {
      title: "10. Portfolio Usage Policy",
      content: "Completed work may be showcased in my portfolio or social media unless the client requests confidentiality in advance."
    }
  ];

  return (
    <div className="min-h-screen bg-forest pt-32 pb-20 px-6">
      <BackgroundElements />
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={sTAGGER_CONTAINER}
        className="max-w-4xl mx-auto"
      >
        <motion.button
          variants={fADE_UP}
          onClick={() => { playClick(); onBack(); }}
          onMouseEnter={playHover}
          className="flex items-center gap-3 text-neon font-display font-black text-xs uppercase tracking-widest mb-16 hover:gap-5 transition-all group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" /> Back to Home
        </motion.button>

        <header className="mb-24 overflow-hidden">
          <motion.span
            variants={fADE_UP}
            className="text-neon/60 font-display font-black text-[10px] uppercase tracking-[0.5em] block mb-4"
          >
            Guidelines
          </motion.span>
          <motion.h1
            variants={rEVEAL_TEXT}
            className="text-6xl md:text-8xl font-display font-black text-white uppercase leading-[0.8] tracking-tighter"
          >
            Portfolio <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(212,255,106,1)' }}>Policies</span>
          </motion.h1>
        </header>

        <div className="grid gap-12">
          {sections.map((section, idx) => (
            <motion.div 
              key={idx}
              variants={fADE_UP}
              className="p-8 bg-olive/10 border border-neon/10 rounded-2xl"
            >
              <h3 className="text-neon font-display font-black text-xl uppercase mb-4 tracking-tighter">{section.title}</h3>
              <p className="text-off-white/70 font-display font-medium leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const CookiesPage = ({ onBack }: { onBack: () => void }) => {
  const { playClick, playHover, playWhoosh } = useSound();
  useEffect(() => {
    window.scrollTo(0, 0);
    playWhoosh();
  }, [playWhoosh]);

  const sections = [
    {
      title: "1. What Are Cookies",
      content: "Cookies are small text files stored on your device when you visit a website. They help improve your browsing experience and allow certain website features to function properly."
    },
    {
      title: "2. How I Use Cookies",
      content: "This website may use cookies to:\nEnsure the site works correctly\nImprove performance and user experience\nUnderstand how visitors interact with the site (analytics)"
    },
    {
      title: "3. Types of Cookies Used",
      content: "Essential Cookies: Required for basic website functionality\nPerformance Cookies: Help analyze website traffic and usage\nFunctional Cookies: Remember user preferences (if applicable)"
    },
    {
      title: "4. Third-Party Cookies",
      content: "Some features (such as embedded videos or analytics tools like Google Analytics) may use third-party cookies. These services have their own privacy policies."
    },
    {
      title: "5. Managing Cookies",
      content: "You can control or disable cookies through your browser settings. Note that disabling cookies may affect how the website functions."
    },
    {
      title: "6. Consent",
      content: "By using this website, you agree to the use of cookies as outlined in this policy."
    },
    {
      title: "7. Updates to This Policy",
      content: "This policy may be updated occasionally. Any changes will be reflected on this page."
    }
  ];

  return (
    <div className="min-h-screen bg-forest pt-32 pb-20 px-6">
      <BackgroundElements />
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={sTAGGER_CONTAINER}
        className="max-w-4xl mx-auto"
      >
        <motion.button
          variants={fADE_UP}
          onClick={() => { playClick(); onBack(); }}
          onMouseEnter={playHover}
          className="flex items-center gap-3 text-neon font-display font-black text-xs uppercase tracking-widest mb-16 hover:gap-5 transition-all group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" /> Back to Home
        </motion.button>

        <header className="mb-24 overflow-hidden">
          <motion.span
            variants={fADE_UP}
            className="text-neon/60 font-display font-black text-[10px] uppercase tracking-[0.5em] block mb-4"
          >
            Privacy
          </motion.span>
          <motion.h1
            variants={rEVEAL_TEXT}
            className="text-6xl md:text-8xl font-display font-black text-white uppercase leading-[0.8] tracking-tighter"
          >
            Cookies <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(212,255,106,1)' }}>Policy</span>
          </motion.h1>
        </header>

        <div className="grid gap-12">
          {sections.map((section, idx) => (
            <motion.div 
              key={idx}
              variants={fADE_UP}
              className="p-8 bg-olive/10 border border-neon/10 rounded-2xl"
            >
              <h3 className="text-neon font-display font-black text-xl uppercase mb-4 tracking-tighter">{section.title}</h3>
              <p className="text-off-white/70 font-display font-medium leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const SplashScreen = ({ onComplete }: { onComplete: () => void, key?: string }) => {
  const { playClick, playWhoosh } = useSound();
  
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      onClick={() => { playClick(); playWhoosh(); onComplete(); }}
      className="fixed inset-0 z-[1000] bg-forest flex flex-col items-center justify-center cursor-pointer overflow-hidden p-6"
    >
      <BackgroundElements />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center space-y-8"
      >
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            className="w-12 h-12 border border-neon/30 rounded-full mx-auto md:hidden flex items-center justify-center"
          >
            <div className="w-2 h-2 bg-neon rounded-full" />
          </motion.div>
          <p className="text-neon/60 font-display font-black text-[10px] md:text-xs uppercase tracking-[0.5em] leading-relaxed max-w-xs mx-auto text-center">
            i suggest you to view this on desktop to experience more effects and smoothness
          </p>
        </div>

        <motion.h2 
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-white font-display font-black text-xl md:text-2xl uppercase tracking-[0.3em] text-center"
        >
          tap anywhere to view
        </motion.h2>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-neon/5 rounded-full blur-[100px] -z-10" />
      </motion.div>

      {/* Decorative corners */}
      <div className="absolute top-10 left-10 w-4 h-4 border-t-2 border-l-2 border-neon/20" />
      <div className="absolute top-10 right-10 w-4 h-4 border-t-2 border-r-2 border-neon/20" />
      <div className="absolute bottom-10 left-10 w-4 h-4 border-b-2 border-l-2 border-neon/20" />
      <div className="absolute bottom-10 right-10 w-4 h-4 border-b-2 border-r-2 border-neon/20" />
    </motion.div>
  );
};

const ScrollIndicator = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <motion.div 
      style={{ opacity }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none"
    >
      <span className="text-[10px] font-display font-black text-neon/40 uppercase tracking-[0.3em]">Scroll</span>
      <div className="w-[1px] h-12 bg-neon/20 relative overflow-hidden">
        <motion.div 
          animate={{ 
            y: [-48, 48],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent via-neon to-transparent"
        />
      </div>
    </motion.div>
  );
};

const BackToTop = ({ hide }: { hide: boolean }) => {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const { playClick, playHover } = useSound();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsVisible(latest > 500);
    });
  }, [scrollY]);

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && !hide && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ 
            scale: 1.1, 
            boxShadow: "0 0 30px rgba(212, 255, 106, 0.4)",
            y: -5
          }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          onMouseEnter={playHover}
          className="fixed bottom-8 right-8 z-[100] p-4 bg-neon text-forest rounded-full shadow-2xl transition-all border border-neon/20 group"
          aria-label="Back to top"
        >
          <div className="relative">
             <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" strokeWidth={3} />
             <motion.div 
               animate={{ opacity: [0.5, 1, 0.5] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="absolute inset-0 bg-neon blur-md -z-10"
             />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const Reviews = () => {
  const { playClick, playSwipe, playHover } = useSound();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState<{ id: string, rating: number, comment: string, date: string }[]>([
    { id: '1', rating: 5, comment: "Absolutely insane edits! The flow and timing are perfect.", date: "2 hours ago" },
    { id: '2', rating: 4, comment: "Great work on the gaming montages.", date: "5 hours ago" }
  ]);
  const [animatingStar, setAnimatingStar] = useState<number | null>(null);

  const mcBlocks = [
    { label: 'Dirt', color: 'bg-[#795548]' },      // 1 Star
    { label: 'Stone', color: 'bg-[#9e9e9e]' },     // 2 Stars
    { label: 'Iron', color: 'bg-[#e0e0e0]' },      // 3 Stars
    { label: 'Gold', color: 'bg-[#ffd700]' },      // 4 Stars
    { label: 'Diamond', color: 'bg-[#00e5ff]' }    // 5 Stars
  ];

  const handleRating = (r: number) => {
    playClick();
    if (rating === r) {
      setRating(0);
    } else {
      setRating(r);
      setAnimatingStar(r);
      setTimeout(() => setAnimatingStar(null), 1000);
    }
  };

  const addReview = () => {
    if (!comment.trim() || rating === 0) return;
    playClick();
    const newReview = {
      id: Math.random().toString(36).substr(2, 9),
      rating,
      comment,
      date: 'Just now'
    };
    setReviews([newReview, ...reviews]);
    setComment('');
    setRating(0);
  };

  const deleteReview = (id: string) => {
    playSwipe();
    setReviews(reviews.filter(r => r.id !== id));
  };

  return (
    <section className="py-32 px-6 relative bg-forest/40">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-display font-black text-neon uppercase tracking-tighter mb-4">Reviews</h2>
          <p className="text-white/40 font-mono text-sm uppercase tracking-widest tracking-widest">Share your thoughts on my work</p>
        </div>

        <div className="bg-olive/40 border border-neon/10 rounded-[2rem] p-8 md:p-12 mb-12 backdrop-blur-md">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-center gap-4">
              <p className="text-white/60 font-black uppercase text-xs tracking-widest">Rate the experience</p>
              <div className="flex gap-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(star)}
                    onMouseEnter={playHover}
                    className="relative group h-12 w-12 flex items-center justify-center"
                  >
                    <AnimatePresence mode="wait">
                      {animatingStar === star ? (
                        <motion.div
                          key="block"
                          initial={{ scale: 0, rotate: -45 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 45 }}
                          className={cn(
                            "absolute inset-0 rounded-lg shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center p-1 border-2 border-black/20",
                            mcBlocks[star - 1].color
                          )}
                        >
                          <div className="w-full h-full border border-white/20 rounded-sm" />
                          <span className="absolute text-[8px] font-black uppercase text-black/40 pointer-events-none">
                            {mcBlocks[star - 1].label}
                          </span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="star"
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                        >
                          <Star 
                            className={cn(
                              "w-10 h-10 transition-colors",
                              star <= rating ? "fill-neon text-neon" : "text-white/10"
                            )} 
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Leave a comment..."
                className="w-full bg-forest/40 border border-neon/20 rounded-2xl p-6 text-white placeholder:text-white/10 focus:outline-none focus:border-neon transition-colors h-32 resize-none"
              />
              <button
                onClick={addReview}
                onMouseEnter={playHover}
                disabled={!comment.trim() || rating === 0}
                className="absolute bottom-4 right-4 bg-neon text-forest p-3 rounded-xl disabled:opacity-30 disabled:grayscale hover:scale-105 active:scale-95 transition-all shadow-xl"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 group hover:border-neon/30 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={cn("w-4 h-4", s <= review.rating ? "fill-neon text-neon" : "text-white/10")} />
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] uppercase font-mono text-white/20">{review.date}</span>
                    <button
                      onClick={() => deleteReview(review.id)}
                      onMouseEnter={playHover}
                      className="text-white/10 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{review.comment}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};

export default function App() {
  const [view, setView] = useState<'home' | 'portfolio' | 'contact' | 'testimonials' | 'terms' | 'policies' | 'cookies'>('home');
  const [showSplash, setShowSplash] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<{ src: string, title: string } | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ src: string, title: string } | null>(null);

  return (
    <div className="relative bg-forest overflow-x-hidden min-h-screen">
      <CursorParticles />
      {!showSplash && <Navbar onNavigate={setView} currentView={view} />}
      {!showSplash && <ScrollIndicator />}
      {!showSplash && <BackToTop hide={!!selectedVideo || !!selectedImage} />}
      
      <AnimatePresence>
        {selectedVideo && (
          <VideoModal 
            src={selectedVideo.src} 
            title={selectedVideo.title} 
            onClose={() => setSelectedVideo(null)} 
          />
        )}
        {selectedImage && (
          <ImageModal 
            src={selectedImage.src} 
            title={selectedImage.title} 
            onClose={() => setSelectedImage(null)} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />
        ) : view === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <BackgroundElements />
            <main>
              <Hero onNavigate={setView} />
              <Works />
              <About />
              <Gallery 
                onNavigate={setView} 
                onPlayVideo={setSelectedVideo} 
                onViewImage={setSelectedImage}
                isPaused={!!selectedVideo || !!selectedImage} 
              />
              <Contact onNavigate={setView} />
              <Reviews />
            </main>
            <Footer onNavigate={setView} />
          </motion.div>
        ) : view === 'portfolio' ? (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <PortfolioPage onBack={() => setView('home')} isPaused={!!selectedVideo} />
            <Footer onNavigate={setView} />
          </motion.div>
        ) : view === 'testimonials' ? (
          <motion.div
            key="testimonials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <TestimonialsPage onBack={() => setView('home')} />
            <Footer onNavigate={setView} />
          </motion.div>
        ) : view === 'terms' ? (
          <motion.div
            key="terms"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <TermsPage onBack={() => setView('home')} />
            <Footer onNavigate={setView} />
          </motion.div>
        ) : view === 'policies' ? (
          <motion.div
            key="policies"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <PoliciesPage onBack={() => setView('home')} />
            <Footer onNavigate={setView} />
          </motion.div>
        ) : view === 'cookies' ? (
          <motion.div
            key="cookies"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <CookiesPage onBack={() => setView('home')} />
            <Footer onNavigate={setView} />
          </motion.div>
        ) : (
          <motion.div
            key="contact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ContactPage onBack={() => setView('home')} />
            <Footer onNavigate={setView} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
