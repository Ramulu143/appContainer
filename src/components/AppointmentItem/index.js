// Write your code here

import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleBlinkIcon} = props
  const {id, title, date, isLiked} = appointmentDetails

  const imageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const toChangeToggle = () => {
    toggleBlinkIcon(id)
  }
  return (
    <li className="container">
      <div className="button-container">
        <p className="text-heading">{title}</p>

        <button
          type="button"
          data-testid="star"
          onClick={toChangeToggle}
          className="star-button"
        >
          <img src={imageUrl} alt="star" className="star-icon" />
        </button>
      </div>
      <p className="paragraph">Date:{date}</p>
    </li>
  )
}
export default AppointmentItem
