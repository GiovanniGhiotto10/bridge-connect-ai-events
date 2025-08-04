
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, MapPin, Users, Heart, X, Star, Calendar, User, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Mock data for matches
const mockMatches = [
  {
    id: 1,
    name: "Ana Silva",
    avatar: "/placeholder.svg",
    bio: "Desenvolvedora Full Stack apaixonada por tecnologia e inovação. Sempre em busca de novos desafios.",
    location: "São Paulo, SP",
    interests: ["React", "Node.js", "Startup"],
    mutualConnections: 5,
    matchPercentage: 87,
    isOnline: true,
    lastSeen: "Agora"
  },
  {
    id: 2,
    name: "João Santos",
    avatar: "/placeholder.svg",
    bio: "Product Manager com 8 anos de experiência em empresas de tecnologia. Mentor de empreendedores.",
    location: "Rio de Janeiro, RJ",
    interests: ["Product Management", "UX", "Agile"],
    mutualConnections: 12,
    matchPercentage: 92,
    isOnline: false,
    lastSeen: "2h atrás"
  },
  {
    id: 3,
    name: "Maria Costa",
    avatar: "/placeholder.svg",
    bio: "Designer UX/UI freelancer. Adoro criar experiências digitais incríveis para usuários.",
    location: "Belo Horizonte, MG",
    interests: ["Design", "UX", "Figma"],
    mutualConnections: 8,
    matchPercentage: 89,
    isOnline: true,
    lastSeen: "Agora"
  },
  {
    id: 4,
    name: "Pedro Oliveira",
    avatar: "/placeholder.svg",
    bio: "Fundador de startup fintech. Especialista em blockchain e criptomoedas.",
    location: "Florianópolis, SC",
    interests: ["Blockchain", "Fintech", "Cripto"],
    mutualConnections: 3,
    matchPercentage: 85,
    isOnline: false,
    lastSeen: "1d atrás"
  }
];

const Matches = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [likedProfiles, setLikedProfiles] = useState<number[]>([]);
  const [dismissedProfiles, setDismissedProfiles] = useState<number[]>([]);

  const filteredMatches = mockMatches.filter(match =>
    !dismissedProfiles.includes(match.id) &&
    (match.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     match.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
     match.interests.some(interest => 
       interest.toLowerCase().includes(searchTerm.toLowerCase())
     ))
  );

  const handleLike = (matchId: number) => {
    setLikedProfiles(prev => [...prev, matchId]);
  };

  const handleDismiss = (matchId: number) => {
    setDismissedProfiles(prev => [...prev, matchId]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background/95 to-primary/5">
      <Header isLoggedIn={true} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-black text-white uppercase mb-8 text-center">
            Seus Matches
          </h1>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Pesquisar por nome, bio ou interesses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 bg-card/50 border-card-border text-white placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="card-bridge">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{likedProfiles.length}</p>
                    <p className="text-sm text-muted-foreground">Curtidas Enviadas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-bridge">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <Users className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">24</p>
                    <p className="text-sm text-muted-foreground">Matches Mútuos</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-bridge">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <MessageCircle className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">12</p>
                    <p className="text-sm text-muted-foreground">Conversas Ativas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Matches Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredMatches.map((match) => (
              <Card key={match.id} className="card-bridge hover:scale-[1.02] transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-16 w-16 border-2 border-primary/20">
                          <AvatarImage src={match.avatar} alt={match.name} />
                          <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                            {match.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {match.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-card rounded-full"></div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-white text-lg line-clamp-1">{match.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 flex-shrink-0" />
                          <span className="line-clamp-1">{match.location}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-primary/10 text-primary border-primary/30 text-xs px-2 py-1">
                      {match.matchPercentage}% Match
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {match.bio}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {match.interests.slice(0, 3).map((interest, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-secondary/20 text-secondary-foreground">
                        {interest}
                      </Badge>
                    ))}
                    {match.interests.length > 3 && (
                      <Badge variant="secondary" className="text-xs bg-secondary/20 text-secondary-foreground">
                        +{match.interests.length - 3}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{match.mutualConnections} conexões mútuas</span>
                    </div>
                    <span>{match.lastSeen}</span>
                  </div>
                  
                  <div className="flex space-x-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDismiss(match.id)}
                      className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Dispensar
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleLike(match.id)}
                      className={cn(
                        "flex-1 transition-all",
                        likedProfiles.includes(match.id)
                          ? "bg-primary/20 border-primary text-primary"
                          : "border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
                      )}
                      disabled={likedProfiles.includes(match.id)}
                    >
                      <Heart className={cn(
                        "h-4 w-4 mr-1",
                        likedProfiles.includes(match.id) && "fill-current"
                      )} />
                      {likedProfiles.includes(match.id) ? "Curtido" : "Conectar"}
                    </Button>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Bate-papo
                    </Button>
                    
                    <Link to={`/perfil/${match.id}`} className="flex-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-muted-foreground hover:bg-card/70 hover:text-foreground"
                      >
                        <User className="h-4 w-4 mr-1" />
                        Ver Perfil
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMatches.length === 0 && (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {searchTerm ? "Nenhum resultado encontrado" : "Nenhum match ainda"}
                </h3>
                <p className="text-muted-foreground">
                  {searchTerm 
                    ? "Tente usar outros termos de busca"
                    : "Continue explorando eventos e fazendo conexões!"
                  }
                </p>
                {!searchTerm && (
                  <Button asChild className="mt-4 btn-bridge-primary">
                    <Link to="/eventos">
                      Descobrir Eventos
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Matches;
