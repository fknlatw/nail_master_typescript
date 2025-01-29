import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router} from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import EntriesProvider from "./context/EntriesContext.tsx";
import AuthProvider from "./context/AuthContext.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <EntriesProvider>
          <App />
        </EntriesProvider>
      </AuthProvider>
    </Router>
  </StrictMode>,
)
