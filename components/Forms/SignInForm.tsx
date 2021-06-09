import React from "react";
import { View, StyleSheet } from "react-native";
import FormInput from "./FormInput";
import FormActionButton from "./FormActionButton";
import { useForm, Controller } from "react-hook-form";
import { SignInFormFields, SignInFormProps } from "../../types";

export default function SignInForm({ onSubmit }: SignInFormProps) {
  const { handleSubmit, control } = useForm();

  const onHandleSubmit = (fields: SignInFormFields) => {
    onSubmit(fields);
  };

  return (
    <View style={styles.container}>
      <Controller
        defaultValue=""
        name="email"
        control={control}
        render={({ field }) => (
          <FormInput
            label={"Email address"}
            onChangeText={(text) => field.onChange(text)}
            value={field.value}
            placeholder=""
          />
        )}
      />
      <Controller
        defaultValue=""
        name="password"
        control={control}
        render={({ field }) => (
          <FormInput
            label={"Password"}
            onChangeText={(text) => field.onChange(text)}
            value={field.value}
            placeholder=""
          />
        )}
      />

      <FormActionButton
        onPress={handleSubmit(onHandleSubmit)}
        label={"Sign In"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
