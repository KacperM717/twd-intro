import { gql } from "@apollo/client";

export const SEND_MESSAGE = gql`
  mutation SendMessage($body: String!, $roomId: String!) {
    sendMessage(body: $body, roomId: $roomId) {
      id
      body
      insertedAt
      user {
        id
        firstName
        lastName
        profilePic
      }
    }
  }
`;

export const SEND_USER_TYPING = gql`
  mutation TypingUser($roomId: String!) {
    typingUser(roomId: $roomId) {
      firstName
    }
  }
`;
