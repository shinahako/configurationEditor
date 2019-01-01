import React, { Component } from 'react';
import '../../css/App.css';
import '../../css/Texts.css';

class FoodTitle extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <h1 className="FoodTitle">
              {this.props.title}
            </h1>
        );
    }
}

export default FoodTitle;