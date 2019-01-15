import React, {Component} from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

// fake data generator
const getItems = count =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
      id: `item-${k}`,
      content: `item ${k}`,
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
});

class DraggablesTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: getItems(10),
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
        this.state.items,
        result.source.index,
        result.destination.index
    );

    this.setState({
      items,
    });
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
console.log("1",this.props.configurationsMap["enricherConfigurationsWeb"].configuration);
console.log("2",this.state.items);
    
    return (
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                >
                  {this.props.configurationsMap["enricherConfigurationsWeb"].configuration.map((item, index) => (
                      <Draggable key={item.elementName} draggableId={item.elementName} index={index}>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                )}
                            >
                              {item.elementName}
                            </div>
                        )}
                      </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
            )}
          </Droppable>
        </DragDropContext>
    );
  }
}

// Put the thing into the DOM!
//ReactDOM.render(<DraggablesTest />, document.getElementById('root'));

function mapStateToProps(state) {
  return {
    configurationsMap: state.mainReducer.configurationsMap
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch)
};
export default connect(mapStateToProps, mapDispatchToProps)(DraggablesTest);
