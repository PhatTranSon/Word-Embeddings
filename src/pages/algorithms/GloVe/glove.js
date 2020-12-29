import React from "react";
import "../algorithm.css";
import LoadingBar from 'react-top-loading-bar'

class Glove extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            progress: 50
        }

        //Set window in scroll
        this.onPageScroll = this.onPageScroll.bind(this);
        window.onscroll = this.onPageScroll;
    }

    onPageScroll() {
        //Get percentage
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const percentage = (winScroll / height) * 100

        //Set percentage
        this.setState({
            progress: percentage
        });
    }

    render() {
        return (
            <div className="main">
                <LoadingBar 
                    color='#F4A261'
                    height={5}
                    progress={this.state.progress}/>
                <div className="container">
                    <h1 className="heading">GloVe</h1>
                    <h2 className="sub-heading">Global Vector for word representation</h2>

                    <div className="para">
                        <p className="para-heading">Introduction</p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu augue aliquet, iaculis erat nec, congue ex. Integer pharetra ligula nec mauris sodales lobortis. Fusce eget luctus sem. Nullam at odio non sem tincidunt vulputate sit amet in diam. Morbi tincidunt lacus a leo interdum, et aliquam metus tincidunt. Donec ultrices lectus at varius dapibus. Cras at elementum ante, eget maximus turpis. Phasellus aliquet imperdiet turpis, accumsan gravida tortor molestie vel.
                    </div>

                    <div className="para">
                        <p className="para-heading">Theory</p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu augue aliquet, iaculis erat nec, congue ex. Integer pharetra ligula nec mauris sodales lobortis. Fusce eget luctus sem. Nullam at odio non sem tincidunt vulputate sit amet in diam. Morbi tincidunt lacus a leo interdum, et aliquam metus tincidunt. Donec ultrices lectus at varius dapibus. Cras at elementum ante, eget maximus turpis. Phasellus aliquet imperdiet turpis, accumsan gravida tortor molestie vel.
                    </div>

                    <div className="para">
                        <p className="para-heading">Implementation</p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu augue aliquet, iaculis erat nec, congue ex. Integer pharetra ligula nec mauris sodales lobortis. Fusce eget luctus sem. Nullam at odio non sem tincidunt vulputate sit amet in diam. Morbi tincidunt lacus a leo interdum, et aliquam metus tincidunt. Donec ultrices lectus at varius dapibus. Cras at elementum ante, eget maximus turpis. Phasellus aliquet imperdiet turpis, accumsan gravida tortor molestie vel.
                    </div>
                </div>
            </div>
        )
    }
}

export default Glove;