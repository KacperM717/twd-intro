import AsyncStorage from "@react-native-async-storage/async-storage";
import { client } from "../api";

export default async function setAuth(token: string) {
  await AsyncStorage.setItem("token", token);
  client.resetStore();
}
