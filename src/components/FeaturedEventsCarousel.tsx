
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
      className="relative py-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Carousel */}
      <div className="relative mb-6">
        <div className="relative h-80 md:h-96 overflow-hidden rounded-lg">
          {/* Carousel Images */}
          <div 
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {events.map((event) => (
              <div
                key={event.id}
                className="flex-shrink-0 w-full h-full relative"
              >
                <img
                  src={`https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=400&fit=crop&crop=center`}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all z-10 backdrop-blur-sm"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all z-10 backdrop-blur-sm"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Event Information Below */}
      <div className="text-center max-w-4xl mx-auto mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          {currentEvent.title}
        </h2>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-muted-foreground mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span className="text-lg">
              {formatDate(currentEvent.date, currentEvent.time)}
            </span>
          </div>
          <div className="hidden md:block w-px h-6 bg-muted-foreground/30" />
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="text-lg">{currentEvent.location}</span>
          </div>
        </div>

        <Button 
          className="btn-bridge-primary px-8 py-3 text-lg" 
          asChild
        >
          <Link to={`/evento/${currentEvent.id}`}>
            Ver Detalhes
          </Link>
        </Button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-3">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
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
