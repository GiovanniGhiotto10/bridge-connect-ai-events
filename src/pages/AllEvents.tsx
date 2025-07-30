
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  MapPin, 
  Calendar, 
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Mock events data - expanded list
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
    category: "tecnologia & ia",
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
    category: "design & criatividade",
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
    category: "negócios & finanças",
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
    category: "tecnologia & ia",
    price: "Gratuito"
  },
  {
    id: 10,
    title: "Yoga & Meditação",
    description: "Sessão de relaxamento e bem-estar",
    date: "2025-04-28",
    time: "07:00",
    location: "Fortaleza, CE",
    capacity: 30,
    attendees: 18,
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=300&h=300&fit=crop&crop=center",
    logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=60&h=60&fit=crop&crop=center",
    tags: ["Yoga", "Meditação", "Bem-estar"],
    category: "saúde & bem-estar",
    price: "R$ 25"
  },
  {
    id: 11,
    title: "Seminário de Marketing Digital",
    description: "Estratégias avançadas de marketing online",
    date: "2025-05-02",
    time: "09:00",
    location: "Brasília, DF",
    capacity: 150,
    attendees: 98,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=300&fit=crop&crop=center",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=60&h=60&fit=crop&crop=center",
    tags: ["Marketing", "Digital", "Estratégia"],
    category: "negócios & finanças",
    price: "R$ 200"
  },
  {
    id: 12,
    title: "Festival de Arte Digital",
    description: "Exposição de arte digital e NFTs",
    date: "2025-05-05",
    time: "14:00",
    location: "Porto Alegre, RS",
    capacity: 300,
    attendees: 212,
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=300&fit=crop&crop=center",
    logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=60&h=60&fit=crop&crop=center",
    tags: ["Arte", "Digital", "NFT"],
    category: "design & criatividade",
    price: "R$ 40"
  },
  {
    id: 13,
    title: "Corrida Solidária",
    description: "Corrida beneficente para arrecadação de fundos",
    date: "2025-05-08",
    time: "06:00",
    location: "Salvador, BA",
    capacity: 500,
    attendees: 267,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=center",
    logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=60&h=60&fit=crop&crop=center",
    tags: ["Corrida", "Solidariedade", "Esporte"],
    category: "saúde & bem-estar",
    price: "R$ 15"
  }
];

const categories = [
  "Todas as categorias",
  "Tecnologia & IA",
  "Negócios & Finanças", 
  "Design & Criatividade",
  "Saúde & Bem-estar"
];

const AllEvents = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Todas as categorias");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 8;

  // Initialize category filter from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('categoria');
    if (categoryParam) {
      // Convert URL param back to display format
      const categoryMap: { [key: string]: string } = {
        'tecnologia & ia': 'Tecnologia & IA',
        'negócios & finanças': 'Negócios & Finanças',
        'design & criatividade': 'Design & Criatividade',
        'saúde & bem-estar': 'Saúde & Bem-estar'
      };
      
      const decodedCategory = decodeURIComponent(categoryParam);
      const displayCategory = categoryMap[decodedCategory] || decodedCategory;
      setCategoryFilter(displayCategory);
    }
  }, [searchParams]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Filter events based on search criteria
  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = locationFilter === "" ||
                           event.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    const matchesCategory = categoryFilter === "Todas as categorias" ||
                           event.category === categoryFilter.toLowerCase();
    
    return matchesSearch && matchesLocation && matchesCategory;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const paginatedEvents = filteredEvents.slice(startIndex, startIndex + eventsPerPage);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn={true} />
      
      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl font-bold text-gradient-primary mb-4">
            Todos os Eventos
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore nossa lista completa de eventos e encontre aquele perfeito para você.
          </p>
        </div>

        {/* Filters Bar */}
        <div className="mb-12">
          <Card className="card-bridge">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category Filter */}
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="bg-input border-border text-input-foreground">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-card-border">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="text-popover-foreground">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Search by Event Name */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Buscar por nome do evento..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-input border-border text-input-foreground"
                  />
                </div>

                {/* Location Filter */}
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Filtrar por localização..."
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="pl-10 bg-input border-border text-input-foreground"
                  />
                </div>
              </div>

              {/* Results Count */}
              <div className="mt-4 text-sm text-muted-foreground">
                Mostrando {paginatedEvents.length} de {filteredEvents.length} evento(s)
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events Grid */}
        <section className="mb-12">
          {paginatedEvents.length === 0 ? (
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedEvents.map((event) => (
                <Card key={event.id} className="card-bridge-interactive overflow-hidden group">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-card/80 text-card-foreground text-xs">
                        {event.price}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="text-sm font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                    
                    <div className="space-y-1 mb-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </div>
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn-bridge-outline"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => goToPage(page)}
                className={currentPage === page ? "btn-bridge-primary" : "btn-bridge-outline"}
              >
                {page}
              </Button>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="btn-bridge-outline"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AllEvents;
