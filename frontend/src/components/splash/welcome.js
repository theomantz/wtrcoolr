import React from 'react'
import './welcome.css'

const Welcome = () =>{
  return(
    <div className="welcome-modal">
      <h2>Welcome to wtrcoolr</h2>
      <div class="about">
        <h3>About:</h3>
        <p>This application was inspired by the chance encounters we all miss so much as a result of working from home
          and quarantining.</p>
        <p>Whether it was connecting with a former team-member at work or chatting with your child's friend's parents
          at Youth League basketball, these seemingly small 'watercooler' moments brought our communities closer together and fostered a sense 
          of companionship.
        </p>
        <p>Wtrcoolr is our effort to bring that back to you.</p>
      </div>
      <div class="instructions">
        <h3>Instructions:</h3>
        <h4>Demo</h4>
        <p>Explore wtrcoolr by entering as a demo user. Invite a friend or coworker to use the other demo account and you'll likely
          end up paired together in a 'coolrhour'
        </p>
        <h4>Sign Up/Log In</h4>
        <p>
          Enter with your own account! You can create organizations, designate specific times for 
          'coolrhours' (explained below), and join public organizations.
        </p>
        <p>
          If you are logged in and belong to an organization with an active 'coolrhour' you'll be prompted to join a zoom style 
          video chat with another online member (chosen randomly) from the same organization.
        </p>
      </div>
      <h3 class="enter">Click anywhere to enter!</h3>
    </div>
  )
}

export default Welcome