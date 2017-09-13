import React from 'react';
import {CardElement} from 'react-stripe-elements';

class CardSection extends React.Component {
    render() {
        return (
            <div>
                <label htmlFor="stripeCardElement">
                    Credit / Debit Card Details:
                </label>

                <CardElement id="stripeCardElement" style={{base: {fontSize: '18px'}}} />
            </div>

        );
    }
};

export default CardSection;
