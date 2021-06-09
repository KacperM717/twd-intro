import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { FormActionButtonProps } from "../../types";
import { Text } from "../Themed";

export default function FormActionButton({
  label,
  ...props
}: FormActionButtonProps) {
  return (
    <TouchableOpacity {...props} style={styles.button}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {},
  label: {},
});
