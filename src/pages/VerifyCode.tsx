import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

const VerifyCode = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(59);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "seu@email.com";

  // Timer para reenviar código
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    // Só aceita números
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus no próximo input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Se todos os campos estão preenchidos, verifica automaticamente
    if (newCode.every((digit) => digit !== "") && index === 5) {
      handleVerify(newCode.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const digits = text.replace(/\D/g, "").slice(0, 6).split("");
      
      if (digits.length === 6) {
        setCode(digits);
        handleVerify(digits.join(""));
      } else {
        toast({
          title: "Erro",
          description: "O código deve ter 6 dígitos.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível colar o código.",
        variant: "destructive",
      });
    }
  };

  const handleVerify = async (codeString: string) => {
    setIsLoading(true);

    try {
      // TODO: Verificar código com backend
      // Simulação por enquanto
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Código verificado!",
        description: "Login realizado com sucesso.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Código inválido",
        description: "Por favor, verifique o código e tente novamente.",
        variant: "destructive",
      });
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    if (timer > 0) return;
    
    // TODO: Reenviar código
    toast({
      title: "Código reenviado!",
      description: `Um novo código foi enviado para ${email}`,
    });
    setTimer(59);
    setCode(["", "", "", "", "", ""]);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 relative">
          {/* Botão Voltar */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>

          {/* Título */}
          <div className="text-center mb-8 mt-8">
            <h1 className="text-2xl font-bold text-black mb-2">
              Verifique seu Código
            </h1>
            <p className="text-gray-600 text-sm">
              Por favor, insira o código de 6 dígitos que enviamos para{" "}
              <span className="font-medium text-black">{email}</span>.
            </p>
          </div>

          {/* Campos de código */}
          <div className="flex justify-center gap-2 mb-6">
            {code.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-xl font-semibold bg-gray-50 border-gray-300 text-black"
                disabled={isLoading}
              />
            ))}
          </div>

          {/* Botões de ajuda */}
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={handlePaste}
              className="text-black hover:bg-gray-100"
              disabled={isLoading}
            >
              Colar Código
            </Button>
            
            <button
              onClick={handleResend}
              disabled={timer > 0}
              className={`text-sm ${
                timer > 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-black hover:underline"
              }`}
            >
              {timer > 0 ? `Reenviar código em ${timer}s` : "Reenviar código"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
