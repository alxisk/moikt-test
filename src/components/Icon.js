import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const IconWrap = styled.div`
  width: 24px;
  height: 24px;
`

const Icon = ({ name }) => {
  const src = `${process.env.PUBLIC_URL}/${name}.svg`

  return (
    <IconWrap>
      <img src={src} alt="icon" />
    </IconWrap>
  )
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
}

export default Icon
