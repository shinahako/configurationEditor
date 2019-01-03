import React, {Component} from 'react';
import {connect} from 'react-redux'
import '../css/App.css';
import RecipeCard from "./RecipeCard";
import NavigationBar from "./NavigationBar";
import ConfigurationsListSideBar from "./ConfigurationsListSideBar";
import Editor from "./editor/Editor";

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    
  }

  render() {
    return (
        <div className="Main2">
       {/*   <NavigationBar/>*/}
          {/*         <div>
            <p>{this.props.count}</p>
            <button onClick={this.props.increment}>+</button>
            <button  onClick={this.props.decrement}>-</button>
          </div>*/}

          <ConfigurationsListSideBar/>
          <Editor/>
 {/*         {
            this.props.recipes.map(recipe =>
                <RecipeCard
                    id={recipe.id}
                    title={recipe.title}
                    rating={recipe.rating}
                    foodImg={recipe.foodImg}
                    profileImg={recipe.profileImg}
                />
            )}*/}
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