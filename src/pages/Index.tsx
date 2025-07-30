import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="hero-section relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="hero-title mb-6 animate-fade-in-up">
              ENCONTRE AS PESSOAS CERTAS EM CADA EVENTO
            </h1>
            <p className="hero-subtitle text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up">
              Conecte-se em eventos que importam. Nossa IA te ajuda a encontrar as pessoas ideais para networking e colaboração.
            </p>
            <div className="space-x-4 animate-fade-in-up">
              <Button size="lg" className="btn-bridge-primary">
                <Link to="/eventos">Descobrir Eventos</Link>
              </Button>
              <Button variant="outline" size="lg" className="btn-bridge-outline">
                Saiba Mais
              </Button>
            </div>
          </div>
          
          {/* Hero Background - Animated Circles */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            <div className="absolute w-80 h-80 rounded-full bg-gradient-primary opacity-20 filter blur-2xl animate-pulse" style={{ top: '10%', left: '20%' }}></div>
            <div className="absolute w-64 h-64 rounded-full bg-gradient-secondary opacity-30 filter blur-xl animate-pulse" style={{ top: '30%', right: '20%' }}></div>
            <div className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-primary to-secondary opacity-20 filter blur-3xl animate-pulse" style={{ bottom: '10%', left: '30%' }}></div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient-primary mb-8 animate-fade-in-up">
              Como Funciona
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="animate-fade-in-up">
                <div className="w-24 h-24 rounded-full bg-secondary/10 mx-auto flex items-center justify-center mb-4">
                  <span className="text-3xl font-semibold text-secondary">1</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Crie seu Perfil</h3>
                <p className="text-muted-foreground">Diga-nos seus interesses e objetivos de networking.</p>
              </div>
              {/* Step 2 */}
              <div className="animate-fade-in-up">
                <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-4">
                  <span className="text-3xl font-semibold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Encontre Eventos</h3>
                <p className="text-muted-foreground">Nossa IA sugere eventos alinhados com seu perfil.</p>
              </div>
              {/* Step 3 */}
              <div className="animate-fade-in-up">
                <div className="w-24 h-24 rounded-full bg-tertiary/10 mx-auto flex items-center justify-center mb-4">
                  <span className="text-3xl font-semibold text-tertiary">3</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Conecte-se</h3>
                <p className="text-muted-foreground">Faça conexões estratégicas e expanda sua rede.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Complete Platform Section */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient-primary mb-6 animate-fade-in-up">
              Sua plataforma completa de eventos
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in-up">
              Crie momentos memoráveis e conexões estratégicas com a potência da nossa tecnologia de matchmaking.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="animate-fade-in-up">
                <div className="w-16 h-16 rounded-full bg-blue-500/10 mx-auto flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain text-blue-500"><path d="M3 12a9 9 0 0 1 18 0"></path><path d="M6 8a6 6 0 0 1 12 0"></path><path d="M7 3a5 5 0 0 1 10 0"></path></svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Matchmaking Inteligente</h3>
                <p className="text-muted-foreground">IA que conecta você com as pessoas certas.</p>
              </div>
              {/* Feature 2 */}
              <div className="animate-fade-in-up">
                <div className="w-16 h-16 rounded-full bg-green-500/10 mx-auto flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar-heart text-green-500"><path d="M21 12V7H3V12"/><path d="M5 22h14"/><path d="M8 2v4"/><path d="M16 2v4"/><path d="m16.4 18.6-1.4-1.4-1.4 1.4"/><path d="m12 15.6-1.4-1.4-1.4 1.4"/><path d="m7.6 18.6-1.4-1.4-1.4 1.4"/></svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Eventos Personalizados</h3>
                <p className="text-muted-foreground">Recomendação de eventos sob medida para você.</p>
              </div>
              {/* Feature 3 */}
              <div className="animate-fade-in-up">
                <div className="w-16 h-16 rounded-full bg-orange-500/10 mx-auto flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-network text-orange-500"><rect width="7" height="7" x="8.5" y="2.5" rx="1"/><rect width="7" height="7" x="2.5" y="14.5" rx="1"/><rect width="7" height="7" x="16.5" y="14.5" rx="1"/><path d="M5.2 14.8c2.1 2.1 5.5 2.1 7.6 0"/><path d="M18.8 14.8c-2.1 2.1-5.5 2.1-7.6 0"/><path d="M12 9.1V12"/><path d="M12 15v2.5"/></svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Networking Estratégico</h3>
                <p className="text-muted-foreground">Expanda sua rede com as conexões certas.</p>
              </div>
              {/* Feature 4 */}
              <div className="animate-fade-in-up">
                <div className="w-16 h-16 rounded-full bg-red-500/10 mx-auto flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-messages-square text-red-500"><path d="M8 9h8"/><path d="M8 13h5"/><path d="M16 4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12z"/></svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Comunicação Facilitada</h3>
                <p className="text-muted-foreground">Interaja e troque mensagens com outros participantes.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-24 bg-secondary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient-primary mb-8 animate-fade-in-up">
              Pronto para começar?
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in-up">
              Junte-se à nossa comunidade e descubra eventos que vão impulsionar sua carreira e seus negócios.
            </p>
            <div className="animate-fade-in-up">
              <Button size="lg" className="btn-bridge-primary">
                <Link to="/cadastro">Cadastre-se Agora</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
