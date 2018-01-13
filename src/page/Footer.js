import React from 'react';
import './Footer.css';

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <p>
                    {this.props.beneficiary}<br />
                    {this.props.organization}<br />
                    {this.props.organization_subheading}
                </p>
            </footer>
        );
    }
}

export default Footer;
