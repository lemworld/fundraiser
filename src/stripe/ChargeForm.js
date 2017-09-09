import React from 'react';
import {Elements} from 'react-stripe-elements';

import CheckoutForm from './CheckoutForm';
import './ChargeForm.css';

class ChargeForm extends React.Component {

    render() {
        return (
            <Elements>
                <CheckoutForm />
            </Elements>
        );
    }
}

export default ChargeForm;
