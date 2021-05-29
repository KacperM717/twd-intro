import * as React from "react";
import { SvgXml } from "react-native-svg";
import { iconStyles } from "./styles";
import { SvgIconProps } from "../types";

export default function SvgIcon({ size, xml }: SvgIconProps) {
  return (
    <SvgXml
      style={{ ...iconStyles.icon }}
      {...iconStyles[size ?? "small"]}
      xml={xml}
    />
  );
}
