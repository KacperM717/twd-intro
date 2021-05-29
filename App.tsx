import { ApolloProvider } from "@apollo/client";
import { client } from "./api";

import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  // Just for testing purposes
  const token =
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjaGF0bHkiLCJleHAiOjE2MjMxOTQ2NjQsImlhdCI6MTYyMDc3NTQ2NCwiaXNzIjoiY2hhdGx5IiwianRpIjoiNzFjOGZkODctYTJkOC00OTg1LWE4ODQtZjUzY2NjYzNjY2EzIiwibmJmIjoxNjIwNzc1NDYzLCJzdWIiOiJhZGMxOGQzOS00YjVmLTQyMzItOWE2Yy0zY2UxYTkwMGU5MGEiLCJ0eXAiOiJhY2Nlc3MifQ.80D2XBnmFSqx_CUBdjT55WlYJ3GGwOw_PGyxs6wAtDz1OFyk-IMand3ekINltZ4LOFYaBMzV1iJAa5omXjbWYA";

  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem("token", token);
    })();
  }, [token]);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </ApolloProvider>
    );
  }
}
