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

import type { Device } from './types/device'
import type { Theme } from './types/theme'
import type { Alert } from './types/alert'

function App() {
  const [theme, setTheme] = useState<Theme>('light')
  const [activePage, setActivePage] = useState('Tổng quan')

  // Dữ liệu dùng chung cho toàn bộ ứng dụng
  const [devices, setDevices] = useState<Device[]>(initialDevices)
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts)

  const navigation = ['Tổng quan', 'Thiết bị', 'Cảnh báo', 'Cài đặt']

  // Chuyển đổi giao diện sáng / tối
  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'

    setTheme(nextTheme)
    document.documentElement.dataset.theme = nextTheme
  }

  // Cập nhật thông tin thiết bị
  function updateDevice(updatedDevice: Device) {
    setDevices((currentDevices) =>
      currentDevices.map((device) =>
        device.id === updatedDevice.id ? updatedDevice : device,
      ),
    )
  }

  // Tiếp nhận cảnh báo
  function acknowledgeAlert(alertId: string) {
    setAlerts((currentAlerts) =>
      currentAlerts.map((alert) =>
        alert.id === alertId
          ? { ...alert, status: 'acknowledged' }
          : alert,
      ),
    )
  }

  // Đánh dấu cảnh báo đã xử lý
  function resolveAlert(alertId: string) {
    setAlerts((currentAlerts) =>
      currentAlerts.map((alert) =>
        alert.id === alertId
          ? { ...alert, status: 'resolved' }
          : alert,
      ),
    )
  }

  function addDevice(newDevice: Device) {
    setDevices((currentDevices) => [...currentDevices, newDevice])
  }

  function deleteDevice(deviceId: string) {
    setDevices((currentDevices) =>
      currentDevices.filter((device) => device.id !== deviceId),
    )
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
          <DevicesPage
            devices={devices}
            onUpdateDevice={updateDevice}
            onAddDevice={addDevice}
            onDeleteDevice={deleteDevice}
          />
        ) : activePage === 'Cảnh báo' ? (
          <AlertsPage
            alerts={alerts}
            onAcknowledge={acknowledgeAlert}
            onResolve={resolveAlert}
          />
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