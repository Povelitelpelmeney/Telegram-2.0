import { useContext } from "react";
import { SidebarContext } from "../contexts/SidebarContext";

export const useSidebarNavigation = () => {
  const context = useContext(SidebarContext);

  if (context) return context;
  else
    throw new Error("useTheme hook can only be used inside a SidebarProvider");
};
