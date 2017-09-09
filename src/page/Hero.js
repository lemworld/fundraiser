import React from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import './Hero.css';

import DonationTracker from './DonationTracker';

class Hero extends React.Component {
    render() {
        return (
            <Grid>
                <Row className="hero">
                    <Col xs={12} md={8} className="heroimagecontainer">
                        <Image src={this.props.heroimage} responsive />
                    </Col>
                    <Col xs={12} md={4}>
                        <DonationTracker balance={this.props.balance} donors={this.props.donors} />
                    </Col>
                </Row>
                <Row className="titleRow">
                    <Col xs={12} className="titleCol">
                        <h1>{this.props.title}</h1>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Hero;
