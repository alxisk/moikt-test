import React from 'react'
import { connect } from 'react-redux'
import { getUserId } from '../store/user'
import ErrorMessage from './ErrorMessage'

const mapStateToProps = state => ({
  userId: getUserId(state),
})

const Protected = ({ component: Component, userId, ...props }) => {
  if (userId) {
    return <Component {...props} />
  }

  return <ErrorMessage content="У вас нет доступа к этой странице" />
}

export default connect(mapStateToProps)(Protected)
