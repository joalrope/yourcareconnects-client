import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Schema } from "mongoose";
import { RootState } from "../../../store";
import {
  setConversations,
  setConnectedUsers,
  setReceiverId,
  setSenderId,
  setAddChatMessage,
  setChatMessages,
  setUnreadCount,
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
import EmojiPicker, {
  EmojiClickData,
  //EmojiStyle,
  SkinTones,
  Theme,
  //Categories,
  //EmojiClickData,
  //Emoji,
  //SuggestionMode,
  //SkinTonePickerLocation,
} from "emoji-picker-react";
import {
  IChatMessage,
  IConnectedUsers,
  IConversation,
  IMessageType,
} from "../../../interface";
import { useChatSocketCtx } from "./context";
import { getConversations } from "./helpers/conversations";
import { clearNotificationsById, getUserMessagesById } from "../../../services";

const baseUrl = import.meta.env.VITE_URL_BASE;

const contacInit = {
  id: "",
  names: "",
  picture: "",
  info: "",
  socketId: "",
};

export const ChatView = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { chatMessages, conversations, senderId } = useSelector(
    (state: RootState) => state.chat
  );
  const { id, contacts, names, notifications } = useSelector(
    (state: RootState) => state.user
  );
  const [messageInputValue, setMessageInputValue] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showTyping, setShowTyping] = useState({ isTyping: false, writer: "" });
  const [activeContact, setActiveContact] = useState<IConversation>(contacInit);
  const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(true);

  const { socket } = useChatSocketCtx();

  socket.connect();

  useEffect(() => {
    const fetchData = async () => {
      const conversations = await getConversations(
        contacts as string[],
        notifications as Schema.Types.Mixed
      );
      dispatch(setConversations(conversations));
    };

    fetchData();
  }, [contacts, dispatch, id, notifications]);

  useEffect(() => {
    dispatch(setSenderId(id));

    socket.on("connect", () => {
      socket.emit("signIn", {
        id,
        names,
        socketId: socket.id,
      });
    });

    socket.on("receiveMessage", (message: IChatMessage) => {
      dispatch(setAddChatMessage(message));
    });

    socket.on("updateNotifications", (notifications: number) => {
      console.log({ notiInSocket: notifications });

      //dispatch(setNotifications(notifications));
    });

    socket.on("unsentMessage", (message: string) => {
      console.log({ unsentMessage: message });
    });

    socket.on("connectedUsers", (connectedUsers: IConnectedUsers) => {
      dispatch(setConnectedUsers(connectedUsers));
    });

    socket.on(
      "userIsTyping",
      ({ isTyping, names }: { isTyping: boolean; names: string }) => {
        setShowTyping({ isTyping, writer: names });
      }
    );

    return () => {
      socket.off("connect");
      socket.off("receiveMessage");
      socket.off("updateNotifications");
      socket.off("unsentMessage");
      socket.off("connectedUsers");
      socket.off("userIsTyping");
    };
  }, [socket, dispatch, id, senderId, names]);

  const handleOnChange = (val: string) => {
    socket.emit("userIsTyping", { isTyping: true, names });
    setIsSendButtonDisabled(val.length === 0 ? true : false);
    setMessageInputValue(val);
  };

  const handleOnSendMessage = (message: string) => {
    const type: IMessageType = IMessageType.TEXT;

    const sentTime = new Date().toISOString();

    const msgData = {
      type,
      message,
      sentTime,
      sender: names as string,
      direction: "outgoing",
      position: "right",
      receiverId: activeContact.id,
      senderId,
    };

    if (type === IMessageType.TEXT) {
      socket.emit("sendMessage", msgData);
    }

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
    setIsSendButtonDisabled(false);
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
            names: `Emily ${idRef.current}`,
            picture: "emilyIcon.png",
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
    const contacActive = conversations.find((c) => c.id === id);

    dispatch(setReceiverId(id));

    setActiveContact(contacActive as IConversation);

    let { ok, result } = await getUserMessagesById(senderId, id);

    if (ok) {
      dispatch(setChatMessages(result.messages));
    } else {
      dispatch(setChatMessages([]));
    }

    ({ ok, result } = await clearNotificationsById(id, senderId));

    if (ok) {
      const notifications = result.user.notifications as Schema.Types.Mixed;
      let count = 0;

      if (notifications) {
        Object.entries(notifications).map((key) => {
          count += key[1];
        });

        dispatch(setUnreadCount(count));
      } else {
        dispatch(setUnreadCount(0));
      }

      const fetchData = async () => {
        const conversations = await getConversations(
          contacts as string[],
          notifications as Schema.Types.Mixed
        );
        dispatch(setConversations(conversations));
      };

      fetchData();
      //TODO: setNotifications(0);
    }
  };

  const handleOnBlur = () => {
    socket.emit("userIsTyping", { isTyping: false, names });
  };

  const onAuxClick = (id: string) => {
    console.log("show context menu", id);
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
            {conversations.map((c) => {
              //console.log(c);
              return (
                <Conversation
                  key={c.id}
                  name={c.names}
                  info={c.info}
                  onClick={() => handleConvesationClick(c.id)}
                  unreadCnt={c.unreadCnt}
                >
                  <Avatar
                    name={c.names}
                    src={`${baseUrl}/images/${c.id}/${c.picture}`}
                  />
                </Conversation>
              );
            })}
          </ConversationList>
        </Sidebar>

        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar
              src={
                activeContact.picture
                  ? `${baseUrl}/images/${activeContact.id}/${activeContact.picture}`
                  : "/images/transparent.png"
              }
              name={activeContact.names}
            />
            <ConversationHeader.Content
              userName={activeContact.names}
              info={"last time online"}
            />
            <ConversationHeader.Actions>
              <EllipsisButton
                onClick={() => console.log("Menu")}
                orientation="vertical"
              />
            </ConversationHeader.Actions>
          </ConversationHeader>

          {activeContact && (
            <MessageList
              key={activeContact.id}
              typingIndicator={
                showTyping.isTyping && (
                  <TypingIndicator
                    content={`${showTyping.writer} ${t("is typing")}`}
                  />
                )
              }
              onClick={() => setShowEmojiPicker(false)}
            >
              <MessageSeparator content="Monday, 13 November 2023" />
              {chatMessages.map(
                ({ message, sentTime, sender, direction }, i) => (
                  <Message
                    key={sentTime + i}
                    model={{
                      message,
                      sentTime,
                      sender,
                      direction,
                      position: "single",
                    }}
                    onAuxClick={() => onAuxClick(sentTime)}
                    //avatarSpacer
                  />
                )
              )}
            </MessageList>
          )}

          <div as={MessageInput} style={{ position: "relative" }}>
            <MessageInput
              key={activeContact.id}
              placeholder={`${t("Type message here")}`}
              value={messageInputValue}
              attachButton={false}
              sendDisabled={isSendButtonDisabled || activeContact.id === ""}
              onAttachClick={handleOnAttachClick}
              onBlur={handleOnBlur}
              onChange={handleOnChange}
              onSend={handleOnSendMessage}
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
                  //emojiStyle={EmojiStyle.FACEBOOK}
                  defaultSkinTone={SkinTones.MEDIUM}
                  searchDisabled
                  lazyLoadEmojis={true}
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
