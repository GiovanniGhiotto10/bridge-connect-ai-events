import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Mock data - substituir com dados reais do backend
const userEvents = [
  {
    id: 1,
    title: "Tech Summit 2024",
    date: "2024-03-15",
    displayDate: "15 de Março, 2024",
    location: "São Paulo, SP",
    image: "/lovable-uploads/8a9f4ef8-de41-4a07-b941-952b39e77564.png"
  },
  {
    id: 2,
    title: "Startup Meetup",
    date: "2025-12-20",
    displayDate: "20 de Dezembro, 2025",
    location: "Rio de Janeiro, RJ",
    image: "/lovable-uploads/8a9f4ef8-de41-4a07-b941-952b39e77564.png"
  },
  {
    id: 3,
    title: "Design Conference",
    date: "2025-11-25",
    displayDate: "25 de Novembro, 2025",
    location: "Belo Horizonte, MG",
    image: "/lovable-uploads/8a9f4ef8-de41-4a07-b941-952b39e77564.png"
  },
  {
    id: 4,
    title: "Marketing Digital Workshop",
    date: "2024-01-10",
    displayDate: "10 de Janeiro, 2024",
    location: "Brasília, DF",
    image: "/lovable-uploads/8a9f4ef8-de41-4a07-b941-952b39e77564.png"
  }
];

const MyEvents = () => {
  const [activeTab, setActiveTab] = useState<"proximos" | "passados">("proximos");

  // Filtrar eventos baseado na data atual
  const today = new Date();
  const upcomingEvents = userEvents.filter(event => new Date(event.date) >= today);
  const pastEvents = userEvents.filter(event => new Date(event.date) < today);
  
  const displayedEvents = activeTab === "proximos" ? upcomingEvents : pastEvents;

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn={true} />
      
      <main className="container mx-auto px-4 py-12">
        {/* Título e Filtros na mesma linha */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h1 className="text-4xl font-bold text-gradient-primary">Meus Eventos</h1>
          
          {/* Botões de Filtro */}
          <div className="inline-flex gap-2 bg-muted/30 p-1 rounded-full">
            <Button
              variant="ghost"
              className={`rounded-full px-6 py-2 transition-all ${
                activeTab === "proximos" 
                  ? "bg-foreground text-background hover:bg-foreground hover:text-background" 
                  : "bg-transparent text-foreground/60 hover:bg-transparent hover:text-foreground"
              }`}
              onClick={() => setActiveTab("proximos")}
            >
              Próximos
            </Button>
            <Button
              variant="ghost"
              className={`rounded-full px-6 py-2 transition-all ${
                activeTab === "passados" 
                  ? "bg-foreground text-background hover:bg-foreground hover:text-background" 
                  : "bg-transparent text-foreground/60 hover:bg-transparent hover:text-foreground"
              }`}
              onClick={() => setActiveTab("passados")}
            >
              Passado
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {displayedEvents.map((event) => (
            <Card key={event.id} className="card-bridge-interactive overflow-hidden group cursor-pointer h-full flex flex-col">
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              <CardContent className="p-3 md:p-4 flex-1">
                <h3 className="text-sm md:text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {event.title}
                </h3>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-1 md:gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{event.displayDate}</span>
                  </div>
                  <div className="flex items-center gap-1 md:gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="p-3 md:p-4 pt-0 flex flex-col gap-2">
                <Button 
                  variant="outline" 
                  className="w-full btn-bridge-outline border-2 border-primary text-xs md:text-sm"
                  asChild
                >
                  <Link to={`/evento/${event.id}`}>Página do Evento</Link>
                </Button>
                <Button 
                  className="w-full btn-bridge-primary text-xs md:text-sm"
                  asChild
                >
                  <Link to={`/matches?event=${event.id}`}>Conexões</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Mensagem quando não há eventos */}
        {displayedEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nenhum evento {activeTab === "proximos" ? "próximo" : "passado"} encontrado.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MyEvents;