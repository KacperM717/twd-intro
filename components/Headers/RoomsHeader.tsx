import * as React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SvgIcon from "../Icon";

import SearchIcon from "../../assets/images/svg/search.svg";
import RoomsIcon from "../../assets/images/svg/rooms.svg";

import styles from "./styles";

export default function RoomsHeader(props: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.bigText}>Rooms</Text>
      </View>
      <View style={styles.menu}>
        <SvgIcon xml={SearchIcon} />
        <SvgIcon xml={RoomsIcon} />
      </View>
    </SafeAreaView>
  );
}
