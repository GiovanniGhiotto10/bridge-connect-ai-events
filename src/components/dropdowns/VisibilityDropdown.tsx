
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
        <Button variant="outline" className="text-gray-700 border-gray-300 bg-white hover:bg-white hover:border-blue-400 hover:text-gray-700">
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
      <DropdownMenuContent className="w-56 bg-white border-gray-200 z-50">
        <DropdownMenuItem
          onClick={() => onChange(true)}
          className="text-gray-700 hover:bg-blue-50 hover:text-gray-700 cursor-pointer focus:bg-blue-50 focus:text-gray-700"
        >
          <Globe className="h-4 w-4 mr-2" />
          <div>
            <p className="font-medium">Público</p>
            <p className="text-sm text-gray-500">Qualquer pessoa pode ver e se inscrever</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onChange(false)}
          className="text-gray-700 hover:bg-blue-50 hover:text-gray-700 cursor-pointer focus:bg-blue-50 focus:text-gray-700"
        >
          <Lock className="h-4 w-4 mr-2" />
          <div>
            <p className="font-medium">Privado</p>
            <p className="text-sm text-gray-500">Apenas pessoas convidadas podem participar</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default VisibilityDropdown;
