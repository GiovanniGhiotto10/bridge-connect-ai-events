
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Edit, 
  MapPin, 
  Briefcase, 
  Target, 
  Users, 
  Calendar,
  ExternalLink,
  Linkedin,
  Twitter,
  Instagram
} from "lucide-react";

// Mock user data
const mockUser = {
  id: 1,
  name: "João Silva Santos",
  avatar: "/placeholder.svg",
  bio: "Desenvolvedor Full Stack apaixonado por tecnologia e inovação. Sempre em busca de novos desafios e oportunidades de crescimento profissional.",
  location: "São Paulo, SP",
  career: "Desenvolvedor Full Stack",
  currentRole: "Senior Software Engineer na Tech Corp",
  networkingGoals: "Busco conectar com outros profissionais de tecnologia, empreendedores e líderes de produto para trocar experiências e descobrir oportunidades de colaboração.",
  socialLinks: {
    linkedin: "https://linkedin.com/in/joaosilva",
    twitter: "https://twitter.com/joaosilva",
    instagram: "https://instagram.com/joaosilva"
  },
  connectionsCount: 42,
  mutualConnections: [
    { id: 1, name: "Maria Costa", avatar: "/placeholder.svg" },
    { id: 2, name: "Pedro Oliveira", avatar: "/placeholder.svg" },
    { id: 3, name: "Ana Silva", avatar: "/placeholder.svg" },
    { id: 4, name: "Lucas Ferreira", avatar: "/placeholder.svg" }
  ]
};

const mockFutureEvents = [
  {
    id: 1,
    name: "Tech Summit 2024",
    date: "15 Set 2024",
    location: "São Paulo Convention Center",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Startup Weekend",
    date: "28 Set 2024",
    location: "Campus São Paulo",
    image: "/placeholder.svg"
  }
];

const mockPastEvents = [
  {
    id: 3,
    name: "DevConf 2024",
    date: "10 Jul 2024",
    location: "Centro de Convenções",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    name: "React Conference",
    date: "22 Jun 2024",
    location: "Tech Hub SP",
    image: "/placeholder.svg"
  }
];

const Profile = () => {
  const [activeEventTab, setActiveEventTab] = useState<'future' | 'past'>('future');

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background/95 to-primary/5">
      <Header isLoggedIn={true} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="card-bridge mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-6">
                <Avatar className="h-32 w-32 border-4 border-primary/20 mx-auto md:mx-0">
                  <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                    {mockUser.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold text-white mb-2">{mockUser.name}</h1>
                  <div className="flex items-center justify-center md:justify-start space-x-2 text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4" />
                    <span>{mockUser.location}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-2 text-muted-foreground mb-4">
                    <Briefcase className="h-4 w-4" />
                    <span>{mockUser.currentRole}</span>
                  </div>
                  <Button className="btn-bridge-primary">
                    <Edit className="h-4 w-4 mr-2" />
                    Editar Perfil
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About Section */}
          <Card className="card-bridge mb-8">
            <CardHeader>
              <CardTitle className="text-white">Sobre</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{mockUser.bio}</p>
            </CardContent>
          </Card>

          {/* Career and Goals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="card-bridge">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Carreira e Objetivos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-1">Área de Atuação</h4>
                  <p className="text-muted-foreground">{mockUser.career}</p>
                </div>
                <Separator className="bg-card-border" />
                <div>
                  <h4 className="font-semibold text-white mb-1 flex items-center">
                    <Target className="h-4 w-4 mr-1" />
                    Objetivos de Networking
                  </h4>
                  <p className="text-muted-foreground text-sm">{mockUser.networkingGoals}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-bridge">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Conexões ({mockUser.connectionsCount})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-3">
                  {mockUser.mutualConnections.slice(0, 8).map((connection) => (
                    <div key={connection.id} className="text-center">
                      <Avatar className="h-12 w-12 mx-auto mb-1 border-2 border-primary/20">
                        <AvatarImage src={connection.avatar} alt={connection.name} />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {connection.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-xs text-muted-foreground line-clamp-1">{connection.name}</p>
                    </div>
                  ))}
                </div>
                {mockUser.connectionsCount > 8 && (
                  <Button variant="ghost" className="w-full mt-4 text-primary hover:bg-primary/10">
                    Ver todas as conexões
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Social Networks */}
          <Card className="card-bridge mb-8">
            <CardHeader>
              <CardTitle className="text-white">Redes Sociais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" asChild className="border-primary/30 text-primary hover:bg-primary/10">
                  <Link to={mockUser.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild className="border-primary/30 text-primary hover:bg-primary/10">
                  <Link to={mockUser.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild className="border-primary/30 text-primary hover:bg-primary/10">
                  <Link to={mockUser.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-4 w-4 mr-2" />
                    Instagram
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Events History */}
          <Card className="card-bridge">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Histórico de Eventos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeEventTab} onValueChange={(value) => setActiveEventTab(value as 'future' | 'past')}>
                <TabsList className="grid w-full grid-cols-2 bg-card/50">
                  <TabsTrigger value="future" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Eventos Futuros
                  </TabsTrigger>
                  <TabsTrigger value="past" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Eventos Passados
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="future" className="mt-4">
                  <div className="space-y-4">
                    {mockFutureEvents.map((event) => (
                      <div key={event.id} className="flex items-center space-x-4 p-4 bg-card/30 rounded-lg border border-card-border">
                        <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Calendar className="h-8 w-8 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white">{event.name}</h4>
                          <p className="text-sm text-muted-foreground">{event.date}</p>
                          <p className="text-xs text-muted-foreground flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {event.location}
                          </p>
                        </div>
                        <Badge className="bg-green-500/10 text-green-400 border-green-500/30">
                          Confirmado
                        </Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="past" className="mt-4">
                  <div className="space-y-4">
                    {mockPastEvents.map((event) => (
                      <div key={event.id} className="flex items-center space-x-4 p-4 bg-card/30 rounded-lg border border-card-border">
                        <div className="w-16 h-16 bg-muted/10 rounded-lg flex items-center justify-center">
                          <Calendar className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white">{event.name}</h4>
                          <p className="text-sm text-muted-foreground">{event.date}</p>
                          <p className="text-xs text-muted-foreground flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {event.location}
                          </p>
                        </div>
                        <Badge variant="secondary" className="bg-secondary/20 text-secondary-foreground">
                          Participou
                        </Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;
