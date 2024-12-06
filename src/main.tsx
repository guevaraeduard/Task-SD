import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Home } from "./modules/home/pages/home-page";
import "./index.css";

// @ts-expect-error - This package provides a font (doesn't include a type declaration).
import "@fontsource-variable/dm-sans";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Home />
    </StrictMode>,
);
