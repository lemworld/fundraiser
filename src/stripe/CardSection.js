import React from 'react';
import {CardElement} from 'react-stripe-elements';

class CardSection extends React.Component {
    render() {
        return (
            <label>
                Credit / Debit Card Details:
                <CardElement style={{base: {fontSize: '18px'}}} />
            </label>
        );
    }
};

export default CardSection;
