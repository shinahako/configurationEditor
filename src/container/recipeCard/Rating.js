import React, {Component} from 'react';
import '../../css/App.css';
import 'font-awesome/css/font-awesome.min.css';


class Rating extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
        <div className="Rating">
          <div>
            {(() => {

            })()}
          <span className="heading">User Rating </span>
          <span className={this.props.rating>0 ? "fa fa-star checked": "fa fa-star"}></span>
          <span className={this.props.rating>1 ? "fa fa-star checked": "fa fa-star"}></span>
          <span className={this.props.rating>2 ? "fa fa-star checked": "fa fa-star"}></span>
          <span className={this.props.rating>3 ? "fa fa-star checked": "fa fa-star"}></span>
          <span className={this.props.rating>4 ? "fa fa-star checked": "fa fa-star"}></span>
          </div>
        </div>
    );
  }
}

export default Rating;