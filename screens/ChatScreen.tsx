import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { client } from "../api";
import { SEND_MESSAGE, SEND_USER_TYPING } from "../api/mutation";
import { GET_ROOM, GET_USER } from "../api/query";
import {
  SUBSCRIBE_ROOM_MESSAGE,
  SUBSCRIBE_ROOM_TYPING,
} from "../api/subscription";
import Loader from "../components/Loader";
import { AuthStackParams, Message } from "../types";
import giftedMapper from "../utils/giftedChatMapper";

export function ChatScreen({
  navigation,
  route,
}: StackScreenProps<AuthStackParams, "Chat">) {
  const { roomId } = route.params;
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = client.readQuery({ query: GET_USER });
  const { loading } = useQuery(GET_ROOM, {
    variables: { roomId },
    onCompleted: (data) => {
      const { id, name, roomPic, messages } = data.room;
      setMessages(messages);
      navigation.setOptions({ name, roomPic } as any);
    },
    fetchPolicy: "cache-and-network",
  });
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const [sendTyping] = useMutation(SEND_USER_TYPING);

  useSubscription(SUBSCRIBE_ROOM_MESSAGE, {
    variables: { roomId },
    onSubscriptionData: (data) => {
      const message = data.subscriptionData.data.messageAdded;
      setMessages((old) => [...old, message]);
    },
  });

  useSubscription(SUBSCRIBE_ROOM_TYPING, {
    variables: { roomId },
    onSubscriptionData: (data) => {
      console.log("TYPING", data);
    },
  });

  const handleSend = (messages: IMessage[]) => {
    const { text: body } = messages[0];
    sendMessage({
      variables: { body, roomId },
    });
  };

  const handleTyping = () => {
    sendTyping({ variables: { roomId } });
  };

  if (loading) return <Loader />;

  const [giftedUser] = giftedMapper.Users([user]);
  const giftedMessages = giftedMapper.ChatMessages(messages);

  return (
    <GiftedChat
      user={giftedUser}
      messages={giftedMessages}
      onSend={handleSend}
      onInputTextChanged={handleTyping}
      alwaysShowSend={true}
      inverted={false}
    />
  );
}
