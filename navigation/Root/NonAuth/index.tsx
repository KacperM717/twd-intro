import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TODOScreen } from "../../../screens/TODOScreen";
import { NonAuthStackParams } from "../../../types";

const Stack = createStackNavigator<NonAuthStackParams>();

export function NonAuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="SignIn"
        component={TODOScreen}
        options={{ headerTitle: "Sign In" }}
      />
      <Stack.Screen
        name="SignUp"
        component={TODOScreen}
        options={{ headerTitle: "Sign Up" }}
      />
    </Stack.Navigator>
  );
}
