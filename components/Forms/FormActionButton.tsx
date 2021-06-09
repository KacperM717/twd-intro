import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { Text } from "../Themed";

interface FormActionButtonProps extends TouchableOpacityProps {
  label: string;
}
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
