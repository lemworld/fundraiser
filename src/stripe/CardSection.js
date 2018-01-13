import React from 'react';
import {CardElement} from 'react-stripe-elements';

class CardSection extends React.Component {
    render() {
        return (
            <div>
                <label htmlFor="stripeCardElement">
                    Credit / Debit Card Details:
                </label>
                <p className="helptext">Card details are transmitted securely and we do not store them</p>

                <CardElement onChange={this.props.onCardElementChange} style={{base: {fontSize: '16px'}}} />
            </div>

        );
    }
};

export default CardSection;
