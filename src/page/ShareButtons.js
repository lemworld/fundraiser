import React from 'react';

import './ShareButtons.css';

class ShareButtons extends  React.Component {
    render() {
        return (
            <div className="shareButtonsContainter">
                <div className="shareTitle">
                    Share with your friends:
                </div>
                <div className="shareButtons">
                    <button>F</button>
                    <button>T</button>
                    <button>E</button>
                </div>
            </div>
        );
    }
}

export default ShareButtons;
