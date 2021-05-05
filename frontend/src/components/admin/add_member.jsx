import React from 'react';
import './add_member.css'
import {searchEmail} from '../../util/users_api_util'

class AddMemberForm extends React.Component {

  constructor(props) {
    super(props)
    
    this.state = {
      email: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  update(field) {
    return (
      e => {
        this.setState({[field]: e.currentTarget.value})
      }
    )
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
      searchEmail(this.state.email)
      .then(user =>{
        let orgsArr = user.data[0].orgs
        orgsArr.push(this.props.org)
        this.props.updateOrgUsers({
          userId: user.data[0]._id,
          orgId: this.props.org._id,
          admin: false,
          add: true
        })
        this.props.updateUser({
          orgs: orgsArr,
          id: user.data[0]._id
        })
        this.props.getPublicOrgs();


      })
    window.callUpdate();
    this.props.closeModal();

  }

  render() {

    return (
      <div className="add-member-container">
        <form 
          onSubmit={this.handleSubmit}
          className="add-member">
          
            <div>
              <input 
                placeholder="Email Address" 
                type="text"
                value={this.state.email}
                onChange={this.update('email')}
                >
              </input>
              <span>{this.props.errors.name}</span>
            </div>        
         
          <input 
            type="submit" 
            value={this.props.formType}
            onClick={(e) => e.stopPropagation()}
          />
          
        </form>
      </div>
    )
  }

}

export default AddMemberForm