// Write your code here
import {Component} from 'react'

import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    titleInput: '',
    dateInput: '',
    isFavorite: false,
  }

  onClickStare = () => {
    const {isFavorite} = this.state
    this.setState({
      isFavorite: !isFavorite,
    })
  }

  toggleBlinkIcon = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isLiked: !eachItem.isLiked}
        }
        return eachItem
      }),
    }))
  }

  newAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    const filterDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy,EEEE')
      : ''

    const newContainer = {
      id: v4(),
      title: titleInput,
      date: filterDate,
      isLiked: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newContainer],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeName = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  getFilterAppointments = () => {
    const {isFavorite, appointmentList} = this.state
    if (isFavorite) {
      return appointmentList.filter(
        eachAppointment => eachAppointment.isLiked === true,
      )
    }
    return appointmentList
  }

  render() {
    const {titleInput, dateInput, isFavorite} = this.state
    const filterClassName = isFavorite ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentList = this.getFilterAppointments()
    return (
      <div className="container">
        <div className="responsive-container">
          <div className="appointment-container">
            <div className="add-appointment-container">
              <form className="form-container" onSubmit={this.newAppointment}>
                <h1 className="heading">Add Appointment</h1>
                <label className="title-text" htmlFor="title">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Title"
                  onChange={this.onChangeName}
                  value={titleInput}
                  className="input"
                  autoComplete="OFF"
                />
                <label className="date" htmlFor="date">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  placeholder="dd/mm/yyyy"
                  onChange={this.onChangeDate}
                  value={dateInput}
                  className="input"
                />
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointment-image"
              />
            </div>
            <hr className="separator" />
            <div className="head-stare-container">
              <h1 className="header">Appointments</h1>
              <button
                type="button"
                className={`filter-style ${filterClassName}`}
                onClick={this.onClickStare}
              >
                Starred
              </button>
            </div>
            <ul className="ul-container">
              {filteredAppointmentList.map(eachText => (
                <AppointmentItem
                  key={eachText.id}
                  appointmentDetails={eachText}
                  toggleBlinkIcon={this.toggleBlinkIcon}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
