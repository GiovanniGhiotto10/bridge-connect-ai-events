import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validações
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        throw new Error("Preencha todos os campos");
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error("As senhas não coincidem");
      }

      if (formData.password.length < 6) {
        throw new Error("A senha deve ter pelo menos 6 caracteres");
      }

      // TODO: Implementar registro real
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Bem-vindo ao Bridge.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Erro no cadastro",
        description: error instanceof Error ? error.message : "Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header isLoggedIn={false} />
      
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          <Card className="border-2">
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold text-center text-black">
                Criar Conta
              </CardTitle>
              <CardDescription className="text-center text-black">
                Cadastre-se para começar a usar o Bridge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-black">Nome Completo</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="text-black"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-black">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="text-black"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-black">Senha</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="text-black"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-black">
                    Confirmar Senha
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="text-black"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full btn-bridge-primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Cadastrando..." : "Cadastrar"}
                </Button>

                <div className="text-center text-sm text-black">
                  Já tem uma conta?{" "}
                  <Link 
                    to="/login" 
                    className="text-primary font-semibold hover:underline"
                  >
                    Entrar
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Signup;
