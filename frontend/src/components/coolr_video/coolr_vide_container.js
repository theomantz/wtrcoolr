import { connect } from 'react-redux'
import CoolrVideo from './coolr_video';
import { withRouter } from 'react-router-dom';


const mapStateToProps = ({ session }) => ({
  user: session.user
});

const mapDispatchToProps = dispatch => ({
  
});

export default connect( mapStateToProps, mapDispatchToProps )(CoolrVideo)