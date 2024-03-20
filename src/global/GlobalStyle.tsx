import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

export default createGlobalStyle`
  ${reset}

  :root {
    font-size: 1rem;
  }
    
  html, body{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    width: 100%;
    font-size: 100%; 
    font-family: Arial, sans-serif;
    vertical-align: baseline;
    line-height: 1.25;
    background: ${({ theme }) => theme.colors.white};
  }

  h1, h2, h3 {
    font-family: Helvetica, sans-serif;
  }

  h1{
    font-size: 3rem;
    font-weight: 600;
    line-height: 2.5;
    margin-bottom: 1rem;
  }
  h2{
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 2;
    margin-bottom: 1rem;
  }
  h3{
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    margin-bottom: 0.5rem;
  }
`