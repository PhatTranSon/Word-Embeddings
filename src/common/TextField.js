import React from 'react';
import "./textfield.css";

class TextField extends React.Component {
    render() {
        return (
            <div style={{ position: 'relative', display: 'inline-block' }}>
                <input type="text" {...this.props} className="custom-textfield"/>
                <div className="custom-textfield-border"></div>
            </div>
            
        )
    }
}

export default TextField;