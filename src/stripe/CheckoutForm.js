import React from 'react';
import {injectStripe} from 'react-stripe-elements';
import axios from 'axios';

// Application Constants
import AppConstants from "../constants.js";

import CardSection from './CardSection';
import './CheckoutForm.css';

class CheckoutForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleStripeChargeChange = this.handleStripeChargeChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {tester: "Loading...", fullname: "", emailaddress: "", errorfullname: false, erroremailaddress: false};
    }

    handleStripeChargeChange(newStatus) {

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const stateErrorName = "error" + name;

        this.setState({
            [name]: value,
            [stateErrorName]: false
        });
    }

    componentDidMount() {
        /*
        fetch("/api/").then((response) => {
            response.json().then((data) => {
                console.log(data);
                this.setState({tester: data});
            });
        });
        */
    }

    handleSubmit = (ev) => {

        ev.preventDefault();

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
            console.log('Received Stripe token:', token);
            axios.post(AppConstants.PAYMENT_SERVER_URL + "/api/donations/new/",
            {
                amount: this.props.totalChargeAmount.toFixed(2),
                source: token,
                fullname: this.state.fullname,
                emailaddress: this.state.emailaddress
            })
            .then(output => {
                if (output.data.status === "succeeded") {
                    console.log("Payment successful reported to client");
                    // TODO: Redirect to a thank you page with share buttons!
                }
            })
            .catch(error => {
                console.log(error);
            })
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="donationForm">

                    <label htmlFor="fullname">Full Name:</label>
                    <input
                        name="fullname"
                        type="text"
                        className={this.state.errorfullname ? "error" : ""}
                        value={this.state.fullname}
                        placeholder="Full Name"
                        ref={input => this.inputFullName = input}
                        onChange={this.handleInputChange} />

                    <label htmlFor="emailaddress">Email Address:</label>
                    <input
                        name="emailaddress"
                        type="email"
                        className={this.state.erroremailaddress ? "error" : ""}
                        value={this.state.emailaddress}
                        placeholder="user@example.com"
                        ref={input => this.inputEmailAddress = input}
                        onChange={this.handleInputChange} />

                    <CardSection />

                    <input
                        name="chargeamount"
                        type="hidden"
                        value={this.props.totalChargeAmount.toFixed(2)} />

                    <div className="donationSubmit">
                        <button className="donate">Make Donation</button>
                        <p>We will charge your card for this amount: {this.props.totalChargeAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                    </div>

                </form>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);
