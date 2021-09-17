import React, { useEffect, useState } from 'react'
import { Spin } from 'antd'
import { Link, Paragraph } from 'components/Typography'
import MobileHeader from './MobileHeader'
import SidebarHeader from './Sidebar/SidebarHeader'
import Sidebar from './Sidebar/Sidebar'
import SidebarMenu from './Sidebar/SidebarMenu'
import { Row, Col } from 'components/Grid'
import {
  Layout,
  Footer,
  ContentInnerContainer,
  ContentOuterContainer,
  PageContent,
  Progress,
  OverlayContainer,
} from './styles'
import { useAppStore } from 'state/AppStore'
import { getUserProjects } from 'lib/firestore/queries/projects'
import type { Props } from './types'
import type { UserProjects } from '@done-did-it/types'

const PageLayout: React.FC<Props> = ({
  children,
  centered,
  contentWidth,
  loading,

  spin = false,
  spinText,
  testId,
}) => {
  const [projectsLoaded, setProjectsLoaded] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userProjects, setUserProjects] = useState<UserProjects>([])

  const [progressPerc, setProgressPerc] = useState(0)
  const [interval, setInt] = useState<NodeJS.Timeout | null>(null)
  const { appState, setAppState, overwriteAppStateProperties, userIsPremium, userAuthentication } = useAppStore()
  const { user, auth } = appState ?? {}

  useEffect(() => {
    if (!auth || projectsLoaded || userAuthentication || !userIsPremium) return

    getUserProjects(auth.uid)
      .then((projects) => {
        setUserProjects(projects)
      })
      .finally(() => {
        setProjectsLoaded(true)
      })
  }, [auth, userAuthentication])

  const handleMobileMenuContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target
    if (target instanceof HTMLElement && target.dataset.menu === 'mobileMenu') {
      setMobileMenuOpen(false)
    }
  }

  useEffect(() => {
    if (!loading) return

    const interval = setInterval(() => {
      setProgressPerc((prev) => {
        return (prev += (100 - prev) / 2)
      })
    }, 1000)
    setInt(interval)

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [loading])

  useEffect(() => {
    if (loading) return

    let timeout: NodeJS.Timeout | null = null
    if (interval) clearInterval(interval)
    timeout = setTimeout(() => {
      setProgressPerc(0)
    }, 300)

    setProgressPerc(100)

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [loading])

  return (
    <Spin
      spinning={spin}
      tip={spinText || 'Loading'}
      size="large"
      style={{ color: '#444', fontWeight: 600, fontSize: '2rem', textShadow: 'none' }}
    >
      <Layout className="PageLayout" data-testid={testId}>
        <MobileHeader onClick={() => setMobileMenuOpen(true)} />
        <div style={{ display: 'flex', zIndex: 10, position: 'absolute', left: '-4px', right: '-4px' }}>
          {(loading || progressPerc > 0) && (
            <Progress percent={progressPerc} status="active" showInfo={false} style={{ lineHeight: '5px' }} />
          )}
        </div>
        <OverlayContainer
          data-menu="mobileMenu"
          mobileVisible={mobileMenuOpen}
          onClick={handleMobileMenuContainerClick}
        />
        <Col>
          <Sidebar mobileVisible={mobileMenuOpen}>
            <SidebarHeader onClick={() => setMobileMenuOpen((prev) => !prev)} />
            <SidebarMenu />
          </Sidebar>
        </Col>
        <Col>
          <PageContent>
            <ContentOuterContainer centered={centered}>
              <ContentInnerContainer centered={centered} contentWidth={contentWidth}>
                {children}
              </ContentInnerContainer>
            </ContentOuterContainer>

            <Footer style={{ textAlign: 'center' }}>
              <ul>
                <li>
                  <Link href="https://x.app/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="https://x.app/terms">Terms of Use</Link>
                </li>
                <li>
                  <Link href="https://x.app/cookie-policy">Cookie Policy</Link>
                </li>
                <li>
                  <Link href="https://x.app/dsar-form">Submit DSAR</Link>
                </li>
                <li>
                  <Link href="https://x.app/pricing">Pricing</Link>
                </li>
                <li>
                  <Link href="https://app.termly.io/notify/x">
                    Do not sell my info
                  </Link>
                </li>
              </ul>
              <Paragraph>x ©2021 Created by x</Paragraph>
            </Footer>
          </PageContent>
        </Col>
      </Layout>
    </Spin>
  )
}

export default PageLayout