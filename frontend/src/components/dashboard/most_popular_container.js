import { connect } from 'react-redux';
import MostPopular from './most_popular';
import {updateUser} from '../../actions/users_actions'
import {updateOrgUsers,getPublicOrgs} from '../../actions/org_actions'


const mapStateToProps = state => {

  
    //Most Popular
    let mostPopular = [];
    if(state.entities.publicOrgs.length>0){
        mostPopular = state.entities.publicOrgs.map((x) => x);
    }
    
    function compare( a, b ) {
        if ( a.members.length < b.members.length ){
          return 1;
        }
        if ( a.members.length > b.members.length ){
          return -1;
        }
        return 0;
    }

    
    
    mostPopular.sort(compare);


    //Trending
    let trending = [];

    if(state.entities.publicOrgs.length>0){
      trending = state.entities.publicOrgs.map((x) => x);
    }

    function trendCompare( a, b ) {
      if ( (a.members.length-a.previousMembers)/a.previousMembers < (b.members.length-b.previousMembers)/b.previousMembers ){
        return 1;
      }
      if ( (a.members.length-a.previousMembers)/a.previousMembers > (b.members.length-b.previousMembers)/b.previousMembers ){
        return -1;
      }
      return 0;
    }

    trending.sort(trendCompare)

  return {
    mostPopular: mostPopular,
    currentUser: state.session.user,
    trending: trending
  }
};

const mapDispatchToProps = dispatch => ({
    updateUser: (user) => dispatch(updateUser(user)),
    updateOrgUsers: (org) => dispatch(updateOrgUsers(org)),
    getPublicOrgs: () => dispatch(getPublicOrgs()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MostPopular);