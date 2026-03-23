import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Esto fuerza al navegador a ir al inicio cada vez que cambias de URL
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}