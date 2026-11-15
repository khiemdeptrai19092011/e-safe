import { useEffect, useState } from 'react'
import './App.css'

import Topbar from './components/layout/Topbar'
import MobileNav from './components/layout/MobileNav'

import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import DevicesPage from './pages/DevicesPage'
import AlertsPage from './pages/AlertsPage'
import SettingsPage from './pages/SettingsPage'

import { devices as initialDevices } from './data/devices'
import { alerts as initialAlerts } from './data/alerts'

import type { Device } from './types/device'
import type { Theme } from './types/theme'
import type { Alert } from './types/alert'

// Đọc theme
function loadTheme(): Theme {
  try {
    const savedTheme = localStorage.getItem('e-safe:theme:v1')
    return savedTheme === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

// Đọc dữ liệu thiết bị
function loadDevices(): Device[] {
  try {
    const savedData = localStorage.getItem('e-safe:devices:v1')

    if (!savedData) return initialDevices

    const parsedData: unknown = JSON.parse(savedData)

    return Array.isArray(parsedData)
      ? (parsedData as Device[])
      : initialDevices
  } catch {
    return initialDevices
  }
}

// Đọc dữ liệu cảnh báo
function loadAlerts(): Alert[] {
  try {
    const savedData = localStorage.getItem('e-safe:alerts:v1')

    if (!savedData) return initialAlerts

    const parsedData: unknown = JSON.parse(savedData)

    return Array.isArray(parsedData)
      ? (parsedData as Alert[])
      : initialAlerts
  } catch {
    return initialAlerts
  }
}

function App() {
  const [theme, setTheme] = useState<Theme>(loadTheme)
  const [activePage, setActivePage] = useState('Tổng quan')

  // Chưa đăng nhập khi mở ứng dụng
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const [devices, setDevices] = useState<Device[]>(loadDevices)
  const [alerts, setAlerts] = useState<Alert[]>(loadAlerts)

  const navigation = ['Tổng quan', 'Thiết bị', 'Cảnh báo', 'Cài đặt']

  // Lưu và áp dụng theme
  useEffect(() => {
    document.documentElement.dataset.theme = theme

    try {
      localStorage.setItem('e-safe:theme:v1', theme)
    } catch (error) {
      console.error('Không thể lưu giao diện:', error)
    }
  }, [theme])

  // Lưu thiết bị
  useEffect(() => {
    try {
      localStorage.setItem('e-safe:devices:v1', JSON.stringify(devices))
    } catch (error) {
      console.error('Không thể lưu dữ liệu thiết bị:', error)
    }
  }, [devices])

  // Lưu cảnh báo
  useEffect(() => {
    try {
      localStorage.setItem('e-safe:alerts:v1', JSON.stringify(alerts))
    } catch (error) {
      console.error('Không thể lưu dữ liệu cảnh báo:', error)
    }
  }, [alerts])

  function toggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === 'dark' ? 'light' : 'dark',
    )
  }

  function updateDevice(updatedDevice: Device) {
    setDevices((currentDevices) =>
      currentDevices.map((device) =>
        device.id === updatedDevice.id ? updatedDevice : device,
      ),
    )
  }

  function acknowledgeAlert(alertId: string) {
    setAlerts((currentAlerts) =>
      currentAlerts.map((alert) =>
        alert.id === alertId
          ? { ...alert, status: 'acknowledged' }
          : alert,
      ),
    )
  }

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

  // Chưa đăng nhập thì chỉ hiển thị LoginPage
  if (!isAuthenticated) {
    return (
      <LoginPage
        onLogin={() => setIsAuthenticated(true)}
      />
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