import { gql } from "@apollo/client";

export const GET_USER = gql`
  query User {
    user {
      id
      lastName
      firstName
      profilePic
      email
      role
    }
  }
`;

export const GET_USER_ROOMS = gql`
  query UserRooms {
    usersRooms {
      rooms {
        id
        name
        roomPic
      }
      user {
        id
        lastName
        firstName
        profilePic
        email
        role
      }
    }
  }
`;

export const GET_ROOM = gql`
  query Room($roomId: ID!) {
    room(id: $roomId) {
      id
      name
      roomPic
      messages {
        id
        body
        insertedAt
        user {
          id
          firstName
          lastName
          profilePic
          role
        }
      }
    }
  }
`;
