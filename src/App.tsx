import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Star, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft,
  ChevronRight,
  Lock, 
  Award, 
  Smile, 
  ShieldCheck, 
  Mail, 
  Send, 
  Sparkles, 
  Paintbrush, 
  Download, 
  Eye, 
  Smartphone, 
  FileText, 
  Users, 
  BookOpen, 
  Heart, 
  Printer, 
  Clock, 
  X,
  CreditCard,
  ShoppingBag,
  Play,
  Pause,
  Volume2,
  VolumeX
} from "lucide-react";

// Paths for the generated images relative to src/App.tsx
const sampleDrawings = "/src/assets/images/sample_drawings_1781528834316.jpg";
const safariAnimals = "/src/assets/images/coloring_safari_animals_1781533142384.jpg";
const patriciaAuthor = "https://i.ibb.co/ksn9RjZc/image.png";

// New high-quality cover image provided by the user
const userUploadedImage = "https://i.ibb.co/dwfMCYnB/image.png";
const userUploadedImageHeroes = "https://i.ibb.co/8nQbJ6Bz/image.png";
const userUploadedImagePrincesses = "https://i.ibb.co/BVVbq18R/image.png";

// URL ou arquivo de vídeo do Kit de Desenhos para Colorir.
const VIDEO_SOURCE = "https://i.imgur.com/N0cnZrn.mp4"; // Direct video from Imgur
const FALLBACK_VIDEO_SOURCE = "https://i.imgur.com/N0cnZrn.mp4";


// Custom themed coloring drawings for the carousel
const carouselDrawings = [
  {
    id: "sign_drawing",
    title: "Dia do Amigo",
    description: "Crianças segurando cartazes para o Dia do Amigo em traço limpo.",
    path: "https://i.ibb.co/6cwNtPYd/image.png",
    emoji: "👦",
    isLandscape: false
  },
  {
    id: "fathers_day_hero",
    title: "Herói Dia dos Pais",
    description: "Desenho fofo homenageando o pai como super-herói com capa.",
    path: "https://i.ibb.co/k6hPXHBK/image.png",
    emoji: "🦸‍♂️",
    isLandscape: true
  },
  {
    id: "fathers_day_monsters",
    title: "Feliz Dia dos Pais",
    description: "Linda homenagem para o Dia dos Pais pronta para colorir.",
    path: "https://i.ibb.co/dJkYk9Ls/image.png",
    emoji: "👨‍👦",
    isLandscape: true
  },
  {
    id: "happy_pig",
    title: "Porquinho na Poça",
    description: "Lindo porquinho feliz brincando e se divertindo para pintar.",
    path: "https://i.ibb.co/20ybT0zS/image.png",
    emoji: "🐷",
    isLandscape: true
  },
  {
    id: "drawing_new_1",
    title: "Dia dos Pais de Coração",
    description: "Lindo desenho infantil para festejar o Dia dos Pais.",
    path: "https://i.ibb.co/S75fmKHB/image.png",
    emoji: "❤️",
    isLandscape: true
  },
  {
    id: "drawing_new_2",
    title: "Abraço de Amigos",
    description: "Crianças se abraçando alegremente em traço limpo e divertido.",
    path: "https://i.ibb.co/Gv8Wz5QS/image.png",
    emoji: "🫂",
    isLandscape: false
  },
  {
    id: "drawing_new_3",
    title: "Super-Herói Protetor",
    description: "Desperte a imaginação colorindo heróis e aventuras.",
    path: "https://i.ibb.co/ym06ywF3/image.png",
    emoji: "🦸",
    isLandscape: true
  },
  {
    id: "drawing_new_5",
    title: "Especial Dia das Mães",
    description: "Cartão de homenagem super carinhosa desenhado com amor.",
    path: "https://i.ibb.co/PvJJ4n8q/image.png",
    emoji: "👩‍👧‍👦",
    isLandscape: false
  },
  {
    id: "drawing_new_6",
    title: "Fundo Divertido de Festa",
    description: "Alegria caipira e momentos festivos para colorir com giz de cera.",
    path: "https://i.ibb.co/VdrxjrK/image.png",
    emoji: "🌽",
    isLandscape: true
  },
  {
    id: "drawing_new_7",
    title: "Aventura no Safari",
    description: "Animais fofinhos da selva e savana prontos para imprimir.",
    path: "https://i.ibb.co/4ZRQh0DS/image.png",
    emoji: "🦒",
    isLandscape: false
  }
];

interface ThemeCard {
  title: string;
  image: string;
  emoji: string;
  badge: string;
  badgeColor: string;
  premiumOnly?: boolean;
  imageClassName?: string;
}

// High-quality Theme Cards with actual preview images
const themeCardsData: ThemeCard[] = [
  {
    title: "Festa Junina",
    image: "https://i.ibb.co/TDYhWCLq/Chat-GPT-Image-15-06-2026-12-53-27.png",
    emoji: "🎪",
    badge: "+100 Desenhos",
    badgeColor: "bg-pink-100 text-pink-700 font-bold"
  },
  {
    title: "Copa do Mundo",
    image: "https://i.ibb.co/6jmQ9Cm/Chat-GPT-Image-16-06-2026-11-16-11.png",
    emoji: "⚽",
    badge: "+100 Desenhos",
    badgeColor: "bg-yellow-100 text-yellow-700 font-bold"
  },
  {
    title: "Dia dos Pais",
    image: "https://i.ibb.co/0ygn5fCz/Chat-GPT-Image-15-06-2026-13-58-32.png",
    emoji: "👨‍👧",
    badge: "+100 Desenhos",
    badgeColor: "bg-indigo-100 text-indigo-700 font-bold"
  },
  {
    title: "Dia das Crianças",
    image: "https://i.ibb.co/B5P2n3tb/Chat-GPT-Image-15-06-2026-14-02-01.png",
    emoji: "🎈",
    badge: "+100 Desenhos",
    badgeColor: "bg-orange-100 text-orange-700 font-bold"
  },
  {
    title: "Halloween",
    image: "https://i.ibb.co/hJ0n0LKF/image.png",
    emoji: "🎃",
    badge: "+100 Desenhos",
    badgeColor: "bg-purple-100 text-purple-700 font-bold"
  },
  {
    title: "Natal",
    image: "https://i.ibb.co/NgsyDhKC/Chat-GPT-Image-15-06-2026-14-03-14.png",
    emoji: "🎄",
    badge: "+100 Desenhos",
    badgeColor: "bg-green-100 text-green-700 font-bold"
  },
  {
    title: "Páscoa",
    image: "https://i.ibb.co/7t9W7nQH/Chat-GPT-Image-15-06-2026-14-06-27.png",
    emoji: "🐣",
    badge: "+100 Desenhos",
    badgeColor: "bg-rose-100 text-rose-700 font-bold"
  },
  {
    title: "Dia das Mães",
    image: "https://i.ibb.co/bRWvYSw8/Chat-GPT-Image-15-06-2026-12-46-16.png",
    emoji: "💐",
    badge: "+100 Desenhos",
    badgeColor: "bg-pink-100 text-pink-700 font-bold"
  },
  {
    title: "Temas Bíblicos",
    image: "https://i.ibb.co/mwMVv0h/Chat-GPT-Image-15-06-2026-14-10-55.png",
    emoji: "⛪",
    badge: "+100 Desenhos",
    badgeColor: "bg-amber-100 text-amber-700 font-bold"
  },
  {
    title: "Animais",
    image: userUploadedImage,
    emoji: "🦁",
    badge: "+100 Desenhos",
    badgeColor: "bg-emerald-100 text-emerald-700 font-bold"
  },
  {
    title: "Heróis para Colorir",
    image: userUploadedImageHeroes,
    emoji: "🦸‍♂️",
    badge: "+100 Desenhos",
    badgeColor: "bg-blue-100 text-blue-700 font-bold",
    premiumOnly: true
  },
  {
    title: "Princesas e Personagens Encantados",
    image: userUploadedImagePrincesses,
    emoji: "👑",
    badge: "+100 Desenhos",
    badgeColor: "bg-purple-100 text-purple-700 font-bold",
    premiumOnly: true
  },
  {
    title: "Animes",
    image: "https://i.ibb.co/Kz7WysHH/Chat-GPT-Image-17-06-2026-23-36-26.png",
    emoji: "🇯🇵",
    badge: "+100 Desenhos",
    badgeColor: "bg-red-100 text-red-700 font-bold",
    premiumOnly: true
  },
  {
    title: "Carros",
    image: "https://i.ibb.co/fzrPqLgF/Chat-GPT-Image-17-06-2026-23-39-08.png",
    emoji: "🚗",
    badge: "+100 Desenhos",
    badgeColor: "bg-amber-100 text-amber-750 font-bold",
    premiumOnly: true
  },
  {
    title: "Profissões",
    image: "https://i.ibb.co/bcwnCDd/Chat-GPT-Image-17-06-2026-23-52-44.png",
    emoji: "💼",
    badge: "+100 Desenhos",
    badgeColor: "bg-teal-100 text-teal-700 font-bold",
    premiumOnly: true
  }
];

// Testimonials data
const testimonials = [
  {
    name: "Carolina M.",
    role: "",
    rating: 5,
    comment: "Mano, na moral, esse kit é bom demais e salvou a pátria aqui na escola! Os desenhos são daquele jeito, com traço perfeitinho e de primeira. A molecada pira e não quer saber de outra coisa. Economizou um trampo do caramba para os nossos professores no planejamento diario!",
    avatar: "https://i.ibb.co/KzpkB3ZF/image.png"
  },
  {
    name: "Letícia S.",
    role: "",
    rating: 5,
    comment: "Gente, que parada sensacional! Eu perdia uma cara catando desenho borrado e podre no Google, mó perrengue. Agora com tudo organizadinho no Drive é facinho, só o filé: abro o celular, escolho o tema e coloco para rodar na impressora sem estresse!",
    avatar: "https://i.ibb.co/v4Wtnqk0/image.png"
  },
  {
    name: "Beatriz F.",
    role: "",
    rating: 5,
    comment: "Na boa, esse kit é top pra caramba! Em dia de chuva a gente ficava doida com as crianças grudadas na tela, mas agora o bagulho mudou. Eles passam horas pintando. O acesso imediato no Drive ajuda muito a imprimir na hora, sem frescura nenhuma!",
    avatar: "https://i.ibb.co/20RKX8xt/image.png"
  }
];

// FAQ data
const faqItems = [
  {
    question: "Como receberei o material adquirido?",
    answer: "O envio do material é realizado de forma imediata e totalmente automatizada. Logo após a confirmação do pagamento, você receberá um e-mail com as instruções e o link de acesso exclusivo para a nossa pasta no Google Drive. Todos os arquivos encontram-se estruturados em formato PDF de modo a facilitar a sua localização."
  },
  {
    question: "É necessário instalar algum aplicativo ou programa para abrir os arquivos?",
    answer: "Não, nenhum tipo de instalação ou software adicional é necessário. Todos os desenhos estão formatados em arquivos PDF de alta definição, os quais podem ser abertos e visualizados diretamente através de qualquer navegador de internet em computadores, smartphones ou tablets."
  },
  {
    question: "Há um limite diário ou mensal para a quantidade de impressões?",
    answer: "Não há qualquer tipo de limitação para a impressão. Uma vez adquirido, o acesso ao acervo é permanente e vitalício. Você poderá realizar o download e efetuar a impressão dos desenhos quantas vezes julgar necessário para uso pessoal, pedagógico ou familiar."
  },
  {
    question: "Para qual faixa etária os desenhos são recomendados?",
    answer: "O acervo foi pedagogicamente desenvolvido para atender crianças de 2 a 10 anos de idade. Disponibilizamos tanto ilustrações com traços simplificados e contornos mais espessos (ideais para o desenvolvimento psicomotor e coordenação motora inicial na primeira infância) quanto cenários detalhados e complexos, próprios para o engajamento de crianças em idade escolar mais avançada."
  },
  {
    question: "Será cobrada alguma taxa adicional por futuras atualizações ou novos conteúdos?",
    answer: "Não, não haverá nenhuma cobrança adicional. O seu acesso é vitalício e definitivo. Todas as eventuais expansões de conteúdo, novos desenhos e materiais extras adicionados posteriormente no Google Drive estarão disponíveis automaticamente de forma totalmente gratuita."
  },
  {
    question: "Quais são os métodos de pagamento disponibilizados?",
    answer: "Estão disponíveis os pagamentos por meio de Pix e Cartão de Crédito. A confirmação de transações realizadas via Pix ocorre de maneira quase instantânea, liberando o acesso em poucos minutos. Para pagamentos no cartão de crédito, o envio do e-mail de acesso ocorre imediatamente após a autorização da respectiva operadora de crédito."
  },
  {
    question: "É permitida a comercialização ou compartilhamento dos arquivos e impressões?",
    answer: "O direito de uso concedido é de caráter estritamente pessoal, familiar ou pedagógico (uso com alunos em salas de aula ou pacientes em atendimentos clínicos). É terminantemente proibida a revenda de qualquer arquivo em formato digital, bem como a distribuição em grupos abertos de compartilhamento ou a comercialização física dos desenhos impressos."
  }
];

// Live buys simulation texts
const liveBuys = [
  { text: "✅ Maria S. comprou o Kit Premium agora", time: "Há poucos segundos", isPremium: true },
  { text: "✅ Carolina M. comprou o Kit Básico há 3 minutos", time: "Há 3 minutos", isPremium: false },
  { text: "✅ Letícia S. garantiu o Premium com desconto", time: "Há 1 minuto", isPremium: true },
  { text: "✅ Ana Paula S. acabou de receber o acesso no Gmail", time: "Há poucos segundos", isPremium: false },
  { text: "✅ Beatriz F. garantiu o Kit Premium agora", time: "Há 2 minutos", isPremium: true },
  { text: "✅ Juliana M. comprou o Kit Premium agora", time: "Há 4 minutos", isPremium: true },
];

export default function App() {
  // States
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showUpsell, setShowUpsell] = useState(false);
  const [showPremiumCheckout, setShowPremiumCheckout] = useState(false);
  const [premiumCheckoutStep, setPremiumCheckoutStep] = useState<"details" | "simulated">("details");
  const [currentBuyToast, setCurrentBuyToast] = useState(0);
  const [showToast, setShowToast] = useState(true);
  const [showMobileSticky, setShowMobileSticky] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Video States
  const [videoPlaying, setVideoPlaying] = useState(true); // default autoplays
  const [videoMuted, setVideoMuted] = useState(false); // default unmuted with sound
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleMuteVideo = () => {
    if (videoRef.current) {
      const nextMute = !videoMuted;
      videoRef.current.muted = nextMute;
      setVideoMuted(nextMute);
    }
  };

  // Autoplay video on mount (with automatic interactive unlock for unmuted audio)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      setVideoMuted(false);
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setVideoPlaying(true);
          })
          .catch((err) => {
            console.warn("Unmuted autoplay restricted by browser, trying muted autoplay:", err);
            // Fallback to muted playing if unmuted is rejected by the browser
            if (videoRef.current) {
              videoRef.current.muted = true;
              setVideoMuted(true);
              videoRef.current.play()
                .then(() => {
                  setVideoPlaying(true);
                })
                .catch((mutedErr) => {
                  console.error("Muted fallback also failed:", mutedErr);
                  setVideoPlaying(false);
                });
            }
          });
      }
    }

    // Set up a window-level interaction event listener to automatically unmute the video 
    // when the user interacts with the page. Browsers allow audio output post-interaction.
    const handleFirstGesture = () => {
      if (videoRef.current) {
        // If it's currently muted, unmute it, sync the state, and play.
        if (videoRef.current.muted) {
          videoRef.current.muted = false;
          setVideoMuted(false);
          videoRef.current.play()
            .then(() => setVideoPlaying(true))
            .catch((err) => console.log("Failed playing unmuted on user gesture:", err));
        }
      }
      // Clean up after first interaction
      window.removeEventListener("pointerdown", handleFirstGesture, true);
      window.removeEventListener("click", handleFirstGesture, true);
      window.removeEventListener("touchstart", handleFirstGesture, true);
      window.removeEventListener("scroll", handleFirstGesture, true);
    };

    window.addEventListener("pointerdown", handleFirstGesture, true);
    window.addEventListener("click", handleFirstGesture, true);
    window.addEventListener("touchstart", handleFirstGesture, true);
    window.addEventListener("scroll", handleFirstGesture, true);

    return () => {
      window.removeEventListener("pointerdown", handleFirstGesture, true);
      window.removeEventListener("click", handleFirstGesture, true);
      window.removeEventListener("touchstart", handleFirstGesture, true);
      window.removeEventListener("scroll", handleFirstGesture, true);
    };
  }, []);

  // IntersectionObserver to pause the video when scrolled down past/out of view
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          videoElement.pause();
          setVideoPlaying(false);
        }
      },
      {
        threshold: 0.1, // trigger when less than 10% of the video is visible
      }
    );

    observer.observe(videoElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  const togglePlayVideo = () => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.pause();
        setVideoPlaying(false);
      } else {
        videoRef.current.play().then(() => {
          setVideoPlaying(true);
        }).catch((err) => {
          console.warn("Autoplay block or playback error: ", err);
          setVideoPlaying(false);
        });
      }
    }
  };

  // Resume autoplay helper after manual navigation/inactivity
  const resetAutoplayTimer = () => {
    setIsAutoplay(false);
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
    }
    autoplayTimeoutRef.current = setTimeout(() => {
      setIsAutoplay(true);
    }, 5000); // Resumes after 5 seconds of inactivity
  };

  // Auto-scroll carousel drawings every 3 seconds
  useEffect(() => {
    if (!isAutoplay) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselDrawings.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isAutoplay]);

  // Clean up autoplay timeout on unmount
  useEffect(() => {
    return () => {
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }
    };
  }, []);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % carouselDrawings.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + carouselDrawings.length) % carouselDrawings.length);
  };

  // Rotate social proof toast notifications
  useEffect(() => {
    const toastInterval = setInterval(() => {
      setShowToast(false);
      setTimeout(() => {
        setCurrentBuyToast((prev) => (prev + 1) % liveBuys.length);
        setShowToast(true);
      }, 500);
    }, 9000);

    return () => clearInterval(toastInterval);
  }, []);

  // Display mobile bottom bar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowMobileSticky(true);
      } else {
        setShowMobileSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToPlans = (e: React.MouseEvent) => {
    e.preventDefault();
    const plansSection = document.getElementById("planos-compra");
    if (plansSection) {
      const yOffset = 120; // Scrolls beautifuly past the title directly onto the plan cards
      const y = plansSection.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleScrollToBasic = (e: React.MouseEvent) => {
    e.preventDefault();
    const basicPlan = document.getElementById("plano-basico");
    if (basicPlan) {
      const yOffset = -100; // beautiful safety offset to center the element below the fixed top header
      const y = basicPlan.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      const plansSection = document.getElementById("planos-compra");
      if (plansSection) {
        const yOffset = 120;
        const y = plansSection.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  const openUpsellPopup = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setShowUpsell(true);
  };

  return (
    <div className="min-h-screen relative flex flex-col font-sans select-none antialiased bg-white overflow-hidden text-slate-800">
      
      {/* Background Decorative Gradient Blur Elements */}
      <div className="absolute top-[-100px] left-[-100px] w-80 h-80 bg-blue-200 rounded-full blur-[100px] opacity-40 pointer-events-none z-0"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-pink-200 rounded-full blur-[100px] opacity-40 pointer-events-none z-0"></div>
      <div className="absolute top-[30%] right-[-120px] w-96 h-96 bg-purple-200 rounded-full blur-[120px] opacity-30 pointer-events-none z-0"></div>
      <div className="absolute bottom-[20%] left-[-120px] w-80 h-80 bg-blue-200 rounded-full blur-[100px] opacity-35 pointer-events-none z-0"></div>

      {/* 1. Bar of Urgency at Top */}
      <div className="fixed top-0 left-0 w-full bg-[#ef4444] text-white text-center py-2.5 px-4 font-bold text-xs sm:text-sm tracking-wide z-50 shadow-md flex flex-col items-center justify-center">
        <span className="uppercase tracking-widest font-black">PROMOÇÃO VÁLIDA ATÉ HOJE!</span>
        <span className="text-[10px] sm:text-xs opacity-90 tracking-wider">ACESSO IMEDIATO</span>
      </div>
      {/* Spacer so content doesn't get hidden under the fixed top bar */}
      <div className="h-[60px] sm:h-[68px]"></div>

      {/* 2. Hero Section */}
      <header className="relative bg-white pt-8 pb-16 sm:pb-24 overflow-hidden z-10">
        {/* Playful Floating Circles/Bubbles for Infant Atmosphere */}
        <div className="absolute top-12 left-6 w-12 h-12 bg-blue-300 rounded-full opacity-30 animate-float"></div>
        <div className="absolute top-24 right-10 w-24 h-24 bg-pink-300 rounded-full opacity-20 animate-float-delayed"></div>
        <div className="absolute bottom-10 left-20 w-16 h-16 bg-blue-300 rounded-full opacity-30 animate-float"></div>
        <div className="absolute bottom-24 right-4 w-12 h-12 bg-yellow-300 rounded-full opacity-25 animate-float-delayed"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
          
          {/* Centered Headline */}
          <h1 id="hero-title" className="font-display font-black text-center text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-[1.1] tracking-tight drop-shadow-sm max-w-3xl">
            Mais de <strong className="text-green-600 font-extrabold">1.500 Desenhos</strong> para <span className="text-green-600 font-extrabold">Colorir</span> Prontos para <strong>Imprimir</strong>
          </h1>

          {/* Video Player Mockup Directly Under Headline */}
          <div className="w-full flex flex-col items-center justify-center mt-10 relative z-10 animate-float-delayed">
            <div className="w-full max-w-[280px] sm:max-w-[340px] flex flex-col">
              <div className="relative aspect-[9/16] w-full bg-slate-900 rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45)] overflow-hidden border-[8px] border-slate-950 transition-all duration-300 hover:scale-[1.02] group">
                
                {/* Selfie camera notch/island simulation for premium smartphone look */}
                <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-slate-950 rounded-full z-30 flex items-center justify-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-slate-800 rounded-full"></div>
                  <div className="w-1 h-1 bg-slate-900 rounded-full"></div>
                </div>

                <video
                  ref={videoRef}
                  src={VIDEO_SOURCE}
                  poster="https://i.imgur.com/N0cnZrn.jpg"
                  autoPlay
                  loop
                  muted={videoMuted}
                  playsInline
                  className="w-full h-full object-cover relative z-10 cursor-pointer"
                  onClick={togglePlayVideo}
                />

                {/* Custom Overlay Controls */}
                <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 pointer-events-none">
                  <div className="flex justify-between items-start w-full">
                    <div></div>
                  </div>

                  {/* Play/Pause Button overlay - appearing on hover/state */}
                  <div className="absolute inset-0 flex items-center justify-center z-25">
                    <button
                      onClick={togglePlayVideo}
                      className={`pointer-events-auto w-14 h-14 bg-white/95 text-slate-900 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none ${!videoPlaying ? "opacity-100 scale-100" : "opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"}`}
                      aria-label={videoPlaying ? "Pausar Vídeo" : "Reproduzir Vídeo"}
                    >
                      {videoPlaying ? (
                        <Pause className="w-6 h-6 fill-slate-900 stroke-none" />
                      ) : (
                        <Play className="w-6 h-6 fill-slate-900 stroke-none ml-0.5" />
                      )}
                    </button>
                  </div>

                  {/* Bottom Bar with bottom-left Mute Toggle inside the player */}
                  <div className="w-full flex justify-between items-end relative z-25">
                    <button
                      type="button"
                      onClick={toggleMuteVideo}
                      className="pointer-events-auto flex items-center justify-center w-8 h-8 rounded-full bg-slate-950/75 hover:bg-slate-950 text-white shadow-md transition-all duration-150 cursor-pointer focus:outline-none active:scale-90 border border-white/10"
                      aria-label={videoMuted ? "Ativar Áudio" : "Silenciar"}
                      title={videoMuted ? "Ativar Som" : "Silenciar"}
                    >
                      {videoMuted ? (
                        <VolumeX className="w-4 h-4 text-rose-400 stroke-[2.5]" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-green-400 stroke-[2.5]" />
                      )}
                    </button>
                    <div></div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Main Button with original function and smooth bounce Directly Under Video */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 w-full max-w-md relative z-10">
            <a 
              href="#plano-basico" 
              onClick={handleScrollToBasic}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-display font-black text-center text-xl sm:text-2xl px-12 py-5 rounded-2xl shadow-[0_10px_30px_rgba(22,163,74,0.4)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 border-b-4 border-green-800 animate-bounce"
              style={{ animationDuration: "2.5s" }}
            >
              QUERO MEU KIT AGORA
            </a>
          </div>

        </div>
      </header>

      {/* 3. Beautiful Infinite Scrolling Carousel Showcase Band (Relocated Below Hero) */}
      <section className="py-12 bg-slate-50 border-y border-slate-100 select-none overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 tracking-tight uppercase">
            VEJA ALGUNS EXEMPLOS DO MATERIAL
          </h2>
        </div>

        <style>{`
          @keyframes marquee {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          .animate-marquee-slow {
            animation: marquee 25s linear infinite;
          }
          .animate-marquee-slow:hover {
            animation-play-state: paused;
          }
        `}</style>
        
        <div className="relative w-full overflow-hidden py-2">
          <div 
            className="flex gap-4 w-max animate-marquee-slow" 
            title="Passe o mouse para pausar a visualização"
          >
            {[...carouselDrawings, ...carouselDrawings].map((drawing, idx) => (
              <div 
                 key={`${drawing.id}-${idx}`}
                 className="w-[180px] sm:w-[220px] aspect-[3/4] bg-white rounded-2xl shadow-[0_12px_24px_-10px_rgba(0,0,0,0.1)] border border-slate-200/80 flex items-center justify-center flex-shrink-0 relative group/card transition-all duration-200 hover:scale-105 hover:-translate-y-1 overflow-hidden"
              >
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl p-2 bg-white">
                  {drawing.isLandscape ? (
                    <div className={`absolute w-[133.33%] h-[75%] top-[12.5%] left-[-16.67%] ${drawing.id === "drawing_new_4" ? "-rotate-90" : "rotate-90"} flex items-center justify-center`}>
                      <img 
                        src={drawing.path} 
                        alt={`Desenho para colorir: ${drawing.title}`} 
                        className="w-full h-full object-contain pointer-events-none"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ) : (
                    <img 
                      src={drawing.path} 
                      alt={`Desenho para colorir: ${drawing.title}`} 
                      className="w-full h-full object-contain pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
                {/* Premium subtle light reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none rounded-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Themes Sections (Sub-folders inside drive) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-green-600 font-display font-medium text-sm px-4 py-1.5 bg-green-50 rounded-full border border-green-200">
              📂 Conteúdo Super Organizado
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-display font-bold text-slate-900">
              Todas as 15 temáticas inclusas em pastas organizadas
            </h2>
            <p className="mt-3 text-slate-600">
              Você não vai receber arquivos bagunçados. Tudo está dividido por temas e datas importantes dentro do seu Google Drive para achar em segundos!
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {themeCardsData.map((theme, idx) => (
              <div 
                key={idx} 
                className={`p-3 rounded-2xl border-2 shadow-sm flex flex-col justify-between items-center text-center transform hover:scale-105 hover:shadow-lg transition-all duration-300 group relative ${
                  theme.premiumOnly 
                    ? "border-amber-400 bg-gradient-to-b from-amber-50/10 to-amber-100/5 hover:border-amber-500 hover:shadow-amber-100/50" 
                    : "border-green-500 bg-white"
                }`}
              >
                {/* Thumbnail Container */}
                <div className="w-full aspect-square bg-slate-50 rounded-xl overflow-hidden relative border border-slate-100 flex items-center justify-center p-1 shadow-inner group-hover:bg-green-50/20 transition-colors">
                  <img 
                    src={theme.image} 
                    alt={theme.title} 
                    className={`max-w-full max-h-full object-contain rounded-lg drop-shadow-sm pointer-events-none transition-transform duration-355 group-hover:scale-105 ${theme.imageClassName || ""}`}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src.includes("ibb.co") && target.src.endsWith(".png")) {
                        target.src = target.src.replace(".png", ".jpg");
                      } else if (target.src.includes("ibb.co") && target.src.endsWith(".jpg")) {
                        target.src = target.src.replace(".jpg", ".png");
                      }
                    }}
                  />
                  {/* Floating emoji in the corner */}
                  <span className="absolute top-1.5 right-1.5 bg-white/95 backdrop-blur-xs w-8 h-8 rounded-full flex items-center justify-center text-lg shadow-sm border border-slate-100">
                    {theme.emoji}
                  </span>
                  {/* Premium overlay banner */}
                  {theme.premiumOnly && (
                    <span className="absolute top-1.5 left-1.5 bg-amber-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-md shadow-xs flex items-center gap-0.5 uppercase tracking-wider">
                      👑 Premium
                    </span>
                  )}
                </div>
                
                {/* Text & badge */}
                <div className="mt-3 flex flex-col items-center flex-grow justify-between w-full">
                  <span className="font-display font-bold text-sm text-slate-800 leading-tight group-hover:text-green-700 transition-colors min-h-[2.5rem] flex items-center justify-center text-center">
                    {theme.title}
                  </span>
                  <div className="flex flex-col items-center gap-1 mt-2">
                    <span className={`text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full inline-block shadow-xs border border-black/5 ${theme.badgeColor}`}>
                      {theme.badge}
                    </span>
                    {theme.premiumOnly && (
                      <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 shadow-3xs uppercase tracking-wider flex items-center gap-0.5">
                        ⭐ Plano Premium
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. Section of Pricing Plans with checkout triggers */}
      <section id="planos-compra" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-green-600 font-display font-bold text-sm bg-green-50 px-4 py-1.5 rounded-full border border-green-200">
              🏷️ Escolha a Sua Opção
            </span>
            <h2 id="planos" className="mt-4 text-3xl sm:text-4xl font-display font-bold text-slate-900">
              Selecione o plano ideal e comece em instantes
            </h2>
            <p className="mt-3 text-slate-600">
              Nossa promoção é por tempo extremamente limitado. Selecione um dos kits abaixo e garanta o acesso vitalício com todos os bônus!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            
            {/* PLAN CARD 1: Kit Básico with Immersive UI details */}
            <div 
              id="plano-basico"
              className="group text-left p-8 rounded-3xl bg-white border-2 border-slate-200 hover:border-green-400 transition-all flex flex-col justify-between relative shadow-xl hover:shadow-2xl scroll-mt-28"
            >
              <div>
                <div className="flex justify-between items-start">
                  <span className="font-display font-black text-xs text-green-600 uppercase tracking-widest bg-green-50 px-2.5 py-1 rounded-full mb-3">
                    KIT BÁSICO
                  </span>
                  <div className="text-right">
                    <span className="text-slate-400 text-xs line-through block italic">R$ 99,99</span>
                    <span className="bg-red-50 text-red-600 text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider block mt-1 animate-pulse">
                      90% de Desconto
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mb-4">Pacote compacto estruturado para pequenas demandas</p>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 font-display flex flex-col justify-start gap-1 pb-4 border-b border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-bold text-slate-400">R$</span>10,00
                  </div>
                  <span className="text-[11px] text-green-600 font-bold block mt-1">
                    💸 Você economiza R$ 89,99 hoje!
                  </span>
                </div>
                
                <ul className="text-xs space-y-2.5 mt-6 text-slate-650 font-medium">
                  <li className="flex items-center gap-2 text-slate-700">
                    <span className="text-green-500 font-bold">✔</span> <strong>+1.000 desenhos</strong> de alta qualidade
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <span className="text-green-500 font-bold">✔</span> <strong>10 temáticas completas</strong> e variadas
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <span className="text-green-500 font-bold">✔</span> Acesso imediato no seu e-mail
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <span className="text-green-500 font-bold">✔</span> Download Vitalício (Pasta organizada no Drive)
                  </li>
                </ul>
 
                {/* Info block mirroring the requested e-mail access visual */}
                <div className="mt-5 p-4 bg-green-50/50 border border-green-200 rounded-2xl flex items-start gap-3">
                  <Mail className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[11px] font-black tracking-wider text-green-800 uppercase font-sans">
                      Acesso entregue via e-mail!
                    </h4>
                    <p className="text-[10px] text-slate-600 font-medium leading-relaxed mt-1">
                      Você receberá o link para baixar tudo diretamente no seu e-mail cadastrado imediatamente após a confirmação do pagamento.
                    </p>
                  </div>
                </div>
              </div>
 
              <div className="mt-8 w-full">
                <button 
                  type="button"
                  onClick={() => setShowUpsell(true)}
                  className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3.5 rounded-xl font-bold text-xs uppercase shadow-md hover:scale-101 transform active:scale-95 transition-all font-sans cursor-pointer"
                >
                  Quero o Kit Básico por R$ 10,00
                </button>
                <span className="text-[10px] text-center text-slate-400 block mt-2.5">🔒 Transação segura e link enviado imediatamente</span>
              </div>
            </div>
 
            {/* PLAN CARD 2: Kit Premium (Best Seller & Immersive UI Masterpiece) */}
            <div className="p-8 rounded-3xl bg-[#fdfdfd] text-slate-800 relative overflow-hidden border-4 border-green-500 shadow-2xl flex flex-col justify-between transform scale-102 lg:scale-105 z-10">
              {/* Best seller Banner badge */}
              <div className="absolute top-0 right-0 bg-green-600 text-white px-4 py-1.5 text-[10px] font-black rounded-bl-xl uppercase tracking-wider">
                Mais Vendido
              </div>
 
              <div>
                <div className="mb-4">
                  <div className="flex justify-between items-start">
                    <p className="text-xs text-green-600 font-black uppercase tracking-widest">KIT PREMIUM COMPLETO</p>
                    <div className="text-right">
                      <span className="text-slate-400 text-xs line-through block italic">R$ 197,00</span>
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider block mt-1">
                        86% de Desconto
                      </span>
                    </div>
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-slate-900 font-display flex flex-col justify-start gap-1 pb-4 border-b border-slate-100 mt-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-slate-400">R$</span>27,00
                    </div>
                    <span className="text-[11px] text-green-700 font-bold block mt-1">
                      🔥 Você economiza R$ 170,00 hoje!
                    </span>
                  </div>
                </div>
                
                <ul className="text-[11px] sm:text-xs space-y-3 pt-4 text-slate-700">
                  <li className="flex items-center gap-2"><span className="text-green-600">✔</span> <strong>+1.500 desenhos</strong> de alta definição</li>
                  <li className="flex items-center gap-2"><span className="text-green-600">✔</span> <strong>15 temáticas exclusivas</strong></li>
                  <li className="flex items-center gap-2"><span className="text-green-600">✔</span> Acesso permanentemente vitalício no Google Drive</li>
                  <li className="flex items-center gap-2"><span className="text-green-600">✔</span> PDF pronto para imprimir no tamanho A4</li>
                </ul>
 
                {/* SUPER BONUS PANEL POPPING OUT */}
                <div className="my-5 p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 shadow-sm relative group">
                  <div className="absolute -top-3 left-4 bg-amber-500 text-white font-display text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-white fill-current animate-pulse-slow shrink-0" />
                    Super Bônus Inclusos!
                  </div>
                  
                  <ul className="mt-1 space-y-2 text-slate-800 text-[11px] font-bold">
                    <li className="flex items-center gap-1.5">
                      <span className="text-amber-500 shrink-0">🎁</span> 
                      <span>Kit Princesas <span className="text-[10px] text-amber-700 font-normal opacity-90">(+100 desenhos)</span></span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-amber-500 shrink-0">🎁</span> 
                      <span>Kit Heróis <span className="text-[10px] text-amber-700 font-normal opacity-90">(+100 desenhos)</span></span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-amber-500 shrink-0">🎁</span> 
                      <span>Kit Animes <span className="text-[10px] text-amber-700 font-normal opacity-90">(+100 desenhos)</span></span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-amber-500 shrink-0">🎁</span> 
                      <span>Kit Carros <span className="text-[10px] text-amber-700 font-normal opacity-90">(+100 desenhos)</span></span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-amber-500 shrink-0">🎁</span> 
                      <span>Kit Profissões <span className="text-[10px] text-amber-700 font-normal opacity-90">(+100 desenhos)</span></span>
                    </li>
                  </ul>
                </div>
 
                {/* PROMINENT EMAIL ESCORT */}
                <div className="mt-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex gap-2.5 items-start">
                  <Mail className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-display font-black text-xs text-emerald-800 uppercase tracking-wide">Acesso Entregue via E-mail!</p>
                    <p className="text-[10px] text-slate-600 mt-0.5 font-sans leading-relaxed">Você receberá o link para baixar tudo diretamente no seu e-mail cadastrado imediatamente após a confirmação do pagamento.</p>
                  </div>
                </div>
              </div>
 
              <div className="mt-8">
                <a 
                  href="https://pay.wiapy.com/bFiA7MC0-Ic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-4 rounded-xl font-black text-sm uppercase transition-colors shadow-lg font-display font-sans hover:scale-101 transform active:scale-95 transition-transform animate-bounce-subtle"
                >
                  Quero o Kit Premium por R$ 27,00
                </a>
                <span className="text-[10px] text-center text-slate-500 block mt-2.5">🔒 Compra segura e acesso entregue no ato da confirmação</span>
              </div>
            </div>

          </div>





        </div>
      </section>

      {/* 8. Section "Como você vai receber?" */}
      <section className="py-16 bg-white border-t border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-green-600 font-display font-bold text-sm tracking-wider uppercase">Fácil e Sem Segredos</span>
            <h2 className="mt-2 text-3xl font-display font-bold text-slate-900">
              Como você vai receber o material?
            </h2>
            <p className="mt-2 text-slate-600">
              O processo é imediato e seguro, idealizado para sua melhor comodidade e uso.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-green-500 flex flex-col items-center text-center relative">
              <div className="absolute -top-4 bg-green-600 text-white font-display font-bold text-lg w-10 h-10 rounded-full flex items-center justify-center shadow-md">
                1
              </div>
              <span className="text-4xl mt-4 mb-3">🛒</span>
              <h3 className="font-display font-bold text-lg text-slate-800">Escolha seu kit</h3>
              <p className="mt-2 text-slate-500 text-xs leading-relaxed">
                Role até abaixo, analise o Kit Básico e Kit Premium e escolha qual atende melhor ao seu volume ou orçamento e clique para prosseguir.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-green-500 flex flex-col items-center text-center relative">
              <div className="absolute -top-4 bg-green-600 text-white font-display font-bold text-lg w-10 h-10 rounded-full flex items-center justify-center shadow-md">
                2
              </div>
              <span className="text-4xl mt-4 mb-3">✍️</span>
              <h3 className="font-display font-bold text-lg text-slate-800">Insira seus Dados</h3>
              <p className="mt-2 text-slate-500 text-xs leading-relaxed">
                Na página de checkout, preencha o seu e-mail do Gmail corretamente e realize o pagamento via Pix ou Cartão para aprovação instantânea.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-green-500 flex flex-col items-center text-center relative">
              <div className="absolute -top-4 bg-green-600 text-white font-display font-bold text-lg w-10 h-10 rounded-full flex items-center justify-center shadow-md">
                3
              </div>
              <span className="text-4xl mt-4 mb-3">📂</span>
              <h3 className="font-display font-bold text-lg text-slate-800">Acesso via Drive</h3>
              <p className="mt-2 text-slate-500 text-xs leading-relaxed">
                Você receberá um e-mail contendo o link exclusivo de pasta do Google Drive. Salve-o nos favoritos e comece a imprimir as suas pastas!
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Section "Para quem é esse kit?" */}
      <section className="py-16 bg-white text-slate-800 relative border-t border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-green-600 font-display font-bold text-xs uppercase tracking-widest bg-green-50 px-3 py-1.5 rounded-full border border-green-200">Para Quem Serve?</span>
            <h2 className="mt-4 text-3xl font-display font-bold text-slate-900">Afinal, para quem é esse kit de desenhos?</h2>
            <p className="mt-3 text-slate-650">
              Ideal para quem quer economizar tempo e ter atividades prontas para usar com crianças em casa, na escola ou no reforço.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Audience 1: Professoras */}
            <div className="bg-white p-6 rounded-2xl border-2 border-green-500 shadow-sm">
              <div className="w-12 h-12 bg-pink-50 text-pink-500 rounded-xl flex items-center justify-center text-xl font-bold mb-4 font-display border border-pink-100">
                👩‍🏫
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900">Professoras</h3>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                Deixe de planejar aulas até tarde. Tenha em mãos as melhores apostilas temáticas educativas organizadas e formate suas aulas em minutos.
              </p>
            </div>

            {/* Audience 2: Mães */}
            <div className="bg-white p-6 rounded-2xl border-2 border-green-500 shadow-sm">
              <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center text-xl font-bold mb-4 font-display border border-blue-100">
                👩‍👧
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900">Mães e Pais</h3>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                Diminua o tempo das crianças na tela de TVs e celulares. Incentive a concentração, habilidades artísticas e tenha divertimento garantido em fins de semana e férias.
              </p>
            </div>

            {/* Audience 3: Escolas */}
            <div className="bg-white p-6 rounded-2xl border-2 border-green-500 shadow-sm">
              <div className="w-12 h-12 bg-yellow-50 text-yellow-500 rounded-xl flex items-center justify-center text-xl font-bold mb-4 font-display border border-yellow-100">
                🏫
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900">Escolas</h3>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                Formate atividades extracurriculares de forma padronizada de forma barata. Abasteça coordenadores e terapeutas com material didático limpo.
              </p>
            </div>

            {/* Audience 4: Reforço Escolar */}
            <div className="bg-white p-6 rounded-2xl border-2 border-green-500 shadow-sm">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center text-xl font-bold mb-4 font-display border border-emerald-100">
                📚
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900">Reforço Escolar</h3>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                Adicione materiais lúdicos e descontraídos após as aulas de fixação dos conceitos para testar motricidade fina e prender o foco de forma sadia.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Section "Quem preparou esse material?" */}
      <section className="py-16 bg-[#fffdf9] border-b border-amber-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-amber-50/50 p-8 sm:p-12 rounded-3xl border border-amber-200/60 shadow-sm">
            <div className="flex flex-col md:flex-row items-center gap-8">
              
              {/* Photo of Patricia */}
              <div className="flex-shrink-0 relative">
                <div className="absolute -top-3 -left-3 bg-pink-500 text-white p-2 rounded-full shadow-lg z-10 transform -rotate-12 font-display text-xs font-bold">
                  Autora Real
                </div>
                <img 
                  src={patriciaAuthor} 
                  alt="Patricia Alcantara - Criadora do material" 
                  className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-full border-4 border-white shadow-xl"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src.includes("ibb.co") && target.src.endsWith(".png")) {
                      target.src = target.src.replace(".png", ".jpg");
                    } else if (target.src.includes("ibb.co") && target.src.endsWith(".jpg")) {
                      target.src = target.src.replace(".jpg", ".png");
                    }
                  }}
                />
              </div>

              {/* Text profile details */}
              <div className="text-center md:text-left flex-1">
                <span className="text-xs font-bold text-pink-600 uppercase tracking-widest font-display">QUEM PREPAROU ESSE MATERIAL?</span>
                <h3 className="mt-1 text-2xl sm:text-3xl font-display font-bold text-slate-900">Patricia Alcantara</h3>
                
                <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed italic">
                  “Olá, eu sou Patricia Alcantara. Preparei este material pensando em mães, professoras e responsáveis que precisam de atividades práticas, criativas e prontas para imprimir. Reuni desenhos educativos e temáticos para ajudar no desenvolvimento da criatividade, coordenação motora e concentração das crianças, economizando tempo e facilitando o dia a dia.”
                </p>

                <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
                  <span className="bg-white px-3.5 py-1 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    🎓 Pedagoga atuante
                  </span>
                  <span className="bg-white px-3.5 py-1 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    🏫 Ateliê de Atividades infantis
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>



      {/* 11. Section of Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-green-600 font-display font-medium text-sm px-4 py-1.5 bg-green-50 rounded-full border border-green-200">
              🗣️ Opinião de Quem Já Usa
            </span>
            <h2 className="mt-4 text-3xl font-display font-bold text-slate-900">
              Quem já comprou, aprova!
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testi, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border-2 border-green-500 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex gap-1 text-green-500 mb-3.5">
                    {[...Array(testi.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-green-500 text-green-500" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed italic">
                    "{testi.comment}"
                  </p>
                </div>
                
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-100">
                  <img 
                    src={testi.avatar} 
                    alt={testi.name} 
                    className="w-10 h-10 rounded-full object-cover border border-green-200" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src.includes("ibb.co") && target.src.endsWith(".png")) {
                        target.src = target.src.replace(".png", ".jpg");
                      } else if (target.src.includes("ibb.co") && target.src.endsWith(".jpg")) {
                        target.src = target.src.replace(".jpg", ".png");
                      }
                    }}
                  />
                  <div>
                    <h4 className="font-display font-bold text-sm text-slate-900">{testi.name}</h4>
                    {testi.role && (
                      <span className="text-[11px] text-slate-400 block font-medium">{testi.role}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 12. FAQ Section accordion */}
      <section className="py-16 bg-white border-y border-green-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-12">
            <span className="text-green-600 font-display font-bold text-xs uppercase tracking-widest bg-green-50 px-4 py-1.5 rounded-full border border-green-200">Dúvidas Frequentes</span>
            <h2 className="mt-2 text-3xl font-display font-bold text-slate-900">FAQ — Perguntas Frequentes</h2>
            <p className="text-slate-600 text-sm mt-1">Tem alguma dúvida? Encontre a resposta rápida aqui.</p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => {
              const isOpen = activeFaq === index;
              return (
                <div key={index} className="bg-white rounded-2xl border-2 border-green-500 overflow-hidden shadow-sm transition-all duration-200">
                  <button 
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full text-left py-4 px-5 sm:px-6 font-display font-bold text-slate-800 text-sm sm:text-base flex items-center justify-between gap-4"
                  >
                    <span>{item.question}</span>
                    <span className="text-slate-400 flex-shrink-0">
                      {isOpen ? <ChevronUp className="w-5 h-5 text-green-600" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>
                  
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>



      {/* 14. Last Call Section */}
      <section className="py-20 bg-white text-center relative overflow-hidden border-t border-green-100">
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-100 rounded-full opacity-60 animate-float"></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-green-50 rounded-full opacity-60 animate-float-delayed"></div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <span className="text-4xl">🎒</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-display font-bold text-slate-900 leading-tight">
            Pronto para economizar horas de pesquisa?
          </h2>
          <p className="mt-3 text-lg text-slate-600 max-w-xl mx-auto">
            Tenha atividades prontas para o ano inteiro. Acesse agora pelo menor preço!
          </p>

          <div className="mt-8">
            <a 
              href="#planos" 
              onClick={handleScrollToPlans}
              className="inline-block w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-display font-bold text-lg sm:text-xl px-12 py-5 rounded-2xl shadow-xl transition-all transform hover:scale-105 border-b-4 border-green-800 active:scale-95 cursor-pointer"
            >
              VER MEUS KITS
            </a>
          </div>
          
          <p className="mt-4 text-xs font-semibold text-slate-400">
            Acesso vitalício imediato no Google Drive
          </p>
        </div>
      </section>

      {/* 14.5 Warranty Card section right before footer */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-emerald-50/30 p-8 sm:p-10 rounded-3xl border-2 border-emerald-500/80 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-6 sm:gap-8">
            
            {/* Highlight badge/icon */}
            <div className="flex-shrink-0 text-center md:text-left">
              <span className="text-5xl sm:text-6xl block mb-2 sm:mb-4 animate-bounce">🛡️</span>
              <span className="font-display font-black text-[10px] text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
                Risco Zero
              </span>
            </div>
            
            <div className="flex-grow text-center md:text-left">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900">
                Garantia Incondicional de 7 Dias
              </h3>
              
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                Confio tanto na qualidade fantástica do nosso material que te ofereço risco zero. Compre com total sossego. Você tem 7 dias inteiros para abrir a pasta do Drive, baixar os desenhos e colocar a molecada para pintar. Se não achar que valeu totalmente a pena, é só falar com a gente que devolvemos 100% do seu dinheiro investido, sem frescura ou qualquer chatice!
              </p>

              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4 text-xs font-bold text-emerald-700">
                <span className="flex items-center gap-1">🔒 Compra 100% Segura</span>
                <span className="flex items-center gap-1">💵 Pix de Volta Imediato</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 15. Footer */}
      <footer className="bg-slate-900 text-slate-400 pt-12 pb-24 sm:pb-12 border-t border-slate-800 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col items-center justify-center space-y-4 mb-8">
            <h4 id="footer-logo" className="font-display font-bold text-white text-base">🎨 +1.500 Desenhos para Colorir</h4>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[10px]">
            <p>
              Copyright © 2026 <strong>+1.500 Desenhos para Colorir Prontos para Imprimir</strong>. Todos os direitos reservados.
            </p>
            
            <p className="text-[10px] text-slate-500">
              Patricia Alcantara Pedagoga e Atividades Infantis. Os logotipos do Google Drive e demais marcas citadas pertencem aos seus respectivos titulares.
            </p>
          </div>

        </div>
      </footer>

      {/* 16. Floating Buy Button on Mobile View */}
      {showMobileSticky && (
        <div className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-100 p-3 flex sm:hidden items-center justify-between gap-4 z-40 shadow-[0_-8px_30px_rgb(0,0,0,0.12)]">
          <div className="text-left">
            <span className="text-[10px] text-slate-400 block font-bold leading-none">Apenas hoje</span>
            <span className="text-sm font-black text-rose-500">R$ 10,00</span>
          </div>
          <a
            href="#plano-basico"
            onClick={handleScrollToBasic}
            className="bg-green-600 hover:bg-green-700 text-white font-display font-black text-xs px-6 py-3 rounded-xl flex items-center gap-1 shadow-md border-b-2 border-green-800 animate-pulse"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> COMPRAR AGORA
          </a>
        </div>
      )}

      {/* Popups: Live buyer toast at bottom right (simulate social proof dynamically) */}
      <div 
        className={`fixed bottom-4 left-4 z-50 transition-all duration-500 transform max-w-sm sm:max-w-md ${
          showToast ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-slate-900 border border-slate-800 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3.5 scale-90 sm:scale-100">
          {liveBuys[currentBuyToast].isPremium ? (
            <img 
              src="https://i.ibb.co/gZ5pJckK/Chat-GPT-Image-18-06-2026-00-35-30.png" 
              alt="Premium Pack" 
              className="w-12 h-12 rounded-xl flex-shrink-0 object-cover border border-slate-700/50 bg-white"
              referrerPolicy="no-referrer"
            />
          ) : (
            <img 
              src="https://i.ibb.co/wrgFbhjR/Chat-GPT-Image-18-06-2026-00-16-43.png" 
              alt="Kit Básico" 
              className="w-12 h-12 rounded-xl flex-shrink-0 object-cover border border-slate-700/50 bg-white"
              referrerPolicy="no-referrer"
            />
          )}
          <div>
            <p className="text-xs font-bold leading-tight">{liveBuys[currentBuyToast].text}</p>
            <span className="text-[9px] text-zinc-400 block mt-0.5">{liveBuys[currentBuyToast].time} • Verificado</span>
          </div>
          <button 
            onClick={() => setShowToast(false)}
            className="text-white/40 hover:text-white p-1 ml-auto"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Popups: Up Sell / Offer bump for Básico plan */}
      {showUpsell && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border-4 border-green-500 relative transform animate-sparkle animate-float-delayed" style={{ animationDuration: "12s" }}>
            
            {/* Close button */}
            <button 
              onClick={() => setShowUpsell(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 p-1.5 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Content header */}
            <div className="text-center">
              <span className="text-3xl">🎁</span>
              <h3 className="mt-2 font-display font-extrabold text-xl text-slate-900">
                Oferta Especial Liberada!
              </h3>
              
              <div className="my-3 bg-yellow-105 text-yellow-900 border-2 border-dashed border-yellow-300 rounded-xl p-3 text-xs font-semibold leading-relaxed">
                “Antes de finalizar, você pode levar o KIT PREMIUM COMPLETO por apenas R$17,00.
                São +1.500 desenhos, 15 temáticas e todos os bônus liberados. 
                Essa oferta exclusiva aparece somente agora.”
              </div>
            </div>

            {/* Compare benefits inside popup */}
            <div className="space-y-1.5 my-3 text-xs text-slate-600 text-left bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Leve <strong>+1.500 desenhos</strong> em vez de 1.000 unidades!</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Tenha as <strong>15 temáticas completas</strong> e bônus (Princesas, Heróis, Animes, Carros, Profissões) com acesso imediato logo após a compra</span>
              </div>
            </div>

            {/* Action buttons inside popup */}
            <div className="space-y-2 mt-4">
              <a 
                href="https://pay.wiapy.com/AgumUrd9H-8"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowUpsell(false)}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-display font-extrabold text-center block py-3 rounded-xl shadow-lg transition-all transform hover:scale-101 cursor-pointer text-sm sm:text-base uppercase tracking-wider border-b-4 border-green-800 active:scale-95 font-sans"
              >
                🔥 SIM, QUERO O PREMIUM POR R$17
              </a>
              
              <a 
                href="https://pay.wiapy.com/Pa1XKNff1v"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowUpsell(false)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-medium text-center block py-2 rounded-xl transition-all cursor-pointer text-[11px] font-sans"
              >
                Não, Quero continuar apenas com o básico
              </a>
            </div>

            <p className="text-[10px] text-center text-slate-400 mt-2.5 font-mono">
              *Ao rejeitar você perde os desenhos bônus extras de R$17 definitivo.
            </p>

          </div>
        </div>
      )}

      {/* Popups: Direct Premium Checkout (for R$ 27 Plan, no upsell/downsell) */}
      {showPremiumCheckout && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border-4 border-green-500 relative transform animate-sparkle">
            
            {/* Close button */}
            <button 
              onClick={() => {
                setShowPremiumCheckout(false);
                setPremiumCheckoutStep("details");
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 p-1.5 rounded-full transition-colors font-bold cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {premiumCheckoutStep === "details" ? (
              <div>
                {/* Content header */}
                <div className="text-center">
                  <span className="text-4xl">👑</span>
                  <h3 className="mt-3 font-display font-black text-2xl text-slate-900">
                    Kit Premium Completo
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">Acesso completo com +1.500 desenhos por R$ 27,00</p>
                  
                  <div className="my-4 bg-emerald-50 text-emerald-950 border-2 border-emerald-200 rounded-2xl p-4 text-left">
                    <p className="text-xs font-bold uppercase text-emerald-700 tracking-wider">O que você vai receber:</p>
                    <div className="mt-2 space-y-2 text-xs text-slate-700">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span><strong>+1.500 desenhos</strong> de alta definição em PDF</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Todas as <strong>15 temáticas exclusivas</strong> liberadas</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Bônus exclusivos: <strong>Princesas</strong>, <strong>Heróis</strong>, <strong>Animes</strong>, <strong>Carros</strong> e <strong>Profissões</strong> de forma separada</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span><strong>Acesso imediato</strong> via e-mail e Google Drive logo após a compra</span>
                      </div>
                    </div>
                  </div>

                  {/* Price details */}
                  <div className="py-2.5 bg-slate-50 border border-slate-100 rounded-xl mb-4 flex items-center justify-between px-4">
                    <span className="text-xs font-medium text-slate-500">Valor Total do Plano:</span>
                    <span className="text-xl font-black text-slate-900 font-display font-bold">R$ 27,00</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="space-y-2.5 mt-4">
                  <button 
                    type="button"
                    onClick={() => setPremiumCheckoutStep("simulated")}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-display font-extrabold text-center block py-4 rounded-xl shadow-lg transition-all transform hover:scale-101 cursor-pointer text-sm sm:text-base uppercase tracking-wider border-b-4 border-green-800 active:scale-95"
                  >
                    🚀 GERAR PAGAMENTO PIX
                  </button>
                  
                  <button 
                    type="button"
                    onClick={() => setShowPremiumCheckout(false)}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold text-center block py-2.5 rounded-xl transition-all cursor-pointer text-xs"
                  >
                    Voltar para o site
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <span className="text-4xl">📱</span>
                <h3 className="mt-2 font-display font-black text-xl text-slate-900">
                  Simulação de Envio do Kit
                </h3>
                <p className="mt-1 text-xs text-slate-500">O pagamento seguro para o Kit de R$ 27,00 foi simulado!</p>

                <div className="my-5 p-4 bg-yellow-50 rounded-2xl border border-yellow-200 text-slate-700 text-xs text-left">
                  <p className="font-bold text-yellow-850 text-sm mb-2 text-center">Simulador de Transação Ativo</p>
                  <p className="leading-relaxed">Seus mais de 1.500 desenhos serão enviados diretamente no seu Google Drive e e-mail cadastrado após a liberação do checkout do Kit Premium de R$ 27,00.</p>
                </div>

                <div className="space-y-2.5">
                  <button 
                    type="button"
                    onClick={() => {
                      setShowPremiumCheckout(false);
                      setPremiumCheckoutStep("details");
                    }}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-display font-bold py-3 px-4 rounded-xl shadow transition-colors cursor-pointer text-xs uppercase"
                  >
                    ✓ Fechar Simulação
                  </button>
                </div>
              </div>
            )}

            <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-slate-400 font-mono border-t border-slate-100 pt-3">
              <span className="flex items-center gap-0.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Criptografia SSL</span>
              <span>•</span>
              <span>Garantia de 7 Dias</span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
