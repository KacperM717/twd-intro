import React from "react";
import { TextInput, TextInputProps, View, StyleSheet } from "react-native";
import { FormInputProps } from "../../types";
import { Text } from "../Themed";

export default function FormInput({ label, error, ...props }: FormInputProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...props} />
      <Text style={styles.error}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  label: {},
  input: {},
  error: {},
});
