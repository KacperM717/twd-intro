import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthNavigator } from "./Auth";
import { NonAuthNavigator } from "./NonAuth";
import { RootStackParams } from "../../types";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../api/query";
import Loader from "../../components/Loader";

const Stack = createStackNavigator<RootStackParams>();

export function RootNavigator() {
  const { loading, data } = useQuery(GET_USER);

  if (loading) return <Loader />;

  const authorized = data.user.id;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {authorized ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <Stack.Screen name="NonAuth" component={NonAuthNavigator} />
      )}
    </Stack.Navigator>
  );
}
