import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUserInfo, fetchUserInfo } from '../store/user'
import ErrorMessage from './ErrorMessage'
import Icon from './Icon'
import Loader from './Loader'
import styled from 'styled-components'

const ProfileWrap = styled.div`
  p {
    margin: 10px 0;
  }

  .block {
    margin-bottom: 20px;
  }

  .link-list {
    width: 24px;
  }

  .link-list-item {
    display: block;
    margin-bottom: 10px;
  }
`

const mapStateToProps = state => ({
  userInfo: getUserInfo(state),
})

const USER_NOT_FOUND = 'Пользователь не найден'

const Profile = ({ userInfo, fetchUserInfo }) => {
  const { city, languages, social, isFetching } = userInfo
  const [error, setError] = useState('')

  useEffect(() => {
    fetchUserInfo().then(action => {
      if (action.payload.error) {
        setError(USER_NOT_FOUND)
      }
    })
  }, [fetchUserInfo])

  if (error) {
    return <ErrorMessage content={error} />
  }

  if (isFetching) {
    return <Loader content="Загружаем информацию о пользователе..." />
  }

  if (!city || !languages || !social) {
    return null
  }

  const webSocial = social.find(({ label }) => label === 'web')
  const socialWithoutWeb = social.filter(({ label }) => label !== 'web')
  const preparedSocial = [webSocial, ...socialWithoutWeb]

  return (
    <ProfileWrap>
      <h2>Профиль</h2>
      <div className="block">
        <p>Город: {city}</p>
      </div>
      <div className="block">
        <p>Знание языков:</p>
        <ul>
          {languages.map((lang, idx) => (
            <li key={idx}>- {lang}</li>
          ))}
        </ul>
      </div>
      <div className="block">
        <p>Ссылки:</p>
        <ul className="link-list">
          {preparedSocial.map(({ label, link }, idx) => (
            <li key={idx} className="link-list-item">
              <a href={link} target="_blank" rel="noopener noreferrer">
                <Icon name={label} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </ProfileWrap>
  )
}

Profile.propTypes = {
  userInfo: PropTypes.shape({
    city: PropTypes.string,
    languages: PropTypes.arrayOf(PropTypes.string),
    social: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        link: PropTypes.string,
      }),
    ),
    isFetching: PropTypes.bool,
  }).isRequired,
  fetchUserInfo: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  { fetchUserInfo },
)(Profile)
