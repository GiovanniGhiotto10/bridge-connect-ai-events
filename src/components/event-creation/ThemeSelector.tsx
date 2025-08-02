
import { Palette } from "lucide-react";

interface ThemeSelectorProps {
  selectedTheme: string;
  onThemeSelect: (theme: string) => void;
}

const themes = [
  {
    id: "default",
    name: "Padrão",
    color: "#040A1A",
    description: "Azul escuro clássico"
  },
  {
    id: "minimalist",
    name: "Minimalista",
    color: "#1a1a1a",
    description: "Cinza escuro moderno"
  },
  {
    id: "vibrant",
    name: "Vibrante",
    color: "#0f172a",
    description: "Azul naval intenso"
  }
];

const ThemeSelector = ({ selectedTheme, onThemeSelect }: ThemeSelectorProps) => {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-3">
        {themes.map((theme) => (
          <div
            key={theme.id}
            className={`p-3 rounded-lg border cursor-pointer transition-all hover:bg-white/5 ${
              selectedTheme === theme.id
                ? "border-blue-400 bg-blue-400/10"
                : "border-gray-700 hover:border-gray-600"
            }`}
            onClick={() => onThemeSelect(theme.id)}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full border-2 border-gray-600"
                style={{ backgroundColor: theme.color }}
              />
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{theme.name}</p>
                <p className="text-gray-400 text-xs">{theme.description}</p>
              </div>
              {selectedTheme === theme.id && (
                <div className="w-2 h-2 rounded-full bg-blue-400" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
