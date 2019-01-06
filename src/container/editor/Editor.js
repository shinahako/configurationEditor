import React, {Component} from 'react';
import '../../css/App.css';
import '../../css/SidebarMenu.css';
import '../../css/Editor.css';
import {bindActionCreators} from "redux";
import {
  changeConfig,
  changeCurrentActiveConfiguration,
  setError
} from '../../actions/mainActions'
import {connect} from "react-redux";
import Form from "react-jsonschema-form";
import Error from "./Error";

function CustomFieldTemplate(props) {
  const {id, classNames, label, help, required, description, errors, children} = props;
  return (
      <div className={classNames}>
        <label htmlFor={id}>{label}{required ? "*" : null}</label>
        {description}
        {children}
        {errors}
        {help}
      </div>
  );
}

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
        this.props.currentActiveIndex)
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
        form = this.props.configurationsMap[this.props.currentActiveConfigGroupName][this.props.currentActiveIndex].elementSetting;
      } catch (err) {
        console.log("err", err);
        form = [];
      }

        return (
            <div className={"container"}>
              <Form schema={schema}
                    onSubmit={this.onSubmit}
                    onError={this.onError}
                    formData={form}
                    FieldTemplate={CustomFieldTemplate}/>

            </div>

        );
    }
    else {
      return <span/>
    }
  }
}

function mapStateToProps(state) {
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
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeCurrentActiveConfiguration,
    changeConfig,
    setError
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);