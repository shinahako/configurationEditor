import React, {Component} from 'react';
import '../../css/App.css';
import '../../css/SidebarMenu.css';
import '../../css/Editor.css';
import {bindActionCreators} from "redux";
import {
  changeCurrentConfigurationEdit
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


  onSubmit = (formData)=>  {
    console.log("Data submitted: ",  formData);
};


  render() {
    return (
        
<div className={"container"}>
{/*  <Form schema={this.props.currentActiveConfiguration ? this.props.jsonSchemaAndDefaults[this.props.currentActiveConfiguration].jsonSchema : {}}
        onChange={log("changed")}
        onSubmit={log("submitted")}
        formData={this.props.currentActiveConfiguration ? this.props.jsonSchemaAndDefaults[this.props.currentActiveConfiguration].defaultSettings : ""}
        onError={log("errors")} />*/}
  <Form schema={this.props.currentActiveConfiguration && this.props.jsonSchemaAndDefaults[this.props.currentActiveConfiguration] && this.props.jsonSchemaAndDefaults[this.props.currentActiveConfiguration].jsonSchema ? this.props.jsonSchemaAndDefaults[this.props.currentActiveConfiguration].jsonSchema : {}}
        onSubmit={this.onSubmit}
        FieldTemplate={CustomFieldTemplate} />
</div>
      
    );
  }
}

function mapStateToProps(state) {
  return {
    currentActiveConfiguration: state.mainReducer.currentActiveConfiguration,
    jsonSchemaAndDefaults: state.mainReducer.jsonSchemaAndDefaults,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeCurrentConfigurationEdit
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);