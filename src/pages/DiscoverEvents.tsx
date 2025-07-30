
import { useState } from "react";
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
  }
];

const allEvents = [
  ...featuredEvents,
  {
    id: 3,
    title: "Workshop de Design Thinking",
    description: "Aprenda metodologias ágeis de design e inovação",
    date: "2025-03-25",
    time: "14:00",
    location: "Belo Horizonte, MG",
    capacity: 80,
    attendees: 45,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    tags: ["Design", "Workshop", "Metodologia"],
    featured: false,
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
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    tags: ["Marketing", "Digital", "PME"],
    featured: false,
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
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998",
    tags: ["Liderança", "Desenvolvimento", "Gestão"],
    featured: false,
    price: "R$ 200"
  },
  {
    id: 6,
    title: "Tech Meetup - DevOps",
    description: "Discussões técnicas sobre DevOps e infraestrutura",
    date: "2025-04-15",
    time: "18:00",
    location: "Recife, PE",
    capacity: 100,
    attendees: 67,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
    tags: ["DevOps", "Tecnologia", "Meetup"],
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

  const nonFeaturedEvents = filteredEvents.filter(event => !event.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn={true} />
      
      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl font-bold text-gradient-primary mb-4">
            Descubra Eventos com Conexões Reais
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Encontre eventos onde nossa IA conecta você com pessoas que compartilham seus interesses e objetivos.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-12 animate-scale-in">
          <Card className="card-bridge">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Buscar por evento, tema ou palavra-chave..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-input border-border text-input-foreground"
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Filtrar por localização..."
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="pl-10 bg-input border-border text-input-foreground"
                  />
                </div>
                <Button variant="outline" className="btn-bridge-outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Mais Filtros
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Events */}
        {featuredEvents.some(event => 
          (searchTerm === "" || event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
           event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) &&
          (locationFilter === "" || event.location.toLowerCase().includes(locationFilter.toLowerCase()))
        ) && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Star className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Em Destaque</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredEvents
                .filter(event => {
                  const matchesSearch = searchTerm === "" || 
                    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
                  const matchesLocation = locationFilter === "" ||
                    event.location.toLowerCase().includes(locationFilter.toLowerCase());
                  return matchesSearch && matchesLocation;
                })
                .map((event) => (
                <Card key={event.id} className="card-bridge-interactive overflow-hidden group">
                  <div className="relative h-48 overflow-hidden" style={{ backgroundColor: '#1a2a6c' }}>
                    <div className="flex items-center justify-center h-full">
                      <img
                        src={event.logo}
                        alt={`${event.title} logo`}
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-primary-foreground">
                        Destaque
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {formatDate(event.date)}
                        <Clock className="h-4 w-4 ml-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </div>
                    </div>

                    <Button className="btn-bridge-primary w-full group" asChild>
                      <Link to={`/evento/${event.id}`}>
                        Ver Detalhes
                        <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* All Events */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Próximos Eventos ({nonFeaturedEvents.length})
          </h2>
          
          {nonFeaturedEvents.length === 0 ? (
            <Card className="card-bridge">
              <CardContent className="p-12 text-center">
                <div className="text-muted-foreground">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">Nenhum evento encontrado</h3>
                  <p>Tente ajustar seus filtros de busca ou explorar outras categorias.</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {nonFeaturedEvents.map((event) => (
                <Card key={event.id} className="card-bridge-interactive overflow-hidden group">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={'image' in event ? event.image : event.logo}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="bg-card/80 text-card-foreground text-xs">
                        {event.price}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                      {event.description}
                    </p>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(event.date)} • {event.time}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {event.tags.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs border-primary/20 text-primary"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {event.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{event.tags.length - 2}
                        </Badge>
                      )}
                    </div>

                    <Button className="btn-bridge-primary w-full" size="sm" asChild>
                      <Link to={`/evento/${event.id}`}>
                        Ver Detalhes
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Categories Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-8">
            CATEGORIAS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link key={category.id} to={`/eventos?categoria=${category.name.toLowerCase()}`}>
                  <Card className="card-bridge-interactive group cursor-pointer">
                    <CardContent className="p-8 text-center">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${category.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors uppercase tracking-wider">
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
