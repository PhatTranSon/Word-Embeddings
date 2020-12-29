import React from 'react';
import "bulma";
import "./Home.css";
import GloveIcon from '../icons/Glove';
import Word2VecIcon from '../icons/Word2Vec';
import { Link } from 'react-router-dom';


class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hovering: null
        }

        this.hover = this.hover.bind(this);
        this.nohover = this.nohover.bind(this);
    }

    hover(id) {
        if (id === 'left') {
            this.setState({
                hovering: 'left'
            });
        } else if (id === 'right') {
            this.setState({
                hovering: 'right'
            });
        }
    }

    nohover() {
        this.setState({
            hovering: null
        });
    }

    render() {
        return (
            <div className="home">
                <div className="columns" id="first-panel">
                    <div className="column center-items" id="first-left">
                        <h1>Word embedding.</h1>
                    </div>
                    <div className="column center-items" id="first-right">
                        <div>
                            <p id="quote">
                                “Sparse vectors in which each entry is a measure of the association between the word and a particular context.”
                            </p>

                            <p id="author">
                                - Omer Levy
                            </p>
                        </div>
                    </div>
                </div>

                <div className="columns" id="second-panel">
                    <div className="column" id="second-left" onMouseEnter={() => this.hover('left')} onMouseLeave={() => this.nohover()}>
                        <div>
                            <h1>GloVe</h1>
                            <div className="icon-holder">
                                <GloveIcon color={this.state.hovering === "left" ? "white" : "black"} style={{'transform': 'scale(0.75)'}}/>
                            </div>
                        </div>
                    </div>
                    


                    <div className="column" id="second-right" onMouseEnter={() => this.hover('right')} onMouseLeave={() => this.nohover()}>
                        <div>
                            <h1>Word2Vec</h1>
                            <div className="icon-holder">
                                <Word2VecIcon color={this.state.hovering === "right" ? "white" : "black"} style={{'transform': 'scale(0.75)', 'color': 'green'}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;