import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router} from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import EntriesProvider from "./context/EntriesContext.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <EntriesProvider>
        <App />
      </EntriesProvider>
    </Router>
  </StrictMode>,
)
