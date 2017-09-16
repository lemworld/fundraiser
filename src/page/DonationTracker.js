import React from 'react';
import { Link } from 'react-router-dom';
import './DonationTracker.css';

class DonationTracker extends React.Component {
    render() {
        return (
            <div className="tracker">
                <div className="raisedBalance">${this.props.balance.toLocaleString()}</div>
                <div className="raisedSoFarText">Raised from {this.props.donors.toLocaleString()} donors</div>
                <Link to="/donate">
                    <button className="donate">Donate Now</button>
                </Link>
            </div>
        );
    }
}

export default DonationTracker;
