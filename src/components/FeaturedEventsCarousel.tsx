import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  Calendar, 
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  attendees: number;
  logo: string;
  tags: string[];
  featured: boolean;
  price: string;
}

interface FeaturedEventsCarouselProps {
  events: Event[];
}

const FeaturedEventsCarousel = ({ events }: FeaturedEventsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotation effect
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % events.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered, events.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentEvent = events[currentIndex];

  const formatDate = (dateString: string, timeString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long'
    }) + ` às ${timeString}`;
  };

  return (
    <div 
      className="relative py-4 md:py-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Carousel */}
      <div className="relative mb-4 md:mb-6">
        <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
          {/* Carousel Images with Partial Side Views */}
          <div className="flex items-center justify-center h-full">
            {events.map((event, index) => {
              const isActive = index === currentIndex;
              const isPrev = index === (currentIndex - 1 + events.length) % events.length;
              const isNext = index === (currentIndex + 1) % events.length;
              const isVisible = isActive || isPrev || isNext;

              if (!isVisible) return null;

              let transformClass = '';
              let zIndexClass = '';
              let opacityClass = '';
              let scaleClass = '';

              if (isActive) {
                transformClass = 'translate-x-0';
                zIndexClass = 'z-20';
                opacityClass = 'opacity-100';
                scaleClass = 'scale-100';
              } else if (isPrev) {
                transformClass = 'md:-translate-x-32 -translate-x-0';
                zIndexClass = 'z-10';
                opacityClass = 'md:opacity-60 opacity-0';
                scaleClass = 'md:scale-90 scale-0';
              } else if (isNext) {
                transformClass = 'md:translate-x-32 translate-x-0';
                zIndexClass = 'z-10';
                opacityClass = 'md:opacity-60 opacity-0';
                scaleClass = 'md:scale-90 scale-0';
              }

              return (
                <div
                  key={event.id}
                  className={`absolute transition-all duration-500 ease-in-out ${transformClass} ${zIndexClass} ${opacityClass} ${scaleClass}`}
                >
                  {isActive ? (
                    <Link to={`/evento/${event.id}`} className="block">
                      <img
                        src={`https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop&crop=center`}
                        alt={event.title}
                        className="w-[90vw] md:w-[600px] h-64 md:h-80 lg:h-96 object-cover rounded-lg cursor-pointer hover:opacity-95 transition-opacity"
                      />
                    </Link>
                  ) : (
                    <img
                      src={`https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop&crop=center`}
                      alt={event.title}
                      className="w-[90vw] md:w-[600px] h-64 md:h-80 lg:h-96 object-cover rounded-lg"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white hover:bg-gray-100 text-black rounded-full flex items-center justify-center transition-all z-30 shadow-lg border-2 border-black"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white hover:bg-gray-100 text-black rounded-full flex items-center justify-center transition-all z-30 shadow-lg border-2 border-black"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </div>
      </div>

      {/* Event Information Below */}
      <div className="text-center max-w-4xl mx-auto mb-6 md:mb-8 px-4">
        <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
          {currentEvent.title}
        </h2>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 lg:gap-8 text-muted-foreground mb-4 md:mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
            <span className="text-sm md:text-base lg:text-lg">
              {formatDate(currentEvent.date, currentEvent.time)}
            </span>
          </div>
          <div className="hidden md:block w-px h-6 bg-muted-foreground/30" />
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
            <span className="text-sm md:text-base lg:text-lg">{currentEvent.location}</span>
          </div>
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 md:gap-3">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary scale-125' 
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedEventsCarousel;
