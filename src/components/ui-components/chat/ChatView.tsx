import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "../../../store";
import {
  setReceiver,
  setRoom,
  setSender,
  setSocketId,
} from "../../../store/slices";
import {
  Avatar,
  ChatContainer,
  Conversation,
  ConversationHeader,
  ConversationList,
  EllipsisButton,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
  MessageSeparator,
  Search,
  Sidebar,
  TypingIndicator,
  //VideoCallButton,
  //VoiceCallButton,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "./chat.css";

import lillyIco from "/images/woman.png";
import joeIco from "/images/man.png";
import emilyIco from "/images/woman.png";
import kaiIco from "/images/woman.png";
import akaneIco from "/images/man.png";
import eliotIco from "/images/man.png";
import zoeIco from "/images/woman.png";
import patrikIco from "/images/man.png";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import EmojiPicker, {
  EmojiClickData,
  EmojiStyle,
  SkinTones,
  Theme,
  //Categories,
  //EmojiClickData,
  //Emoji,
  //SuggestionMode,
  //SkinTonePickerLocation,
} from "emoji-picker-react";

const baseUrl = import.meta.env.VITE_URL_BASE;

export const ChatView = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { id } = useSelector((state: RootState) => state.user);
  const { socketId, sender } = useSelector((state: RootState) => state.chat);

  const [messageInputValue, setMessageInputValue] = useState("");
  //const [room, setRoom] = useState<string | undefined>("");
  //const [receiver, setReceiver] = useState<string | undefined>("");

  useEffect(() => {
    dispatch(setSender(id));
  }, [dispatch, id]);

  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();

  useEffect(() => {
    if (sender && !socketId) {
      socketRef.current = io(baseUrl);
      socketRef.current.on("connect", () => {
        dispatch(setSocketId(socketRef.current?.id));
      });

      socketRef.current.on("disconnect", () => {
        // Reconnect to the server if it was due to a page reload
        socketRef.current?.connect();
      });

      socketRef.current?.emit("joinRoom", {
        socketId,
        sender,
      });
    }
  }, [dispatch, sender, socketId]);

  const handleOnChange = (val: string) => {
    setMessageInputValue(val);
  };

  const handleOnSendMessage = (val: string) => {
    socketRef.current?.emit("sendMessage", {
      sender,
      receiver: "Lilly",
      message: val,
      time: new Date(),
    });

    setMessageInputValue("");
  };

  const handleOnAttachClick = () => {
    console.log("attach");
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function onEmojiClick(emojiData: EmojiClickData, _event: MouseEvent) {
    setMessageInputValue(
      (inputValue) =>
        inputValue + (emojiData.isCustom ? emojiData.unified : emojiData.emoji)
    );
  }

  return (
    <div
      style={{
        fontFamily: "Roboto",
        fontSize: "8px",
        height: "calc(100% + 47px)",
        left: -24,
        position: "relative",
        top: -24,
        width: "calc(100% + 48px)",
      }}
    >
      <MainContainer responsive>
        <Sidebar position="left" scrollable={false}>
          <Search placeholder={`${t("Search")}...`} />
          <ConversationList>
            <Conversation
              name="Lilly"
              lastSenderName="Lilly"
              info="Yes i can do it for you"
              onClick={() => {
                dispatch(setReceiver("Lilly"));
                dispatch(setRoom("Lilly"));
              }}
            >
              <Avatar src={lillyIco} name="Lilly" status="available" />
            </Conversation>

            <Conversation
              name="Joe"
              lastSenderName="Joe"
              info="Yes i can do it for you"
            >
              <Avatar src={joeIco} name="Joe" status="dnd" />
            </Conversation>

            <Conversation
              name="Emily"
              lastSenderName="Emily"
              info="Yes i can do it for you"
              unreadCnt={3}
            >
              <Avatar src={emilyIco} name="Emily" status="available" />
            </Conversation>

            <Conversation
              name="Kai"
              lastSenderName="Kai"
              info="Yes i can do it for you"
              unreadDot
            >
              <Avatar src={kaiIco} name="Kai" status="unavailable" />
            </Conversation>

            <Conversation
              name="Akane"
              lastSenderName="Akane"
              info="Yes i can do it for you"
            >
              <Avatar src={akaneIco} name="Akane" status="eager" />
            </Conversation>

            <Conversation
              name="Eliot"
              lastSenderName="Eliot"
              info="Yes i can do it for you"
            >
              <Avatar src={eliotIco} name="Eliot" status="away" />
            </Conversation>

            <Conversation
              name="Zoe"
              lastSenderName="Zoe"
              info="Yes i can do it for you"
            >
              <Avatar src={zoeIco} name="Zoe" status="dnd" />
            </Conversation>

            <Conversation
              name="Patrik"
              lastSenderName="Patrik"
              info="Yes i can do it for you"
            >
              <Avatar src={patrikIco} name="Patrik" status="invisible" />
            </Conversation>
          </ConversationList>
        </Sidebar>

        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar src={zoeIco} name="Zoe" />
            <ConversationHeader.Content
              userName="Zoe"
              info="Active 10 mins ago"
            />
            <ConversationHeader.Actions>
              {/*  <VoiceCallButton onClick={() => console.log("Voice Call")} />
              <VideoCallButton onClick={() => console.log("Video Call")} /> */}
              <EllipsisButton
                onClick={() => console.log("Menu")}
                orientation="horizontal"
              />
            </ConversationHeader.Actions>
          </ConversationHeader>
          <MessageList
            typingIndicator={<TypingIndicator content="Zoe is typing" />}
          >
            <MessageSeparator content="Saturday, 30 November 2019" />
            <Message
              model={{
                message: "Hello my friend, \nHow are you?",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "single",
              }}
              className="ycc-message"
            >
              <Avatar src={zoeIco} name="Zoe" />
            </Message>
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Patrik",
                direction: "outgoing",
                position: "single",
              }}
              //avatarSpacer
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "first",
              }}
              avatarSpacer
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "normal",
              }}
              avatarSpacer
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "normal",
              }}
              avatarSpacer
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "last",
              }}
            >
              <Avatar src={zoeIco} name="Zoe" />
            </Message>
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Patrik",
                direction: "outgoing",
                position: "first",
              }}
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Patrik",
                direction: "outgoing",
                position: "normal",
              }}
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Patrik",
                direction: "outgoing",
                position: "normal",
              }}
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Patrik",
                direction: "outgoing",
                position: "last",
              }}
            />

            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "first",
              }}
              avatarSpacer
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "last",
              }}
            >
              <Avatar src={zoeIco} name="Zoe" />
            </Message>
          </MessageList>
          <MessageInput
            placeholder={`${t("Type message here")}`}
            value={messageInputValue}
            onChange={handleOnChange}
            onSend={handleOnSendMessage}
            onAttachClick={handleOnAttachClick}
          />
        </ChatContainer>
      </MainContainer>
      <div style={{ position: "absolute", bottom: 50, right: 50, zIndex: 2 }}>
        <EmojiPicker
          onEmojiClick={onEmojiClick}
          autoFocusSearch={false}
          emojiStyle={EmojiStyle.FACEBOOK}
          theme={Theme.LIGHT}
          defaultSkinTone={SkinTones.MEDIUM}
          searchDisabled
        />
      </div>
    </div>
  );
};
