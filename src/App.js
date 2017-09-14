import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';


// Page Components
import Hero from './page/Hero';
import heroimage from './page/karl-fredrickson-192686.jpg';
import Main from './page/Main';
import Footer from './page/Footer';

// Stripe Components
import TallyPanel from './stripe/TallyPanel';
import {StripeProvider} from 'react-stripe-elements';
import ChargeForm from './stripe/ChargeForm';

// Application Constants
import AppConstants from "./constants.js";

const HeroTitle = "Help send these children to college";
const Story = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur luctus iaculis metus vitae laoreet. Vivamus consectetur arcu nisi, dictum sodales mi dignissim id. Aliquam nec accumsan orci. Maecenas vitae nunc hendrerit lorem porta lobortis. Proin eu porta eros. Duis a lobortis eros. Donec at justo eu ipsum elementum tincidunt ut aliquam diam. Vivamus a pharetra purus. Fusce mollis porta ex, eu tincidunt augue. Aliquam id diam ut ante varius suscipit.

    Pellentesque in ante gravida tellus convallis consequat. Aenean sed ex ante. Donec bibendum, ligula in consequat convallis, dui magna facilisis quam, eget tempus eros nibh non nunc. Quisque scelerisque ullamcorper felis, ullamcorper sodales felis cursus eu. Donec posuere, odio vel scelerisque accumsan, mauris enim tincidunt erat, vitae tristique augue turpis ornare elit. Cras pharetra nibh vel ipsum euismod, et elementum est rutrum. Nunc imperdiet nisi ut faucibus varius. Quisque sed vestibulum enim, ut mattis enim. Cras feugiat, diam eget sagittis rutrum, nisi quam facilisis metus, vel volutpat dui urna ut diam. Nulla ut dolor vel quam maximus efficitur. Nunc diam metus, fringilla id porta quis, suscipit vitae arcu.

    In viverra lacus quis mi varius fermentum. Praesent pellentesque aliquet arcu at ullamcorper. Fusce at suscipit nisl. Nullam aliquet eget nulla in porta. Praesent viverra sollicitudin augue. Morbi facilisis leo eros, id tristique eros sodales aliquet. Donec consectetur imperdiet tellus aliquam suscipit. In dui tellus, luctus vitae vulputate eget, fermentum a mi. Curabitur quis metus a risus convallis condimentum ut in orci.

    Donec suscipit ultricies lacus, et luctus leo elementum vitae. Integer turpis felis, lobortis ut neque ut, commodo fermentum ex. Sed vel imperdiet lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut auctor libero in lectus efficitur dapibus. Pellentesque augue risus, imperdiet ut diam at, tincidunt suscipit purus. Fusce gravida sed mauris id pharetra. Sed odio libero, mattis eget est in, condimentum viverra leo. Nunc sed posuere odio, id vulputate velit.

    Pellentesque dictum, libero vel venenatis placerat, tellus lacus vestibulum purus, non dictum eros orci sit amet sapien. Morbi ullamcorper augue nec pretium fermentum. Praesent cursus dignissim neque ut ornare. Phasellus diam orci, ornare a sapien at, iaculis luctus felis. Proin vehicula id enim at ultrices. Nulla at urna non purus eleifend pulvinar. Vestibulum rhoncus leo augue, quis malesuada dui convallis ac.
`;
const shareText = "Check this out: " + HeroTitle;

class Home extends Component {
    render() {
        return (
            <div>
                <Hero title={HeroTitle} heroimage={heroimage} balance={10132} donors={12} />
                <Main story={Story} donors={12} sharetext={shareText}></Main>
                <Footer />
            </div>
        );
    }
}

class Donate extends Component {

    constructor(props) {
        super(props);
        this.handleDonationAmountChange = this.handleDonationAmountChange.bind(this);
        this.state = {donationAmount: 0.00, donationFees: 0.00, donationTotal: 0.00, donationInputError: false};
    }

    handleDonationAmountChange(donationNewAmount) {

        if (isNaN(donationNewAmount) || donationNewAmount <= 0) {
            this.setState({donationAmount: donationNewAmount, donationFees: 0.00, donationTotal: 0.00, donationInputError: true});
        }

        else {
            const donationAmount = parseFloat(donationNewAmount);
            const donationFees = (donationAmount * 0.029) + 0.30;
            const donationTotal = donationAmount + donationFees;
            this.setState({donationAmount: donationAmount, donationFees: donationFees, donationTotal: donationTotal, donationInputError: false});
        }
    }

    componentDidMount() {
        // Scroll the browser window to the top when this page loads
        window.scrollTo(0,0);
    }

    render() {
        return (
            <div>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <h1>{HeroTitle}</h1>
                            <Link to="/">
                                &laquo; Return Home
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={4} smPush={8} md={3} mdPush={9}>
                            <TallyPanel onDonationChange={this.handleDonationAmountChange} donationAmount={this.state.donationAmount} donationFees={this.state.donationFees} donationTotal={this.state.donationTotal} donationInputError={this.state.donationInputError} />
                        </Col>
                        <Col xs={12} sm={8} smPull={4} md={9} mdPull={3}>
                            <StripeProvider apiKey={AppConstants.STRIPE_PK_TEST}>
                                <ChargeForm onDonationChange={this.handleDonationAmountChange} totalChargeAmount={this.state.donationTotal} donationInputError={this.state.donationInputError} />
                            </StripeProvider>
                        </Col>
                    </Row>
                </Grid>
                <Footer />
            </div>
        );
    }
}

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Home} />
                    <Route path="/donate" component={Donate} />
                </div>
            </Router>
        );
    }
}

export default App;
