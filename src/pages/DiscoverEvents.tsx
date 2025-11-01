
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  Clock,
  ChevronRight,
  Star,
  Filter,
  Brain,
  Briefcase,
  Palette,
  Heart
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FeaturedEventsCarousel from "@/components/FeaturedEventsCarousel";

// Mock event data
const featuredEvents = [
  {
    id: 1,
    title: "Summit de Inovação e IA 2025",
    description: "O maior evento de tecnologia e inteligência artificial do Brasil",
    date: "2025-03-15",
    time: "09:00",
    location: "São Paulo, SP",
    capacity: 500,
    attendees: 234,
    logo: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200&h=200&fit=crop&crop=center",
    tags: ["IA", "Tecnologia", "Inovação"],
    featured: true,
    price: "Gratuito"
  },
  {
    id: 2,
    title: "Networking para Startups",
    description: "Conecte-se com investidores e outros empreendedores",
    date: "2025-03-20",
    time: "18:30",
    location: "Rio de Janeiro, RJ",
    capacity: 150,
    attendees: 89,
    logo: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=200&h=200&fit=crop&crop=center",
    tags: ["Startups", "Networking", "Investimentos"],
    featured: true,
    price: "R$ 50"
  },
  {
    id: 3,
    title: "Workshop de Design Thinking",
    description: "Aprenda metodologias ágeis de design e inovação",
    date: "2025-03-25",
    time: "14:00",
    location: "Belo Horizonte, MG",
    capacity: 80,
    attendees: 45,
    logo: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=200&fit=crop&crop=center",
    tags: ["Design", "Workshop", "Metodologia"],
    featured: true,
    price: "R$ 120"
  },
  {
    id: 4,
    title: "Marketing Digital para PMEs",
    description: "Estratégias práticas para impulsionar seu negócio online",
    date: "2025-04-02",
    time: "19:00",
    location: "Porto Alegre, RS",
    capacity: 200,
    attendees: 156,
    logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop&crop=center",
    tags: ["Marketing", "Digital", "PME"],
    featured: true,
    price: "R$ 80"
  },
  {
    id: 5,
    title: "Conferência de Liderança",
    description: "Desenvolvimento de habilidades de liderança moderna",
    date: "2025-04-10",
    time: "08:30",
    location: "Brasília, DF",
    capacity: 300,
    attendees: 178,
    logo: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=200&h=200&fit=crop&crop=center",
    tags: ["Liderança", "Desenvolvimento", "Gestão"],
    featured: true,
    price: "R$ 200"
  }
];

const allEvents = [
  {
    id: 6,
    title: "Tech Meetup - DevOps",
    description: "Discussões técnicas sobre DevOps e infraestrutura",
    date: "2025-04-15",
    time: "18:00",
    location: "Recife, PE",
    capacity: 100,
    attendees: 67,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&h=300&fit=crop&crop=center",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=60&h=60&fit=crop&crop=center",
    tags: ["DevOps", "Tecnologia", "Meetup"],
    featured: false,
    price: "Gratuito"
  },
  {
    id: 7,
    title: "Workshop UX/UI",
    description: "Aprenda os fundamentos do design de interface",
    date: "2025-04-18",
    time: "14:00",
    location: "São Paulo, SP",
    capacity: 50,
    attendees: 32,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=300&fit=crop&crop=center",
    logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=60&h=60&fit=crop&crop=center",
    tags: ["Design", "UX/UI", "Workshop"],
    featured: false,
    price: "R$ 150"
  },
  {
    id: 8,
    title: "Networking Empreendedor",
    description: "Conecte-se com outros empreendedores",
    date: "2025-04-22",
    time: "19:00",
    location: "Rio de Janeiro, RJ",
    capacity: 80,
    attendees: 45,
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=300&h=300&fit=crop&crop=center",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=60&h=60&fit=crop&crop=center",
    tags: ["Networking", "Empreendedorismo"],
    featured: false,
    price: "R$ 30"
  },
  {
    id: 9,
    title: "Palestra IA & Futuro",
    description: "O impacto da inteligência artificial no mercado",
    date: "2025-04-25",
    time: "16:00",
    location: "Belo Horizonte, MG",
    capacity: 200,
    attendees: 134,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=300&fit=crop&crop=center",
    logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=60&h=60&fit=crop&crop=center",
    tags: ["IA", "Tecnologia", "Futuro"],
    featured: false,
    price: "Gratuito"
  }
];

const categories = [
  {
    id: 1,
    name: "TECNOLOGIA & IA",
    icon: Brain,
    color: "from-blue-500 to-purple-600"
  },
  {
    id: 2,
    name: "NEGÓCIOS & FINANÇAS",
    icon: Briefcase,
    color: "from-green-500 to-teal-600"
  },
  {
    id: 3,
    name: "DESIGN & CRIATIVIDADE",
    icon: Palette,
    color: "from-pink-500 to-rose-600"
  },
  {
    id: 4,
    name: "SAÚDE & BEM-ESTAR",
    icon: Heart,
    color: "from-red-500 to-orange-600"
  }
];

const DiscoverEvents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = locationFilter === "" ||
                           event.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn={true} />
      
      <main className="container mx-auto px-4 py-6 md:py-12">
        {/* Page Header */}
        <div className="text-center mb-8 md:mb-12 animate-fade-in-up">
          <h1 className="text-2xl md:text-4xl font-bold text-gradient-primary mb-3 md:mb-4">
            Descubra Eventos com Conexões Reais
          </h1>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Encontre eventos onde nossa IA conecta você com pessoas que compartilham seus interesses e objetivos.
          </p>
        </div>

        {/* Featured Events Carousel */}
        <section className="mb-10 md:mb-16">
          <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8 justify-center">
            <Star className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Em Destaque</h2>
          </div>
          
          <FeaturedEventsCarousel events={featuredEvents} />
        </section>

        {/* Upcoming Events */}
        <section className="mb-10 md:mb-16">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 md:mb-8">
            Próximos Eventos
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            {allEvents.map((event) => (
              <Card key={event.id} className="card-bridge-interactive overflow-hidden group">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-[180px] object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                <CardContent className="p-3 md:p-4">
                  <h3 className="text-sm md:text-base font-bold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2">
                    {event.title}
                  </h3>
                  
                  <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3 line-clamp-1">
                    {event.description}
                  </p>
                  
                  <div className="space-y-1 mb-2 md:mb-3">
                    <div className="flex items-center gap-1 md:gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>

                  <Button className="btn-bridge-primary w-full text-xs md:text-sm py-1.5 md:py-2" size="sm" asChild>
                    <Link to={`/evento/${event.id}`}>
                      Ver Detalhes
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Ver Todos Button */}
          <div className="text-center">
            <Button variant="outline" className="btn-bridge-outline px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base" asChild>
              <Link to="/todos-eventos">
                Ver todos
                <ChevronRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Categories Section */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 md:mb-8">
            CATEGORIAS
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon;
              const categoryParam = encodeURIComponent(category.name.toLowerCase());
              return (
                <Link key={category.id} to={`/todos-eventos?categoria=${categoryParam}`}>
                  <Card className="card-bridge-interactive group cursor-pointer">
                    <CardContent className="p-6 md:p-8 text-center">
                      <div className={`inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r ${category.color} mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-6 w-6 md:h-8 md:w-8 text-white" />
                      </div>
                      <h3 className="text-xs md:text-sm font-bold text-foreground group-hover:text-primary transition-colors uppercase tracking-wider">
                        {category.name}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DiscoverEvents;
