import { Message, User } from "../types";

export default {
  ChatMessages(messages: Message[]) {
    return messages.map(({ id, body, insertedAt, user }) => ({
      _id: id,
      text: body,
      createdAt: insertedAt as any,
      user: {
        _id: user.id,
        name: user.firstName + " " + user.lastName,
        avatar: user.profilePic,
      },
    }));
  },

  Users(users: User[]) {
    return users.map(({ id, firstName, lastName, profilePic }) => ({
      _id: id,
      name: firstName + " " + lastName,
      avatar: profilePic,
    }));
  },
};
