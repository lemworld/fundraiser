import React from 'react';
import {Elements} from 'react-stripe-elements';

import CheckoutForm from './CheckoutForm';
import './ChargeForm.css';

class ChargeForm extends React.Component {

    render() {
        return (
            <div>
                <Elements>
                    <CheckoutForm onDonationChange={this.props.onDonationChange} totalChargeAmount={this.props.totalChargeAmount} />
                </Elements>
            </div>
        );
    }
}

export default ChargeForm;
