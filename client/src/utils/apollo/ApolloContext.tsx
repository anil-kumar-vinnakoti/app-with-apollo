import { createContext, useContext } from "react";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

interface ApolloContextType {
  atlasClient: ApolloClient<NormalizedCacheObject>;
  papiClient: ApolloClient<NormalizedCacheObject>;
  resetCache: () => Promise<any>;
  resetStore: () => Promise<any>;
}

const ApolloContext = createContext<ApolloContextType>(
  null as unknown as ApolloContextType
);

export default ApolloContext;

export function useApolloContext() {
  return useContext(ApolloContext);
}
