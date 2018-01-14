import React from 'react';
import {Redirect} from 'react-router-dom';
import {injectStripe} from 'react-stripe-elements';
import axios from 'axios';

// Application Constants
import AppConstants from "../constants.js";

import CardSection from './CardSection';
import './CheckoutForm.css';

class CheckoutForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCardElementChange = this.handleCardElementChange.bind(this);
        this.state = {fullname: "", emailaddress: "", personalMessage: "", showName: "public", errorfullname: false, erroremailaddress: false, cardElementComplete: false, paymentProcessing: false, errorPayment: "", paymentSuccess: false};
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const stateErrorName = "error" + name;

        this.setState({
            [name]: value,
            [stateErrorName]: false,
            paymentProcessing: false
        });
    }

    handleCardElementChange(event) {
        this.setState({cardElementComplete: event.complete});
    }

    componentDidMount() {

    }

    handleSubmit = (ev) => {

        ev.preventDefault();

        this.setState({errorPayment: "", paymentProcessing: true});

        if (this.props.totalChargeAmount <= 0) {
            // Prompt the user to enter a valid donation amount
            this.props.onDonationChange(0);
            return;
        }

        if (this.state.fullname === "") {
            // Prompt the user to enter a valid Full Name
            this.setState({errorfullname: true});
            this.inputFullName.focus();
            return;
        }

        if (this.state.emailaddress === "") {
            // Prompt the user to enter a valid Email Address
            this.setState({erroremailaddress: true});
            this.inputEmailAddress.focus();
            return;
        }

        // Create a Stripe token, then pass that to the server API for charging
        this.props.stripe.createToken({name: this.state.fullname})
        .then(({token}) => {

            if (typeof token === "undefined") {
                console.log("Stripe token undefined");
                return;
            }

            console.log('Received Stripe token:', token);
            axios.post(AppConstants.PAYMENT_SERVER_URL + "/api/donations/new/",
            {
                amount: this.props.totalChargeAmount.toFixed(2),
                amount_donation: this.props.donationAmount.toFixed(2),
                source: token,
                fullname: this.state.fullname,
                emailaddress: this.state.emailaddress,
                personalMessage: this.state.personalMessage,
                showName: this.state.showName
            })
            .then(output => {
                if (output.data.status === "succeeded") {
                    console.log("Payment successful reported to client");
                    // Redirect to a thank you page with share buttons!
                    this.setState({paymentSuccess: true});
                }
                else if (output.data.error) {
                    console.log("Payment error: " + output.data.error);
                    this.setState({errorPayment: "Error: " + output.data.error + " Please try again.", paymentProcessing: false});
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({errorPayment: "Error: " + error, paymentProcessing: false});
            })
        });
    }

    render() {

        if (this.state.paymentSuccess) {
            return(
                <Redirect to="/?a=thank+you" />
            );
        }

        const disablePaymentButton = this.state.paymentProcessing || this.props.donationInputError || !this.state.cardElementComplete;

        return (
            <div>
                <form onSubmit={this.handleSubmit} className="donationForm">

                    <label htmlFor="fullname">Full Name:</label>
                    <p className="helptext">Please enter as it appears on your credit/debit card</p>
                    <input
                        name="fullname"
                        type="text"
                        className={this.state.errorfullname ? "error" : ""}
                        value={this.state.fullname}
                        placeholder="Full Name"
                        ref={input => this.inputFullName = input}
                        onChange={this.handleInputChange} />

                    <label htmlFor="emailaddress">Email Address:</label>
                    <p className="helptext">We will send you a receipt for your records</p>
                    <input
                        name="emailaddress"
                        type="email"
                        className={this.state.erroremailaddress ? "error" : ""}
                        value={this.state.emailaddress}
                        placeholder="user@example.com"
                        ref={input => this.inputEmailAddress = input}
                        onChange={this.handleInputChange} />

                    <label htmlFor="personalMessage">Personal Message:</label>
                    <textarea
                        name="personalMessage"
                        rows="3"
                        value={this.state.personalMessage}
                        placeholder="Share a public message on the donation page (optional)"
                        onChange={this.handleInputChange} />

                    <label htmlFor="showName">Donation Appearance</label>
                    <p className="helptext">We can show your name next to your donation, or leave it as Anonymous</p>
                    <select name="showName" value={this.state.showName} onChange={this.handleInputChange} >
                        <option value="public">Show your name publicly as: {this.state.fullname}</option>
                        <option value="anonymous">Show the donor as: Anonymous</option>
                    </select>

                    <hr />

                    <CardSection onCardElementChange={this.handleCardElementChange} />

                    <input
                        name="chargeamount"
                        type="hidden"
                        value={this.props.totalChargeAmount.toFixed(2)} />

                    <div className="donationSubmit">
                        <p>We will charge your card for this amount: {this.props.totalChargeAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                        <button className="donate" disabled={disablePaymentButton}>Make Donation</button>
                        <p className="error">{this.state.errorPayment}</p>
                    </div>

                </form>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);
