import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Users, Bell } from "lucide-react";
import bridgeLogo from "@/assets/logo-Bridge.svg";

// Mock data - Replace with real data from API
const mockMatches = [
  {
    id: 1,
    name: "dfsfsf",
    company: "f",
    position: "f",
    avatar: "",
    reason: "Vocês são uma ótima combinação! Ambos atuam na área de Tecnologia e compartilham interesses em Tecnologia, Marketing e Saúde, criando uma base sólida para conversas e possíveis colaborações. Além disso, o usuário busca 'fff' e Giovanni oferece experiência em programação e startup, o que pode ser relevante dependendo da natureza de 'fff'. Giovanni busca ampliar seu networking, o que se alinha com o interesse do usuário em networking, tornando a conexão mutuamente benéfica.",
  },
  {
    id: 2,
    name: "Guilherme dias",
    company: "Volvo",
    position: "CFO",
    avatar: "",
    reason: "Vocês são uma ótima combinação! Ambos compartilham interesse em Tecnologia, Finanças e Saúde, criando uma base sólida para conversas produtivas. Guilherme, como CFO da Volvo, pode se beneficiar da experiência de Giovanni em startups e tecnologia. Giovanni, por sua vez, pode expandir seu networking e obter insights valiosos sobre investimentos e mercado financeiro com a experiência de Guilherme.",
  },
];

const EventMatches = () => {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("event");
  const [activeTab, setActiveTab] = useState("conexoes");

  return (
    <div className="min-h-screen bg-white">
      <Header isLoggedIn={true} />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full bg-white border border-gray-200 p-1 rounded-lg mb-8">
            <TabsTrigger
              value="conexoes"
              className="flex-1 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
            >
              <img src={bridgeLogo} alt="Bridge" className="w-6 h-6 mr-2" />
              Conexões
            </TabsTrigger>
            <TabsTrigger
              value="participantes"
              className="flex-1 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
            >
              <Users className="w-4 h-4 mr-2" />
              Participantes
            </TabsTrigger>
            <TabsTrigger
              value="solicitacoes"
              className="flex-1 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
            >
              <Bell className="w-4 h-4 mr-2" />
              Solicitações
            </TabsTrigger>
          </TabsList>

          {/* Conexões Tab Content */}
          <TabsContent value="conexoes" className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 uppercase mb-2">
                CONEXÕES
              </h1>
              <p className="text-gray-600">
                Conexões ideais baseadas nos seus interesses
              </p>
            </div>

            {/* Match Cards */}
            <div className="space-y-6">
              {mockMatches.map((match) => (
                <Card
                  key={match.id}
                  className="p-6 bg-white border border-gray-200 hover:border-blue-400 transition-colors"
                >
                  {/* User Info Section */}
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={match.avatar} alt={match.name} />
                      <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                        {match.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {match.name}
                      </h3>
                      <p className="text-sm text-gray-600">{match.company}</p>
                      <p className="text-sm text-gray-600">{match.position}</p>
                    </div>
                  </div>

                  {/* AI Justification Section */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      <span className="font-semibold text-gray-900">Conexão:</span>{" "}
                      {match.reason}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Participantes Tab Content */}
          <TabsContent value="participantes" className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 uppercase mb-2">
                PARTICIPANTES
              </h1>
              <p className="text-gray-600">
                Todos os participantes do evento
              </p>
            </div>
            <div className="text-center py-12 text-gray-500">
              Em breve: lista de todos os participantes
            </div>
          </TabsContent>

          {/* Solicitações Tab Content */}
          <TabsContent value="solicitacoes" className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 uppercase mb-2">
                SOLICITAÇÕES
              </h1>
              <p className="text-gray-600">
                Gerencie suas solicitações de conexão
              </p>
            </div>
            <div className="text-center py-12 text-gray-500">
              Em breve: suas solicitações de conexão
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default EventMatches;
