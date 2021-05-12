import './modal.css'
import React from "react";
import { closeModal } from "../../actions/modal_actions";
import { connect } from "react-redux";
import LoginFormContainer from "../session/login_form_container";
import SignupFormContainer from "../session/signup_form_container";
import CreateOrgFormContainer from "../create_org/create_org_container";
import AddMemberContainer from '../admin/add_member_container'
import AddInterestsContainer from '../interests/interests_form_container'
import PairPrompt from '../match_router/pair_prompt';
import Welcome from '../../components/splash/welcome'
import { 
  unpauseCounter,
  addToNotified,
  removeCurrentCoolrs
 } from '../../actions/match_actions';


class Modal extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.modal === 'pairMatch') {
      this.props.addToNotified(this.props.currentCoolrs)
      this.props.removeCurrentCoolrs(this.props.currentCoolrs)
      this.props.unpause();
    } else if (this.props.modal ==='addInterests'){
      return
    }
    if (this.props.model ==='addInterests'){
      return
    }
    this.props.closeModal();
  }
  
  render() {

    if (!this.props.modal) {
    return null;
    }
    let component;
    switch (this.props.modal) {
    case "login":
        component = <LoginFormContainer />;
      break;
    case "addInterests":
      component = <AddInterestsContainer />
      break;
    case "signup":
      component = <SignupFormContainer />;
      break;
    case "createOrg":
      component = <CreateOrgFormContainer />;
      break;
    case "addMember":
        component = <AddMemberContainer />;
      break;
    case 'pairMatch':
        component = <PairPrompt />;
      break;
    case 'welcome':
      component = <Welcome />
      break;
    default:
      return null;
    }
    return (
      <div 
        className="modal-background" 
        onClick={this.handleClick}
      >
        <div className="modal-child" onClick={this.props.modal ==="welcome" ? this.handleClick : (e) => e.stopPropagation()}>
          {component}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.ui.modal,
    currentCoolrs: state.ui.currentCoolrs,
    matched: state.entities.users.match
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    unpause: () => dispatch(unpauseCounter()),
    addToNotified: (coolrHours) => dispatch(addToNotified(coolrHours)),
    removeCurrentCoolrs: (coolrHours) => dispatch(removeCurrentCoolrs(coolrHours))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
