import React from 'react'
import './welcome.css'

const Welcome = () =>{
  return(
    <p className="modal-background">
      <p className="modal-child welcome-modal">
        <h2>Welcome to wtrcoolr</h2>
        <p>This application was inspired by the chance encounters we all miss so much as a result of working from home
          and quarantining.
        <p>Whether it was connecting with a former team-member at work or chatting with your child's friend's parents
          at Youth League basketball, these seemingly small 'watercooler' moments brought our communities closer together and offered a sense 
          of companionship.
        </p>
        <p>Wtrcoolr is our effort to bring that back to you</p>
        </p>
        <p>
          Upon entering you'll have the opportunity to Signup/Login with your own account, from which you'll be able to create
          organizations, designate specific times for 'coolrhours' (explained below), and join public organizations.
        </p>
        <p>
          If you are logged in and belong to an organization with an active 'coolrhour' you'll be prompted to join a zoom style 
          video chat with another online member (chosen randomly) from the same organization.
        </p>
        <p>Alternatively, you can enter as a demo user. Invite a friend or coworker to use the other demo account and you'll likely
          end up paired together in a 'coolrhour'
        </p>
        <h3>Click anywhere to enter!</h3>
      </p>
    </p>
  )
}

export default Welcome