import React, {Component} from 'react';
import {connect} from 'react-redux'
import '../css/App.css';
import {Nav, NavItem, Row} from "react-bootstrap";

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1
    }
  }

  handleSelect = (selectedKey)=>  {
    this.setState({activeNav: selectedKey});
  };

  render() {
    return (
        <div className="NavigationBar">
        
          <Nav bsStyle="pills" activeKey={this.state.activeNav} onSelect={this.handleSelect}>
            <NavItem eventKey={1} href="/home">
              Recipes
            </NavItem>
            <NavItem eventKey={2} title="Item">
              NavItem 2
            </NavItem>
            <NavItem eventKey={3}>
              NavItem 3
            </NavItem>
          </Nav>
       
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    count: state
  };
}
function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (NavigationBar);