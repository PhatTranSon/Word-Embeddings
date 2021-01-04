import React from 'react';


class Bar extends React.Component {
    constructor(props) {
        super(props);

        this.calculateBar = this.calculateBar.bind(this);
    }

    calculateBar() {
        //Get range and distance
        const { range, distance } = this.props;

        //Calculate the percentage
        const min = range[1];
        const max = range[0];
        const percentage = (distance - min) * 100 / (max - min) + 0.5;

        return percentage + '%';
    }

    render() {
        const { word, distance } = this.props;

        return (
            <div className="bar-row">
                <div className="bar-label">
                    <span className="bar-word">{ word }</span>
                    <span className="bar-number">{ distance.toFixed(2) }</span>
                    <div style={{clear: "both"}}></div>
                </div>

                <div className="bar" style={{ height: "20px", width: this.calculateBar(), background: '#0077b6' }}/>
            </div>
        )
    }
}

export default Bar;