import React from 'react';
import "./TallyPanel.css";


class TallyPanel extends React.Component {
    constructor(props) {
        super(props);
        this.handleDonationChange = this.handleDonationChange.bind(this);
    }

    handleDonationChange(e) {
        this.props.onDonationChange(e.target.value);
    }

    render() {
        const donationAmount = this.props.donationAmount;
        const donationFees = this.props.donationFees;
        const donationTotal = this.props.donationTotal;

        return(

            <div className="tallypanelcontainer">
                <div className="tallypanelheading">
                    Donation Amount:
                </div>


                <div className="donationInputBox">
                    <span className="currencySymbol">$</span>
                    <input value={donationAmount} onChange={this.handleDonationChange} />
                </div>

                <div className="tallycalculations">
                    <div className="tallycalculationsitem">
                        Recipient Gets: {donationAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </div>
                    <div className="tallycalculationsitem">
                        Fees: {donationFees.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </div>
                    <div className="tallycalculationsitem emphasis">
                        <strong>Total Charge:</strong> {donationTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </div>
                </div>
                <div className="feeinfotext">
                    Our credit / debit card processor, Stripe, charges a transaction fee of 2.9% + 30&cent;. We transparently pass that fee along to the donor so as not to impact the amount the beneficiary will receive.
                </div>
            </div>

        );
    }

}

export default TallyPanel;
