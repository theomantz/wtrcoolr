import React from "react";
import './organization_list.css'
import { Link } from "react-router-dom";

const getItems = props => {
  let userOrgs = props.state.session.user.orgs
  let itemArr = userOrgs.map(org => (
    {id: String(org._id), content: org.name}
  ))

  return itemArr;
}

class OrganizationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: getItems(props)
    };
  }

  render() {

      let userOrgs = this.props.state.session.user.orgs
      let itemArr = userOrgs.map(org => (
        {id: String(org._id), content: org.name}
      ))



    return (


            <div className="organization-list-container">
              {itemArr.map((item, index) => (
                <div className="dashboard-org-list">
                  <strong>{item.content}</strong><Link className="admin-button" to={`admin/${item.id}`}>Admin</Link>
                </div>
              ))}
            </div>
    )}

}


export default OrganizationList;




