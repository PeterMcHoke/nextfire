import React from 'react'
import styled, { keyframes } from 'styled-components'

interface Props {
    show: boolean;
}

const Loader = ({show}:Props) => {
    return show ? <LoaderAnimation></LoaderAnimation> : null;
}

export default Loader


// Styled Components
const spin = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
`

const LoaderAnimation = styled.div`
  border: 10px solid var(--color-bg); 
  border-top: 10px solid var(--color-blue); 
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1.5s ease-in-out infinite;
`



