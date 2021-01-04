import React from 'react';
import Bar from './row';
import './neighbors.css';


class NearestNeighbors extends React.Component {
    render() {
        //Get neighbors
        const neighbors = this.props.neighbors;

        //Render
        if (neighbors) {
            //Get the range
            const max = Math.max.apply(Math, neighbors.map(function(o) { return o[1]; }));
            const min = Math.min.apply(Math, neighbors.map(function(o) { return o[1]; }));
            
            return (
                <div className="neighbor-panel">
                {
                    neighbors.map((word, index) => {
                        return (
                            <Bar key={index} range={[min, max]} word={word[0]} distance={word[1]}/>
                        );
                    })
                }
                </div>
            )
        } else {
            return null;
        }
    }
}

export default NearestNeighbors;