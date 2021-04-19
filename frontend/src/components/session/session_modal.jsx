import React from 'react';
import LoginFormContainer from './login_form_container';
import SignupFormContainer from './login_form_container';


const SessionModal = ({modal, closeSessionModal}) => {
  
  if (!modal) {
    return null
  } else {

    let form;
    switch (modal) {
      case 'login':
        form = <SessionFormContainer />;
      case 'signup':
        form = <SignupFormContainer />;
      default:
        return null
    }
    return (
      <div className="session-modal-background" onClick={closeSessionModal}>
        <div className="session-modal-container" onClick={e => e.stopPropagation()}>
          { form }
        </div>
      </div>
    )
  }

}

export default SessionModal;