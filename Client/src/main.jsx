import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/User/AuthContext.jsx";
import { AppProvider } from "./Context/Book/context.jsx";
import { ShelfProvider } from "./Context/Shelf/shelfContext.jsx";
import BookshelvesProvider from "./Context/Shelf/BookshelvesContext.jsx";
import UserProvider from "./Context/User/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <BookshelvesProvider>
          <ShelfProvider>
            <AppProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </AppProvider>
          </ShelfProvider>
        </BookshelvesProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);
