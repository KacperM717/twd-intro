import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RoomsScreen } from "../../../screens/RoomsScreen";
import { ChatScreen } from "../../../screens/ChatScreen";
import { ChatHeader, RoomsHeader } from "../../../components/Headers";
import { AuthStackParams } from "../../../types";

const Stack = createStackNavigator<AuthStackParams>();

export function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#B6DEFD",
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        },
      }}
    >
      <Stack.Screen
        name="Rooms"
        component={RoomsScreen}
        options={{
          header: (props) => <RoomsHeader {...props} />,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          header: (props) => <ChatHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  );
}
