import React from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import './organization_list.css'
import { Link } from "react-router-dom";

// fake data generator

const getItems = props => {
  let userOrgs = props.state.session.user.orgs
  let itemArr = userOrgs.map(org => (
    {id: String(org._id), content: org.name}
  ))

  return itemArr;
}


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
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  color: "white",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "space-between",
  // change background colour if dragging
  background: isDragging ? "gray" : "#7F3F98",

  // styles we need to apply on draggables
  ...draggableStyle
});

class OrganizationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: getItems(props)
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
      items
    });

  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {

      let userOrgs = this.props.state.session.user.orgs
      let itemArr = userOrgs.map(org => (
        {id: String(org._id), content: org.name}
      ))



    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="organization-list-container">
              {itemArr.map((item, index) => (
                // <Draggable key={item.id} draggableId={item.id} index={index}>
                //   {(provided, snapshot) => (
                //     <div
                //       className="list-items-orgs"
                //       ref={provided.innerRef}
                //       {...provided.draggableProps}
                //       {...provided.dragHandleProps}
                //       style={getItemStyle(
                //         snapshot.isDragging,
                //         provided.draggableProps.style
                //       )}
                //     >
                //       <strong>{item.content}</strong><Link className="admin-button" to={`admin/${item.id}`}>Admin</Link>
                      
                //     </div>
                //   )}
                // </Draggable>
                <div className="dashboard-org-list">
                  <strong>{item.content}</strong><Link className="admin-button" to={`admin/${item.id}`}>Admin</Link>
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}


export default OrganizationList;
// Put the thing into the DOM!



