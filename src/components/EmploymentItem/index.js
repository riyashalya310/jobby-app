import './index.css'

const EmploymentItem = props => {
  const {details, onChangeEmploymentType} = props
  const {employmentTypeId, label} = details
  const changeEmploymentType = () => {
    onChangeEmploymentType(employmentTypeId)
  }
  return (
    <li>
      <label htmlFor={employmentTypeId}>
        <input
          type="checkbox"
          id={employmentTypeId}
          onClick={changeEmploymentType}
        />
        {label}
      </label>
    </li>
  )
}
export default EmploymentItem
