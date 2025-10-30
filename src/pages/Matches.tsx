
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, MapPin, Users, Heart, Search, Handshake, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Mock data for new matches (suggested profiles)
const mockNewMatches = [
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
  }
];

// Mock data for confirmed matches (my matches)
const mockMyMatches = [
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
    lastSeen: "Agora",
    matchEvent: "Tech Summit 2024"
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
    lastSeen: "1d atrás",
    matchEvent: "Fintech Conference 2024"
  }
];

// Mock data for pending requests
const mockPendingRequests = [
  {
    id: 5,
    name: "Lucas Ferreira",
    avatar: "/placeholder.svg",
    bio: "Desenvolvedor mobile especializado em React Native e Flutter.",
    location: "Curitiba, PR",
    interests: ["Mobile", "React Native", "Flutter"],
    mutualConnections: 7,
    matchPercentage: 88,
    isOnline: false,
    lastSeen: "3h atrás",
    requestSent: "2 dias atrás"
  }
];

const Matches = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<'novos' | 'meus' | 'solicitacoes'>('novos');
  const [likedProfiles, setLikedProfiles] = useState<number[]>([]);
  const [acceptedRequests, setAcceptedRequests] = useState<number[]>([]);
  const [rejectedRequests, setRejectedRequests] = useState<number[]>([]);

  const getCurrentMatches = () => {
    switch (activeTab) {
      case 'novos':
        return mockNewMatches;
      case 'meus':
        return mockMyMatches;
      case 'solicitacoes':
        return mockPendingRequests.filter(req => !acceptedRequests.includes(req.id) && !rejectedRequests.includes(req.id));
      default:
        return mockNewMatches;
    }
  };

  const currentMatches = getCurrentMatches();
  
  const filteredMatches = currentMatches.filter(match =>
    (match.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     match.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
     match.interests.some(interest => 
       interest.toLowerCase().includes(searchTerm.toLowerCase())
     ))
  );

  const handleConnect = (matchId: number) => {
    setLikedProfiles(prev => [...prev, matchId]);
  };

  const handleAcceptRequest = (matchId: number) => {
    setAcceptedRequests(prev => [...prev, matchId]);
  };

  const handleRejectRequest = (matchId: number) => {
    setRejectedRequests(prev => [...prev, matchId]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background/95 to-primary/5">
      <Header isLoggedIn={true} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-black text-white uppercase mb-8 text-center">
            Conexões
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

          {/* Tab Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
            <Card 
              className={cn(
                "card-bridge cursor-pointer transition-all",
                activeTab === 'novos' ? "ring-2 ring-primary bg-primary/10" : "hover:bg-card/70"
              )}
              onClick={() => setActiveTab('novos')}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-black">{mockNewMatches.length}</p>
                    <p className="text-sm text-muted-foreground">Novas Conexões</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className={cn(
                "card-bridge cursor-pointer transition-all",
                activeTab === 'meus' ? "ring-2 ring-green-500 bg-green-500/10" : "hover:bg-card/70"
              )}
              onClick={() => setActiveTab('meus')}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <Handshake className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-black">{mockMyMatches.length}</p>
                    <p className="text-sm text-muted-foreground">Minhas Conexões</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className={cn(
                "card-bridge cursor-pointer transition-all",
                activeTab === 'solicitacoes' ? "ring-2 ring-purple-500 bg-purple-500/10" : "hover:bg-card/70"
              )}
              onClick={() => setActiveTab('solicitacoes')}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <MessageCircle className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-black">{getCurrentMatches().length}</p>
                    <p className="text-sm text-muted-foreground">Solicitações</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Matches Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredMatches.map((match) => (
              <div key={match.id} className="relative">
                <Link to={`/perfil/${match.id}`} className="block">
                  <Card className="card-bridge hover:scale-[1.02] transition-all duration-300 cursor-pointer">
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
                            <h3 className="font-semibold text-black text-lg line-clamp-1">{match.name}</h3>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3 flex-shrink-0" />
                              <span className="line-clamp-1">{match.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {match.bio}
                      </p>

                      {/* Event info for my matches */}
                      {activeTab === 'meus' && 'matchEvent' in match && match.matchEvent && (
                        <div className="text-sm text-primary">
                          <span className="font-medium">Conexão em: </span>
                          {String(match.matchEvent)}
                        </div>
                      )}

                      {/* Request sent info for pending requests */}
                      {activeTab === 'solicitacoes' && 'requestSent' in match && match.requestSent && (
                        <div className="text-sm text-orange-400">
                          <span className="font-medium">Enviado: </span>
                          {String(match.requestSent)}
                        </div>
                      )}
                      
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
                      
                      {/* Bottom section - different layout for "meus matches" */}
                      {activeTab === 'meus' ? (
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{match.mutualConnections} conexões mútuas</span>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2 text-xs text-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                          >
                            <MessageCircle className="h-3 w-3 mr-1" />
                            Bate-papo
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{match.mutualConnections} conexões mútuas</span>
                          </div>
                          <span>{match.lastSeen}</span>
                        </div>
                      )}

                      {/* Action buttons for non-meus tabs */}
                      {activeTab !== 'meus' && (
                        <div className="flex justify-end pt-2">
                          {activeTab === 'novos' && (
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleConnect(match.id);
                              }}
                              className={cn(
                                "h-7 px-2 text-xs transition-all",
                                likedProfiles.includes(match.id)
                                  ? "bg-primary/20 border-primary text-primary"
                                  : "bg-primary hover:bg-primary/90 text-primary-foreground"
                              )}
                              disabled={likedProfiles.includes(match.id)}
                            >
                              <Handshake className={cn(
                                "h-3 w-3 mr-1",
                                likedProfiles.includes(match.id) && "fill-current"
                              )} />
                              {likedProfiles.includes(match.id) ? "Conectado" : "Conectar"}
                            </Button>
                          )}

                          {activeTab === 'solicitacoes' && (
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleRejectRequest(match.id);
                                }}
                                className="h-7 px-2 text-xs bg-red-600 hover:bg-red-700 text-white"
                              >
                                <X className="h-3 w-3 mr-1" />
                                Recusar
                              </Button>
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleAcceptRequest(match.id);
                                }}
                                className="h-7 px-2 text-xs bg-green-600 hover:bg-green-700 text-white"
                              >
                                <Check className="h-3 w-3 mr-1" />
                                Aceitar
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>

          {filteredMatches.length === 0 && (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {searchTerm ? "Nenhum resultado encontrado" : 
                    activeTab === 'novos' ? "Nenhuma nova conexão ainda" : 
                    activeTab === 'meus' ? "Nenhuma conexão confirmada ainda" :
                    "Nenhuma solicitação pendente"}
                </h3>
                <p className="text-muted-foreground">
                  {searchTerm 
                    ? "Tente usar outros termos de busca"
                    : activeTab === 'novos' 
                      ? "Continue explorando eventos e fazendo conexões!"
                      : activeTab === 'meus'
                        ? "Quando você conectar com alguém, aparecerá aqui."
                        : "Suas solicitações enviadas aparecerão aqui."
                  }
                </p>
                {!searchTerm && activeTab === 'novos' && (
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
