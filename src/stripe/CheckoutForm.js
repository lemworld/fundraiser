import React from 'react';
import {injectStripe} from 'react-stripe-elements';

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
        fetch("/api/").then((response) => {
            response.json().then((data) => {
                console.log(data);
                this.setState({tester: data});
            });
        });
    }

    handleSubmit = (ev) => {
        // We don't want to let default form submission happen here, which would refresh the page.
        ev.preventDefault();

        if (this.props.totalChargeAmount <= 0) {
            // Prompt the user to enter a valid donation amount
            this.props.onDonationChange(0);
            return;
        }

        if (this.state.fullname === "") {
            // Prompt the user to enter a valid Name
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

        // Within the context of `Elements`, this call to createToken knows which Element to
        // tokenize, since there's only one in this group.
        this.props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
            console.log('Received Stripe token:', token);
        });

        // However, this line of code will do the same thing:
        // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
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

                    <div className="donationSubmit">
                        <button className="donate">Make Donation</button>
                        <p>We will charge your card for this amount: {this.props.totalChargeAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>

                        <p>{this.state.tester}</p>
                    </div>

                </form>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);
