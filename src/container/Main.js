import React, {Component} from 'react';
import {connect} from 'react-redux'
import '../css/App.css';
import 'font-awesome/css/font-awesome.min.css';
import ConfigurationsListSideBar from "./ConfigurationsListSideBar";
import Editor from "./editor/Editor";
import ConfigurationsToAddListSideBar
  from "./ConfigAdderSideBar/ConfigurationsToAddListSideBar";
import NavigationBar from "./navbar/NavigationBar";

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    
  }

  render() {
    return (
        <div className="main">
          <NavigationBar/>
          <ConfigurationsListSideBar/>
          <ConfigurationsToAddListSideBar/>
         <Editor/>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    recipes: state.mainReducer.data.recipes
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);