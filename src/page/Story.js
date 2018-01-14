import React from 'react';

import './Story.css';

class Story extends React.Component {
    render() {
        return (
            <div className="storyContainer">
                <div className="story">
                    {this.props.story_use_html ? (
                        <div dangerouslySetInnerHTML={{__html: this.props.story_html}} />
                    ) : (
                        <p>
                            {this.props.story.split("\n").map((item, index) => {
                                return (index === 0) ? <span id={index} key={index}>{item}</span> : <span id={index} key={index}><br/>{item}</span>
                            })}
                        </p>
                    )}
                </div>
            </div>
        );
    }
}

export default Story;
