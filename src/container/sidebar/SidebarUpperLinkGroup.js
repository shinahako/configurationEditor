import React, {Component} from 'react';
import '../../css/App.css';
import '../../css/SidebarMenu.css';
import {bindActionCreators} from "redux";
import {
  initializeConfigurationToSchemaMap,
  openRelevantRecipe,
  createConfigToSchemaMap,
  fetchData
} from '../../actions/mainActions'
import {connect} from "react-redux";
import SidebarUpperLinkChild from "./SidebarUpperLinkChild";
import GeneralUtils from "../../GeneralUtils";

class SidebarUpperLinkGroup extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    //if(this.props.configToSchemaMap.size>0){
    console.log("this.props.configToSchemaMap", this.props.configToSchemaMap);
    //}
  }
  
  render() {
    if(GeneralUtils.checkIfMapIsNotEmpty(this.props.configToSchemaMap)) {
      return (
          <ul>
            <li>
              <a href="">
                <i className="fa fa-home fa-2x"></i>
                <span className="nav-text">
                {this.props.text}
              </span>
              </a>
            </li>
            {(() => {
              for (let configuration in this.props.configToSchemaMap[this.props.text]) {
                return <SidebarUpperLinkChild text={configuration}
                                              schema={"http://etlexporter.vip.qa.ebay.com/v1/enrichers/getDefaultSettingsSchema?enricherName=NameNormalizationEnricher"}
                                              defaultConfig={"http://etlexporter.vip.qa.ebay.com/v1/enrichers/getDefaultSettingsSchema?enricherName=NameNormalizationEnricher"}
                />
              }
            })()}
          </ul>
      );
    }
    else return <span/>
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

export default connect(mapStateToProps, mapDispatchToProps)(SidebarUpperLinkGroup);