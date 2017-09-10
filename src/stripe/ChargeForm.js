import React from 'react';
import {Elements} from 'react-stripe-elements';

import CheckoutForm from './CheckoutForm';
import './ChargeForm.css';

class ChargeForm extends React.Component {

    render() {
        const totalChargeAmount = this.props.totalChargeAmount;
        return (
            <div>
                <Elements>
                    <CheckoutForm />
                </Elements>
            </div>
        );
    }
}

export default ChargeForm;
