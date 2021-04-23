import React from 'react';
import './create_org_form.css'

class CreateOrgForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      public: 'Public',
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
    
    let publicbool = (this.state.public==='Public')
    this.props.formAction({
        name: this.state.name,
        public: publicbool,
        currentUser: this.props.currentUser.id
      })
      .then((org) => {
        let orgsArr = this.props.currentUser.orgs
        orgsArr.push(org.data)
        this.props.updateUser({
          orgs: orgsArr,
          id: this.props.currentUser.id
        })
        this.props.closeModal();
        this.props.history.push({pathname: `/admin/${org.id}`}) //change to org page
        })
      .catch(() => {})
  }



  handleClick(org,currentUser) {
    return (
      e => {
          e.preventDefault();
          if(!this.checkJoined(org)){
              let orgsArr = currentUser.orgs
              orgsArr.push(org)
              this.props.updateOrgUsers({
                  userId: currentUser.id,
                  orgId: org._id,
                  admin: false,
                  add: true
              })
              this.props.getPublicOrgs();
              this.props.updateUser({
                  orgs: orgsArr,
                  id: currentUser.id
              })
              this.props.getPublicOrgs();
          }
          else{
              let orgIndex = this.findOrgIndex(org)
              let orgsArr = currentUser.orgs
              orgsArr.splice(orgIndex,1)
              this.props.updateOrgUsers({
                  userId: currentUser.id,
                  orgId: org._id,
                  admin: false,
                  add: false
              })
              this.props.getPublicOrgs();
              this.props.updateUser({
                  orgs: orgsArr,
                  id: currentUser.id
              })
              this.props.getPublicOrgs();
          }
      }
    )
}

  render() {

    return (
      <div className="create-org_form-container">
        <form 
          onSubmit={this.handleSubmit}
          className="create-org_form">
          
            <div>
              <input 
                placeholder="Organization Name" 
                type="text"
                value={this.state.name}
                onChange={this.update('name')}
                >
              </input>
              <span>{this.props.errors.name}</span>
            </div>

          <div>
          <select onChange={this.update('public')}>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
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

export default CreateOrgForm