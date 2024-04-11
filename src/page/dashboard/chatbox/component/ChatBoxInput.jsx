import React, { useState, useEffect, useContext } from "react";
import { COLORS } from "../../../../utils/COLORS";
import {
  BsEmojiSmile,
  BsFillHandThumbsUpFill,
  BsIntersect,
  BsImage,
  BsBandaid,
  BsX,
  BsFileEarmarkWord,
  BsFileEarmarkWordFill,
  BsFileEarmarkPptFill,
  BsFileEarmarkXFill,
  BsFileEarmarkZipFill,
  BsFillFileEarmarkTextFill,
  BsFastForwardCircle,
  BsFolder,
  BsCollectionPlay,
} from "react-icons/bs";
import axios from "axios";
import { BASE_URL } from "../../../../data/DUMMY_DATA";
import { useDispatch, useSelector } from "react-redux";
import { addMess, setLastMessage, setListConversation, setReplyMessage, updateConversationLastMessage } from "../../../../hooks/redux/reducer";
import { useSocket } from "../../../../hooks/context/socketContext";

const ChatInput = () => {
  const [loading, setLoading] = useState(false);
  const [isTyping, setTyping] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [inputImage, setInputImage] = useState(null);
  const [inputImages, setInputImages] = useState(null);
  const [inputFile, setInputFile] = useState(null);
  const currentConversation = useSelector((state) => state.currentConversation);
  const userToken = JSON.parse(localStorage.getItem("userToken"));
  const [video, setVideo] = useState(null);

  const replyMessage = useSelector((state) => state.replyMessage);

  const [reply, setReply] = useState(replyMessage);

  // const socket = io(BASE_URL);
  const { socket } = useSocket();

  const dispatch = useDispatch();

  const listConversation = useSelector((state) => state.listConversation)

  const handleChangeInput = (e) => {
    // const text = e.target.value;
    setInputMessage(e.target.value);
  };

  const handleRemoveImage = (indexToRemove) => {
    setInputImage(prevImages => {
      const updatedImages = [...prevImages];
      updatedImages.splice(indexToRemove, 1);
      return updatedImages;
    });
    setInputImages(prev => {
      const updatedImages = [...prev];
      updatedImages.splice(indexToRemove, 1);
      return updatedImages;
    })
  };

  const handleRemoveFile = (indexToRemove) => {
    setInputFile(prev => {
      const updateFiles = [...prev];
      updateFiles.splice(indexToRemove, 1);
      return updateFiles;
    })
  }

  const handleRemoveVideo = (indexToRemove) => {
    setVideo(prev => {
      const updateVideos = [...prev];
      updateVideos.splice(indexToRemove, 1);
      return updateVideos;
    })
  }


  useEffect(() => {
    setTyping(!!inputMessage.trim());
  }, [inputMessage, inputImage]);

  const handleSendMessage = async () => {
    console.log("rep", replyMessage);
    setLoading(true)
    if (replyMessage && typeof replyMessage === 'object' && Object.keys(replyMessage).length !== 0) {
      hanldeReplyMessage();
      dispatch(setReplyMessage({}))
    } else if (inputImage || inputFile || video) {
      handleSendIMG();
    } else if (inputMessage) {
      handleSendTextMessage();
    }
    setInputMessage("");
    setInputFile(null)
    setInputImages(null)
    setInputImage(null)
    setTyping(false);
    setLoading(false)
  };

  const handleSendTextMessage = async () => {

    try {
      setLoading(true)
      const respone = await axios({
        url: BASE_URL + "/api/v1/conservations/" + `${currentConversation._id}/messages/sendText`,
        method: 'POST',
        headers: { Authorization: `Bearer ${userToken}` },
        data: {
          content: inputMessage
        }
      });
      dispatch(addMess(respone.data.data))
      const updatedCOnversation = listConversation.map(e => {
        if (currentConversation._id === e._id) {
          return { ...e, lastMessage: respone.data.data }
        }
        return e;

      })
      dispatch(setListConversation(updatedCOnversation))
      socket.emit("message:send", {
        ...respone.data.data,
        conversation: currentConversation
      })
      console.log(respone.data.data.content);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
    setLoading(false)
  }

  const handleSendIMG = async () => {
    setLoading(true)
    const files = [];
    if (inputImages) {
      files.push(...inputImages);
    }
    if (inputFile) {
      files.push(...inputFile);
    }
    if (video) {
      files.push(...video);
    }
    console.log(files);
    const formData = new FormData()
    files.forEach((file) => {
      formData.append('files', file)
    })
    formData.append('content', inputMessage)
    console.log(formData);
    if (files && files.length > 0) {
      try {
        const respone = await axios({
          url: BASE_URL + "/api/v1/conservations/" + `${currentConversation._id}/messages/sendFiles`,
          method: 'POST',
          headers: { Authorization: `Bearer ${userToken}` },
          data: formData
        });
        dispatch(addMess(respone.data.data))
        const updatedCOnversation = listConversation.map(e => {
          if (currentConversation._id === e._id) {
            return { ...e, lastMessage: respone.data.data }
          }
          return e;

        })
        dispatch(setListConversation(updatedCOnversation))
        socket.emit("message:send", {
          ...respone.data.data,
          conversation: currentConversation
        })
        setVideo(null)
        setInputFile(null)
        setInputImages(null)
        setInputImage(null)
        setLoading(false)
      } catch (error) {
        console.log(error);
        setVideo(null)
        setInputFile(null)
        setInputImages(null)
        setInputImage(null)
        setLoading(false)
      }
    }
    setLoading(false)

  }



  const hanldeReplyMessage = async () => {
    setLoading(true)
    console.log(replyMessage)
    try {
      const respone = await axios({
        url: BASE_URL + "/api/v1/conservations/" + `${currentConversation._id}/messages/replyText/${replyMessage._id}`,
        method: 'POST',
        headers: { Authorization: `Bearer ${userToken}` },
        data: {
          content: inputMessage
        }
      });
      dispatch(addMess(respone.data.data))
      const updatedCOnversation = listConversation.map(e => {
        if (currentConversation._id === e._id) {
          return { ...e, lastMessage: respone.data.data }
        }
        return e;

      })
      dispatch(setListConversation(updatedCOnversation))
      socket.emit("message:send", {
        ...respone.data.data,
        conversation: currentConversation
      })
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
    setLoading(false)
  }

  const enterPressed = (e) => {
    e.key === "Enter" && handleSendMessage();
  };

  React.useEffect(() => {

  }, [])

  useEffect(() => {
    setReply(replyMessage);
  }, [replyMessage])

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
              position: 'relative'
            }}
            className="hover:bg-gray-200"
          >
            <BsCollectionPlay size={20} color={"black"} />
            <input
              type="file"
              id="file"
              accept="video/*"
              value={""}
              multiple
              onChange={(e) => {
                const videos = e.target.files;
                const maxSize = 10 * 1024 * 1024; // Maximum file size is 25MB
                const newVideos = [];

                for (let i = 0; i < videos.length; i++) {
                  const videoSize = videos[i].size;
                  const fileName = videos[i].name;
                  if (videoSize <= maxSize) {
                    newVideos.push(videos[i]);
                  } else {
                    alert("The file '" + fileName + "' exceeds 10MB.");
                  }
                }

                if (newVideos.length <= 2) {
                  setVideo(newVideos);
                } else {
                  alert("Only a maximum of 2 videos can be selected.");
                }
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
            <BsImage size={20} color="black" />
            <input
              type="file"
              id="file"
              accept="image/png, image/gif, image/jpeg"
              value={""}
              multiple
              onChange={(e) => {
                // setInputImage(URL.createObjectURL(e.target.files[0]));
                const images = e.target.files;
                if (images.length <= 5) {
                  const newImages = [];
                  const newList = [];
                  for (let i = 0; i < images.length; i++) {
                    if (images[i].type.includes('image')) {
                      newImages.push(URL.createObjectURL(images[i]));
                      newList.push(e.target.files[i])
                    }
                  }
                  setInputImages(newList)
                  setInputImage(newImages);
                } else {
                  alert("Max is 5 images");
                  e.target.value = null;
                }
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
            <BsFolder size={20} color="black" />
            <input
              type="file"
              id="file"
              value={""}
              multiple
              accept=".doc, .docx, .pdf, .ppt, .pptx, .xls, .xlsx, .rar, .zar, .txt, .zip"
              onChange={(e) => {
                const files = e.target.files;
                if (files.length <= 5) {
                  const newFiles = [];
                  for (let i = 0; i < files.length; i++) {
                    newFiles.push(files[i]);
                  }
                  setInputFile(newFiles);
                } else {
                  alert("max is 5 files");
                  e.target.value = null;
                }
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
          <div>
            {reply && reply !== null && Object.keys(replyMessage).length !== 0 && reply.content !== 'This message has been deleted' && (<div
              className="text-black w-72 shadow-lg border-blue-700 p-1 rounded-lg flex justify-between ">
              <div className="flex justify-center items-center gap-1  ">
                <div className="font-medium text-blue-600">
                  Reply:
                </div>
                <div className="overflow-hidden whitespace-nowrap text-ellipsis w-52">
                  {reply.content}
                  {reply.attachments && <div className="flex flex-row gap-2">
                    {reply.attachments.map((e, index) => (<div key={index}>
                      {e.type}
                    </div>
                    ))}
                  </div>}
                </div>

              </div>
              <div className="flex justify-center items-center relative" onClick={() => { dispatch(setReplyMessage({})) }}>
                <BsX size={20} color={'black'} style={{ position: 'absolute', width: 20, height: 20, top: 0, right: 0, borderRadius: 30 }} className="hover:bg-gray-400 bg-gray-200" />
              </div>
            </div>)}
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
              {(isTyping || inputImage || inputFile || video !== null) ? (
                loading ?
                  (<span className="loading loading-dots loading-sm"></span>) : (<div
                    style={{
                      cursor: 'pointer',
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
                  </div>)
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
          <div >
            <div className="flex items-center">
              {inputImage && inputImage.map((image, index) => (
                <div key={index}>
                  <div style={{ borderTopWidth: 1, marginLeft: 20, marginRight: 20 }}>
                  </div>
                  <div style={{ overflow: 'hidden', paddingLeft: 20, position: 'relative', width: 'auto', height: 'auto', maxWidth: 80, maxHeight: 80, paddingBottom: 20, paddingTop: 10 }}>
                    <span style={{
                      position: 'absolute',
                      top: 5,
                      right: 5,
                      zIndex: 100,
                      backgroundColor: COLORS.whiteBG,
                      borderRadius: '50%',
                      cursor: 'pointer',
                    }}
                      onClick={() => handleRemoveImage(index)}
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
                    <img src={image} style={{ width: '100%', objectFit: 'contain' }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center">
              {inputFile && inputFile.map((e, index) => (
                <div key={index}>
                  <div style={{ borderTopWidth: 1, marginLeft: 20, marginRight: 20 }}>
                  </div>
                  <div style={{ overflow: 'hidden', paddingLeft: 20, position: 'relative', width: 'auto', height: 'auto', maxWidth: 80, maxHeight: 80, paddingBottom: 20, paddingTop: 10 }}>
                    <span style={{
                      position: 'absolute',
                      top: 5,
                      right: 5,
                      zIndex: 100,
                      backgroundColor: COLORS.whiteBG,
                      borderRadius: '50%',
                      cursor: 'pointer',
                    }}
                      onClick={() => handleRemoveFile(index)}
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
                    <div className="">
                      <div>
                        {e.name.endsWith('.docx') && <BsFileEarmarkWordFill size={40} color='blue' />}
                        {e.name.endsWith('.doc') && <BsFileEarmarkWordFill size={40} color='blue' />}

                        {e.name.endsWith('.pptx') && <BsFileEarmarkPptFill size={40} color='red' />}
                        {e.name.endsWith('.ppt') && <BsFileEarmarkPptFill size={40} color='red' />}
                        {e.name.endsWith('.pdf') && <BsFileEarmarkPptFill size={40} color='red' />}

                        {e.name.endsWith('.xlsx') && <BsFileEarmarkXFill size={40} color='green' />}
                        {e.name.endsWith('.xls') && <BsFileEarmarkXFill size={40} color='green' />}

                        {e.name.endsWith('.rar') && <BsFileEarmarkZipFill size={40} color='purple' />}
                        {e.name.endsWith('.zar') && <BsFileEarmarkZipFill size={40} color='purple' />}

                        {e.name.endsWith('.txt') && <BsFillFileEarmarkTextFill size={40} color='black' />}
                      </div>
                      <div>
                        {e.name}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-center">
                {video && video.map((image, index) => (
                  <div key={index}>
                    <div style={{ borderTopWidth: 1, marginLeft: 20, marginRight: 20 }}>
                    </div>
                    <div style={{ overflow: 'hidden', paddingLeft: 20, position: 'relative', width: 'auto', height: 'auto', maxWidth: 80, maxHeight: 80, paddingBottom: 20, paddingTop: 10 }}>
                      <span style={{
                        position: 'absolute',
                        top: 5,
                        right: 5,
                        zIndex: 100,
                        backgroundColor: COLORS.whiteBG,
                        borderRadius: '50%',
                        cursor: 'pointer',
                      }}
                        onClick={() => handleRemoveVideo(index)}
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
                      <div className="p-2 flex justify-center items-center bg-black rounded-xl">
                        <BsFastForwardCircle size={30} color='white' />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default ChatInput;
