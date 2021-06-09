import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { Text } from "../components/Themed";
import { NonAuthStackParams, SignInFormFields } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignInForm } from "../components/Forms";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../api/mutation";
import setAuth from "../utils/setAuth";

export function SignInScreen({
  navigation,
}: StackScreenProps<NonAuthStackParams, "SignIn">) {
  const [signIn] = useMutation(LOGIN_USER);

  const handleSignIn = async (fields: SignInFormFields) => {
    const { email, password } = fields;

    const res = await signIn({ variables: { email, password } }).catch((e) =>
      console.log(e)
    );
    if (!res) return;
    const {
      loginUser: { token },
    } = res.data;
    await setAuth(token);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>
        Log in and stay in touch with everyone!
      </Text>

      <SignInForm onSubmit={handleSignIn} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {},
  title: {},
  subtitle: {},
});
