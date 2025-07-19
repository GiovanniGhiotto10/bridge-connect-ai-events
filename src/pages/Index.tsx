import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  TrendingUp, 
  Calendar,
  Brain,
  Target,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Quote
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn={false} />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
              <h1 className="text-5xl lg:text-7xl font-bold text-gradient-primary mb-6 leading-tight">
                Eventos que Criam Conexões.{" "}
                <span className="text-foreground">Conexões que Geram Resultados.</span>
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
                Use a Inteligência Artificial da Bridge para encontrar as pessoas certas em cada evento. 
                Transforme networking em oportunidades reais.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
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
                <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-16 bg-card/30 border-y border-card-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                A Ponte para Conexões de Valor
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="card-bridge-interactive text-center group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Target className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="text-4xl font-bold text-gradient-primary mb-2">+ de 85%</div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Match Assertivo</h3>
                  <p className="text-muted-foreground">
                    Nossa IA gera compatibilidades com alta precisão baseada em perfis e objetivos.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-bridge-interactive text-center group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <TrendingUp className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="text-4xl font-bold text-gradient-primary mb-2">40%</div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Aumento em Retenção</h3>
                  <p className="text-muted-foreground">
                    Participantes satisfeitos voltam aos seus eventos com mais frequência.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-bridge-interactive text-center group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Calendar className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="text-4xl font-bold text-gradient-primary mb-2">Milhares</div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Reuniões Agendadas</h3>
                  <p className="text-muted-foreground">
                    Facilitamos reuniões que impulsionam negócios e criam parcerias duradouras.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20" id="como-funciona">
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
                    Quanto mais completo, melhores os matches.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="text-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
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
                <div className="text-center animate-scale-in" style={{ animationDelay: '0.4s' }}>
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Brain className="h-10 w-10 text-primary-foreground" />
                    </div>
                    <Badge className="bg-primary/10 text-primary border-primary/20 absolute -top-2 -right-2">
                      3
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Descubra seus Matches</h3>
                  <p className="text-muted-foreground">
                    Receba uma lista com a porcentagem de compatibilidade e inicie conversas estratégicas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition Section */}
        <section className="py-20 bg-gradient-surface" id="organizadores">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="animate-fade-in-up">
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                    Sua Plataforma Completa de Eventos
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Bridge não é apenas sobre networking — é sobre criar experiências que transformam 
                    participantes em uma comunidade engajada e de alto valor.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground">Networking sem esforço para participantes</h3>
                        <p className="text-muted-foreground text-sm">A IA faz o trabalho pesado de encontrar conexões relevantes</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground">Opções de personalização para organizadores</h3>
                        <p className="text-muted-foreground text-sm">Configure eventos públicos, privados, gratuitos ou pagos</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground">Comunidade engajada e de alto valor</h3>
                        <p className="text-muted-foreground text-sm">Participantes satisfeitos retornam e recomendam seus eventos</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground">Analytics e insights em tempo real</h3>
                        <p className="text-muted-foreground text-sm">Acompanhe o sucesso do seu evento com métricas detalhadas</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="card-bridge p-8 animate-scale-in">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                        <Sparkles className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground">Match IA</h3>
                        <p className="text-sm text-muted-foreground">Tecnologia exclusiva</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm font-medium">Compatibilidade Analisada</span>
                        <Badge className="bg-primary/10 text-primary">98%</Badge>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm font-medium">Conexões Sugeridas</span>
                        <Badge className="bg-primary/10 text-primary">12</Badge>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm font-medium">Reuniões Agendadas</span>
                        <Badge className="bg-success/10 text-success">7</Badge>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating decorative elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full animate-float"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-12">
                Networking que Faz as Pessoas Voltarem
              </h2>
              
              <Card className="card-bridge relative overflow-hidden">
                <CardContent className="p-12">
                  <Quote className="h-12 w-12 text-primary/30 mx-auto mb-6" />
                  <blockquote className="text-xl lg:text-2xl text-foreground font-medium leading-relaxed mb-8">
                    "Pela primeira vez, fui a um evento e saí com três reuniões que se tornaram parcerias. 
                    Com a Bridge, a sensação não é de sorte, é de eficiência."
                  </blockquote>
                  
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-bold">MR</span>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-foreground">Marina Rodrigues</div>
                      <div className="text-sm text-muted-foreground">CEO, TechStart Solutions</div>
                    </div>
                  </div>
                </CardContent>
                
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full translate-y-12 -translate-x-12"></div>
              </Card>
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
              
              <Button 
                size="lg" 
                className="btn-bridge-primary px-12 py-6 text-xl font-semibold glow-primary" 
                asChild
              >
                <Link to="/cadastro">
                  Cadastre-se Agora
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Link>
              </Button>
              
              <p className="text-sm text-muted-foreground mt-6">
                Sem compromisso. Cancele quando quiser.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
