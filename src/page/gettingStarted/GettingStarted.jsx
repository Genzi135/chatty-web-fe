import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import pic1 from '../../assets/ZaloLanding1.png';
import pic2 from '../../assets/ZaloLanding2.png';
import pic3 from '../../assets/ZaloLanding3.jpg';
import pic4 from '../../assets/ZaloLanding4.jpg';

function GettingStarted() {

    const pageimg = [
        pic1, pic2, pic3, pic4
        // "https://chat.zalo.me/assets/vanish_onboard.95edcd15d875cae4d6d504d739eaa977.png",
        // "https://chat.zalo.me/assets/inapp-welcome-screen-04.ade93b965a968b16f2203e9d63b283a7.jpg",
        // "https://chat.zalo.me/assets/inapp-welcome-screen-02.7f8cab265c34128a01a19f3bcd5f327a.jpg",
    ];

    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImgIndex((prevIndex) =>
                prevIndex === pageimg.length - 1 ? 0 : prevIndex + 1
            );
            setProgress(0); // Reset progress bar
        }, 3100); // Change image every 2 seconds
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let timer = null;
        if (progress < 100) {
            timer = setTimeout(() => {
                setProgress((prevProgress) => prevProgress + 1);
            }, 30); // Increase progress every 20 milliseconds
        }
        return () => clearTimeout(timer);
    }, [progress]);

    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'white' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200" style={{ position: 'absolute', bottom: 0 }}><path fill="#0099ff" fillOpacity="0.8" d="M0,0L40,21.3C80,43,160,85,240,96C320,107,400,85,480,90.7C560,96,640,128,720,138.7C800,149,880,139,960,133.3C1040,128,1120,128,1200,154.7C1280,181,1360,235,1400,261.3L1440,288L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>

            <div style={{ width: '70%', height: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center', }}>
                <div
                    style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <img

                        src='https://res.cloudinary.com/diribdgsz/image/upload/v1708776305/chat-app/Chatty_foylcy.png' style={{ width: 50, height: 50, borderRadius: 15 }} />
                    <div className='page' style={{ display: 'flex', flexDirection: 'column', gap: 20, color: 'black' }}>
                        <h1 style={{ color: '' }}>Hello! How are you today?</h1>
                        <p>Welcome to Chatty where you can chat with your friends</p>
                        <Link to="/authentication"><button className='btn btn-primary text-white'>Getting Started</button></Link>
                    </div>

                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                    <img src={pageimg[currentImgIndex]} style={{ width: 700, height: 480 }} />
                    <div style={{ position: 'relative', width: 300, height: 5, border: '1px solid #ccc', borderRadius: '5px', overflow: 'hidden', opacity: '50%' }}>
                        <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'blue', position: 'absolute', top: 0, left: 0 }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GettingStarted;
