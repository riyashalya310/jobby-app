import {Link} from 'react-router-dom'
import './index.css'
import Header from '../Header'

const Home = () => {
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

        <button type="button" onClick={findJobsBtn}>
          <Link to="/jobs">Find Jobs</Link>
        </button>
      </div>
    </>
  )
}
export default Home
