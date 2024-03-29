import { useEffect, useState } from 'react';
import pic1 from '../assets/ZaloLanding1.png';
import pic2 from '../assets/ZaloLanding2.png';
import pic3 from '../assets/ZaloLanding3.jpg';
import pic4 from '../assets/ZaloLanding4.jpg';

const LandingPage = () => {
    const pageimg = [
        pic1, pic2, pic3, pic4
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
        <div style={{
            width: '100%', height: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center'
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                <img src={pageimg[currentImgIndex]} style={{ width: 500, height: 350 }} />
                <div style={{ position: 'relative', width: 300, height: 5, border: '1px solid #ccc', borderRadius: '5px', overflow: 'hidden', opacity: '50%' }}>
                    <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'blue', position: 'absolute', top: 0, left: 0 }}></div>
                </div>
            </div>
        </div>
    )

}
export default LandingPage;