
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock,
  ExternalLink,
  Star,
  Heart,
  MessageCircle
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Mock event data with complete event details
const eventDetails = [
  {
    id: 1,
    title: "Summit de Inovação e IA 2025",
    bannerImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop&crop=center",
    description: "O maior evento de tecnologia e inteligência artificial do Brasil reunirá os principais especialistas, empresários e inovadores do setor. Durante dois dias intensos, você terá acesso a palestras exclusivas, workshops práticos e oportunidades únicas de networking com profissionais que estão moldando o futuro da tecnologia no país. Prepare-se para conhecer as últimas tendências em IA, machine learning, automação e muito mais.",
    date: "2025-03-15",
    time: "09:00",
    endDate: "2025-03-16",
    location: "Expo Center Norte, São Paulo, SP",
    mapLink: "https://maps.google.com/?q=Expo+Center+Norte+São+Paulo",
    price: "Gratuito",
    capacity: 500,
    attendees: 234,
    organizer: "Tech Events BR",
    organizerLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop&crop=center",
    tags: ["IA", "Tecnologia", "Inovação"],
    isUserRegistered: true
  },
  {
    id: 2,
    title: "Networking para Startups",
    bannerImage: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=400&fit=crop&crop=center",
    description: "Um evento exclusivo para conectar empreendedores, investidores e mentores do ecossistema de startups. Durante uma noite de networking intenso, você terá a oportunidade de apresentar sua ideia, conhecer potenciais investidores e formar parcerias estratégicas que podem mudar o rumo do seu negócio.",
    date: "2025-03-20",
    time: "18:30",
    location: "WeWork Faria Lima, Rio de Janeiro, RJ",
    mapLink: "https://maps.google.com/?q=WeWork+Faria+Lima+Rio+de+Janeiro",
    price: "R$ 50,00",
    capacity: 150,
    attendees: 89,
    organizer: "Startup Rio",
    organizerLogo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop&crop=center",
    tags: ["Startups", "Networking", "Investimentos"],
    isUserRegistered: false
  }
];

// Mock matches data
const mockMatches = [
  {
    id: 1,
    name: "Ana Silva",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b332?w=100&h=100&fit=crop&crop=face",
    compatibility: 92
  },
  {
    id: 2,
    name: "Carlos Santos",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    compatibility: 87
  },
  {
    id: 3,
    name: "Marina Costa",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    compatibility: 84
  },
  {
    id: 4,
    name: "Rafael Lima",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    compatibility: 79
  }
];

const EventDetails = () => {
  const { id } = useParams();
  const eventId = id;
  
  // Primeiro, tentar buscar de eventos criados dinamicamente
  const createdEvents = JSON.parse(localStorage.getItem('events') || '[]');
  let event = createdEvents.find((e: any) => e.id === eventId);
  
  // Se não encontrar, usar os dados mockados existentes
  if (!event) {
    event = eventDetails.find(e => e.id === parseInt(eventId || "1"));
    
    // Converter formato mockado para o formato esperado
    if (event) {
      event = {
        ...event,
        startDate: event.date,
        endDate: event.endDate || event.date,
        bannerImage: event.bannerImage || event.image,
        theme: {
          background: '#040A1A',
          primaryColor: '#3B82F6',
          textColor: '#ffffff',
          fontFamily: 'Inter'
        }
      };
    }
  }
  
  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Evento não encontrado</h1>
          <p className="text-muted-foreground">O evento que você está procurando não existe.</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // Aplicar tema do evento se disponível
  const eventTheme = event.theme;
  const pageStyle = eventTheme ? {
    background: eventTheme.background,
    color: eventTheme.textColor,
    fontFamily: eventTheme.fontFamily
  } : {};

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn={true} />
      
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${event.bannerImage || event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop&crop=center'})` 
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-background/20" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
          <div className="max-w-4xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {event.title || event.name}
            </h1>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Left Column - Event Description */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-black mb-6">SOBRE O EVENTO</h2>
            <div className="prose max-w-none">
              <p className="text-black leading-relaxed text-lg">
                {event.description || "Descrição do evento não disponível."}
              </p>
            </div>

            {/* Tags */}
            {event.tags && (
              <div className="flex flex-wrap gap-2 mt-8">
                {event.tags.map((tag: string) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-primary/30 text-primary bg-primary/10"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Event Info Card */}
          <div className="lg:col-span-1">
            <Card className="card-bridge sticky top-6">
              <CardContent className="p-6 space-y-6">
                {/* Date and Time */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Calendar className="h-5 w-5" />
                    <p className="text-sm text-black">Data e Hora</p>
                  </div>
                  <div>
                    <p className="text-black font-medium">
                      {formatDate(event.startDate || event.date)}
                      {event.endDate && event.endDate !== event.startDate && ` - ${formatDate(event.endDate)}`}
                    </p>
                    <p className="text-black font-medium">{event.startTime || event.time}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <MapPin className="h-5 w-5" />
                    <p className="text-sm text-black">Localização</p>
                  </div>
                  <div>
                    <p className="text-black font-medium">{event.location}</p>
                    {event.city && (
                      <p className="text-black text-sm">{event.city}</p>
                    )}
                    {event.mapLink && (
                      <a
                        href={event.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 text-sm inline-flex items-center gap-1 mt-1"
                      >
                        Ver no mapa <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <p className="text-sm text-black">Preço</p>
                  <p className="text-2xl font-bold text-primary">
                    {event.isFree !== undefined 
                      ? (event.isFree ? "Gratuito" : `R$ ${event.ticketPrice},00`)
                      : (event.price || "Gratuito")
                    }
                  </p>
                </div>

                {/* Capacity */}
                {(event.capacity || event.attendees) && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary">
                      <Users className="h-5 w-5" />
                      <p className="text-sm text-black">Vagas</p>
                    </div>
                    <p className="text-black font-medium">
                      {event.attendees ? `${event.attendees} / ${event.capacity} participantes` : 
                       event.capacity ? `Até ${event.capacity} participantes` : 'Capacidade não definida'}
                    </p>
                  </div>
                )}

                {/* Organizer */}
                {event.organizer && (
                  <div className="space-y-2">
                    <p className="text-sm text-black">Organizador</p>
                    <div className="flex items-center gap-3">
                      <img
                        src={event.organizerLogo}
                        alt={`${event.organizer} logo`}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <p className="text-black font-medium">{event.organizer}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mb-16">
          <Button size="lg" className="btn-bridge-primary px-12 py-4 text-lg">
            INSCREVER-SE AGORA
          </Button>
        </div>

        {/* Matchmaking Section - Only for registered users and if matchmaking is enabled */}
        {(event.isUserRegistered || event.matchmakingEnabled) && (
          <section className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                Veja Suas Conexões em Potencial Neste Evento
              </h2>
              <p className="text-black">
                Nossa IA encontrou pessoas com interesses similares aos seus que também participarão deste evento.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {mockMatches.map((match) => (
                <Card key={match.id} className="card-bridge-interactive group cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className="relative mb-4">
                      <img
                        src={match.photo}
                        alt={match.name}
                        className="w-20 h-20 rounded-full mx-auto object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-black group-hover:text-primary transition-colors">
                      {match.name}
                    </h3>
                    <p className="text-xs text-black mt-1">Match</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline" className="btn-bridge-outline">
                <MessageCircle className="h-4 w-4 mr-2" />
                Ver Todas as Conexões & Conversar
              </Button>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default EventDetails;
