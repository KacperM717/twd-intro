import React from "react";
import { View, StyleSheet } from "react-native";
import FormInput from "./FormInput";
import FormActionButton from "./FormActionButton";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

type FormFields = {
  email: string;
  password: string;
};

export default function SignInForm() {
  const { handleSubmit, control } = useForm();

  const onSubmit = ({ email, password }: FormFields) => {};

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

      <FormActionButton onPress={handleSubmit(onSubmit)} label={"Sign In"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
