import { useState, useEffect } from 'react';
import { COLORS } from '../../../../utils/COLORS';
import { BsEmojiSmile, BsFillHandThumbsUpFill, BsIntersect, BsImage, BsBandaid } from 'react-icons/bs';

const ChatInput = () => {
    const [isTyping, setTyping] = useState(false);
    const [inputMessage, setInputMessage] = useState('');

    const handleChangeInput = (e) => {
        const text = e.target.value;
        setInputMessage(text);
    };

    useEffect(() => {
        setTyping(!!inputMessage.trim());
    }, [inputMessage]);

    const handleSendMessage = () => {
        console.log('Sending message:', inputMessage);
        setInputMessage('');
        setTyping(false);
    };

    const enterPressed = (e) => {
        (e.key === 'Enter') && handleSendMessage()
    }

    return (
        <>
            <div style={{ width: '100%', height: 120, backgroundColor: COLORS.whiteBG }}>
                <div style={{ height: '45%', width: '100%', borderBottomWidth: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: 20, gap: 10 }}>
                    <div style={{ width: 45, height: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 4 }} className="hover:bg-gray-200">
                        <BsIntersect size={25} color={'black'} />
                    </div>
                    <div style={{ width: 45, height: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 4 }} className="hover:bg-gray-200">
                        <BsImage size={25} color="black" />
                    </div>
                    <div style={{ width: 45, height: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 4 }} className="hover:bg-gray-200">
                        <BsBandaid size={25} color="black" />
                    </div>
                </div>
                <div style={{ height: '55%', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <input
                        onKeyDown={enterPressed}
                        onChange={handleChangeInput}
                        type="text"
                        style={{ width: '80%', height: '100%', backgroundColor: COLORS.whiteBG, outline: 'none', color: 'black', paddingLeft: 20 }}
                        placeholder="@, Messages"
                        value={inputMessage}
                    />
                    <div style={{ height: '100%', display: 'flex', gap: 10, paddingRight: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ width: 45, height: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 4 }} className="hover:bg-gray-200">
                            <BsEmojiSmile size={28} color={'black'} />
                        </div>
                        {isTyping ? (
                            <div
                                style={{ width: 55, height: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 4, color: COLORS.bdSelected, fontWeight: '500' }}
                                className="hover:bg-blue-200"
                                onClick={handleSendMessage}
                            >
                                SEND
                            </div>

                        ) : (
                            <div style={{ width: 45, height: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 4 }} className="hover:bg-gray-200">
                                <BsFillHandThumbsUpFill size={30} color={'orange'} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatInput;
