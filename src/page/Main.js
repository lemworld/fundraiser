import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import Story from './Story';
import DonorList from './DonorList';
import ShareButtons from './ShareButtons';

class Main extends React.Component {
    render() {
        return (
            <div className="mainContent">
                <Grid>
                    <Row>
                        <Col xs={12} md={8} className="titleCol">
                            <Story story={this.props.story} donors={this.props.donors} />
                        </Col>
                        <Col xs={12} md={4}>
                            <DonorList donors={this.props.donors} />
                        </Col>
                    </Row>
                    <Row>
                        <hr />
                        <ShareButtons />
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Main;
