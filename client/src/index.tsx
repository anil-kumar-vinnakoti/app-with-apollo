import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import AuthContextProvider from "./utils/auth/AuthContextProvider";
import { ApolloClientProvider } from "./utils/apollo";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-lokpkdwjbb1xoaby.us.auth0.com"
      clientId="NS58yWlGCNmtNoZYng4x1gET4VJUY76h"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "apollo-app-unique-identifier",
        scope: "openid profile email",
      }}
    >
      <AuthContextProvider>
        <ApolloClientProvider>
          <App />
        </ApolloClientProvider>
      </AuthContextProvider>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
