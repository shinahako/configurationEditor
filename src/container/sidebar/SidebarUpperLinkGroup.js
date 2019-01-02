import React, {Component} from 'react';
import '../../css/SidebarMenu.css';
import {bindActionCreators} from "redux";
import {
  initializeConfigurationToSchemaMap,
  fetchData
} from '../../actions/mainActions'
import {connect} from "react-redux";
import SidebarUpperLinkChild from "./SidebarUpperLinkChild";
import GeneralUtils from "../../Utils/GeneralUtils";

class SidebarUpperLinkGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showChildren: true
    }
  }

  changeVisibilityOfChildren = () => {
    this.setState({
      showChildren: !this.state.showChildren
    });
  };

  render() {
    if (GeneralUtils.checkIfMapIsNotEmpty(this.props.configurationsMap)) {
      return (
          <ul>
            <li>
              <a onClick={this.changeVisibilityOfChildren}>
                <i className="fa fa-folder fa-2x"/>
                <span className="nav-text">
                {this.props.configGroupName}
              </span>
              </a>
            </li>
            {(() => {
              if (this.state.showChildren) {
                return this.props.configurations.map((item, index) => (
                    <SidebarUpperLinkChild
                        configGroupName={this.props.configGroupName}
                        configName={this.props.configurations[index].elementName}
                        index={index}
                        lengthOfConfigurations={this.props.configurations.length}
                        schema={"http://etlexporter.vip.qa.ebay.com/v1/enrichers/getDefaultSettingsSchema?enricherName=NameNormalizationEnricher"}
                        defaultConfig={"http://etlexporter.vip.qa.ebay.com/v1/enrichers/getDefaultSettingsSchema?enricherName=NameNormalizationEnricher"}
                    />
                ))
              }
            })()}

          </ul>
      );
    }
    else {
      return <span/>
    }
  }
}

function mapStateToProps(state) {
  return {
    configurationsMap: state.mainReducer.configurationsMap
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    initializeConfigurationToSchemaMap,
    fetchData
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(
    SidebarUpperLinkGroup);