
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Globe, Lock } from "lucide-react";

interface VisibilityDropdownProps {
  isPublic: boolean;
  onChange: (isPublic: boolean) => void;
}

const VisibilityDropdown = ({ isPublic, onChange }: VisibilityDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-white border-gray-600 bg-gray-800 hover:bg-gray-700">
          {isPublic ? (
            <>
              <Globe className="h-4 w-4 mr-2" />
              Público
            </>
          ) : (
            <>
              <Lock className="h-4 w-4 mr-2" />
              Privado
            </>
          )}
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700">
        <DropdownMenuItem
          onClick={() => onChange(true)}
          className="text-white hover:bg-gray-700"
        >
          <Globe className="h-4 w-4 mr-2" />
          <div>
            <p className="font-medium">Público</p>
            <p className="text-sm text-gray-400">Qualquer pessoa pode ver e se inscrever</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onChange(false)}
          className="text-white hover:bg-gray-700"
        >
          <Lock className="h-4 w-4 mr-2" />
          <div>
            <p className="font-medium">Privado</p>
            <p className="text-sm text-gray-400">Apenas pessoas convidadas podem participar</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default VisibilityDropdown;
