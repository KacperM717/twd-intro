/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParams = {
  Auth: undefined;
  NonAuth: undefined;
  NotFound: undefined;
};

export type NonAuthStackParams = {
  SignUp: undefined;
  SignIn: undefined;
};

export type AuthStackParams = {
  Chat: { roomId: string };
  Rooms: undefined;
};

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePic: string;
  role: string;
};

export type Room = {
  id: string;
  messages: Message[];
  name: string;
  roomPic: string;
  user: User;
  seenMessage?: Message | null;
};

export type Message = {
  id: string;
  body: string;
  insertedAt: string;
  user: User;
};

export type RoomsListProps = {
  rooms: Room[];
  onRoomPress: (roomId: string) => any;
};

export type RoomListItemProps = {
  data: Room;
  onPress: () => void;
};

export type IconSize = "small" | "medium" | "large";

export type SvgIconProps = {
  xml: any;
  size?: IconSize;
};

export type AvatarProps = {
  url?: string;
  size?: IconSize;
};

/**
 * Chat Context
 */
export type ChatState = {
  rooms: Room[];
};

export type ChatDispatch = (actions: ChatAction) => void;

export type ChatAction =
  | {
      type: "updateLastSeen";
      payload: { roomId: string; message: Message };
    }
  | {
      type: "setRooms";
      payload: Room[];
    }
  | {
      type: "setRoom";
      payload: Room;
    }
  | {
      type: "shiftRoomMessages";
      payload: { roomId: string; messages: Message[] };
    }
  | {
      type: "pushRoomMessages";
      payload: { roomId: string; messages: Message[] };
    };
