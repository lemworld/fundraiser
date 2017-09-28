import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import './DonorList.css';

class DonorList extends React.Component {
    render() {

        return (
            <div className="containerDonorList">
                <div className="titleDonors">Donations ({this.props.donors})</div>

                <div>
                    {Object.keys(this.props.donorList).map((n, index) =>
                        <div className="itemDonation" key={index} id={index}>
                            <div className="donationDetails">
                                <div className="donationAmount">${this.props.donorList[n].amount.toLocaleString()}</div>
                                <div className="donationDate"><Moment title={this.props.donorList[n].created} fromNow>{this.props.donorList[n].created}</Moment></div>
                            </div>
                            <div className="donationMessage">
                                <div className="donorName">{this.props.donorList[n].name}</div>
                                <div className="donorMessage">{this.props.donorList[n].message}</div>
                            </div>
                        </div>

                    )}
                </div>

                <div className="donateButtonContainer">
                    <p>Won't you help us?</p>
                    <Link to="/donate">
                        <button className="donate">Donate Now</button>
                    </Link>
                </div>

            </div>
        );
    }
}

export default DonorList;
