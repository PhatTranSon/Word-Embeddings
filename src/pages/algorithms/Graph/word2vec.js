import React from 'react';
import "./graph.css";

import NearestNeighbors from './neighbors/neighbors';

//Create plot component
import TextField from '../../../common/TextField';
import nearestNeighbors from './distance';
import Plot from '../../../common/plot';

class GloveGraph extends React.Component {
    constructor(props) {
        super(props);

        //Set the state
        this.state = {
            loading: true,

            raw: null,

            original: null,

            data: [],

            input: "",

            errorMessage: null,

            neighbors: [],

            //Layout
            layout: {
                xaxis: {
                    range: [ -2, 2 ]
                },
                yaxis: {
                    range: [ -2, 2 ]
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
        this.fetchPCAEmbeddings = this.fetchPCAEmbeddings.bind(this);
        this.formatData = this.formatData.bind(this);
        this.fetchRawEmbeddings = this.fetchRawEmbeddings.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.splitDataset = this.splitDataset.bind(this);
        this.reset = this.reset.bind(this);
    }


    fetchPCAEmbeddings() {
        return (
            fetch('https://raw.githubusercontent.com/PhatTranSon/Files/main/word2vec_pca_embeddings.json?raw=true')
                .then(response => response.json())
                .then(data => data)
        );
    }

    formatData(data, name, textPosition=null, color='rgba(0, 119, 182, 0.5)') {
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
            name,
            mode: textPosition != null ? 'markers+text' : 'markers',
            type: 'scatter',
            marker: { 
                size: 10, 
                color,
                font: {
                    family: 'Roboto Mono'
                }
            },
            x,
            y,
            text: words,
            textposition: textPosition
        }

        //Set state
        return formattedData;
    }

    fetchRawEmbeddings() {
        return (
            fetch('https://raw.githubusercontent.com/PhatTranSon/Files/main/word2vec_embeddings.json')
                .then(response => response.json())
                .then(data => {
                    return data;
                })
        );
    }

    componentDidMount() {
        this.setState({
            loading: true
        });

        Promise.all([this.fetchRawEmbeddings(), this.fetchPCAEmbeddings()])
            .then(values => {
                //Get raw and format data
                const [rawData, pcaData] = values;

                //Format the data
                const formattedData = this.formatData(pcaData);

                //Set state
                this.setState({
                    raw: rawData,
                    original: pcaData,
                    data: [formattedData],
                    loading: false
                });
            });
    }

    handleKeyPress(e) {
        if (e.key === "Enter") {
            //Get the word from state
            const word = this.state.input;

            //Check if word is empty
            if (!word || word.length === 0) {
                this.reset();
            } else {
                //Find the closest neighbors
                nearestNeighbors(this.state.raw, word)
                    .then(neighbors => {
                        //Construct new data
                        this.splitDataset(word, neighbors);
                        
                        //Then display the neighbors
                        this.setState({
                            neighbors,
                            errorMessage: null
                        });
                    })
                    .catch(error => {
                        //TO BE IMPLEMENTED: Error handling
                        this.setState({
                            errorMessage: "Word does not exist"
                        });
                    });
            }
        }
    }

    splitDataset(word, neighbors) {
        //Get the neighbor words
        const neighborWords = neighbors.map(item => item[0]);

        //First get pca data first
        const pcaData = this.state.original;

        //Then find the neighbors points, unimportant point and the target words
        const targetWord = { };
        targetWord[word] = pcaData[word];

        const neighborsPoints = {};
        const nonNeighborPoints = {};

        for (const key in pcaData) {
            if (neighborWords.includes(key)) {
                neighborsPoints[key] = pcaData[key];
            } else {
                nonNeighborPoints[key] = pcaData[key];
            }
        }

        //Then format
        const formattedNeighbors = this.formatData(neighborsPoints, 'Neighbors', null, 'rgba(252, 163, 17, 0.5)');
        const formattedTarget = this.formatData(targetWord, 'Target', null, 'red');
        const formattedNonNeighbors = this.formatData(nonNeighborPoints, 'Non-neighbors', null, 'rgba(141, 153, 174, 0.1)');

        //Then set data
        this.setState({
            data: [formattedTarget, formattedNeighbors, formattedNonNeighbors]
        });
    }

    reset() {
        const data = this.state.original;
        const formattedData = this.formatData(data);

        this.setState({
            data: [formattedData],
            neighbors: null
        });
    }

    onInputChange(event) {
        this.setState({
            input: event.target.value
        });
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
                                <TextField 
                                    placeholder="Word" 
                                    onKeyDown={this.handleKeyPress}
                                    onChange={this.onInputChange}/>

                                {
                                    this.state.errorMessage ? <div className="error-message"> { this.state.errorMessage } </div> : null
                                }

                                <NearestNeighbors neighbors={this.state.neighbors} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default GloveGraph;
