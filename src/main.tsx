import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./modules/app";
import "./index.css";

// @ts-expect-error - This package provides a font (doesn't include a type declaration).
import "@fontsource-variable/dm-sans";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
