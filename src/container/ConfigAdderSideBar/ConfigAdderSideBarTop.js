import React, {Component} from 'react';
import '../../css/SidebarMenu.css';
import {bindActionCreators} from "redux";
import {
  changeCurrentEtl,
  fetchData,
  addNewConfig
} from '../../actions/mainActions'
import {connect} from "react-redux";

class ConfigAdderSideBarTop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString:""
    }
  }

  closeConfigurationAdderSidebar = () => {
    this.props.addNewConfig(false,"");
  };
  
  render() {
      return (
          <li className={"sidebar-title"}>
            <span>Add Configuration</span>
            <i onClick={this.closeConfigurationAdderSidebar} className="fa fa-window-close-o clickable-icons close-icon" aria-hidden="true"/>
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
    fetchData,
    addNewConfig
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigAdderSideBarTop);