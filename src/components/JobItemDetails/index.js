import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

const jobApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    jobAPIStatus: jobApiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({jobAPIStatus: jobApiStatusConstants.loading})
    const options = {
      method: 'GET',
    }
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
    if (response.ok) {
      const data = await response.json()
      const filteredCompanyLogoUrl = {
        companyLogoUrl: data.job_details.company_logo_url,
      }
      const filteredCompanyWebsiteUrl = {
        companyWebsiteUrl: data.job_details.company_website_url,
      }
      const filteredEmploymentType = {
        employmentType: data.job_details.employment_type,
      }
      const filteredId = {
        id: data.job_details.id,
      }
      const filteredJobDescription = {
        jobDescription: data.job_details.job_description,
      }
      const filteredSkills = {
        skills: data.job_details.skills.map(jobD => ({
          imageUrl: jobD.image_url,
          name: jobD.name,
        })),
      }
      const filteredLifeAtCompany = {
        lifeAtCompany: data.job_details.life_at_company.map(jobD => ({
          description: jobD.description,
          imageUrl: jobD.image_url,
        })),
      }
      const filteredLocation = {
        location: data.job_details.location,
      }
      const filteredPackagePerAnnum = {
        packagePerAnnum: data.job_details.package_per_annum,
      }
      const filteredRating = {
        rating: data.job_details.rating,
      }
      const filteredSimilarJobs = {
        similarJobs: data.job_details.similar_jobs.map(similarJob => ({
          companyLogoUrl: similarJob.company_logo_url,
          employmentType: similarJob.employment_type,
          id: similarJob.id,
          jobDescription: similarJob.job_description,
          location: similarJob.location,
          rating: similarJob.rating,
          title: similarJob.title,
        })),
      }
      const filteredData = {
        companyLogoUrl: filteredCompanyLogoUrl.companyLogoUrl,
        companyWebsiteUrl: filteredCompanyWebsiteUrl.companyWebsiteUrl,
        employmentType: filteredEmploymentType.employmentType,
        id: filteredId.id,
        jobDescription: filteredJobDescription.jobDescription,
        skills: filteredSkills.skills,
        lifeAtCompany: filteredLifeAtCompany.lifeAtCompany,
        location: filteredLocation.location,
        packagePerAnnum: filteredPackagePerAnnum.packagePerAnnum,
        rating: filteredRating.rating,
        similarJobs: filteredSimilarJobs.similarJobs,
      }
      this.setState({
        jobDetails: filteredData,
        jobAPIStatus: jobApiStatusConstants.success,
      })
    } else {
      this.setState({jobAPIStatus: jobApiStatusConstants.failure})
    }
  }

  renderJobSuccess = () => {
    const {jobDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      similarJobs,
    } = jobDetails
    return (
      <div>
        <img src={companyLogoUrl} alt="" />
        <h1>{jobDescription}</h1>
        <p>{rating}</p>
        <p>{location}</p>
        <p>{employmentType}</p>
        <p>{packagePerAnnum}</p>
        <hr />
        <p>Description</p>
        <p>{jobDescription}</p>
        <a href={companyWebsiteUrl}>Visit</a>
        <h1>Skills</h1>
        <ul>
          {skills.map(skill => (
            <li key={skill.name}>
              <img src={skill.imageUrl} alt="" />
              <h1>{skill.name}</h1>
            </li>
          ))}
        </ul>
        <h1>Life At Company</h1>
        <p>{lifeAtCompany}</p>
        <h1>Similar Jobs</h1>
        <ul>
          {similarJobs.map(job => (
            <li key={job.id}>
              <img src={job.companyLogoUrl} alt="" />
              <p>{job.employmentType}</p>
              <h1>{job.title}</h1>
              <h1>Description</h1>
              <p>{job.jobDescription}</p>
              <p>{job.location}</p>
              <p>{job.rating}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  onClickJobsRetry = () => {
    this.getJobDetails()
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

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJob = () => {
    const {jobAPIStatus} = this.state
    switch (jobAPIStatus) {
      case jobApiStatusConstants.success:
        return this.renderJobSuccess()

      case jobApiStatusConstants.failure:
        return this.renderJobFailure()

      case jobApiStatusConstants.loading:
        return this.renderLoader()

      default:
        return null
    }
  }

  render() {
    return this.renderJob()
  }
}
export default JobItemDetails
