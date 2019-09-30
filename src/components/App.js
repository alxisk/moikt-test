import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from './Header'
import Main from './Main'
import Profile from './Profile'
import Login from './Login'
import Protected from './Protected'
import News from './News'
import styled from 'styled-components'

const PageWrap = styled.div`
  padding: 40px 50px;
`

function App() {
  return (
    <>
      <Header />
      <PageWrap>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={Login} />
          <Route
            exact
            path="/profile"
            render={props => <Protected component={Profile} {...props} />}
          />
          <Route exact path="/news" component={News} />
        </Switch>
      </PageWrap>
    </>
  )
}

export default App
