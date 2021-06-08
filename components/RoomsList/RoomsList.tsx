import * as React from "react";
import { FlatList } from "react-native";
import { Room, RoomsListProps } from "../../types";
import Item from "./RoomsListItem";
import dayjs from "dayjs";

export default function RoomsList({ rooms, onRoomPress }: RoomsListProps) {
  const sortedRooms = rooms.sort(sortByLastMessage);

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

function sortByLastMessage(a: Room, b: Room) {
  const aDate = dayjs(a.messages[a.messages.length - 1].insertedAt);
  const bDate = dayjs(b.messages[b.messages.length - 1].insertedAt);
  return bDate.diff(aDate);
}
