import { useMutation, useSubscription } from "@apollo/client";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import {
  Bubble,
  Composer,
  GiftedChat,
  GiftedChatProps,
  IMessage,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import { client } from "../api";
import { SEND_MESSAGE, SEND_USER_TYPING } from "../api/mutation";
import { GET_USER } from "../api/query";
import { SUBSCRIBE_ROOM_TYPING } from "../api/subscription";
import SvgIcon from "../components/Icon";
import { View, Text } from "../components/Themed";
import { AuthStackParams, Message } from "../types";
import giftedMapper from "../utils/giftedChatMapper";

import SendIcon from "../assets/images/svg/send.svg";
import { useChat } from "../contexts/chat";

export function ChatScreen({
  navigation,
  route,
}: StackScreenProps<AuthStackParams, "Chat">) {
  const { roomId } = route.params;
  const [chatState, chatDispatch] = useChat();

  const room = chatState.rooms.find((room) => room.id === roomId);
  if (!room) return navigation.navigate("Rooms");

  const { name, roomPic, messages } = room;
  const lastMessageTime =
    messages.length > 0 ? messages[messages.length - 1].insertedAt : null;

  const { user } = client.readQuery({ query: GET_USER });

  const [sendMessage] = useMutation(SEND_MESSAGE);
  const [sendTyping] = useMutation(SEND_USER_TYPING);

  useEffect(() => {
    navigation.setOptions({ name, roomPic, lastMessageTime } as any);
  }, [room]);

  // useSubscription(SUBSCRIBE_ROOM_TYPING, {
  //   variables: { roomId },
  //   onSubscriptionData: (data) => {
  //     console.log("TYPING", data);
  //   },
  // });

  const handleSend = (messages: IMessage[]) => {
    const { text: body } = messages[0];
    sendMessage({
      variables: { body, roomId },
    });
  };

  const handleTyping = () => {
    sendTyping({ variables: { roomId } });
  };

  const [giftedUser] = giftedMapper.Users([user]);
  const giftedMessages = giftedMapper.ChatMessages(room.messages);

  return (
    <GiftedChat
      user={giftedUser}
      messages={giftedMessages}
      onSend={handleSend}
      onInputTextChanged={handleTyping}
      alwaysShowSend={true}
      inverted={false}
      renderBubble={renderBubble}
      renderChatFooter={renderFooter}
      renderInputToolbar={renderToolbar}
      renderComposer={renderComposer}
      renderSend={renderSend}
    />
  );
}

function renderBubble(props: GiftedChatProps) {
  // const both = {
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "flex-start",
  //   padding: 12,
  //   marginBottom: 16,
  //   width: "60%",
  // };

  return (
    <Bubble
      {...props}
      renderTime={() => null}
      wrapperStyle={{
        left: {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          padding: 8,
          marginBottom: 8,

          backgroundColor: "#FFFFFF",
        },
        right: {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          padding: 8,
          marginBottom: 8,

          backgroundColor: "#993AFC",
        },
      }}
    />
  );
}

function renderFooter(props: GiftedChatProps) {
  return (
    <View {...props}>
      <Text>TODO: isTyping</Text>
    </View>
  );
}

function renderToolbar(props: GiftedChatProps) {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: "#B6DEFD",
        paddingTop: 15,
        paddingBottom: 12,
        paddingHorizontal: 16,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
      }}
      renderActions={() => null}
    />
  );
}

function renderComposer(props: GiftedChatProps) {
  return (
    <Composer
      {...props}
      textInputStyle={{
        backgroundColor: "#FFFFFF",
        color: "#000000",
        borderRadius: 12,
        borderBottomRightRadius: 0,
        padding: 12,
        borderBottomWidth: 0,
      }}
    />
  );
}

function renderSend(props: GiftedChatProps) {
  return (
    <Send
      {...props}
      containerStyle={
        {
          /*Empty to reset*/
        }
      }
    >
      <SvgIcon xml={SendIcon} />
    </Send>
  );
}
