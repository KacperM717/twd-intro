import { useQuery, useSubscription } from "@apollo/client";
import React, { createContext, useEffect, useReducer, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { client } from "../../api";
import { GET_ROOM, GET_USER_ROOMS } from "../../api/query";
import { ChatDispatch, ChatState, Room } from "../../types";
import chatReducer from "./reducer";
import { SEEN_MESSAGE } from "../../constants/storage";
import { SUBSCRIBE_ROOM_MESSAGE } from "../../api/subscription";
import { AppState, AppStateStatus } from "react-native";

const ChatContext =
  createContext<[ChatState, ChatDispatch] | undefined>(undefined);

function ChatProvider({ children }: any) {
  const [state, dispatch] = useReducer(chatReducer, { rooms: [] });

  useQuery(GET_USER_ROOMS, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      const rooms = data.usersRooms.rooms;
      rooms.forEach(async (room: Room) => {
        const roomId = room.id;
        await client
          .query({ query: GET_ROOM, variables: { roomId } })
          .then(async (data: any) => {
            const { room } = data.data;
            const seenMessage = await AsyncStorage.getItem(
              SEEN_MESSAGE + room.id
            );
            const parsed = seenMessage ? JSON.parse(seenMessage) : null;
            dispatch({
              type: "setRoom",
              payload: { ...room, seenMessage: parsed },
            });
          });
        client
          .subscribe({
            query: SUBSCRIBE_ROOM_MESSAGE,
            variables: { roomId },
          })
          .subscribe({
            next(data: any) {
              const message = data.data.messageAdded;
              dispatch({
                type: "pushRoomMessages",
                payload: { roomId, messages: [message] },
              });
            },
          });
      });
    },
  });

  useEffect(() => {
    const { rooms } = state;
    const handler = (status: AppStateStatus) => {
      if (status !== "background") return;
      setSeenMessagesToAsyncStorage(rooms);
    };
    AppState.addEventListener("change", handler);
    return () => {
      AppState.removeEventListener("change", handler);
    };
  }, [state]);

  return (
    <ChatContext.Provider value={[state, dispatch]}>
      {children}
    </ChatContext.Provider>
  );
}

function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined)
    throw new Error("useChat must be used inside ChatProvider");
  return context;
}

export { ChatProvider, useChat };

function setSeenMessagesToAsyncStorage(rooms: Room[]) {
  rooms.forEach((room) => {
    console.log("SETINGASYNC", room.seenMessage);
    if (!room.seenMessage) return;
    const stringified = JSON.stringify(room.seenMessage);
    AsyncStorage.setItem(SEEN_MESSAGE + room.id, stringified);
  });
}
