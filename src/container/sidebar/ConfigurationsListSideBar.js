import React, {Component} from 'react';
import '../../css/App.css';
import '../../css/SidebarMenu.css';
import {bindActionCreators} from "redux";
import {
  fetchData,
  initializeConfigurationToSchemaMap,
  openRelevantRecipe
} from '../../actions/mainActions'
import {connect} from "react-redux";
import SidebarUpperLinkGroup from "./../sidebar/SidebarUpperLinkGroup";
import SidebarLowerLink from "./../sidebar/SidebarLowerLink";
import SidebarUpperSearchBar from "./../sidebar/SidebarUpperSearchBar";

class ConfigurationsListSideBar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
  }


  render() {
    return (
        <div>
          <div className="area"/>
          <nav className="main-menu">
            <SidebarUpperSearchBar/>
            <div className="listContent" id="style-5">
          
            {(() => {
              let indents = [];
              console.log("this.props.configurationsMap",this.props.configurationsMap);
              for (let configGroupName in this.props.configurationsMap) {
                console.log(configGroupName,this.props.configurationsMap[configGroupName].configuration);
                  indents.push(<SidebarUpperLinkGroup configGroupName={configGroupName}
                                                      configurations={this.props.configurationsMap[configGroupName].configuration}
                  />);
                
              }
              return indents;
            })()}
            </div>
            <SidebarLowerLink/>
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
    ConfigurationsListSideBar);

