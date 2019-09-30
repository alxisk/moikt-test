import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

  html, body {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }

  input, button {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    outline: none;
    border: none;
  }

  button {
    user-select: none;
  }

  input {
    padding: 10px 15px;
    border: 1px solid #95a5a6;
    border-radius: 3px;

    &:focus {
      padding: 9px 14px;
      border: 2px solid #95a5a6;
    }
  }

  ul {
    list-style: none;
    padding: 0;
  }
`

export default GlobalStyle
