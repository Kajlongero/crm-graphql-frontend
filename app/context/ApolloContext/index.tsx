'use client';
import { ApolloProvider } from "@apollo/client";
import { createContext } from "react";
import client from "@/config/apollo";

export const ApolloContext = createContext({});

export default function ContextApolloProvider ({ children }: { children: React.ReactNode }) {
  return (
    <ApolloContext.Provider value={{}}>
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </ApolloContext.Provider>
  )
}