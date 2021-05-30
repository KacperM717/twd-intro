import { ChatState, ChatAction } from "../../types";

export default function chatReducer(
  state: ChatState,
  action: ChatAction
): ChatState {
  switch (action.type) {
    case "setRooms": {
      return {
        ...state,
        rooms: action.payload,
      };
    }
    case "setRoom": {
      const { id } = action.payload;
      return {
        ...state,
        rooms: [
          ...state.rooms.filter((room) => room.id !== id),
          action.payload,
        ],
      };
    }
    case "updateLastSeen": {
      const { roomId, message } = action.payload;
      return {
        ...state,
        rooms: state.rooms.map((room) => {
          if (roomId !== room.id) return room;
          return {
            ...room,
            seenMessage: message,
          };
        }),
      };
    }
    case "pushRoomMessages": {
      const { roomId, messages } = action.payload;
      return {
        ...state,
        rooms: state.rooms.map((room) => {
          if (roomId !== room.id) return room;
          return {
            ...room,
            messages: [...room.messages, ...messages],
          };
        }),
      };
    }
    case "shiftRoomMessages": {
      const { roomId, messages } = action.payload;
      return {
        ...state,
        rooms: state.rooms.map((room) => {
          if (roomId !== room.id) return room;
          return {
            ...room,
            messages: [...messages, ...room.messages],
          };
        }),
      };
    }
    default:
      return state;
  }
}
