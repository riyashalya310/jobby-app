import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="login" />
  }
  const findJobsBtn = props => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <>
      <Header />
      <div>
        <h1>Find The Job That Fits Your Life</h1>
        <p>
          Millions of people are searching for jobs, salary information, company
          reviews.
        </p>
        <img
          src="https://assets.ccbp.in/frontend/react-js/home-sm-bg.png"
          alt=""
        />

        <Link to="/jobs">
          <button type="button" onClick={findJobsBtn}>
            Find Jobs
          </button>
        </Link>
      </div>
    </>
  )
}
export default Home
