import React, { Component } from 'react';
import Modal from 'react-modal';

// Page Components
import Hero from '../page/Hero';
import heroimage from '../page/karl-fredrickson-192686.jpg';
import Main from '../page/Main';
import Footer from '../page/Footer';
import ShareButtons from '../page/ShareButtons';

// Application Constants
import AppConstants from "../constants.js";

const shareText = "Check this out: " + AppConstants.HERO_TITLE;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {donationTotal: 0.00, donationCount: 0, donorList: {}, showThankYou: false};
        this.closeThankYouModal = this.closeThankYouModal.bind(this);
    }

    componentDidMount() {

        // Scroll the browser window to the top when this page loads
        window.scrollTo(0,0);

        // Use the URLSearchParams API to see if we should display the Thank You modal
        const query = new URLSearchParams(this.props.location.search);
        this.setState({showThankYou: query.get('a') === "thank you"});

        fetch(AppConstants.PAYMENT_SERVER_URL + "/api/donations/list/").then((response) => {
            response.json().then((data) => {
                data.donations.sort((a, b) => {
                    //console.log(new Date(b.date) - new Date(a.date));
                    return new Date(b.created) - new Date(a.created);
                });
                console.log(data.donations);
                this.setState({donationTotal: data.total_amount, donationCount: data.donations_count, donorList: data.donations});
            });
        });
    }

    closeThankYouModal() {
        this.setState({showThankYou: false});
    }

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.state.showThankYou}
                    onRequestClose={this.closeThankYouModal}
                    className="thankYouModal"
                    overlayClassName="thankYouOverlay"
                    contentLabel="Thank You Popup Window"
                    >

                        <div className="thankYouModalBody">
                            <button className="close" onClick={this.closeThankYouModal}>x</button>
                            <h1>Thank You!</h1>
                            <h2>Your generosity means the world to us.</h2>
                            <p>With your help, we have now raised <strong>${this.state.donationTotal.toLocaleString()}</strong> from <strong>{this.state.donationCount.toLocaleString()} donors</strong>! Would you mind spreading the word via the social media and email links below?</p>
                            <ShareButtons sharetext={shareText} />
                        </div>

                </Modal>
                <Hero title={AppConstants.HERO_TITLE} heroimage={heroimage} balance={this.state.donationTotal} donors={this.state.donationCount} />
                <Main story={AppConstants.HOME_STORY} donors={this.state.donationCount} donorList={this.state.donorList} sharetext={shareText}></Main>
                <Footer />
            </div>
        );
    }
}

export default Home;
