import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { RoomListItemProps } from "../../types";
import lastActivity from "../../utils/lastActivity";
import Avatar from "../Avatar";

export default function RoomsListItem({ data, onPress }: RoomListItemProps) {
  const { name, roomPic, messages } = data;
  const lastMessage = messages[messages.length - 1];

  const handlePress = () => {
    // TODO as well
    onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.wrapper}>
      <View style={styles.container}>
        <Avatar url={roomPic} />
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.desc} numberOfLines={1}>
            {lastMessage.body}
          </Text>
        </View>
        <Text style={styles.time}>{lastActivity(lastMessage.insertedAt)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 6,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  content: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontWeight: "bold",
    marginBottom: 6,
  },
  desc: {},
  time: {
    fontSize: 10,
    color: "#9FA2B2",
    position: "relative",
    top: -32,
  },
});
