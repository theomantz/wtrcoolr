import React from "react";
import './organization_list.css'
import { Link } from "react-router-dom";


class OrganizationList extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(org, currentUser) {
    return (
      e => {

        const findOrgIndex = (org) => {
          for (let i = 0; i < this.props.currentUser.orgs.length; i++) {
            if (this.props.currentUser.orgs[i]._id === org.id) {
              return i
            }
          }
          return -1;
        }
        e.preventDefault();
        let orgIndex = findOrgIndex(org)
        let orgsArr = currentUser.orgs
        orgsArr.splice(orgIndex, 1)
        this.props.updateOrgUsers({
          userId: currentUser.id,
          orgId: org._id,
          admin: false,
          add: false
        });
        this.props.updateUser({
          orgs: orgsArr,
          id: currentUser.id
        });
      }
    )
  }


  render() {

    // let userOrgs = this.props.userOrgs
    let itemArr = this.props.itemArr;
    return (


      <div className="organization-list-container">
        {itemArr.map((item, index) => (
          <div className="dashboard-org-list">
            <strong>{item.content}</strong>
            <div className="buttons-list">
              {(item.admins.includes(this.props.currentUser.id)) ?  <Link className="admin-button" to={`admin/${item.id}`}>Admin</Link> : ""    }
              
              <button onClick={this.handleClick(item, this.props.currentUser)} className="leave-org-button">Leave</button>
            </div>
          </div>
        ))}
      </div>
    )}

}


export default OrganizationList;




