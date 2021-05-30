import { useQuery } from "@apollo/client";
import React, { createContext, useEffect, useReducer, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { client } from "../../api";
import { GET_ROOM, GET_USER_ROOMS } from "../../api/query";
import { ChatDispatch, ChatState, Room } from "../../types";
import chatReducer from "./reducer";
import { SEEN_MESSAGE } from "../../constants/storage";

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
            const cached = await AsyncStorage.getItem(SEEN_MESSAGE + room.id);
            const seenMessage = cached ? JSON.parse(cached) : null;
            dispatch({ type: "setRoom", payload: { ...room, seenMessage } });
          });
        // await client
        //   .subscribe({
        //     query: SUBSCRIBE_ROOM_MESSAGE,
        //     variables: { roomId },
        //   })
        //   .map((data) =>
        //     dispatch({
        //       type: "pushRoomMessages",
        //       payload: { roomId, messages: [data] },
        //     })
        //   );
      });
    },
  });

  useEffect(() => {
    return () => {
      state.rooms.forEach((room) => {
        if (!room.seenMessage) return;
        AsyncStorage.setItem(
          SEEN_MESSAGE + room.id,
          room.seenMessage.toString()
        );
      });
    };
  }, []);

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
