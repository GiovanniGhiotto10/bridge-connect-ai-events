
import { useState } from "react";

export interface Theme {
  id: string;
  name: string;
  preview: string;
  background: string;
  primaryColor: string;
  textColor: string;
  fontFamily: string;
  animated?: boolean;
}

const defaultTheme: Theme = {
  id: "default",
  name: "Padrão",
  preview: "linear-gradient(135deg, #040A1A 0%, #1a202c 100%)",
  background: "linear-gradient(135deg, #040A1A 0%, #1a202c 100%)",
  primaryColor: "#3B82F6",
  textColor: "#ffffff",
  fontFamily: "Inter"
};

export const useTheme = () => {
  const [selectedTheme, setSelectedTheme] = useState<Theme>(defaultTheme);

  const updateTheme = (theme: Theme) => {
    setSelectedTheme(theme);
  };

  const resetTheme = () => {
    setSelectedTheme(defaultTheme);
  };

  return {
    selectedTheme,
    updateTheme,
    resetTheme
  };
};
