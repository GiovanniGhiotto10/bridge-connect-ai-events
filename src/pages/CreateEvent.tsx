import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Upload, 
  X,
  Plus
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState("");

  const predefinedTags = [
    "Tecnologia", "Negócios", "Networking", "Startups", "Inovação",
    "Marketing", "Vendas", "Design", "Produto", "Liderança",
    "Empreendedorismo", "Investimentos", "IA & Machine Learning"
  ];

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag) && selectedTags.length < 5) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const addCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim()) && selectedTags.length < 5) {
      setSelectedTags([...selectedTags, customTag.trim()]);
      setCustomTag("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Evento Criado com Sucesso! 🎉",
      description: "Seu evento foi publicado e está disponível para participantes.",
    });
    navigate("/eventos");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn={true} />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl font-bold text-gradient-primary mb-4">
              Conte-nos sobre o seu evento
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Crie um evento que conecta as pessoas certas. Nossa IA vai ajudar a gerar matches perfeitos entre os participantes.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Event Details */}
              <div className="space-y-6">
                <Card className="card-bridge animate-scale-in">
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground">Detalhes Essenciais</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Event Name */}
                    <div className="space-y-2">
                      <Label htmlFor="eventName" className="text-sm font-medium">
                        Nome do Evento *
                      </Label>
                      <Input
                        id="eventName"
                        placeholder="Ex: Summit de Inovação e IA 2025"
                        className="bg-input border-border text-input-foreground"
                        required
                      />
                    </div>

                    {/* Event Banner */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Banner do Evento</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Clique para fazer upload ou arraste uma imagem
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PNG, JPG até 5MB. Recomendado: 1200x600px
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm font-medium">
                        Descrição *
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Descreva seu evento, objetivos, agenda e o que os participantes podem esperar..."
                        className="bg-input border-border text-input-foreground min-h-[120px]"
                        required
                      />
                    </div>

                    {/* Tags/Categories */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">
                        Categoria/Tema (máx. 5 tags)
                      </Label>
                      
                      {/* Selected Tags */}
                      {selectedTags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {selectedTags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="bg-primary/10 text-primary border-primary/20"
                            >
                              {tag}
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-auto p-0 ml-2 hover:bg-transparent"
                                onClick={() => removeTag(tag)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Predefined Tags */}
                      <div className="flex flex-wrap gap-2">
                        {predefinedTags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className={`cursor-pointer transition-colors ${
                              selectedTags.includes(tag)
                                ? "bg-primary/10 text-primary border-primary/20"
                                : "hover:bg-muted"
                            }`}
                            onClick={() => addTag(tag)}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Custom Tag Input */}
                      {selectedTags.length < 5 && (
                        <div className="flex gap-2">
                          <Input
                            placeholder="Adicionar tag personalizada"
                            value={customTag}
                            onChange={(e) => setCustomTag(e.target.value)}
                            className="bg-input border-border text-input-foreground"
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomTag())}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={addCustomTag}
                            disabled={!customTag.trim()}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Logistics */}
              <div className="space-y-6">
                <Card className="card-bridge animate-scale-in">
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground">Logística e Configurações</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Date and Time */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startDate" className="text-sm font-medium flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Data de Início *
                        </Label>
                        <Input
                          id="startDate"
                          type="date"
                          className="bg-input border-border text-input-foreground"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="startTime" className="text-sm font-medium flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Horário *
                        </Label>
                        <Input
                          id="startTime"
                          type="time"
                          className="bg-input border-border text-input-foreground"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="endDate" className="text-sm font-medium">
                          Data de Término
                        </Label>
                        <Input
                          id="endDate"
                          type="date"
                          className="bg-input border-border text-input-foreground"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endTime" className="text-sm font-medium">
                          Horário de Término
                        </Label>
                        <Input
                          id="endTime"
                          type="time"
                          className="bg-input border-border text-input-foreground"
                        />
                      </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Localização *
                      </Label>
                      <Input
                        id="location"
                        placeholder="Endereço completo ou 'Online'"
                        className="bg-input border-border text-input-foreground"
                        required
                      />
                    </div>

                    {/* Capacity */}
                    <div className="space-y-2">
                      <Label htmlFor="capacity" className="text-sm font-medium flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Capacidade *
                      </Label>
                      <Input
                        id="capacity"
                        type="number"
                        placeholder="100"
                        min="1"
                        className="bg-input border-border text-input-foreground"
                        required
                      />
                    </div>

                    {/* Settings Toggles */}
                    <div className="space-y-4 pt-4 border-t border-card-border">
                      <h3 className="font-medium text-foreground">Configurações do Evento</h3>
                      
                      <div className="space-y-4">
                        {/* Free/Paid */}
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <Label className="text-sm font-medium">Evento Gratuito</Label>
                            <p className="text-xs text-muted-foreground">
                              Ative para evento gratuito, desative para pago
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        {/* Public/Private */}
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <Label className="text-sm font-medium">Evento Público</Label>
                            <p className="text-xs text-muted-foreground">
                              Qualquer pessoa pode ver e se inscrever
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        {/* Auto Approval */}
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <Label className="text-sm font-medium">Aprovação Automática</Label>
                            <p className="text-xs text-muted-foreground">
                              Inscrições são aprovadas automaticamente
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-8">
              <Button
                type="submit"
                size="lg"
                className="btn-bridge-primary px-12 py-6 text-lg font-semibold"
              >
                Publicar Evento
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateEvent;