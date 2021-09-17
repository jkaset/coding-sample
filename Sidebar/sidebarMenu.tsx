import React from 'react'
import SidebarMenuItems from './SidebarMenuItems'
import styled from 'styled-components'

const NavMenuItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: space-between;
  background: ${({ theme }) => theme.current.color.background.component};
  div:last-child {
    justify-self: flex-end;
  }
`

const SidebarMenu: React.VFC = () => {
  return (
    <NavMenuItemWrapper>
      <SidebarMenuItems />
    </NavMenuItemWrapper>
  )
}

export default SidebarMenu