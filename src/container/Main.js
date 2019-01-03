import React, {Component} from 'react';
import {connect} from 'react-redux'
import '../css/App.css';
import RecipeCard from "./RecipeCard";
import NavigationBar from "./NavigationBar";
import ConfigurationsListSideBar from "./ConfigurationsListSideBar";
import Editor from "./editor/Editor";
import ConfigurationsToAddListSideBar
  from "./ConfigAdderSideBar/ConfigurationsToAddListSideBar";

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    
  }

  render() {
    return (
        <div className="Main2">
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