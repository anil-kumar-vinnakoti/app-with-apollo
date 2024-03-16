import { useContext, createContext } from "react";
import { Auth0ContextInterface, LogoutOptions } from "@auth0/auth0-react";

interface AuthHeader {
  Authorization: string;
}

interface AuthContextType extends Auth0ContextInterface {
  getAuthHeader: () => Promise<AuthHeader>;
  logout: (options?: LogoutOptions) => Promise<void>;
  /***
   * Debug counter, used with `window.incrementCounter` to cause a React refresh.
   */
}

const defaultAuth: AuthContextType = {
  getAccessTokenSilently: () =>
    Promise.reject("getAccessTokenSilently not set") as any,
  getAccessTokenWithPopup: () =>
    Promise.reject("getAccessTokenWithPopup not set"),
  getAuthHeader: () => Promise.reject("getAuthHeader not set"),
  getIdTokenClaims: () => Promise.reject("getIdTokenClaims not set"),
  handleRedirectCallback: () =>
    Promise.reject("handleRedirectCallback not set"),
  isAuthenticated: false,
  isLoading: false,
  logout: () => Promise.reject("logout"),
  loginWithPopup: () => Promise.reject("loginWithPopup not set"),
  loginWithRedirect: () => Promise.reject("loginWithRedirect not set"),
};
const AuthContext = createContext<AuthContextType>(defaultAuth);

export default AuthContext;

export function useAuthContext() {
  return useContext(AuthContext);
}
