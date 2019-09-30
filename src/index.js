import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/App'
import configureStore from './configureStore'
import GlobalStyle from './styles'

const store = configureStore()

const Root = () => (
  <Provider store={store}>
    <Router>
      <GlobalStyle />
      <App />
    </Router>
  </Provider>
)

ReactDOM.render(<Root />, document.getElementById('root'))
