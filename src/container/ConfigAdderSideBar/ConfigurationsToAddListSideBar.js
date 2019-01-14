import React, {Component} from 'react';
import '../../css/App.css';
import '../../css/configAdderSideBar.css';
import {bindActionCreators} from "redux";
import {
  fetchData,
  initializeConfigurationToSchemaMap,
  openRelevantRecipe
} from '../../actions/mainActions'
import {connect} from "react-redux";
import ConfigAdderSidebarUpperLinkGroup
  from "./ConfigAdderSidebarUpperLinkGroup";
import ConfigAdderSideBarTop from "./ConfigAdderSideBarTop";

class ConfigurationsToAddListSideBar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
  }

  render() {
    if(this.props.isAddNewConfigOn)
    return (
        <div id={"configAdderSideBar"}>
          <nav className="main-menu-config-adder">
            <ConfigAdderSideBarTop/>
            <div className="list-content-config-adder" id="style-5"><ConfigAdderSidebarUpperLinkGroup/></div>
          </nav>
        </div>
    );
    else return <span/>
  }
}

function mapStateToProps(state) {
  return {
    configurationsMap: state.mainReducer.configurationsMap,
    currentActiveConfiguration: state.mainReducer.currentActiveConfiguration,
    currentStateOfData: state.mainReducer.currentStateOfData,
    originalStateOfData: state.mainReducer.originalStateOfData,
    isAddNewConfigOn: state.mainReducer.addNewConfig.isAddNewConfigOn
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    openRelevantRecipe,
    initializeConfigurationToSchemaMap,
    fetchData
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(
    ConfigurationsToAddListSideBar);

