import React, {Component} from 'react';
import '../../css/App.css';
import '../../css/SidebarMenu.css';
import '../../css/Editor.css';
import {bindActionCreators} from "redux";
import {
  changeConfig,
  changeCurrentActiveConfiguration,
  setError,
  addNewModifiedConfig
} from '../../actions/mainActions'
import {connect} from "react-redux";
import Form from "react-jsonschema-form";
import Error from "./Error";

class Editor extends Component {
  constructor(props) {
    super(props);
  }

  onSubmit = (formData) => {
    console.log("Data submitted: ", formData);
    this.props.changeConfig(this.props.currentActiveConfigGroupName,
        this.props.currentActiveConfigName,
        formData.formData,
        this.props.currentStateOfData,
        this.props.currentActiveIndex);
    this.props.addNewModifiedConfig(this.props.currentActiveConfigGroupName,
        this.props.currentActiveConfigName, this.props.modifiedConfigs);
  };

  onError = (error) => {
    console.log(error);
  };

  render() {
    let schema = {};
    let form = [];
    let error = "";
    if (this.props.isEditingOn) {
      if (!this.props.currentActiveJsonSchema) {
        this.props.setError(true,
            "Couldn't get Json Schema for this configuration.");
        return (
            <Error/>

        );
      }
      schema = this.props.currentActiveJsonSchema;
      try {
        form = this.props.configurationsMap[this.props.currentActiveConfigGroupName].configuration[this.props.currentActiveIndex].elementSetting;
      } catch (err) {
        console.log("err", err);
        form = [];
      }

      return (
          <div className={"editor-container"}>

            <Form schema={schema}
                  onSubmit={this.onSubmit}
                  onError={this.onError}
                  formData={form}/>

          </div>

      );
    }
    else {
      return <span/>
    }
  }
}

function mapStateToProps(state) {
  console.log("state.mainReducer",state.mainReducer);
  console.log("modifiedConfigs",state.mainReducer.modifiedConfigs);
  return {
    currentStateOfData: state.mainReducer.currentStateOfData,
    currentActiveConfiguration: state.mainReducer.currentActiveConfiguration,
    isEditingOn: state.mainReducer.currentActiveConfiguration.editingIsOn,
    currentActiveConfigName: state.mainReducer.currentActiveConfiguration.configName,
    currentActiveIndex: state.mainReducer.currentActiveConfiguration.index,
    currentActiveConfigGroupName: state.mainReducer.currentActiveConfiguration.configGroupName,
    currentActiveJsonSchema: state.mainReducer.currentActiveConfiguration.jsonSchema,
    currentActiveDefaultConfig: state.mainReducer.currentActiveConfiguration.defaultConfig,
    configurationsMap: state.mainReducer.configurationsMap,
    jsonSchemaAndDefaults: state.mainReducer.jsonSchemaAndDefaults,
    modifiedConfigs: state.mainReducer.modifiedConfigs
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeCurrentActiveConfiguration,
    changeConfig,
    setError,
    addNewModifiedConfig

  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);