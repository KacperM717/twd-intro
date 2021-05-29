import React from "react";
import { View, Text } from "react-native";

export function TODOScreen({ navigation, route }: any) {
  return (
    <View>
      <Text>TODO {route.name}</Text>
    </View>
  );
}
