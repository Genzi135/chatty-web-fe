// components/GettingStarted.js
import { Link } from 'react-router-dom';

function GettingStarted() {
    return (
        <div className='page'>
            <h1>Getting Started</h1>
            <p>Welcome to our app! Click below to get start.</p>

            <Link to="/authentication"><button className='btn btn-primary'>Get Started</button></Link>

        </div>
    );
}

export default GettingStarted;
