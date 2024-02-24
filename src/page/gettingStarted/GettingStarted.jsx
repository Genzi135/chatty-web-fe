// components/GettingStarted.js
import { Link } from 'react-router-dom';
function GettingStarted() {
    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'white' }}>
            <div style={{ width: '70%', height: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center', }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <img src='https://res.cloudinary.com/diribdgsz/image/upload/v1708776305/chat-app/Chatty_foylcy.png' style={{
                        width: 50, height: 50, borderRadius: 15
                    }} />
                    <div className='page' style={{ display: 'flex', flexDirection: 'column', gap: 20, color: 'black' }}>
                        <h1 style={{ color: '' }}>Hello! How are you today?</h1>
                        <p>Welcome to Chatty where you can chat with your friends</p>
                        <Link to="/authentication"><button className='btn btn-primary'>Get Started</button></Link>

                    </div>
                </div>
                <div>
                    <img src='https://res.cloudinary.com/diribdgsz/image/upload/v1708778645/chat-app/message-bubbles-chat-icon-white-background_97458-458_vo9znm.avif' style={{ width: '100%', height: '100%' }} />
                </div>
            </div>
        </div>
    );
}

export default GettingStarted;
