import React, { Component } from 'react';

class Loading extends Component {
    render() {
        if (this.props.isLoading) {
            // While our other component is loading...
            if (this.props.timedOut) {
                // In case we've timed out loading our other component.
                return <div>Loader timed out!</div>;
            } else if (this.props.pastDelay) {
                // Display a loading screen after a set delay.
                return <div>Loading...</div>;
            } else {
                // Don't flash "Loading..." when we don't need to.
                return null;
            }
        } else if (this.props.error) {
            // If we aren't loading, maybe
            return <div>Error! Component failed to load</div>;
        } else {
            // This case shouldn't happen... but we'll return null anyways.
            return null;
        }
    }
}

export default Loading;
