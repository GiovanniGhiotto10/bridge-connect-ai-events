import { useState } from "react";
import Header from "@/components/layout/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, UserPlus, Eye, MessageCircle } from "lucide-react";

// Mock data for matches
const mockMatches = [
  {
    id: 1,
    name: "Ana Silva",
    title: "Diretora de Marketing",
    matchPercentage: 92,
    event: "Tech Summit 2024",
    avatar: "AS",
    company: "TechCorp"
  },
  {
    id: 2,
    name: "João Santos",
    title: "CEO Startup",
    matchPercentage: 87,
    event: "Startup Weekend",
    avatar: "JS",
    company: "InnovaTech"
  },
  {
    id: 3,
    name: "Maria Costa",
    title: "Investidora",
    matchPercentage: 84,
    event: "Investor Day",
    avatar: "MC",
    company: "Venture Capital"
  },
  {
    id: 4,
    name: "Pedro Lima",
    title: "Desenvolvedor Senior",
    matchPercentage: 90,
    event: "DevConf 2024",
    avatar: "PL",
    company: "TechFlow"
  },
  {
    id: 5,
    name: "Carla Mendes",
    title: "Product Manager",
    matchPercentage: 88,
    event: "Product Summit",
    avatar: "CM",
    company: "Innovation Labs"
  },
  {
    id: 6,
    name: "Rafael Torres",
    title: "UX Designer",
    matchPercentage: 85,
    event: "Design Week",
    avatar: "RT",
    company: "Creative Studio"
  }
];

const Matches = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMatches = mockMatches.filter(match =>
    match.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.event.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFollow = (matchId: number) => {
    console.log(`Following match ${matchId}`);
  };

  const handleStartChat = (matchId: number) => {
    console.log(`Starting chat with match ${matchId}`);
  };

  const handleViewProfile = (matchId: number) => {
    console.log(`Viewing profile of match ${matchId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background/95 to-primary/5">
      <Header isLoggedIn={true} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-black text-white uppercase mb-8 text-center">
            Meus Matches
          </h1>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou evento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card border-card-border"
              />
            </div>
          </div>

          {/* Matches Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMatches.map((match) => (
              <Card key={match.id} className="card-bridge-interactive hover:scale-105 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    {/* Avatar and Match Percentage */}
                    <div className="relative">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                          {match.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-1">
                        {match.matchPercentage}%
                      </Badge>
                    </div>
                    
                    {/* User Info */}
                    <div className="space-y-1">
                      <h3 className="font-semibold text-foreground text-lg">{match.name}</h3>
                      <p className="text-sm text-muted-foreground">{match.title}</p>
                      <p className="text-xs text-muted-foreground">{match.company}</p>
                      <p className="text-xs text-primary/80">{match.event}</p>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 w-full">
                      <Button 
                        onClick={() => handleFollow(match.id)}
                        className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/20"
                        size="sm"
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Seguir
                      </Button>
                      
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleStartChat(match.id)}
                          variant="outline"
                          className="flex-1 text-xs"
                          size="sm"
                        >
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Chat
                        </Button>
                        <Button 
                          onClick={() => handleViewProfile(match.id)}
                          variant="outline"
                          className="flex-1 text-xs"
                          size="sm"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Perfil
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredMatches.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <UserPlus className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Nenhum match encontrado</p>
                <p className="text-sm">Tente ajustar sua busca ou participe de mais eventos</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Matches;
