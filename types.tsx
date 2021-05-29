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
