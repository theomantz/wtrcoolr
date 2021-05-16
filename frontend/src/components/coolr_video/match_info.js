import React from 'react'

class MatchInfo extends React.Component{
  constructor(props){
    super(props)
  }

  renderInterests(){

    let interests = this.props.matchInfo.interests
    let interestsArray = [<h3>Interests:</h3>]
    for (let i =0; i < interests.length;i++){
      interestsArray.push(<li>{interests[i]}</li>)
    }
    return interestsArray
  }

  renderNonStarters(){
    let nonStarters = this.props.matchInfo.nonStarters
    let nonStartersArray = [<h3>Non-Starters:</h3>]
    for (let i =0; i < nonStarters.length;i++){
      nonStartersArray.push(<li>{nonStarters[i]}</li>)
    }
    return nonStartersArray

  }

  render(){

    let {matchInfo} = this.props
    console.log(matchInfo)

    return(
      <div className="pair-info-container">
        <h2>{matchInfo.username ? "Pair Info" : "Learn about your pair here!"}</h2>
        <div className="pair-info">
          <h3>{matchInfo.username ? 'Username:' : ""}</h3>
          <h4>{matchInfo ? matchInfo.username : ""}</h4>
          {matchInfo.interests ? this.renderInterests() : ""}
          {matchInfo.nonStarters ? this.renderNonStarters() : ""}
        </div>
      </div>

    )
  }
}

export default MatchInfo