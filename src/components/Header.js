import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserId, signOut } from '../store/user'
import Button from './Button'
import styled from 'styled-components'

const HeaderWrap = styled.header`
  display: flex;
  padding: 20px 50px;
  justify-content: space-between;
  align-items: center;

  .navlinks {
    display: flex;
    width: 150px;
    justify-content: space-between;
  }
`

const mapStateToProps = state => ({
  userId: getUserId(state),
})

const Header = ({ userId, signOut }) => (
  <HeaderWrap>
    <ul className="navlinks">
      <li>
        <Link to="/news">новости</Link>
      </li>
      <li>
        <Link to="/profile">профиль</Link>
      </li>
    </ul>
    {userId ? (
      <Button content="Выйти" onClick={() => signOut()} />
    ) : (
      <Link to="/login">
        <Button content="Войти" />
      </Link>
    )}
  </HeaderWrap>
)

Header.propTypes = {
  userId: PropTypes.number,
  signOut: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  { signOut },
)(Header)
