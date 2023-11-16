import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "../../../store";
import {
  setRoom,
  setSender,
  setConversations,
  setSenderSocketId,
  //setReceiver,
  setConnectedUsers,
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
//import zoeIco from "/images/woman.png";
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
import { IConnectedUsers, IConversation } from "../../../interface";

const baseUrl = import.meta.env.VITE_URL_BASE;

const socket = io(baseUrl, {
  reconnection: true,
  reconnectionDelay: 500,
  reconnectionAttempts: 10,
});

export const ChatView = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { receiver, room } = useSelector((state: RootState) => state.chat);
  const { conversations, connectedUsers, sender } = useSelector(
    (state: RootState) => state.chat
  );
  const { id, contacts, names, pictures } = useSelector(
    (state: RootState) => state.user
  );
  const [messageInputValue, setMessageInputValue] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

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
            result: {
              id,
              fullname: names,
              info,
              pictures: { profile: picture },
            },
          } = await getUserById(contact);

          if (ok) {
            return {
              id,
              names,
              picture,
              info,
              socketId: "",
            };
          }

          return {
            id: "",
            names: "",
            picture: "",
            info: "",
            socketId: "",
          };
        })
      );

      dispatch(setConversations(conversations));
    };

    fetchData();
  }, [contacts, dispatch]);

  /*  useEffect(() => {
    socket.on("connection", (socket) => {
      socket.on("requestInfo", () => {
        // Responde con la información requerida
        console.log("Sending data from client to server");
        const info = {
          id,
          names,
          socketId: socket.id,
        };
        socket.emit("signIn", info);
      });
    });
  }, [id, names]); */

  /* useEffect(() => {
    console.log("sign in on server at startup2");

    console.log({
      id,
      names,
    });
    socket.emit("signIn", {
      id,
      names,
      socketId: socket.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); */

  if (!sender.socketId) {
    socket.on("connect", () => {
      dispatch(setSenderSocketId(socket.id));
      socket.emit("signIn", {
        id,
        names,
        socketId: socket.id,
      });
    });

    socket.on("disconnect", () => {
      //
    });

    socket.on("sendMessage", (message: string) => {
      console.log(message);
    });

    socket.on("receiveMessage", (message: string) => {
      console.log({ receiveMessage: message });
    });

    socket.on("requestInfo", (socketId) => {
      // Responde con la información requerida
      console.log("Sending data from client to server");

      const info = {
        id,
        names,
        socketId,
      };
      socket.emit("signIn", info);
      // Respond to the request here
      socket.emit("sendData", info);
    });

    socket.on("connectedUsers", (connectedUsers: IConnectedUsers) => {
      console.log({ usersConnected: connectedUsers });
      dispatch(setConnectedUsers(connectedUsers));
      conversations.map((conversation) => {
        if (connectedUsers[conversation.id]) {
          conversation.socketId = connectedUsers[conversation.id].socketId;
        }
      });

      // actualizar conversaciones
    });
  }

  useEffect(() => {
    dispatch(
      setSender({
        id,
        info: "",
        names,
        picture: pictures?.profile,
        socketId: socket.id,
      })
    );
  }, [dispatch, id, names, pictures]);

  const handleOnChange = (val: string) => {
    setMessageInputValue(val);
  };

  const handleOnSendMessage = (val: string) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

    socket.emit("sendMessage", {
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
            names: `Emily ${idRef.current}`,
            picture: emilyIco,
            info: "none",
            socketId: "",
          });
        }

        setConversations(conversations.concat(newConversations));
        setLoadingMore(false);
      }, 1500);
    }
  }, [conversations, loadingMore]);

  /*  useEffect(() => {
    return () => {
      console.log("disconnecting...");
      socket.disconnect();
      console.log("connected", socket.connected);
    };
  }, []); */

  //const onYReachEnd = () => setLoadingMore(true);

  const handleConvesationClick = async (id: string) => {
    const data = conversations.find((c) => c.id === id);

    console.log({
      id,
      socketId: connectedUsers[id] ? connectedUsers[id].socketId : "",
    });

    dispatch(
      setReceiver({
        id,
        names: data?.names as string,
        picture: data?.picture as string,
        info: data?.info as string,
        socketId: connectedUsers[id] ? connectedUsers[id].socketId : "",
      } as IConversation)
    );
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
                receiver.picture
                  ? `${baseUrl}/images/${receiver.id}/${receiver.picture}`
                  : "/images/transparent.png"
              }
              name={receiver.nickname}
            />
            <ConversationHeader.Content
              userName={receiver.names}
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
            typingIndicator={<TypingIndicator content="Zoe is typing" />}
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
                src={`${baseUrl}/images/${receiver.id}/${receiver.picture}`}
                name="Zoe"
              />
            </Message>

            {/* <Message
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
            </Message> */}
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
