import React, {Component} from 'react';
import '../css/App.css';
import Rating from "./recipeCard/Rating";
import {bindActionCreators} from "redux";
import {openRelevantRecipe} from '../actions/mainActions'
import axios from 'axios';

class RecipeCard extends Component {
    constructor(props) {
        super(props);
      this.ping = this.ping.bind(this);
    }

  openRelevantRecipe = ()=>  {
    this.props.openRelevantRecipe(this.props.id);
  };

  ping() {
    axios.get("http://localhost:8080/getData").then(res => {
      alert("Received Successful response from server!");
      this.setState({ponged: 'Ponged! '});
    }, err => {
      alert("Server rejected response with: " + err);
    });
  }
    

    render() {
        return (
            <div className="RecipeCard" onClick={this.openRelevantRecipe}>
           {/*   <FoodTitle title={this.props.title}/>
              <Rating rating={this.props.rating}/>
              <ProfilePictureOnCard src={this.props.profileImg}/>
              <img className={"RecipeCardImg"} src={this.props.foodImg}/>
              <FoodDescription description={"Food description goes here"}/>*/}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    openRelevantRecipe
  }, dispatch)
};


export default RecipeCard;