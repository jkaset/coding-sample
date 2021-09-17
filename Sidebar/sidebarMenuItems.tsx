import React from 'react'
import { Link as InternalLink, useLocation } from 'react-router-dom'
import MenuItemContent from '../primitives/MenuItemContent'
import { useAppStore } from 'state/AppStore'
import { firebaseAuth } from 'lib/firebase'
import { PAGE_META } from 'lib/defaults'
import type { Props } from '../types'
import styled from 'styled-components'
import { mediaQueries } from 'lib/constants/styles'
import { Menu } from 'antd'

const NavMenu = styled(Menu)`
  background: ${({ theme }) => theme.current.color.background.component};
`
export const NavMenuItemWrapper = styled.div<{ open?: boolean }>`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  flex-direction: column;
  height: ${({ open }) => (open ? '100%' : '10%')};
  justify-content: space-between;
  background: ${({ theme }) => theme.current.color.background.component};
  div:last-child {
    justify-self: flex-end;
  }
  ${mediaQueries.tablet} {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
`

const MenuItem = styled(Menu.Item)`
  border-bottom: 0;
  padding-bottom: 1rem;
  .ant-menu-horizontal > &:hover {
    color: ${({ theme }) => theme.current.color.text.body} !important;
    border-bottom-color: ${({ theme }) => theme.current.color.primary} !important;
  }
`

const SidebarMenuItems: React.VFC<Props> = ({ hideNav }) => {
  const location = useLocation()
  const { appState, setAppState } = useAppStore()
  const { user, auth } = appState ?? {}

  const getAuthMenuItems = () => {
    if (auth) {
      const items = [
        <MenuItem key={PAGE_META.SETTINGS.name}>
          <MenuItemContent {...PAGE_META.SETTINGS} />
        </MenuItem>,
        <MenuItem
          key={PAGE_META.SIGN_OUT.name}
          onClick={() =>
            firebaseAuth.signOut().then(() => {
              setAppState(null)
            })
          }
          data-testid="signOut"
        >
          <MenuItemContent {...PAGE_META.SIGN_OUT} />
        </MenuItem>,
      ]

      if (hideNav) items.shift()

      return items
    }

    return [
      <MenuItem key={PAGE_META.LOGIN.name}>
        <MenuItemContent {...PAGE_META.LOGIN} />
      </MenuItem>,
      <MenuItem key={PAGE_META.SIGNUP.name}>
        <MenuItemContent {...PAGE_META.SIGNUP} />
      </MenuItem>,
    ]
  }
  const navMenuItems =
    user && !hideNav
      ? [
          <MenuItem key={PAGE_META.PRIORITIES_EDIT.name}>
            <MenuItemContent {...PAGE_META.PRIORITIES_EDIT} />
          </MenuItem>,
          <MenuItem key={PAGE_META.STOP_WORK.name}>
            <MenuItemContent {...PAGE_META.STOP_WORK} />
          </MenuItem>,
          <MenuItem key={PAGE_META.REPORTS.name}>
            <MenuItemContent {...PAGE_META.REPORTS} />
          </MenuItem>,
        ]
      : []

  return (
    <>
      <NavMenu mode="vertical" selectedKeys={[location.pathname]}>
        {navMenuItems}
      </NavMenu>
      <NavMenu mode="vertical" selectable={false}>
        {getAuthMenuItems()}
      </NavMenu>
    </>
  )
}
