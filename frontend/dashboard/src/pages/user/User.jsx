import Single from '../../components/single/Single'
import { singleUser } from '../../data'
import './User.scss'

export default function User() {

  //Fetch data and send to single component
  return (
    <div className='user'>
      <Single {...singleUser}/>
    </div>
  )
}

