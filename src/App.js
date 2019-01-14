import React, {Component} from 'react';
import Main from '../../configurationEditor2/src/container/Main';
import '../../configurationEditor2/src/css/App.css';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faStroopwafel} from '@fortawesome/free-solid-svg-icons'
import AppRouter from "./AppRouter";
import { BrowserRouter as Router, Link } from "react-router-dom";
import * as queryString from "query-string";
import UrlParams from "./UrlParams";

library.add(faStroopwafel);

class App extends Component {

  componentDidMount () {
    /*    const { etlUrlParam } = this.props.match.params;
    
        fetch(`https://api.twitter.com/user/${etlUrlParam}`)
        .then((user) => {
          this.setState(() => ({ user }))
        })*/
    /*  let userId = this.props.match.params.userId;
      let url = this.props.location.search;
      let params = queryString.parse(url);
      console.log(params);*/
    let params = new URLSearchParams(window.location.search);
  }


  render() {

    return (
        <div className="App">
          {/*          <AddTodo/>
          <VisibleTodoList/>
          <Footer/>*/}


          <Main/>
          {/*   <Child name={params.get("name")} />*/}
        </div>
    );
  }
}

export default App;