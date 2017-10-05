import React from 'react';
import "./TallyPanel.css";

class TallyPanel extends React.Component {
    constructor(props) {
        super(props);
        this.handleDonationChange = this.handleDonationChange.bind(this);
        this.focusDonationInput = this.focusDonationInput.bind(this);
    }

    focusDonationInput() {
        // Set focus to the donation input
        this.textDonationInput.focus();
    }

    componentDidUpdate() {
        // Set focus to the donation input
        if (this.props.donationInputError) {
            console.log("Error: Invalid amount entered");
            this.focusDonationInput();
        }

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
                    Your Donation:
                </div>

                <div className="donationInputBox">
                    <span className={"currencySymbol " + (this.props.donationInputError ? " error" : "")}>$</span>
                    <input
                        id="donation_input"
                        value={donationAmount}
                        onChange={this.handleDonationChange}
                        className={this.props.donationInputError ? "error" : ""}
                        autoFocus
                        ref={input => this.textDonationInput = input} />
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
