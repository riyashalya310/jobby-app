import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <ul>
      <Link to="/">
        <li>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </li>
      </Link>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/jobs">Jobs</Link>
      </li>
      <button type="button" onClick={onClickLogout}>
        Logout
      </button>
    </ul>
  )
}
export default withRouter(Header)
