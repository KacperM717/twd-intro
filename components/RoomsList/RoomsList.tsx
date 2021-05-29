import * as React from "react";
import { FlatList } from "react-native";
import { View } from "../Themed";
import { Room, RoomsListProps } from "../../types";
import Item from "./RoomsListItem";

export default function RoomsList({ rooms, onRoomPress }: RoomsListProps) {
  const renderItem = ({ item }: { item: Room }) => (
    <Item data={item} onPress={() => onRoomPress(item.id)} />
  );

  return (
    <FlatList
      data={rooms}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    ></FlatList>
  );
}
