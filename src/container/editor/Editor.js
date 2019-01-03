import React, {Component} from 'react';
import '../../css/App.css';
import '../../css/SidebarMenu.css';
import '../../css/Editor.css';
import {bindActionCreators} from "redux";
import {
  changeCurrentActiveConfiguration,
  changeConfig
} from '../../actions/mainActions'
import {connect} from "react-redux";
import Form from "react-jsonschema-form";

const schema = {
  title: "Todo",
  type: "object",
  required: ["title"],
  properties: {
    title: {type: "string", title: "Title", default: "A new task"},
    done: {type: "boolean", title: "Done?", default: false}
  }
};

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

const log = (type) => console.log.bind(console, type);

class Editor extends Component {
  constructor(props) {
    super(props);
  }

  onSubmit = (formData) => {
    console.log("Data submitted: ", formData);
    this.props.changeConfig(this.props.currentActiveConfigGroupName,
        this.props.currentActiveConfigName,
        formData,
        this.props.currentStateOfData,
        this.props.currentActiveIndex)
  };

  render() {
    if (this.props.isEditingOn) {
      return (
          <div className={"container"}>
            {/*  <Form schema={this.props.currentActiveConfiguration ? this.props.jsonSchemaAndDefaults[this.props.currentActiveConfiguration].jsonSchema : {}}
        onChange={log("changed")}
        onSubmit={log("submitted")}
        formData={this.props.currentActiveConfiguration ? this.props.jsonSchemaAndDefaults[this.props.currentActiveConfiguration].defaultSettings : ""}
        onError={log("errors")} />*/}
            <Form schema={this.props.currentActiveConfigName
            && this.props.jsonSchemaAndDefaults[this.props.currentActiveConfigGroupName][this.props.currentActiveConfigName]
            && this.props.jsonSchemaAndDefaults[this.props.currentActiveConfigGroupName][this.props.currentActiveConfigName].jsonSchema
                ? this.props.jsonSchemaAndDefaults[this.props.currentActiveConfigGroupName][this.props.currentActiveConfigName].jsonSchema
                : {}}
                  onSubmit={this.onSubmit}
                  formData={this.props.configurationsMap[this.props.currentActiveConfigGroupName][this.props.currentActiveIndex].elementSettings}
                  FieldTemplate={CustomFieldTemplate}/>
          </div>

      );
    } else {
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
    configurationsMap: state.mainReducer.configurationsMap,
    jsonSchemaAndDefaults: state.mainReducer.jsonSchemaAndDefaults,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeCurrentActiveConfiguration,
    changeConfig
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);