import React from 'react'
import styled from 'styled-components'
import { mediaQueries } from 'lib/constants/styles'

const SidebarWrapper = styled.div<{ mobileVisible?: boolean }>`
  display: flex;
  position: fixed;
  top: 0;
  z-index: 2;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
  background: ${({ theme }) => theme.current.color.background.component};
  -webkit-transform: ${({ mobileVisible }) => (mobileVisible ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)')};
  transform: ${({ mobileVisible }) => (mobileVisible ? 'transform(0, 0, 0)' : 'transform(-100%, 0, 0)')};
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  ${mediaQueries.tablet} {
    display: block;
    flex: 1;
    height: 100vh;
    position: sticky;
    padding: 3rem 2.5rem 7rem;
    -webkit-transform: translate3d(0, 0, 0);
    transform: transform(0, 0, 0);
  }
`
interface Props {
  mobileVisible: boolean
}

const Sidebar: React.FC<Props> = ({ children, mobileVisible }) => {
  return <SidebarWrapper mobileVisible={ mobileVisible }> { children } </SidebarWrapper>
}

export default Sidebar