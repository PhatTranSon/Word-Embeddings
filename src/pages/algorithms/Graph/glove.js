import React from 'react';
import "./graph.css";

//Create plot component
import Plotly from "plotly.js";
import createPlotlyComponent from 'react-plotly.js/factory';
import TextField from '../../../common/TextField';
const Plot = createPlotlyComponent(Plotly);

class GloveGraph extends React.Component {
    constructor(props) {
        super(props);

        //Set the state
        this.state = {
            loading: true,

            data: [],

            //Layout
            layout: {
                xaxis: {
                    range: [ -4, 4 ]
                },
                yaxis: {
                    range: [ -4, 4 ]
                },
                title: {
                    text: 'Word embeddings',
                    font: {
                        family: 'Roboto Mono'
                    }
                },
                useResizeHandler: true,
                textfont: {
                    family: 'Roboto Mono'
                },
                style: { width: "100%", height: "100%" },
                legend: {
                    font: {
                        family: 'Roboto Mono'
                    }
                }
            },

            //Scroll to zoom for graph
            config: {
                scrollToZoom: true
            }
        }

        //Bind methods
        this.fetchEmbeddings = this.fetchEmbeddings.bind(this);
    }

    fetchEmbeddings() {
        //Set loading to true first
        this.setState({
            loading: true
        });

        fetch('https://raw.githubusercontent.com/PhatTranSon/Files/main/embeddings.json')
            .then(response => response.json())
            .then(data => {
                //Preprocess the data
                const words = Object.keys(data);
                
                //Get the coordinates
                const x = [];
                const y = [];
                
                for (const word in data) {
                    const coords = data[word];
                    x.push(coords[0]);
                    y.push(coords[1]);
                }
                
                //Format to feed to render
                const formattedData = {
                    mode: 'markers',
                    type: 'scatter',
                    marker: { 
                        size: 10, 
                        color: 'rgba(0, 119, 182, 0.5)',
                        font: {
                            family: 'Roboto Mono'
                        }
                    },
                    x,
                    y,
                    text: words
                }

                //Set state
                this.setState({
                    loading: false,
                    data: [formattedData]
                });
            });
    }

    componentDidMount() {
        this.fetchEmbeddings();
    }

    render() {
        return (
            <div className="plot-holder">
                <div className="columns">
                    <div className="column">
                    {
                        this.state.loading ? <div>Loading</div>:
                        <Plot 
                            data={this.state.data}
                            layout={this.state.layout}
                            config={this.state.config}
                        />
                    }
                    </div>

                    <div className="column">
                        <div className="panel" id="search-panel" style={{height: "100%"}}>
                            <div className="panel-title">Search a word</div>
                            <div className="panel-main">
                                <TextField placeholder="Word"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default GloveGraph;


/*
import React from 'react';

//Create the Plot component
import Plotly from "plotly.js";
import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(Plotly);

class Graph extends React.Component {
  render() {
    return (
        <div className="plot-holder">
            <Plot
                data={[
                {
                    x: [1, 2, 3],
                    y: [2, 6, 3],
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: 'red'},
                },
                {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
                ]}
                layout={
                    {
                        useResizeHandler: true,
                        style: { width: "100%", height: "100%" }
                    }
                }
            />
        </div>
    );
  }
}

export default Graph;
*/