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
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
              <h1 className="text-5xl lg:text-7xl font-bold text-gradient-primary mb-6 leading-tight">Conecte-se estrategicamente e impulsione o seu networking com a Bridge.</h1>
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
                <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl animate-float" style={{
                animationDelay: '2s'
              }}></div>
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
            
            <div className="max-w-4xl mx-auto">
              <div className="animate-fade-in-up">
                <img src="/lovable-uploads/8a9f4ef8-de41-4a07-b941-952b39e77564.png" alt="Networking inteligente em eventos" className="w-full h-auto rounded-lg shadow-card" />
              </div>
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

        {/* Value Proposition Section - Redesigned */}
        <section className="py-20 bg-gradient-surface" id="organizadores">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Centered Title and Subtitle */}
              <div className="text-center mb-16 animate-fade-in-up">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  SUA PLATAFORMA COMPLETA DE EVENTOS
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Crie momentos memoráveis e conexões estratégicas com a potência da nossa tecnologia de matchmaking.</p>
              </div>

              {/* 5-Block Layout with Neon Connections */}
              <div className="relative">
                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
                  {/* Left Column - Two blocks */}
                  <div className="space-y-8">
                    {/* Top Left Block */}
                    <div className="card-bridge p-6 animate-scale-in relative" id="networking-block">
                      <h3 className="font-bold text-foreground mb-3 text-sm uppercase tracking-wider" id="networking-title">
                        NETWORKING SEM ESFORÇO PARA PARTICIPANTES
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        A IA faz o trabalho pesado de encontrar conexões relevantes.
                      </p>
                    </div>
                    
                    {/* Bottom Left Block */}
                    <div className="card-bridge p-6 animate-scale-in relative" style={{
                    animationDelay: '0.2s'
                  }} id="personalization-block">
                      <h3 className="font-bold text-foreground mb-3 text-sm uppercase tracking-wider" id="personalization-title">
                        OPÇÕES DE PERSONALIZAÇÃO PARA ORGANIZADORES
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Configure eventos públicos, privados, gratuitos ou pagos.
                      </p>
                    </div>
                  </div>

                  {/* Center Block - MATCH IA */}
                  <div className="relative lg:my-8">
                    <div className="card-bridge p-8 animate-scale-in relative z-20" style={{
                    animationDelay: '0.4s'
                  }} id="match-ia-block">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                          <Target className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground text-lg" id="match-ia-title">MATCH IA</h3>
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
                    
                    {/* Neon Connecting Lines - Only on large screens */}
                    <div className="hidden lg:block absolute inset-0 pointer-events-none" style={{
                    zIndex: 10
                  }}>
                      {/* Connection 1: From right side of top-left block to left side of center */}
                      <div className="absolute h-0.5 bg-gradient-to-r from-[#001eff] to-[#001eff]" style={{
                      top: '50%',
                      // Center vertically with top-left block
                      left: '-6rem',
                      // Start from outside the center block
                      width: '6rem',
                      // Connect to left edge of center block
                      transform: 'translateY(-calc(4rem + 1rem))',
                      // Align with top-left block
                      boxShadow: '0 0 10px #001eff, 0 0 20px #001eff50'
                    }}></div>
                      
                      {/* Connection 2: From right side of bottom-left block to left side of center */}
                      <div className="absolute h-0.5 bg-gradient-to-r from-[#001eff] to-[#001eff]" style={{
                      bottom: '50%',
                      // Center vertically with bottom-left block
                      left: '-6rem',
                      // Start from outside the center block
                      width: '6rem',
                      // Connect to left edge of center block
                      transform: 'translateY(calc(4rem + 1rem))',
                      // Align with bottom-left block
                      boxShadow: '0 0 10px #001eff, 0 0 20px #001eff50'
                    }}></div>
                      
                      {/* Connection 3: From left side of top-right block to right side of center */}
                      <div className="absolute h-0.5 bg-gradient-to-l from-[#001eff] to-[#001eff]" style={{
                      top: '50%',
                      // Center vertically with top-right block
                      right: '-6rem',
                      // Start from outside the center block
                      width: '6rem',
                      // Connect to right edge of center block
                      transform: 'translateY(-calc(4rem + 1rem))',
                      // Align with top-right block
                      boxShadow: '0 0 10px #001eff, 0 0 20px #001eff50'
                    }}></div>
                      
                      {/* Connection 4: From left side of bottom-right block to right side of center */}
                      <div className="absolute h-0.5 bg-gradient-to-l from-[#001eff] to-[#001eff]" style={{
                      bottom: '50%',
                      // Center vertically with bottom-right block
                      right: '-6rem',
                      // Start from outside the center block
                      width: '6rem',
                      // Connect to right edge of center block
                      transform: 'translateY(calc(4rem + 1rem))',
                      // Align with bottom-right block
                      boxShadow: '0 0 10px #001eff, 0 0 20px #001eff50'
                    }}></div>
                    </div>
                  </div>

                  {/* Right Column - Two blocks */}
                  <div className="space-y-8">
                    {/* Top Right Block */}
                    <div className="card-bridge p-6 animate-scale-in relative" style={{
                    animationDelay: '0.6s'
                  }} id="community-block">
                      <h3 className="font-bold text-foreground mb-3 text-sm uppercase tracking-wider" id="community-title">
                        COMUNIDADE ENGAJADA E DE ALTO VALOR
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Participantes satisfeitos retornam e recomendam seus eventos.
                      </p>
                    </div>
                    
                    {/* Bottom Right Block */}
                    <div className="card-bridge p-6 animate-scale-in relative" style={{
                    animationDelay: '0.8s'
                  }} id="analytics-block">
                      <h3 className="font-bold text-foreground mb-3 text-sm uppercase tracking-wider" id="analytics-title">
                        ANALYTICS E INSIGHTS EM TEMPO REAL
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Acompanhe o sucesso do seu evento com métricas detalhadas.
                      </p>
                    </div>
                  </div>
                </div>
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