import * as React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { View } from "../components/Themed";

export default function Loader() {
  return (
    <View style={styles.stretch}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  stretch: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(100, 100, 100, 0.1)",
  },
});
