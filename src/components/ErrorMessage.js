import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ErrorMessageWrap = styled.div`
  color: red;
`

const ErrorMessage = ({ content }) => (
  <ErrorMessageWrap>{content}</ErrorMessageWrap>
)

ErrorMessage.propTypes = {
  content: PropTypes.string.isRequired,
}

export default ErrorMessage
