import React from 'react';

import './Story.css';

class Story extends React.Component {
    render() {
        return (
            <div className="storyContainer">
                <div className="story">
                    <p>
                        {this.props.story.split("\n").map((item, index) => {
                            return (index === 0) ? <span key={index}>{item}</span> : [<br/>, <span key={index}>{item}</span>]
                        })}
                    </p>
                </div>
            </div>
        );
    }
}

export default Story;
