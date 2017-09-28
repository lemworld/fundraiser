import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import './Hero.css';

import DonationTracker from './DonationTracker';

class Hero extends React.Component {
    render() {
        return (
            <Container>
                <Row className="hero">
                    <Col xs={12} lg={8} style={{ padding: 0}} className="heroimagecontainer">
                        <img src={this.props.heroimage} alt={this.props.title} />
                    </Col>
                    <Col xs={12} lg={4} style={{ padding: 0}}>
                        <DonationTracker balance={this.props.balance} donors={this.props.donors} />
                    </Col>
                </Row>
                <Row className="titleRow">
                    <Col xs={12} className="titleCol">
                        <h1>{this.props.title}</h1>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Hero;
