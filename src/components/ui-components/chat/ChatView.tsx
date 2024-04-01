import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Schema } from "mongoose";

import { Menu, type MenuProps } from "antd";

import { RootState } from "../../../store";
import {
  setConversations,
  setReceiverId,
  setChatMessages,
  setUnreadCount,
} from "../../../store/slices";
import {
  Avatar,
  ChatContainer,
  Conversation,
  ConversationHeader,
  ConversationList,
  //EllipsisButton,
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
import "./styles/chat.css";
import EmojiPicker, {
  EmojiClickData,
  SkinTones,
  Theme,
} from "emoji-picker-react";
import { IChatMessage, IConversation, IMessageType } from "./interfaces";
import { useChatSocketCtx } from "./context";
import { getConversations } from "./helpers/conversations";
import { clearNotificationsById, getUserMessagesById } from "../../../services";
import { useChatMenuItems } from "./hooks/ChatMenuItems";
import { useSocket } from "./hooks/useSocket";
import { months } from "./interfaces/chat";

import styles from "./styles/chat.module.css";

const contacInit = {
  id: "",
  names: "",
  picture: { image: "", name: "", type: "" },
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
  const { language } = useSelector((state: RootState) => state.i18n);

  const [messageInputValue, setMessageInputValue] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [currentPath, setCurrentPath] = useState("info");
  const [loadingMore, setLoadingMore] = useState(false);
  const [showTyping, setShowTyping] = useState({ isTyping: false, writer: "" });
  const [activeContact, setActiveContact] = useState<IConversation>(contacInit);
  const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(true);

  const { socket } = useChatSocketCtx();

  socket.connect();

  const items: MenuProps["items"] = useChatMenuItems();

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

  useSocket(setShowTyping);

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
            picture: {
              image: "emilyIcon.png",
              name: "emilyIcon",
              type: "image/png",
            },
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
      const chatMessages: { [x: string]: IChatMessage[] } = {};

      result.messages.map((m: IChatMessage) => {
        const date = m.sentTime.split("T")[0];

        if (!chatMessages[date]) {
          chatMessages[date] = [];
        }
        chatMessages[date].push(m);
      });

      dispatch(setChatMessages(chatMessages));
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

  /* const handleonMenuClick = () => {
    setShowMenu(!showMenu);
  }; */

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onClickMenu: MenuProps["onClick"] = (e) => {
    setCurrentPath(e.key);
    setShowMenu(!showMenu);
  };

  const getDatePretty = (date: string) => {
    const currentDate = new Date(new Date().toISOString().split("T")[0]);
    const msgGroupDate = new Date(date);
    const day = msgGroupDate.getDate() + 1;
    const month = t(`${months[msgGroupDate.getMonth()]}`);

    if (currentDate.getTime() - msgGroupDate.getTime() === 0) {
      return t("Today");
    }

    if (currentDate.getTime() - msgGroupDate.getTime() === 259200000) {
      return t("Yesterday");
    }

    if (language === "esES") {
      return `${day} de ${month}`;
    }

    return `${month} ${day}`;
  };

  return (
    <div className={styles.chatView}>
      <MainContainer responsive>
        <Sidebar position="left" scrollable={false}>
          <Search placeholder={`${t("Search")}...`} />
          <ConversationList
            scrollable
            loadingMore={loadingMore}
            //onYReachEnd={onYReachEnd}
          >
            {conversations.map((c) => {
              return (
                <Conversation
                  key={c.id}
                  name={c.names}
                  info={c.info}
                  onClick={() => handleConvesationClick(c.id)}
                  unreadCnt={c.unreadCnt}
                >
                  <Avatar name={c.names} src={`${c.picture.image}`} />
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
                activeContact.picture.image
                  ? `${activeContact.picture.image}`
                  : "/images/transparent.png"
              }
              name={activeContact.names}
            />
            <ConversationHeader.Content
              userName={activeContact.names}
              info={activeContact.id !== "" ? activeContact.info : ""}
            />
            <ConversationHeader.Actions>
              {/*  <EllipsisButton
                onClick={handleonMenuClick}
                orientation="vertical"
              /> */}
              {showMenu && (
                <div
                  className={styles.conversationHeaderActions}
                  as={ConversationHeader.Actions}
                >
                  <Menu
                    onClick={onClickMenu}
                    selectedKeys={[currentPath]}
                    mode="vertical"
                    items={items}
                    className={styles.menu}
                    theme="dark"
                  />
                </div>
              )}
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
              {Object.entries(chatMessages).map((key) => (
                <>
                  <MessageSeparator>
                    <div className={styles.msgSepContContainer}>
                      <div className={styles.messageSeparatorContent}>
                        {getDatePretty(key[0])}
                      </div>
                    </div>
                  </MessageSeparator>
                  {key[1].map(
                    (
                      { message, sentTime, sender, direction }: IChatMessage,
                      i: number
                    ) => {
                      return (
                        <Message
                          key={`${sentTime}${i}`}
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
                      );
                    }
                  )}
                </>
              ))}
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
            <div className={styles.emojiPickerButtonContainer}>
              <button
                className={styles.emojiPickerButton}
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
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
