import React from 'react'
import { Link as InternalLink, useLocation } from 'react-router-dom'
import { IoCloseSharp } from 'react-icons/io5'
import styled from 'styled-components'
import { mediaQueries } from 'lib/constants/styles'
import { HeaderLogo } from '../styles'

interface Props {
  onClick: () => void
}

const MobileSidebarHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1.25rem;
  ${mediaQueries.tablet} {
    display: none;
  }
`

const DesktopSidebarHeader = styled.div`
  display: none;
  ${mediaQueries.tablet} {
    display: block;
    max-width: 100%;
    padding-bottom: 2.5rem;
  }
`

const SidebarHeader: React.VFC<Props> = ({ onClick }) => {
  const location = useLocation()

  return (
    <>
      <DesktopSidebarHeader>
        <InternalLink to="/" >
          <HeaderLogo src="/logo.png" alt="Flashing logo." locationPath={location.pathname} />
        </InternalLink>
      </DesktopSidebarHeader>

      < MobileSidebarHeader >
        <IoCloseSharp style={{ fontSize: '2rem' }} onClick={onClick} />
        <InternalLink to="/" style={{ width: '100%', textAlign: 'right' }
        }>
          <HeaderLogo
            src="/icon.svg"
            alt="Logo small."
            locationPath={location.pathname}
            size="small"
          />
        </InternalLink>
      </MobileSidebarHeader>
    </>
  )
}
export default SidebarHeader
