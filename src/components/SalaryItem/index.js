import './index.css'

const SalaryItem = props => {
  const {details, onChangeMinimumPackage} = props
  const {salaryRangeId, label} = details
  const changeMinimumPackage = id => {
    onChangeMinimumPackage(id)
  }
  return (
    <li>
      <label htmlFor={salaryRangeId}>
        <input
          type="radio"
          name="salary"
          value={salaryRangeId}
          id={salaryRangeId}
          onClick={changeMinimumPackage}
        />
        {label}
      </label>
    </li>
  )
}
export default SalaryItem
