
import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { layoutDashboard, layoutList } from "lucide-react";

const MainMenu: React.FC = () => (
  <nav className="w-full flex items-center justify-center py-4">
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/"
            className="flex items-center gap-2 font-semibold"
          >
            {/* Icono opcional */}
            <span className="text-purple-400">Logic Gate</span> Inicio
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/"
            className="flex items-center gap-2"
          >
            {/* Aquí puedes cambiar el link si tienes otras rutas */}
            <span className="text-purple-400">🎮</span> Jugar
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </nav>
);

export default MainMenu;
