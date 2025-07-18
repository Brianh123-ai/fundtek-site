import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";


// Video path - using external URL to avoid build issues
const videoPath = "/attached_assets/Video (FundTek)_1751295081956.webm";
import logoPath from "@assets/image_1752182868701.png";
import heroBackgroundPath from "@assets/image_1752190793949.png";

// Enhanced video optimization hook
function useVideoOptimization() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Performance optimization will handle video preloading
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  return { isVideoLoaded, setIsVideoLoaded, shouldPlayVideo, isMobile, isVideoPlaying, setIsVideoPlaying };
}

export default function HeroSection() {
  const [, setLocation] = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isVideoLoaded, setIsVideoLoaded, shouldPlayVideo, isMobile, isVideoPlaying, setIsVideoPlaying } = useVideoOptimization();

  // Simple video loading
  useEffect(() => {
    if (!shouldPlayVideo || !videoRef.current) return;

    const video = videoRef.current;
    
    const handleCanPlay = () => {
      setIsVideoLoaded(true);
      setIsVideoPlaying(true);
      video.classList.add('loaded');
    };

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
      setIsVideoPlaying(true);
    };

    const handlePlay = () => {
      setIsVideoPlaying(true);
    };

    // Immediate video loading and playback
    video.load();
    video.play().catch(() => {
      // Fallback for autoplay restrictions
      video.muted = true;
      video.play().catch(() => {});
    });

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('play', handlePlay);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('play', handlePlay);
    };
  }, [shouldPlayVideo, setIsVideoLoaded, setIsVideoPlaying]);

  const handleApplyNow = () => {
    window.open('https://form.jotform.com/251965461165159', '_blank');
  };

  const handlePhoneClick = () => {
    window.open('https://calendly.com/fundtekcapitalgroup/15min', '_blank');
  };

  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: '#1e293b'
      }}
    >
      {/* Optimized Video Background */}
      {shouldPlayVideo && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster=""
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          x5-playsinline="true"
          webkit-playsinline="true"
          style={{
            zIndex: isVideoLoaded ? 1 : 0,
            transform: 'translateZ(0)', // GPU acceleration
            willChange: 'transform'
          }}
        >
          <source src={videoPath} type="video/webm" />
          <source src={videoPath.replace('.webm', '.mp4')} type="video/mp4" />
        </video>
      )}
      
      {/* Background image is now always visible until video loads */}
      {/* Text Content Overlay */}
      <div className="absolute left-0 top-0 z-20 text-white pl-4 md:pl-8 w-full h-full">
        <div className="flex items-center h-full">
          <div className="max-w-2xl pt-2 md:pt-3" style={{ contain: 'layout' }}>
            <h1 className="font-bold mb-2 sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight text-[62px]" style={{ fontSize: 'clamp(1.75rem, 5vw, 3.75rem)' }}>
              Flexible<br />
              Financing for<br />
              <span style={{ color: '#85abe4' }}>Every Industry</span>
            </h1>
            
            <p className="mb-2 max-w-2xl sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed lg:text-[22px] lg:leading-relaxed text-[24px] font-medium" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.375rem)' }}>
              Empower your business with <span style={{ color: '#85abe4' }}>custom tailored</span><br />
              financial and <span style={{ color: '#85abe4' }}>business solutions</span>
            </p>
            
            <p className="mb-4 sm:text-base sm:leading-relaxed md:text-lg md:leading-relaxed lg:text-[20px] lg:leading-relaxed text-[22px] font-medium" style={{ fontSize: 'clamp(0.875rem, 2.2vw, 1.25rem)' }}>
              Call us at <span style={{ color: '#85abe4' }}>(305) 307-4658</span> to see your options
            </p>
            
            <Button 
              onClick={handleApplyNow}
              size="lg" 
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-[#7299d1] text-white font-semibold rounded-lg shadow-2xl hover:shadow-3xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 active:scale-95 bg-[#85abe4] text-left w-full sm:w-auto px-4 py-3 text-base sm:px-6 sm:py-4 sm:text-lg md:px-8 md:text-[20px] h-auto min-h-[44px]"
            >
              Get Approved in 24 Hours
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}