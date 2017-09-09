import React from 'react';
import { Link } from 'react-router-dom';
import './DonationTracker.css';

class DonationTracker extends React.Component {

    constructor(props) {
        super(props);
        this.balance = this.props.balance;
        this.donors = this.props.donors;
    }
    render() {
        return (
            <div className="tracker">
                <div className="raisedBalance">${this.balance.toLocaleString()}</div>
                <div className="raisedSoFarText">Raised from {this.donors.toLocaleString()} donors</div>
                <Link to="/donate">
                    <button className="donate">Donate Now</button>
                </Link>
            </div>
        );
    }
}

export default DonationTracker;
