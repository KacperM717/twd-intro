import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { RoomListItemProps } from "../../types";
import lastActivity from "../../utils/lastActivity";
import Avatar from "../Avatar";

export default function RoomsListItem({ data, onPress }: RoomListItemProps) {
  const { name, roomPic, messages, seenMessage } = data;
  const lastMessage =
    messages.length > 0 ? messages[messages.length - 1] : null;
  const unread = lastMessage?.id !== seenMessage?.id;

  const handlePress = () => {
    // TODO as well
    onPress();
  };

  return (
    <TouchableHighlight
      onPress={handlePress}
      style={styles.wrapper}
      underlayColor="rgba(255,255,255,0)"
    >
      <View style={[styles.container, unread && styles.unreadContainer]}>
        <Avatar url={roomPic} />
        <View style={styles.content}>
          <Text
            style={[styles.title, unread && styles.unreadText]}
            numberOfLines={1}
          >
            {name}
          </Text>
          <Text style={[unread && styles.unreadText]} numberOfLines={1}>
            {lastMessage && lastMessage.body}
          </Text>
        </View>
        <Text style={styles.time}>
          {lastMessage && lastActivity(lastMessage.insertedAt)}
        </Text>
      </View>
    </TouchableHighlight>
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
  unreadContainer: {
    backgroundColor: "#5603AD",
  },
  content: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontWeight: "bold",
    marginBottom: 6,
  },
  unreadText: {
    color: "white",
  },
  time: {
    fontSize: 10,
    color: "#9FA2B2",
    position: "relative",
    top: -32,
  },
});
