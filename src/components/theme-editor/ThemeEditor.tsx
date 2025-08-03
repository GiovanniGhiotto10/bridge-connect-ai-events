
import { useState } from "react";
import { X, Palette, Type, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Theme {
  id: string;
  name: string;
  preview: string;
  background: string;
  primaryColor: string;
  textColor: string;
  fontFamily: string;
  animated?: boolean;
}

interface ThemeEditorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const predefinedThemes: Theme[] = [
  {
    id: "minimalista",
    name: "Minimalista",
    preview: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    primaryColor: "#667eea",
    textColor: "#ffffff",
    fontFamily: "Inter"
  },
  {
    id: "quantum",
    name: "Quantum",
    preview: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
    background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
    primaryColor: "#ff6b6b",
    textColor: "#ffffff",
    fontFamily: "Space Grotesk"
  },
  {
    id: "warp",
    name: "Warp",
    preview: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    primaryColor: "#a8edea",
    textColor: "#2d3748",
    fontFamily: "Poppins"
  },
  {
    id: "emoji",
    name: "Emoji",
    preview: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    primaryColor: "#fcb69f",
    textColor: "#2d3748",
    fontFamily: "Comic Sans MS"
  },
  {
    id: "profissional",
    name: "Profissional",
    preview: "linear-gradient(135deg, #434343 0%, #000000 100%)",
    background: "linear-gradient(135deg, #434343 0%, #000000 100%)",
    primaryColor: "#666666",
    textColor: "#ffffff",
    fontFamily: "Arial"
  },
  {
    id: "estrelas",
    name: "Estrelas",
    preview: "linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 100%)",
    background: "linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 100%)",
    primaryColor: "#4f46e5",
    textColor: "#ffffff",
    fontFamily: "Inter",
    animated: true
  }
];

const ThemeEditor = ({ isOpen, onClose, selectedTheme, onThemeChange }: ThemeEditorProps) => {
  const [currentTheme, setCurrentTheme] = useState(selectedTheme);
  const [isDarkMode, setIsDarkMode] = useState(true);

  if (!isOpen) return null;

  const handleThemeSelect = (theme: Theme) => {
    setCurrentTheme(theme);
    onThemeChange(theme);
  };

  const handleColorChange = (color: string) => {
    const updatedTheme = { ...currentTheme, primaryColor: color };
    setCurrentTheme(updatedTheme);
    onThemeChange(updatedTheme);
  };

  const handleFontChange = (font: string) => {
    const updatedTheme = { ...currentTheme, fontFamily: font };
    setCurrentTheme(updatedTheme);
    onThemeChange(updatedTheme);
  };

  const toggleMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    const updatedTheme = {
      ...currentTheme,
      textColor: newMode ? "#ffffff" : "#2d3748",
      background: newMode 
        ? currentTheme.background.replace(/\)/g, ", 0.8)")
        : currentTheme.background.replace(/, 0\.8\)/g, ")")
    };
    
    setCurrentTheme(updatedTheme);
    onThemeChange(updatedTheme);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-700 p-6" style={{ backgroundColor: '#040A1A' }}>
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Editor de Tema</h3>
          <Button onClick={onClose} variant="ghost" size="icon" className="text-white hover:bg-gray-800">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Galeria de Temas Pré-definidos */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-white mb-4">Temas Pré-definidos</h4>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {predefinedThemes.map((theme) => (
              <div
                key={theme.id}
                className={`flex-shrink-0 cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                  currentTheme.id === theme.id ? 'border-blue-500' : 'border-gray-600 hover:border-gray-400'
                }`}
                onClick={() => handleThemeSelect(theme)}
              >
                <div
                  className="w-32 h-20 relative"
                  style={{ background: theme.preview }}
                >
                  {theme.animated && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                  )}
                </div>
                <div className="p-2 bg-gray-800">
                  <p className="text-white text-sm font-medium">{theme.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controles de Personalização */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cor */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Palette className="h-4 w-4 text-blue-400" />
              <span className="text-white font-medium">Cor Principal</span>
            </div>
            <div className="flex gap-2">
              {['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'].map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border-2 ${
                    currentTheme.primaryColor === color ? 'border-white' : 'border-gray-600'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                />
              ))}
            </div>
          </div>

          {/* Estilo/Fonte */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Type className="h-4 w-4 text-blue-400" />
              <span className="text-white font-medium">Fonte</span>
            </div>
            <select
              value={currentTheme.fontFamily}
              onChange={(e) => handleFontChange(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            >
              <option value="Inter">Inter</option>
              <option value="Poppins">Poppins</option>
              <option value="Space Grotesk">Space Grotesk</option>
              <option value="Arial">Arial</option>
              <option value="Comic Sans MS">Comic Sans MS</option>
            </select>
          </div>

          {/* Modo Claro/Escuro */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              {isDarkMode ? <Moon className="h-4 w-4 text-blue-400" /> : <Sun className="h-4 w-4 text-blue-400" />}
              <span className="text-white font-medium">Modo de Exibição</span>
            </div>
            <Button
              onClick={toggleMode}
              variant="outline"
              className="w-full border-gray-600 text-white hover:bg-gray-700"
            >
              {isDarkMode ? 'Escuro' : 'Claro'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeEditor;
