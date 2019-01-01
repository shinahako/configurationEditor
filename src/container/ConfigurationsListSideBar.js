import React, {Component} from 'react';
import '../css/App.css';
import '../css/SidebarMenu.css';
import {bindActionCreators} from "redux";
import {
  initializeConfigurationToSchemaMap,
  openRelevantRecipe,
  createConfigToSchemaMap,
  fetchData
} from '../actions/mainActions'
import {connect} from "react-redux";
import SidebarUpperLinkGroup from "./sidebar/SidebarUpperLinkGroup";
import SidebarLowerLink from "./sidebar/SidebarLowerLink";

class ConfigurationsListSideBar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(){
    //if(this.props.configToSchemaMap.size>0){
      console.log("this.props.configToSchemaMap",this.props.configToSchemaMap);
    //}
  }
  

  render() {
    return (
        <div>
        <div className="area"></div>
        <nav className="main-menu">
          <SidebarUpperLinkGroup text={"enricherConfigurations"} schema={"http://etlexporter.vip.qa.ebay.com/v1/enrichers/getDefaultSettingsSchema?enricherName=NameNormalizationEnricher"} defaultConfig={"http://etlexporter.vip.qa.ebay.com/v1/enrichers/getDefaultSettingsSchema?enricherName=NameNormalizationEnricher"}
/>
<SidebarLowerLink/>
        </nav>
        </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    configToSchemaMap: state.mainReducer.configToSchemaMap
  };
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    openRelevantRecipe,
    initializeConfigurationToSchemaMap,
    createConfigToSchemaMap,
    fetchData
  }, dispatch)
};


export default connect(mapStateToProps, mapDispatchToProps) (ConfigurationsListSideBar);