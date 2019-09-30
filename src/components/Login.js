import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { isFetching, signIn } from '../store/user'
import Button from './Button'
import ErrorMessage from './ErrorMessage'
import styled from 'styled-components'

const LoginWrap = styled.div`
  margin: 0 auto;
  width: 30%;
  max-width: 600px;

  .field {
    margin-bottom: 20px;

    & input {
      width: 100%;
    }
  }

  .submit-button {
    margin-bottom: 20px;
  }
`

const mapStateToProps = state => ({
  isFetching: isFetching(state),
})

const NOT_AN_EMAIL = 'Неверный email'
const LOGIN_FAILED = 'Имя пользователя или пароль введены не верно'
const SERVER_UNAVAILABLE = 'Сервер недоступен'

const emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const validateEmail = (str, setError) => {
  if (!emailRe.test(str.toLowerCase())) {
    setError(NOT_AN_EMAIL)
  } else {
    setError('')
  }
}

const Login = ({ isFetching, signIn, history }) => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const submit = () =>
    signIn(email, pass).then(action => {
      if (action.payload.id) {
        history.push('/profile')
      } else {
        const error =
          action.payload.error === 'wrong_email_or_password'
            ? LOGIN_FAILED
            : SERVER_UNAVAILABLE

        setPass('')
        setError(error)
      }
    })

  return (
    <LoginWrap>
      <div className="field">
        <input
          type="email"
          placeholder="email (max@test.com)"
          onChange={({ target: { value } }) => setEmail(value)}
          onBlur={({ target: { value } }) => validateEmail(value, setError)}
          value={email}
        />
      </div>
      <div className="field">
        <input
          type="text"
          placeholder="пароль (12345)"
          onChange={({ target: { value } }) => setPass(value)}
          value={pass}
        />
      </div>
      <Button
        className="submit-button"
        content={isFetching ? 'отправляем...' : 'отправить'}
        onClick={isFetching ? null : submit}
        disabled={isFetching}
      />
      {error && <ErrorMessage content={error} />}
    </LoginWrap>
  )
}

Login.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired,
}

export default withRouter(
  connect(
    mapStateToProps,
    {
      signIn,
    },
  )(Login),
)
