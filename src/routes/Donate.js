import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import {Link} from 'react-router-dom';
import Footer from '../page/Footer';

// Stripe Components
import TallyPanel from '../stripe/TallyPanel';
import {StripeProvider} from 'react-stripe-elements';
import ChargeForm from '../stripe/ChargeForm';

// Application Constants
import AppConstants from "../constants.js";

class Donate extends Component {

    constructor(props) {
        super(props);
        this.handleDonationAmountChange = this.handleDonationAmountChange.bind(this);
        this.ourStripePublishableKey = AppConstants.STRIPE_TEST_MODE ? AppConstants.STRIPE_PK_TEST : AppConstants.STRIPE_PK_PROD;
        this.state = {donationAmount: 0.00, donationFees: 0.00, donationTotal: 0.00, donationInputError: true, stripeLoaded: false};
    }

    handleDonationAmountChange(donationNewAmount) {

        var newAmount = donationNewAmount;
        newAmount = newAmount.replace(/,/g,''); // Remove any commas

        if (isNaN(newAmount) || newAmount <= 0) {
            this.setState({donationAmount: 0, donationFees: 0.00, donationTotal: 0.00, donationInputError: true});
        }

        else {
            const donationAmount = parseFloat(newAmount);
            const donationTotal = (donationAmount + 0.30) / (1 - 0.029);
            const donationFees = (donationTotal * 0.029) + 0.30;
            this.setState({donationAmount: donationAmount, donationFees: donationFees, donationTotal: donationTotal, donationInputError: false});
        }
    }

    componentWillMount() {
        if (!window.Stripe) {
            this._stripeJsInterval = setInterval(this.checkForStripe.bind(this), 250);
        }
        else {
            this.setState({stripeLoaded: true})
        }
    }

    checkForStripe() {
        console.log("Checking for window.Stripe");
        if (window.Stripe) {
            this.setState({stripeLoaded: true});
            if (this._stripeJsInterval) {
                clearInterval(this._stripeJsInterval);
                this._stripeJsInterval = null;
            }
        }
    }

    componentDidMount() {
        // Scroll the browser window to the top when this page loads
        window.scrollTo(0,0);
    }

    componentWillUnmount() {
        if (this._stripeJsInterval) {
            clearInterval(this._stripeJsInterval);
            this._stripeJsInterval = null;
        }
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col xs={12}>
                            <h1>{AppConstants.HERO_TITLE}</h1>
                            <Link to="/">
                                &laquo; Return Home
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={4} lg={3} push={{md: 8, lg: 9}}>
                            <TallyPanel onDonationChange={this.handleDonationAmountChange} donationAmount={this.state.donationAmount} donationFees={this.state.donationFees} donationTotal={this.state.donationTotal} donationInputError={this.state.donationInputError} />
                        </Col>
                        <Col xs={12} md={8} lg={9} pull={{md:4, lg: 3}}>
                            {this.state.stripeLoaded &&
                            <StripeProvider apiKey={this.ourStripePublishableKey}>
                                <ChargeForm onDonationChange={this.handleDonationAmountChange} donationAmount={this.state.donationAmount} totalChargeAmount={this.state.donationTotal} donationInputError={this.state.donationInputError} />
                            </StripeProvider>
                        }
                        </Col>
                    </Row>
                </Container>
                <Footer beneficiary={AppConstants.FOOTER_BENEFICIARY} organization={AppConstants.FOOTER_ORGANIZATION} organization_subheading={AppConstants.FOOTER_ORGANIZATION_SUBHEADING} />
            </div>
        );
    }
}

export default Donate;
