import * as React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "../Avatar";
import SvgIcon from "../Icon";

import PhoneIcon from "../../assets/images/svg/phone.svg";
import CameraIcon from "../../assets/images/svg/videocall.svg";

import styles from "./styles";
import lastActivity from "../../utils/lastActivity";

export default function ChatHeader(props: any) {
  const { roomPic, name, lastMessageTime } = props.scene.descriptor.options;
  return (
    <SafeAreaView style={styles.container}>
      <Avatar url={roomPic} size="small" />
      <View style={styles.title}>
        <Text style={styles.mediumText} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.smallText} numberOfLines={1}>
          Active {lastActivity(lastMessageTime)}
        </Text>
      </View>

      <View style={styles.menu}>
        <SvgIcon xml={PhoneIcon} />
        <SvgIcon xml={CameraIcon} />
      </View>
    </SafeAreaView>
  );
}
