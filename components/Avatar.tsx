import * as React from "react";
import { Image, StyleSheet } from "react-native";
import { AvatarProps } from "../types";
import SvgIcon from "./Icon";
import { iconStyles as styles } from "./styles";

import Profile from "../assets/images/svg/profile.svg";

export default function Avatar({ url, size }: AvatarProps) {
  return url ? (
    <Image
      style={{ ...styles.icon, ...styles[size ?? "medium"] }}
      source={{ uri: url }}
    />
  ) : (
    <SvgIcon size={size ?? "medium"} xml={Profile} />
  );
}
