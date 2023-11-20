import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "../../../store";
import {
  setRoom,
  setConversations,
  setConnectedUsers,
  setReceiverId,
  setSenderId,
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
  EmojiStyle,
  SkinTones,
  Theme,
  //Categories,
  //EmojiClickData,
  //Emoji,
  //SuggestionMode,
  //SkinTonePickerLocation,
} from "emoji-picker-react";
import { IConnectedUsers, IConversation } from "../../../interface";
import { useChatSocketCtx } from "./context";
import { getConversations } from "./helpers/conversations";

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
  const { conversations, receiverId, room, senderId } = useSelector(
    (state: RootState) => state.chat
  );
  const { id, contacts, names } = useSelector((state: RootState) => state.user);
  const [messageInputValue, setMessageInputValue] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [writer, setWriter] = useState("");
  const [activeContact, setActiveContact] = useState<IConversation>(contacInit);

  const { socket } = useChatSocketCtx();

  socket.connect();

  useEffect(() => {
    return () => {
      dispatch(setRoom(""));
    };
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      const conversations = await getConversations(contacts as string[]);
      dispatch(setConversations(conversations));
    };

    fetchData();
  }, [contacts, dispatch]);

  if (!senderId && !socket.connected) {
    dispatch(setSenderId(id));

    socket.on("connect", () => {
      socket.emit("signIn", {
        id,
        names,
        socketId: socket.id,
      });
    });

    socket.on("receiveMessage", (message: string) => {
      console.log({ receiveMessage: message });
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
        console.log("someIsTyping", isTyping);
        setIsTyping(isTyping);
        setWriter(names);
      }
    );
  }

  const handleOnChange = (val: string) => {
    setMessageInputValue(val);
  };

  const handleOnSendMessage = (val: string) => {
    socket.emit("sendMessage", {
      senderId: String(id),
      receiverId,
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

    setActiveContact(contacActive as IConversation);

    dispatch(setReceiverId(id));
  };

  const handleOnBlur = () => {
    console.log("handleOnBlur");
    socket.emit("userIsTyping", { isTyping: false, names: "" });
  };

  const handleOnFocus = () => {
    console.log("handleOnFocus");
    socket.emit("userIsTyping", { isTyping: true, names });
  };

  console.log({ isTyping });

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
                name={c.names}
                info={c.info}
                onClick={() => handleConvesationClick(c.id)}
              >
                <Avatar
                  name={c.names}
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
                orientation="horizontal"
              />
            </ConversationHeader.Actions>
          </ConversationHeader>
          <MessageList
            typingIndicator={
              isTyping && (
                <TypingIndicator content={`${writer} ${t("is typing")}`} />
              )
            }
            onClick={() => setShowEmojiPicker(false)}
          >
            <MessageSeparator content="Monday, 13 November 2023" />
            <Message
              model={{
                message: `Hello Michelle, How are you my friend\nYou could come to my house and\nprovide me some food`,
                sentTime: "15 mins ago",
                sender: "Patrik",
                direction: "outgoing",
                position: "single",
              }}
              //avatarSpacer
            />
            <Message
              model={{
                message: "Hello my friend, \nHow are you? \n yes, I can",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "single",
              }}
              className="ycc-message"
            >
              <Avatar
                src={`${baseUrl}/images/${activeContact.id}/${activeContact.picture}`}
                name="Zoe"
              />
            </Message>
          </MessageList>
          {activeContact && (
            <div as={MessageInput} style={{ position: "relative" }}>
              <MessageInput
                placeholder={`${t("Type message here")}`}
                value={messageInputValue}
                onChange={handleOnChange}
                onSend={handleOnSendMessage}
                onAttachClick={handleOnAttachClick}
                onBlur={handleOnBlur}
                onFocus={handleOnFocus}
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
                    lazyLoadEmojis={true}
                    theme={Theme.DARK}
                  />
                )}
              </div>
            </div>
          )}
        </ChatContainer>
      </MainContainer>
    </div>
  );
};
