import { connect } from 'react-redux';
import MostPopular from './most_popular';
import {updateUser} from '../../actions/users_actions'


const mapStateToProps = state => {
    //let mostPopular = state.entities.publicOrgs
    console.log(state.entities.publicOrgs)
    let mostPopular = [];
    if(state.entities.publicOrgs.length>0){
        mostPopular = state.entities.publicOrgs.map((x) => x);
    }
    
    function compare( a, b ) {
        if ( a.members.length < b.members.length ){
          return -1;
        }
        if ( a.members.length > b.members.length ){
          return 1;
        }
        return 0;
    }
      
    mostPopular.sort(compare);

  return {
    mostPopular: mostPopular,
    currentUser: state.session.user
  }
};

const mapDispatchToProps = dispatch => ({
    updateUser: (user) => dispatch(updateUser(user)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MostPopular);