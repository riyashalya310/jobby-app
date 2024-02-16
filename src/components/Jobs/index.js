import {Component, Redirect} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import './index.css'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'

const profileApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const jobsApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    profile: {},
    profileApiStatus: profileApiStatusConstants.initial,
    jobsApiStatus: jobsApiStatusConstants.initial,
    employmentType: '',
    minimumPackage: '',
    search: '',
  }

  componentDidMount() {
    this.getJobsList()
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({profileApiStatus: profileApiStatusConstants.loading})
    const options = {
      method: 'GET',
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    if (response.ok) {
      const data = await response.json()
      const filteredData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileApiStatus: profileApiStatusConstants.success,
        profile: filteredData,
      })
    } else {
      this.setState({profileApiStatus: profileApiStatusConstants.failure})
    }
  }

  getJobsList = async () => {
    this.setState({jobsApiStatus: jobsApiStatusConstants.loading})
    const options = {
      method: 'GET',
    }
    const {employmentType, search, minimumPackage} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minimumPackage}&search=${search}`,
      options,
    )
    if (response.ok) {
      const data = response.json()
      const filteredData = data.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsList: filteredData,
        jobsApiStatus: jobsApiStatusConstants.success,
      })
    } else {
      this.setState({jobsApiStatus: jobsApiStatusConstants.failure})
    }
  }

  renderProfileSuccess = () => {
    const {profile} = this.state
    const {name, profileImageUrl, shortBio} = profile
    return (
      <div>
        <img src={profileImageUrl} alt="profile" />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  onClickRetryBtn = () => {
    this.getProfile()
  }

  renderProfileFailure = () => (
    <button type="button" onClick={this.onClickRetryBtn}>
      Retry
    </button>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfile = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case profileApiStatusConstants.loading:
        return this.renderLoader()

      case profileApiStatusConstants.success:
        return this.renderProfileSuccess()

      case profileApiStatusConstants.failure:
        return this.renderProfileFailure()

      default:
        return null
    }
  }

  onChangeSearch = event => {
    this.setState({search: event.target.value})
  }

  onClickJobsRetry = () => {
    this.getJobsList()
  }

  renderJobFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.onClickJobsRetry}>
        Retry
      </button>
    </div>
  )

  renderJobsSuccess = () => {
    const {jobsList} = this.state
    return (
      <ul>
        {jobsList.map(job => (
          <li key={job.id}>
            <Link to={`/jobs/${job.id}`}>
              <img src={job.companyLogoUrl} alt="company logo" />
              <h1>{job.title}</h1>
              <p>{job.rating}</p>
              <p>{job.location}</p>
              <p>{job.employmentType}</p>
              <p>{job.salary}</p>
              <hr />
              <p>Description</p>
              <p>{job.jobDescription}</p>
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  renderJobs = () => {
    const {jobsApiStatus} = this.state
    switch (jobsApiStatus) {
      case jobsApiStatusConstants.success:
        return this.renderJobsSuccess()

      case jobsApiStatusConstants.failure:
        return this.renderJobFailure()

      case jobsApiStatusConstants.loading:
        return this.renderLoader()

      default:
        return null
    }
  }

  render() {
    const {employmentTypesList, salaryRangesList, search} = this.props
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <div>
          <div>
            {this.renderProfile()}
            <hr />
            <h1>Type of Employment</h1>
            <ul>
              {employmentTypesList.map(employment => (
                <li key={employment.employmentTypeId}>
                  <label htmlFor={employment.employmentTypeId}>
                    <input type="checkbox" id={employment.employmentTypeId} />
                    {employment.label}
                  </label>
                </li>
              ))}
            </ul>
            <h1>Salary Range</h1>
            <ul>
              {salaryRangesList.map(salary => (
                <li key={salary.salaryRangeId}>
                  <label htmlFor={salary.salaryRangeId}>
                    <input
                      type="radio"
                      name="salary"
                      value={salary.salaryRangeId}
                      id={salary.salaryRangeId}
                    />
                    {salary.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div>
              <input
                type="search"
                id="search"
                value={search}
                onChange={this.onChangeSearch}
              />
              <button type="button" data-testid="searchButton">
                <BsSearch className="search-icon" />.
              </button>
            </div>
            {this.renderJobs()}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
