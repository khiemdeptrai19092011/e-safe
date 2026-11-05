
import { useState } from 'react'
import './App.css'

import Topbar from './components/layout/Topbar'
import MobileNav from './components/layout/MobileNav'

import DashboardPage from './pages/DashboardPage'
import DevicesPage from './pages/DevicesPage'
import AlertsPage from './pages/AlertsPage'
import SettingsPage from './pages/SettingsPage'

import { devices as initialDevices } from './data/devices'
import { alerts as initialAlerts } from './data/alerts'

import type { Theme } from './types/theme'

function App() {
  const [theme, setTheme] = useState<Theme>('light')
  const [activePage, setActivePage] = useState('Tổng quan')

  // Dữ liệu dùng chung cho toàn bộ ứng dụng
  const devices = initialDevices
  const alerts = initialAlerts

  const navigation = ['Tổng quan', 'Thiết bị', 'Cảnh báo', 'Cài đặt']

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'

    setTheme(nextTheme)
    document.documentElement.dataset.theme = nextTheme
  }

  return (
    <div className="app-shell">
      <Topbar
        activePage={activePage}
        navigation={navigation}
        onNavigate={setActivePage}
      />

      <main className="main-content">
        {activePage === 'Tổng quan' ? (
          <DashboardPage
            devices={devices}
            alerts={alerts}
            onNavigate={setActivePage}
          />
        ) : activePage === 'Thiết bị' ? (
          <DevicesPage devices={devices} />
        ) : activePage === 'Cảnh báo' ? (
          <AlertsPage alerts={alerts} />
        ) : activePage === 'Cài đặt' ? (
          <SettingsPage
            theme={theme}
            onToggleTheme={toggleTheme}
          />
        ) : (
          <section className="page-heading">
            <div>
              <p className="eyebrow">E-SAFE MONITOR</p>
              <h1>{activePage}</h1>
              <p className="page-description">
                Trang này đang trong quá trình phát triển.
              </p>
            </div>
          </section>
        )}

        <footer className="footer">
          <span>E-Safe Monitor</span>
          <span>
            Hệ thống giám sát và cảnh báo sớm · Bản thử nghiệm
          </span>
        </footer>
      </main>

      <MobileNav
        activePage={activePage}
        navigation={navigation}
        onNavigate={setActivePage}
      />
    </div>
  )
}

export default App
