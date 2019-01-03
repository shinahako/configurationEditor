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
import ConfigAdderSideBarCloser from "./ConfigAdderSideBarCloser";

class ConfigurationsToAddListSideBar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
  }


  render() {
    return (
        <div id={"configAdderSideBar"}>
          <nav className="main-menu-config-adder"  id="style-5">
     <ConfigAdderSideBarCloser/>
            <ConfigAdderSidebarUpperLinkGroup/>
          </nav>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    configurationsMap: state.mainReducer.configurationsMap,
    currentActiveConfiguration: state.mainReducer.currentActiveConfiguration,
    currentStateOfData: state.mainReducer.currentStateOfData,
    originalStateOfData: state.mainReducer.originalStateOfData
    
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

