import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getNewsList, isFetching, fetchNews } from '../store/news'
import Loader from './Loader'
import styled from 'styled-components'

const NewsWrap = styled.div`
  margin: 0 auto;
  max-width: 600px;

  .news-list li {
    margin-bottom: 50px;
  }
`

const mapStateToProps = state => ({
  list: getNewsList(state),
  isFetching: isFetching(state),
})

const News = ({ list, isFetching, fetchNews }) => {
  useEffect(() => {
    fetchNews()
  }, [fetchNews])

  if (isFetching) {
    return <Loader content="Загружаем новости..." />
  }

  if (!list.length) {
    return null
  }

  return (
    <NewsWrap>
      <h2>Новости</h2>
      <ul className="news-list">
        {list.map(({ id, title, text }) => (
          <li key={id}>
            <h4>{title}</h4>
            <p>{text}</p>
          </li>
        ))}
      </ul>
      <p>Всего новостей: {list.length}</p>
    </NewsWrap>
  )
}

News.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ).isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchNews: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  { fetchNews },
)(News)
