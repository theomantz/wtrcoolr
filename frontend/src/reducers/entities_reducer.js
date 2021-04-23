import { combineReducers } from 'redux';

import publicOrgs from './orgs_reducer';
import users from './users_reducer';


export default combineReducers({
    publicOrgs,
    users
});
