import React from 'react';

import './DonorList.css';

class DonorList extends React.Component {
    render() {
        return (
            <div className="containerDonorList">
                <div className="titleDonors">Donations ({this.props.donors})</div>
                <div className="itemDonation">
                    <div className="donationDetails">
                        <div className="donationAmount">$1,500</div>
                        <div className="donationDate">2 days ago</div>
                    </div>
                    <div className="donationMessage">
                        <div className="donorName">John Doe</div>
                        <div className="donorMessage">My wife and I wish you all the best in your higher education pursuits. You're amazing, and you can achieve anything!</div>
                    </div>
                </div>
                <div className="itemDonation">
                    <div className="donationDetails">
                        <div className="donationAmount">$681</div>
                        <div className="donationDate">1 week ago</div>
                    </div>
                    <div className="donationMessage">
                        <div className="donorName">Jane Smith</div>
                        <div className="donorMessage"></div>
                    </div>
                </div>
                <div className="itemDonation">
                    <div className="donationDetails">
                        <div className="donationAmount">$12,000</div>
                        <div className="donationDate">Jul 20</div>
                    </div>
                    <div className="donationMessage">
                        <div className="donorName">Mary Neill</div>
                        <div className="donorMessage">I remember when you were born and helped change your diapers. I'm so excited at how well you've turned out. Please know you have all my best wishes!</div>
                    </div>
                </div>
                <div className="itemDonation">
                    <div className="donationDetails">
                        <div className="donationAmount">$500</div>
                        <div className="donationDate">Jul 16</div>
                    </div>
                    <div className="donationMessage">
                        <div className="donorName"><i>Anonymous</i></div>
                        <div className="donorMessage"></div>
                    </div>
                </div>
                <div className="donateButtonContainer">
                    <p>Won't you help us?</p>
                    <button className="donate">Donate Now</button>
                </div>
            </div>
        );
    }
}

export default DonorList;
