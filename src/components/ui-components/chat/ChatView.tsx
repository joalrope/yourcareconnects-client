import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "../../../store";
import {
  setRoom,
  setSender,
  setConversations,
  setSenderSocketId,
  setReceiver,
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
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "./chat.css";

import emilyIco from "/images/woman.png";
import zoeIco from "/images/woman.png";
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
import { getUserById } from "../../../services";
import { IConversation } from "../../../interface";

const baseUrl = import.meta.env.VITE_URL_BASE;

export const ChatView = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  //const [conversations, setConversations] = useState<IConversation[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const { id, contacts, names } = useSelector((state: RootState) => state.user);
  const { conversations } = useSelector((state: RootState) => state.chat);
  const { sender, receiver, room } = useSelector(
    (state: RootState) => state.chat
  );

  const [messageInputValue, setMessageInputValue] = useState("");

  useEffect(() => {
    return () => {
      dispatch(setRoom(""));
    };
  }, [dispatch]);

  useEffect(() => {
    let conversations: IConversation[] = [];
    const fetchData = async () => {
      conversations = await Promise.all(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        contacts!.map(async (contact: string) => {
          const {
            ok,
            result: { id, fullname, info, pictures },
          } = await getUserById(contact);

          if (ok) {
            return {
              id,
              name: fullname,
              picture: pictures?.profile,
              info,
            };
          }

          return {
            id: "",
            name: "",
            picture: "",
            info: "",
          };
        })
      );

      dispatch(setConversations(conversations));
    };

    fetchData();
  }, [contacts, dispatch]);

  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();

  useEffect(() => {
    if (!sender.socketId) {
      socketRef.current = io(baseUrl, {
        query: { id, names }, // Additional data sent on connection
      });
      socketRef.current.on("connect", () => {
        dispatch(setSenderSocketId(socketRef.current?.id));
      });

      socketRef.current.on("disconnect", () => {
        // Reconnect to the server if it was due to a page reload
        socketRef.current?.connect();
      });
    }
  }, [dispatch, id, names, sender.socketId]);

  useEffect(() => {
    dispatch(
      setSender({
        nickname: names,
        socketId: socketRef.current?.id,
      })
    );
  }, [dispatch, names]);

  const handleOnChange = (val: string) => {
    setMessageInputValue(val);
  };

  const handleOnSendMessage = (val: string) => {
    socketRef.current?.emit("sendMessage", {
      sender,
      receiver,
      room,
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

  const idRef = useRef(contacts?.length);
  useEffect(() => {
    if (loadingMore === true) {
      setTimeout(() => {
        const newConversations: IConversation[] = []; // Add 4 conversations

        for (let i = 0; i < 4; i++) {
          newConversations.push({
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            id: String(++idRef.current!),
            name: `Emily ${idRef.current}`,
            picture: emilyIco,
            info: "none",
          });
        }

        setConversations(conversations.concat(newConversations));
        setLoadingMore(false);
      }, 1500);
    }
  }, [conversations, loadingMore]);

  //const onYReachEnd = () => setLoadingMore(true);

  const handleConvesationClick = async (id: string) => {
    const { ok, result } = await getUserById(id);

    if (ok) {
      dispatch(
        setReceiver({
          id: result.id,
          fullname: result.fullname,
          picture: result.pictures?.profile,
          info: result.info,
        })
      );
    }
  };

  return (
    <div
      style={{
        fontFamily: "Inter",
        fontSize: "8px",
        height: "100%",
        width: "100%",
      }}
    >
      <MainContainer responsive>
        <Sidebar position="left" scrollable={false}>
          <Search placeholder={`${t("Search")}...`} />
          <ConversationList
            scrollable
            loadingMore={loadingMore}
            //onYReachEnd={onYReachEnd}
          >
            {conversations.map((c) => (
              <Conversation
                key={c.id}
                name={c.name}
                info={c.info}
                onClick={() => handleConvesationClick(c.id)}
              >
                <Avatar
                  name={c.name}
                  src={`${baseUrl}/images/${c.id}/${c.picture}`}
                />
              </Conversation>
            ))}
          </ConversationList>
        </Sidebar>

        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar
              src={
                receiver.picture
                  ? `${baseUrl}/images/${receiver.id}/${receiver.picture}`
                  : "/images/transparent.png"
              }
              name={receiver.nickname}
            />
            <ConversationHeader.Content
              userName={receiver.fullname}
              info={receiver.fullname}
            />
            <ConversationHeader.Actions>
              <EllipsisButton
                onClick={() => console.log("Menu")}
                orientation="horizontal"
              />
            </ConversationHeader.Actions>
          </ConversationHeader>
          <MessageList
            typingIndicator={<TypingIndicator content="Zoe is typing" />}
            onClick={() => setShowEmojiPicker(false)}
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
          <div as={MessageInput} style={{ position: "relative" }}>
            <MessageInput
              placeholder={`${t("Type message here")}`}
              value={messageInputValue}
              onChange={handleOnChange}
              onSend={handleOnSendMessage}
              onAttachClick={handleOnAttachClick}
            />
            <div
              style={{
                position: "absolute",
                right: 50,
                bottom: 10,
                cursor: "pointer",
              }}
            >
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  fontSize: 20,
                  height: 20,
                  cursor: "pointer",
                }}
              >
                &#128522;
              </button>
            </div>
            <div style={{ position: "absolute", bottom: 50, right: 48 }}>
              {showEmojiPicker && (
                <EmojiPicker
                  onEmojiClick={onEmojiClick}
                  autoFocusSearch={false}
                  emojiStyle={EmojiStyle.FACEBOOK}
                  defaultSkinTone={SkinTones.MEDIUM}
                  searchDisabled
                  theme={Theme.DARK}
                />
              )}
            </div>
          </div>
        </ChatContainer>
      </MainContainer>
    </div>
  );
};
