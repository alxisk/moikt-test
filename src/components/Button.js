import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ButtonWrap = styled.button`
  padding: 10px 15px;
  color: white;
  border-radius: 3px;
  background: #27ae60;
  text-transform: uppercase;
  opacity: ${({ disabled }) => (disabled ? '0.6' : '1')};

  :hover {
    background: #47ce90;
  }

  :active {
    background: #178e40;
  }
`

const Button = ({ content, ...props }) => (
  <ButtonWrap {...props}>{content}</ButtonWrap>
)

Button.propTypes = {
  content: PropTypes.string.isRequired,
}

export default Button
