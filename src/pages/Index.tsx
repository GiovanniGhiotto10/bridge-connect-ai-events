import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Brain, Target, ArrowRight, CheckCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
const Index = () => {
  return <div className="min-h-screen bg-background">
      <Header isLoggedIn={false} />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32 border-b border-card-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
              <h1 className="text-5xl lg:text-7xl font-bold text-gradient-primary mb-6 leading-tight">Conecte-se estrategicamente e impulsione o seu networking com a Bridge.</h1>
              
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 mt-12">
                <Button size="lg" className="btn-bridge-primary px-8 py-6 text-lg font-semibold" asChild>
                  <Link to="/criar-evento">
                    Criar um Evento
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="btn-bridge-outline px-8 py-6 text-lg" asChild>
                  <Link to="/eventos">
                    Descobrir Eventos
                  </Link>
                </Button>
              </div>

              {/* Floating Elements */}
              <div className="relative">
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-float"></div>
                <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl animate-float" style={{
                animationDelay: '2s'
              }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 border-b border-card-border" id="como-funciona">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Como Nossa Inteligência Artificial Conecta Você
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Um processo simples e inteligente que maximiza suas chances de fazer conexões valiosas.
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Step 1 */}
                <div className="text-center animate-scale-in">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                      <Users className="h-10 w-10 text-primary-foreground" />
                    </div>
                    <div className="absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent hidden lg:block transform -translate-x-1/2 z-0"></div>
                    <Badge className="bg-primary/10 text-primary border-primary/20 absolute -top-2 -right-2">
                      1
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Crie seu Perfil</h3>
                  <p className="text-muted-foreground">
                    Adicione seus interesses, o que você busca e o que oferece. 
                    Quanto mais completo, melhores as conexões.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="text-center animate-scale-in" style={{
                animationDelay: '0.2s'
              }}>
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                      <Calendar className="h-10 w-10 text-primary-foreground" />
                    </div>
                    <div className="absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent hidden lg:block transform -translate-x-1/2 z-0"></div>
                    <Badge className="bg-primary/10 text-primary border-primary/20 absolute -top-2 -right-2">
                      2
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Participe de um Evento</h3>
                  <p className="text-muted-foreground">
                    Ao confirmar presença, nossa IA analisa seu perfil contra o de todos os outros participantes.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="text-center animate-scale-in" style={{
                animationDelay: '0.4s'
              }}>
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Brain className="h-10 w-10 text-primary-foreground" />
                    </div>
                    <Badge className="bg-primary/10 text-primary border-primary/20 absolute -top-2 -right-2">
                      3
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Descubra suas Conexões</h3>
                  <p className="text-muted-foreground">
                    Envie convites, agende reuniões e construa relacionamentos que geram valor se conectando com as pessoas certas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-16 bg-card/30 border-b border-card-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                A Ponte para Conexões de Valor
              </h2>
            </div>
            
            <div className="max-w-6xl mx-auto">
              <div className="animate-fade-in-up">
                <img src="/lovable-uploads/8a9f4ef8-de41-4a07-b941-952b39e77564.png" alt="Networking inteligente em eventos" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-surface border-t border-card-border">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Pronto para Construir Pontes para o Sucesso?
              </h2>
              <p className="text-lg text-muted-foreground mb-10">
                Cadastre-se gratuitamente e comece a transformar seus eventos e seu networking hoje mesmo.
              </p>
              
              <Button size="lg" className="btn-bridge-primary px-12 py-6 text-xl font-semibold glow-primary" asChild>
                <Link to="/cadastro">
                  Cadastre-se Agora
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default Index;