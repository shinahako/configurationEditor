import React, { Component } from 'react';
import '../../css/App.css';
import '../../css/Texts.css';

class FoodDescription extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <p className="FoodDescription">
              {this.props.description}
            </p>
        );
    }
}

export default FoodDescription;