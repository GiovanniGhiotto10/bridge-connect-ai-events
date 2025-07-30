
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  User,
  ExternalLink,
  MessageCircle
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Mock event details data
const eventDetails = {
  "1": {
    id: 1,
    title: "Summit de Inovação e IA 2025",
    bannerImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop",
    description: "O Summit de Inovação e IA 2025 é o maior evento de tecnologia e inteligência artificial do Brasil, reunindo os principais especialistas, empresários e inovadores do setor. Durante dois dias intensos, você terá acesso a palestras exclusivas, workshops práticos, networking direcionado e demonstrações das mais recentes tecnologias de IA.\n\nEste evento foi pensado para profissionais que querem estar na vanguarda da transformação digital, desde desenvolvedores e cientistas de dados até executivos e empreendedores. Prepare-se para conhecer as tendências que vão moldar o futuro dos negócios e da sociedade.\n\nNossa plataforma Bridge conectará você com outros participantes que compartilham seus interesses e objetivos profissionais, maximizando as oportunidades de networking e colaboração.",
    date: "2025-03-15",
    time: "09:00 - 18:00",
    endDate: "2025-03-16",
    location: "Expo Center Norte, São Paulo, SP",
    mapLink: "https://maps.google.com/...",
    price: "Gratuito",
    capacity: 500,
    attendees: 234,
    organizer: "Tech Events BR",
    organizerLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop&crop=center",
    tags: ["IA", "Tecnologia", "Inovação"],
    isUserRegistered: true
  },
  "2": {
    id: 2,
    title: "Networking para Startups",
    bannerImage: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&h=600&fit=crop",
    description: "Um evento exclusivo para conectar empreendedores, investidores e profissionais do ecossistema de startups. Durante uma noite de networking intensivo, você terá a oportunidade de apresentar sua ideia, conhecer potenciais investidores e formar parcerias estratégicas.\n\nO evento contará com pitch sessions de 3 minutos, speed networking e conversas direcionadas facilitadas pela nossa IA de matchmaking. Nosso objetivo é criar conexões genuínas e produtivas que possam gerar negócios reais.\n\nIdeal para fundadores de startups, investidores anjo, venture capitals, aceleradoras e profissionais que querem entrar no mundo do empreendedorismo.",
    date: "2025-03-20",
    time: "18:30 - 22:00",
    location: "WeWork Faria Lima, Rio de Janeiro, RJ",
    mapLink: "https://maps.google.com/...",
    price: "R$ 50",
    capacity: 150,
    attendees: 89,
    organizer: "Startup Rio",
    organizerLogo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop&crop=center",
    tags: ["Startups", "Networking", "Investimentos"],
    isUserRegistered: false
  }
};

// Mock matches data
const mockMatches = [
  {
    id: 1,
    name: "Ana Silva",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c3de?w=100&h=100&fit=crop&crop=face",
    compatibility: 94,
    role: "Product Manager"
  },
  {
    id: 2,
    name: "Carlos Santos",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    compatibility: 89,
    role: "Tech Lead"
  },
  {
    id: 3,
    name: "Maria Costa",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    compatibility: 87,
    role: "UX Designer"
  },
  {
    id: 4,
    name: "Pedro Lima",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    compatibility: 85,
    role: "Data Scientist"
  }
];

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const event = id ? eventDetails[id as keyof typeof eventDetails] : null;

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Header isLoggedIn={true} />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Evento não encontrado</h1>
            <Button asChild className="btn-bridge-primary">
              <a href="/eventos">Voltar para eventos</a>
            </Button>
          </div>
        </main>
        <Footer />
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

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn={true} />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={event.bannerImage}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in-up">
              {event.title}
            </h1>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          {/* Left Column - Event Description */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-foreground mb-6">SOBRE O EVENTO</h2>
            <div className="prose prose-invert max-w-none">
              {event.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-muted-foreground mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mt-8">
              {event.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-primary/30 text-primary bg-primary/10"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Right Column - Event Info Card */}
          <div className="lg:col-span-1">
            <Card className="card-bridge sticky top-8">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-6">Informações do Evento</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Data e Hora</p>
                      <p className="text-foreground font-medium">
                        {formatDate(event.date)}
                        {'endDate' in event && event.endDate && ` - ${formatDate(event.endDate)}`}
                      </p>
                      <p className="text-foreground font-medium">{event.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Localização</p>
                      <p className="text-foreground font-medium">{event.location}</p>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-primary hover:text-primary/80"
                        asChild
                      >
                        <a href={event.mapLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Ver no mapa
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-5 w-5 text-primary mt-0.5 flex items-center justify-center text-lg font-bold">
                      R$
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Preço</p>
                      <p className="text-foreground font-medium text-lg">{event.price}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Vagas</p>
                      <p className="text-foreground font-medium">
                        {event.attendees} / {event.capacity} participantes
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-primary mt-0.5" />
                    <div className="flex items-center gap-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Organizador</p>
                        <p className="text-foreground font-medium">{event.organizer}</p>
                      </div>
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={event.organizerLogo} alt={event.organizer} />
                        <AvatarFallback>{event.organizer.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mb-16">
          <Button className="btn-bridge-primary text-lg px-12 py-6" size="lg">
            {event.isUserRegistered ? "VOCÊ JÁ ESTÁ INSCRITO" : "INSCREVER-SE AGORA"}
          </Button>
        </div>

        {/* Matchmaking Section - Only for registered users */}
        {event.isUserRegistered && (
          <section className="animate-fade-in-up">
            <Card className="card-bridge">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                  Veja Seus Matches em Potencial Neste Evento
                </h2>
                <p className="text-muted-foreground text-center mb-8">
                  Nossa IA encontrou pessoas com interesses e objetivos similares aos seus que também estarão neste evento.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  {mockMatches.map((match) => (
                    <div key={match.id} className="text-center group">
                      <div className="relative mb-3">
                        <Avatar className="w-20 h-20 mx-auto border-2 border-primary/30 group-hover:border-primary transition-colors">
                          <AvatarImage src={match.avatar} alt={match.name} />
                          <AvatarFallback>{match.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <Badge className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs px-2">
                          {match.compatibility}%
                        </Badge>
                      </div>
                      <h4 className="font-medium text-foreground text-sm">{match.name}</h4>
                      <p className="text-xs text-muted-foreground">{match.role}</p>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <Button className="btn-bridge-primary" asChild>
                    <a href="/minhas-conexoes">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Ver Todos os Matches & Conversar
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default EventDetails;
