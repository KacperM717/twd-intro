import { useQuery } from "@apollo/client";
import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import { GET_USER_ROOMS } from "../api/query";
import Loader from "../components/Loader";
import RoomsList from "../components/RoomsList";
import { AuthStackParams } from "../types";

export function RoomsScreen({
  navigation,
}: StackScreenProps<AuthStackParams, "Rooms">) {
  const { loading, data } = useQuery(GET_USER_ROOMS);

  const rooms = data?.usersRooms?.rooms;

  const handleUserPress = (roomId: string) => {
    navigation.navigate("Chat", { roomId });
  };

  if (loading) return <Loader />;

  return (
    <View>
      <RoomsList rooms={rooms} onRoomPress={handleUserPress} />
    </View>
  );
}
