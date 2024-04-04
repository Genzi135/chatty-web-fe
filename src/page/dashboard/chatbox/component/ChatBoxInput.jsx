import React, { useState, useEffect } from "react";
import { COLORS } from "../../../../utils/COLORS";
import {
  BsEmojiSmile,
  BsFillHandThumbsUpFill,
  BsIntersect,
  BsImage,
  BsBandaid,
} from "react-icons/bs";
import axios from "axios";
import { BASE_URL } from "../../../../data/DUMMY_DATA";
import { useDispatch, useSelector } from "react-redux";
import { setReplyMessage } from "../../../../hooks/redux/reducer";

const ChatInput = () => {
  const [isTyping, setTyping] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [inputImage, setInputImage] = useState(null);
  const currentConversation = useSelector((state) => state.currentConversation);
  const userToken = JSON.parse(localStorage.getItem("userToken"));
  const repMess = useSelector((state) => state.replyMessage);

  // const socket = io(BASE_URL);

  const dispatch = useDispatch();

  const handleChangeInput = (e) => {
    const text = e.target.value;
    setInputMessage(text);
  };

  useEffect(() => {
    setTyping(!!inputMessage.trim());
  }, [inputMessage, inputImage]);

  const handleSendMessage = async () => {
    if (repMess && inputMessage) {
      hanldeReplyMessage();
      dispatch(setReplyMessage({}))
    }
    if (inputMessage) {
      handleSendTextMessage();
    }
    if (inputImage) {
      handleSendIMG();
    }
    setInputMessage("");
    setInputImage(null)
    setTyping(false);
    ///
    // if (inputMessage) {
    //   try {
    //     socket.emit('send_message', {
    //       conversationId: currentConversation._id,
    //       content: inputMessage,
    //       token: userToken
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // setInputMessage("");
    // setInputImage(null);
    // setTyping(false);
  };

  const handleSendTextMessage = async () => {
    // socket.emit("message:send", { message: inputMessage, currentConversationId: currentConversation._id })
    try {
      const respone = await axios({
        url: BASE_URL + "/api/v1/conservations/" + `${currentConversation._id}/messages/sendText`,
        method: 'POST',
        headers: { Authorization: `Bearer ${userToken}` },
        data: {
          content: inputMessage
        }
      });
      console.log(respone)
    } catch (error) {
      console.log(error);
    }
  }

  const handleSendIMG = async () => {
    console.log(inputImage);
  }

  const hanldeReplyMessage = async () => {
    console.log(repMess)
    // try {
    //   const respone = await axios({
    //     url: BASE_URL + "/api/v1/conservations/" + `${currentConversation._id}/messages/replyText/${repMess._id}`,
    //     method: 'POST',
    //     headers: { Authorization: `Bearer ${userToken}` },
    //     data: {
    //       content: inputMessage
    //     }
    //   });
    //   console.log(respone)
    // } catch (error) {
    //   console.log(error);
    // }
  }

  const enterPressed = (e) => {
    e.key === "Enter" && handleSendMessage();
  };

  React.useEffect(() => {

  }, [])

  return (
    <>
      <div
        style={{
          width: "100%",
          height: 'auto',
          backgroundColor: COLORS.whiteBG,
        }}
      >
        <div
          style={{
            // height: "30%",
            maxHeight: "45%",
            width: "100%",
            borderBottomWidth: 1,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: 10,
            gap: 10,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 4,
            }}
            className="hover:bg-gray-200"
          >
            <BsIntersect size={20} color={"black"} />
          </div>
          <div
            style={{
              width: 40,
              height: 40,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 4,
              position: "relative",
            }}
            className="hover:bg-gray-200"
          >
            <BsImage size={20} color="black" />
            <input
              type="file"
              id="file"
              accept="image/png, image/gif, image/jpeg"
              value={""}
              onChange={(e) => {
                setInputImage(URL.createObjectURL(e.target.files[0]));
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: 0,
              }}
            />
          </div>
          <div
            style={{
              width: 40,
              height: 40,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 4,
              position: "relative",
            }}
            className="hover:bg-gray-200"
          >
            <BsBandaid size={20} color="black" />
            <input
              type="file"
              id="file"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: 0,
              }}
            />
          </div>
        </div>
        <div
          style={{
            height: "55%",
            width: "100%",
          }}
        >

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <input
              onKeyDown={enterPressed}
              onChange={handleChangeInput}
              type="text"
              style={{
                width: "80%",
                height: "100%",
                backgroundColor: COLORS.whiteBG,
                outline: "none",
                color: "black",
                paddingLeft: 20,
              }}
              placeholder="@, Messages"
              value={inputMessage}
            />
            <div
              style={{
                height: "100%",
                display: "flex",
                gap: 10,
                paddingRight: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 45,
                  height: 45,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 4,
                }}
                className="hover:bg-gray-200"
              >
                <BsEmojiSmile size={25} color={"black"} />
              </div>
              {(isTyping || inputImage !== null) ? (
                <div
                  style={{
                    width: 55,
                    height: 45,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 4,
                    color: COLORS.bdSelected,
                    fontWeight: "500",
                  }}
                  className="hover:bg-blue-200"
                  onClick={handleSendMessage}
                >
                  SEND
                </div>
              ) : (
                <div
                  style={{
                    width: 45,
                    height: 45,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 4,
                  }}
                  className="hover:bg-gray-200"
                >
                  <BsFillHandThumbsUpFill size={27} color={"orange"} />
                </div>
              )}
            </div>
          </div>
          {inputImage && (
            <div>
              <div style={{ borderTopWidth: 1, marginLeft: 20, marginRight: 20 }}>
              </div>
              <div style={{ overflow: 'hidden', paddingLeft: 20, position: 'relative', width: 'auto', height: 'auto', maxWidth: 80, maxHeight: 80, paddingBottom: 20, paddingTop: 10 }}

              >
                <span style={{
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  zIndex: 100,
                  backgroundColor: COLORS.whiteBG,
                  borderRadius: '50%',
                  cursor: 'pointer',
                }}
                  onClick={() => setInputImage(null)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </span>
                <img src={inputImage} style={{ width: '100%', objectFit: 'contain' }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatInput;
