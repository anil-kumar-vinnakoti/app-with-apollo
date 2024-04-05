import {
  from,
  ApolloLink,
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { useAuthContext } from "../auth/AuthContext";
import ApolloContext from "./ApolloContext";
import { useMemo } from "react";
import { onError } from "@apollo/client/link/error";

export const getClient = ({
  apiHostName,
  // appName,
  // cacheOptions = {},
  getAuthHeader,
  // historyReplace
}) => {
  const authLink = new ApolloLink(async (operation, forward) => {
    // add the authorization to the headers
    const token = await getAuthHeader();
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: token.Authorization,
      },
    }));

    return forward(operation);
  });

  const formatDateLink = new ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
      // here we can format response data
      return response;
    });
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const httpLink = new HttpLink({ uri: apiHostName });

  let links = [authLink, errorLink, formatDateLink, httpLink];

  const cache = new InMemoryCache({});

  return new ApolloClient({
    link: from(links),
    cache,
    // name: "Apollo App",
  });
};

export const ApolloClientProvider = (props) => {
  const { getAuthHeader } = useAuthContext();
  // const { replace } = useHistory();

  const client = useMemo(
    () =>
      getClient({
        apiHostName: "http://localhost:4000/graphql",
        appName: "apollo-app",
        getAuthHeader,
        // historyReplace: replace,
      }),
    [getAuthHeader] // add replace if your using it
  );

  const resetCache = useMemo(() => {
    return async () => {
      // clearStore will remove all the data from the store, and will not refetch
      // any active queries.
      // @see https://www.apollographql.com/docs/react/api/core/ApolloClient/#ApolloClient.clearStore
      await client.clearStore();
    };
  }, [client]);

  const resetStore = useMemo(() => {
    return async () => {
      // resetStore will remove all the data from the store and then refetch any
      // active queries.
      // @see https://www.apollographql.com/docs/react/api/core/ApolloClient/#ApolloClient.resetStore
      await client.resetStore();
    };
  }, [client]);

  return (
    <ApolloContext.Provider value={{ client, resetCache, resetStore }}>
      <ApolloProvider {...props} client={client} />
    </ApolloContext.Provider>
  );
};
