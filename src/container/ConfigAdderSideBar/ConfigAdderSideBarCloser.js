import React, {Component} from 'react';
import '../../css/SidebarMenu.css';
import {bindActionCreators} from "redux";
import {
  changeCurrentEtl,
  fetchData
} from '../../actions/mainActions'
import {connect} from "react-redux";
import {Col, Form, FormControl, FormGroup} from "react-bootstrap";

class ConfigAdderSideBarCloser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString:""
    }
  }

  handleKeyPress = (e)=>  {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      console.log('do validate');
      this.props.changeCurrentEtl(e.target.value);
      this.props.fetchData(e.target.value);
    }
  };
  
  render() {
      return (
          <li>
            <i className="fa fa-window-close-o clickable-icons" aria-hidden="true"/>
          </li>
         
      );
    }
}

function mapStateToProps(state) {
  return {
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeCurrentEtl,
    fetchData
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigAdderSideBarCloser);