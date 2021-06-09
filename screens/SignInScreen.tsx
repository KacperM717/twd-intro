import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { Text } from "../components/Themed";
import { NonAuthStackParams } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignInForm } from "../components/Forms";

export function SignInScreen({
  navigation,
}: StackScreenProps<NonAuthStackParams, "SignIn">) {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>
        Log in and stay in touch with everyone!
      </Text>

      <SignInForm />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {},
  title: {},
  subtitle: {},
});
