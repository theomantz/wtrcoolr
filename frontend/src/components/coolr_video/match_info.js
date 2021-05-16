import React from 'react'

class MatchInfo extends React.Component{
  constructor(props){
    super(props)
  }

  renderInterests(){
    debugger
    let interests = this.props.matchInfo.interests
    let interestsArray = []
    for (let i =0; i < interests.length;i++){
      interestsArray.push(<li>{interests[i]}</li>)
    }
    console.log(interestsArray)
    return interestsArray
  }

  // renderNonStarters(){

  // }

  render(){

    let {matchInfo} = this.props
    console.log(matchInfo)

    return(
      <div className="pair-infor-container">
        <h2>{matchInfo.username ? "Pair Info" : "Learn about your pair here!"}</h2>
        <div className="pair-info">
          <h3>{matchInfo ? matchInfo.username : ""}</h3>
          {matchInfo.interests ? this.renderInterests() : ""}
          {/* {matchInfo.nonStarters ? this.renderNonStarters() : ""} */}
        </div>
      </div>

    )
  }
}

export default MatchInfo