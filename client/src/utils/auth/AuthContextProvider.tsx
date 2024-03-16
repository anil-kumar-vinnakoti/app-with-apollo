import React, { useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AuthContext from "./AuthContext";

export const AUTH0_SCOPE = "openid profile email offline_access";

interface Props {
  children: React.ReactNode;
}

function AuthContextProvider({ children }: Props) {
  const auth0 = useAuth0();
  const { getAccessTokenSilently } = auth0;

  //   useEffect(() => {
  //     // Add a convenient way to force a React refresh in local and dev for debugging
  //     if (isLocal || isDev) {
  //       // @ts-ignore
  //       window.incrementCounter = () => setCounter((c) => c + 1);
  //     }
  //   }, []);

  const getAuthHeader = useCallback(async () => {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        // the `scope` param is not actually sent with the request, so when
        // refreshing a token and the `email` scope does not exist, the `email`
        // claim does not get added to the token. this workaround allows us to
        // send in the "scope" and the auth0 "Enhance Claim" action will check
        // its existence
        //
        // @see https://community.auth0.com/t/original-granted-scopes-not-not-available-in-rules-action-when-refreshing-token/72419
        // @see https://github.com/auth0/auth0-spa-js/issues/896
        _scope: AUTH0_SCOPE,
      },
    });

    return { Authorization: `Bearer ${token}` };
  }, [getAccessTokenSilently]);

  return (
    <AuthContext.Provider value={{ ...auth0, getAuthHeader }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
