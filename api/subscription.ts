import { gql } from "@apollo/client";

export const SUBSCRIBE_ROOM_MESSAGE = gql`
  subscription OnMessageAdded($roomId: String!) {
    messageAdded(roomId: $roomId) {
      id
      body
      insertedAt
      user {
        id
        profilePic
        firstName
        lastName
      }
    }
  }
`;

export const SUBSCRIBE_ROOM_TYPING = gql`
  subscription OnUserTyping($roomId: String!) {
    typingUser(roomId: $roomId) {
      user {
        id
        profilePic
        firstName
        lastName
      }
    }
  }
`;
