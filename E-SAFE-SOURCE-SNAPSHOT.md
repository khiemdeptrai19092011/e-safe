# E-SAFE MONITOR — Source Snapshot

Bản chụp nguyên văn các file được yêu cầu và CSS liên quan trực tiếp. Nội dung code trong mỗi fence được lấy trực tiếp từ repository tại thời điểm tạo; không chỉnh sửa source. Thứ tự file: source TypeScript trước, stylesheet sau.

## `src/App.tsx`

```tsx

import { useState } from 'react'
import './App.css'

import Topbar from './components/layout/Topbar'
import MobileNav from './components/layout/MobileNav'
import DashboardPage from './pages/DashboardPage'
import DevicesPage from './pages/DevicesPage'
import AlertsPage from './pages/AlertsPage'
import type { Theme } from './types/theme'
import SettingsPage from './pages/SettingsPage'

function App() {
  const [theme, setTheme] = useState<Theme>('light')
  const [activePage, setActivePage] = useState('Tổng quan')

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
          <DashboardPage onNavigate={setActivePage} />
        ) : activePage === 'Thiết bị' ? (
          <DevicesPage />
        ) : activePage === 'Cảnh báo' ? (
          <AlertsPage />
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
```

## `src/pages/DashboardPage.tsx`

```tsx

import StatCard from '../components/dashboard/StatCard'

type DashboardPageProps = {
  onNavigate: (page: string) => void
}

const devices = [
  {
    id: 'ES-001',
    name: 'Tủ điện khu vực A',
    location: 'Tầng 1 · Khu vực A',
    temperature: 38.5,
    current: 2.4,
    status: 'normal',
  },
  {
    id: 'ES-002',
    name: 'Tủ điện khu vực B',
    location: 'Tầng 2 · Khu vực B',
    temperature: 67.2,
    current: 4.8,
    status: 'warning',
  },
  {
    id: 'ES-003',
    name: 'Tủ điện khu vực C',
    location: 'Tầng 2 · Khu vực C',
    temperature: 35.1,
    current: 1.9,
    status: 'normal',
  },
]

function DashboardPage({ onNavigate }: DashboardPageProps) {
  return (
    <>
      <section className="page-heading">
        <div>
          <p className="eyebrow">GIÁM SÁT HỆ THỐNG</p>
          <h1>Tổng quan</h1>
          <p className="page-description">
            Theo dõi nhiệt độ, dòng điện và trạng thái các điểm giám sát.
          </p>
        </div>

        <div className="last-update">
          <span className="update-dot" />
          Dữ liệu mô phỏng
        </div>
      </section>

      <section className="stats-grid" aria-label="Thống kê hệ thống">
        <StatCard
          label="Tổng thiết bị"
          value="08"
          note="Điểm giám sát"
          icon="▦"
          color="blue"
        />
        <StatCard
          label="Hoạt động bình thường"
          value="07"
          note="Trong ngưỡng an toàn"
          icon="✓"
          color="green"
        />
        <StatCard
          label="Cảnh báo"
          value="01"
          note="Cần kiểm tra"
          icon="!"
          color="orange"
        />
        <StatCard
          label="Mất kết nối"
          value="00"
          note="Thiết bị ngoại tuyến"
          icon="⌁"
          color="red"
        />
      </section>

      <section className="content-grid">
        <div className="panel devices-panel">
          <div className="panel-heading">
            <div>
              <h2>Thiết bị giám sát</h2>
              <p>Trạng thái các điểm đo trong hệ thống</p>
            </div>

            <button
              className="text-button"
              onClick={() => onNavigate('Thiết bị')}
            >
              Xem tất cả <span>→</span>
            </button>
          </div>

          <div className="device-list">
            {devices.map((device) => (
              <article className="device-card" key={device.id}>
                <div className="device-main">
                  <div className="device-icon">⌘</div>

                  <div className="device-info">
                    <h3>{device.name}</h3>
                    <p>
                      {device.id} · {device.location}
                    </p>
                  </div>
                </div>

                <div className="device-metrics">
                  <div className="metric">
                    <span>Nhiệt độ</span>
                    <strong>{device.temperature}°C</strong>
                  </div>

                  <div className="metric">
                    <span>Dòng điện</span>
                    <strong>{device.current} A</strong>
                  </div>

                  <span className={`device-status ${device.status}`}>
                    <span />
                    {device.status === 'normal'
                      ? 'Bình thường'
                      : 'Cảnh báo'}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="panel alerts-panel">
          <div className="panel-heading">
            <div>
              <h2>Cảnh báo gần đây</h2>
              <p>Các sự kiện cần chú ý</p>
            </div>

            <span className="alert-count">01</span>
          </div>

          <article className="alert-item">
            <div className="alert-icon">!</div>

            <div>
              <h3>Nhiệt độ tăng cao</h3>
              <p>ES-002 · Tủ điện khu vực B</p>
              <strong>67.2°C</strong>
              <span className="alert-time">
                Vừa cập nhật · Dữ liệu demo
              </span>
            </div>
          </article>

          <div className="alert-footer">
            Đây là cảnh báo mô phỏng, không phải dữ liệu từ thiết bị thật.
          </div>
        </aside>
      </section>
    </>
  )
}

export default DashboardPage
```

## `src/pages/DevicesPage.tsx`

```tsx
import { useEffect, useMemo, useRef, useState } from 'react'
import { devices } from '../data/devices'
import type { DeviceStatus } from '../types/device'
import './DevicesToolbar.css'

type FilterStatus = 'all' | DeviceStatus
type SortKey = 'default' | 'severity' | 'name' | 'temperature' | 'current'

const statusLabels: Record<DeviceStatus, string> = {
  normal: 'Bình thường',
  warning: 'Cảnh báo',
  offline: 'Mất kết nối',
}

const statusTabs: { value: FilterStatus; label: string }[] = [
  { value: 'all', label: 'Tất cả' },
  { value: 'normal', label: statusLabels.normal },
  { value: 'warning', label: statusLabels.warning },
  { value: 'offline', label: statusLabels.offline },
]

const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'default', label: 'Mặc định' },
  { value: 'severity', label: 'Cần chú ý trước' },
  { value: 'name', label: 'Tên A → Z' },
  { value: 'temperature', label: 'Nhiệt độ cao nhất' },
  { value: 'current', label: 'Dòng điện cao nhất' },
]

const severityRank: Record<DeviceStatus, number> = {
  offline: 0,
  warning: 1,
  normal: 2,
}

function DevicesPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<FilterStatus>('all')
  const [sort, setSort] = useState<SortKey>('default')
  const [isSortOpen, setIsSortOpen] = useState(false)

  const sortRef = useRef<HTMLDivElement>(null)

  // Đóng menu sắp xếp khi bấm ra ngoài hoặc nhấn Esc
  useEffect(() => {
    if (!isSortOpen) return

    const handlePointerDown = (event: MouseEvent) => {
      if (!sortRef.current?.contains(event.target as Node)) {
        setIsSortOpen(false)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsSortOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isSortOpen])

  const keyword = search.trim().toLowerCase()

  // Các thiết bị khớp từ khóa (chưa lọc trạng thái) -> dùng để đếm số lượng trên mỗi tab
  const searchMatched = useMemo(
    () =>
      devices.filter(
        (device) =>
          device.name.toLowerCase().includes(keyword) ||
          device.id.toLowerCase().includes(keyword) ||
          device.location.toLowerCase().includes(keyword),
      ),
    [keyword],
  )

  const counts = useMemo(() => {
    const result: Record<FilterStatus, number> = {
      all: searchMatched.length,
      normal: 0,
      warning: 0,
      offline: 0,
    }
    searchMatched.forEach((device) => {
      result[device.status] += 1
    })
    return result
  }, [searchMatched])

  const filteredDevices = useMemo(() => {
    const list =
      filter === 'all'
        ? [...searchMatched]
        : searchMatched.filter((device) => device.status === filter)

    switch (sort) {
      case 'severity':
        list.sort((a, b) => severityRank[a.status] - severityRank[b.status])
        break
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name, 'vi'))
        break
      case 'temperature':
        list.sort((a, b) => b.temperature - a.temperature)
        break
      case 'current':
        list.sort((a, b) => b.current - a.current)
        break
    }
    return list
  }, [searchMatched, filter, sort])

  const hasActiveFilters =
    search !== '' || filter !== 'all' || sort !== 'default'

  const resetAll = () => {
    setSearch('')
    setFilter('all')
    setSort('default')
  }

  const currentSortLabel = sortOptions.find((o) => o.value === sort)?.label

  return (
    <>
      <section className="page-heading">
        <div>
          <p className="eyebrow">QUẢN LÝ HỆ THỐNG</p>
          <h1>Thiết bị</h1>
          <p className="page-description">
            Theo dõi và quản lý các điểm giám sát trong hệ thống.
          </p>
        </div>

        <div className="last-update">
          <span className="update-dot" />
          Dữ liệu mô phỏng
        </div>
      </section>

      <section className="device-toolbar" aria-label="Tìm kiếm và lọc thiết bị">
        <div className="device-toolbar-row">
          {/* Tìm kiếm */}
          <div className="device-search-field">
            <svg
              className="device-search-icon"
              viewBox="0 0 20 20"
              width="18"
              height="18"
              aria-hidden="true"
            >
              <circle
                cx="9"
                cy="9"
                r="5.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path
                d="M13.2 13.2 17 17"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>

            <input
              className="device-search"
              type="search"
              placeholder="Tìm theo tên, mã hoặc vị trí..."
              aria-label="Tìm kiếm thiết bị"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Escape') setSearch('')
              }}
            />

            {search && (
              <button
                type="button"
                className="device-search-clear"
                aria-label="Xóa từ khóa"
                onClick={() => setSearch('')}
              >
                ✕
              </button>
            )}
          </div>

          {/* Sắp xếp */}
          <div className="device-sort" ref={sortRef}>
            <button
              type="button"
              className={`device-sort-trigger ${isSortOpen ? 'open' : ''}`}
              onClick={() => setIsSortOpen((open) => !open)}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown') {
                  event.preventDefault()
                  setIsSortOpen(true)
                }
              }}
              aria-expanded={isSortOpen}
              aria-haspopup="listbox"
            >
              <span className="device-sort-label">Sắp xếp</span>
              <span className="device-sort-value">{currentSortLabel}</span>
              <span className="device-sort-chevron" aria-hidden="true">
                ⌄
              </span>
            </button>

            {isSortOpen && (
              <div className="device-sort-menu" role="listbox">
                {sortOptions.map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    role="option"
                    aria-selected={sort === option.value}
                    className={`device-sort-option ${
                      sort === option.value ? 'selected' : ''
                    }`}
                    onClick={() => {
                      setSort(option.value)
                      setIsSortOpen(false)
                    }}
                  >
                    <span>{option.label}</span>
                    {sort === option.value && <span aria-hidden="true">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Lọc trạng thái dạng chip kèm số lượng */}
        <div className="device-toolbar-row device-toolbar-row--chips">
          <div className="status-chips" role="group" aria-label="Lọc theo trạng thái">
            {statusTabs.map((tab) => (
              <button
                type="button"
                key={tab.value}
                className={`status-chip ${tab.value} ${
                  filter === tab.value ? 'active' : ''
                }`}
                aria-pressed={filter === tab.value}
                onClick={() => setFilter(tab.value)}
              >
                {tab.value !== 'all' && <span className="status-chip-dot" />}
                {tab.label}
                <span className="status-chip-count">{counts[tab.value]}</span>
              </button>
            ))}
          </div>

          {hasActiveFilters && (
            <button type="button" className="toolbar-reset" onClick={resetAll}>
              Đặt lại
            </button>
          )}
        </div>
      </section>

      <section className="device-page-list">
        <div className="device-results" aria-live="polite">
          Hiển thị {filteredDevices.length} / {devices.length} thiết bị
        </div>

        {filteredDevices.length > 0 ? (
          filteredDevices.map((device) => (
            <article className="device-card" key={device.id}>
              <div className="device-main">
                <div className="device-icon">⌘</div>

                <div className="device-info">
                  <h3>{device.name}</h3>
                  <p>
                    {device.id} · {device.location}
                  </p>
                </div>
              </div>

              <div className="device-metrics">
                <div className="metric">
                  <span>Nhiệt độ</span>
                  <strong>{device.temperature}°C</strong>
                </div>

                <div className="metric">
                  <span>Dòng điện</span>
                  <strong>{device.current} A</strong>
                </div>

                <span className={`device-status ${device.status}`}>
                  <span />
                  {statusLabels[device.status]}
                </span>
              </div>
            </article>
          ))
        ) : (
          <div className="empty-state">
            <strong>Không tìm thấy thiết bị</strong>
            <p>Thử thay đổi từ khóa hoặc bộ lọc của bạn.</p>
            {hasActiveFilters && (
              <button type="button" className="toolbar-reset" onClick={resetAll}>
                Xóa tất cả bộ lọc
              </button>
            )}
          </div>
        )}
      </section>
    </>
  )
}

export default DevicesPage
```

## `src/pages/AlertsPage.tsx`

```tsx
import { useMemo, useState } from 'react'
import { alerts } from '../data/alerts'
import type { AlertLevel, AlertStatus } from '../types/alert'
import './AlertsPage.css'

type LevelFilter = 'all' | AlertLevel
type StatusFilter = 'all' | AlertStatus

const levelLabels: Record<AlertLevel, string> = {
  critical: 'Nghiêm trọng',
  warning: 'Cảnh báo',
  info: 'Thông tin',
}

const statusLabels: Record<AlertStatus, string> = {
  new: 'Chưa xử lý',
  acknowledged: 'Đã tiếp nhận',
  resolved: 'Đã xử lý',
}

function AlertsPage() {
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('all')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')

  const counts = useMemo(() => {
    return {
      all: alerts.length,
      critical: alerts.filter((alert) => alert.level === 'critical').length,
      warning: alerts.filter((alert) => alert.level === 'warning').length,
      info: alerts.filter((alert) => alert.level === 'info').length,
    }
  }, [])

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const levelMatch =
        levelFilter === 'all' || alert.level === levelFilter

      const statusMatch =
        statusFilter === 'all' || alert.status === statusFilter

      return levelMatch && statusMatch
    })
  }, [levelFilter, statusFilter])

  const hasActiveFilters =
    levelFilter !== 'all' || statusFilter !== 'all'

  const resetFilters = () => {
    setLevelFilter('all')
    setStatusFilter('all')
  }

  return (
    <>
      <section className="page-heading">
        <div>
          <p className="eyebrow">GIÁM SÁT BẤT THƯỜNG</p>
          <h1>Cảnh báo</h1>
          <p className="page-description">
            Theo dõi các dấu hiệu bất thường được phát hiện trong hệ thống.
          </p>
        </div>

        <div className="last-update">
          <span className="update-dot" />
          Dữ liệu mô phỏng
        </div>
      </section>

      <section className="alert-summary">
        <div className="alert-summary-card">
          <span>Tổng cảnh báo</span>
          <strong>{counts.all}</strong>
        </div>

        <div className="alert-summary-card critical">
          <span>Nghiêm trọng</span>
          <strong>{counts.critical}</strong>
        </div>

        <div className="alert-summary-card warning">
          <span>Cảnh báo</span>
          <strong>{counts.warning}</strong>
        </div>

        <div className="alert-summary-card info">
          <span>Thông tin</span>
          <strong>{counts.info}</strong>
        </div>
      </section>

      <section className="alert-toolbar">
        <div className="alert-level-tabs">
          <button
            type="button"
            className={levelFilter === 'all' ? 'active' : ''}
            onClick={() => setLevelFilter('all')}
          >
            Tất cả
          </button>

          <button
            type="button"
            className={levelFilter === 'critical' ? 'active critical' : ''}
            onClick={() => setLevelFilter('critical')}
          >
            Nghiêm trọng
          </button>

          <button
            type="button"
            className={levelFilter === 'warning' ? 'active warning' : ''}
            onClick={() => setLevelFilter('warning')}
          >
            Cảnh báo
          </button>

          <button
            type="button"
            className={levelFilter === 'info' ? 'active info' : ''}
            onClick={() => setLevelFilter('info')}
          >
            Thông tin
          </button>
        </div>

        <select
          className="alert-status-select"
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value as StatusFilter)
          }
          aria-label="Lọc theo trạng thái"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="new">Chưa xử lý</option>
          <option value="acknowledged">Đã tiếp nhận</option>
          <option value="resolved">Đã xử lý</option>
        </select>

        {hasActiveFilters && (
          <button
            type="button"
            className="toolbar-reset"
            onClick={resetFilters}
          >
            Đặt lại
          </button>
        )}
      </section>

      <section className="alert-list">
        <div className="device-results" aria-live="polite">
          Hiển thị {filteredAlerts.length} / {alerts.length} cảnh báo
        </div>

        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => (
            <article
              className={`alert-card ${alert.level}`}
              key={alert.id}
            >
              <div className="alert-indicator" />

              <div className="alert-main">
                <div className="alert-top">
                  <span className={`alert-level ${alert.level}`}>
                    {levelLabels[alert.level]}
                  </span>

                  <span className={`alert-status ${alert.status}`}>
                    {statusLabels[alert.status]}
                  </span>
                </div>

                <h3>{alert.title}</h3>

                <p className="alert-message">
                  {alert.message}
                </p>

                <div className="alert-meta">
                  <span>{alert.deviceName}</span>
                  <span>{alert.deviceId}</span>
                  <span>{alert.location}</span>
                  <span>{alert.createdAt}</span>
                </div>
              </div>

              <div className="alert-metrics">
                {alert.temperature !== undefined && (
                  <div>
                    <span>Nhiệt độ</span>
                    <strong>{alert.temperature}°C</strong>
                  </div>
                )}

                {alert.current !== undefined && (
                  <div>
                    <span>Dòng điện</span>
                    <strong>{alert.current} A</strong>
                  </div>
                )}
              </div>
            </article>
          ))
        ) : (
          <div className="empty-state">
            <strong>Không có cảnh báo phù hợp</strong>
            <p>
              Thử thay đổi bộ lọc để xem các cảnh báo khác.
            </p>

            {hasActiveFilters && (
              <button
                type="button"
                className="toolbar-reset"
                onClick={resetFilters}
              >
                Xóa bộ lọc
              </button>
            )}
          </div>
        )}
      </section>
    </>
  )
}

export default AlertsPage
```

## `src/pages/SettingsPage.tsx`

```tsx

import { useState } from 'react'
import type { Theme } from '../types/theme.ts'
import './SettingsPage.css'

type SettingsPageProps = {
  theme: Theme
  onToggleTheme: () => void
}

function SettingsPage({ theme, onToggleTheme }: SettingsPageProps) {
  const [notifications, setNotifications] = useState({
    critical: true,
    warning: true,
    info: false,
  })

  function toggleNotification(key: keyof typeof notifications) {
    setNotifications((previous) => ({
      ...previous,
      [key]: !previous[key],
    }))
  }

  return (
    <>
      <section className="page-heading">
        <div>
          <p className="eyebrow">TÙY CHỈNH HỆ THỐNG</p>
          <h1>Cài đặt</h1>
          <p className="page-description">
            Quản lý giao diện và tùy chọn hoạt động của E-Safe Monitor.
          </p>
        </div>
      </section>

      <div className="settings-layout">
        <section className="settings-section">
          <div className="settings-section-heading">
            <div className="settings-section-icon">◐</div>
            <div>
              <h2>Giao diện</h2>
              <p>Tùy chỉnh cách ứng dụng hiển thị.</p>
            </div>
          </div>

          <div className="settings-item">
            <div>
              <strong>Chế độ tối</strong>
              <p>Giảm độ sáng giao diện khi sử dụng trong môi trường tối.</p>
            </div>

            <button
              type="button"
              className={`settings-switch ${theme === 'dark' ? 'enabled' : ''}`}
              role="switch"
              aria-checked={theme === 'dark'}
              aria-label="Chế độ tối"
              onClick={onToggleTheme}
            >
              <span />
            </button>
          </div>
        </section>

        <section className="settings-section">
          <div className="settings-section-heading">
            <div className="settings-section-icon">♧</div>
            <div>
              <h2>Thông báo</h2>
              <p>Tùy chỉnh các loại cảnh báo được hiển thị.</p>
            </div>
          </div>

          <div className="settings-item">
            <div>
              <strong>Cảnh báo nghiêm trọng</strong>
              <p>Các sự kiện có mức độ nguy hiểm cao.</p>
            </div>
            <button
              type="button"
              className={`settings-switch ${notifications.critical ? 'enabled' : ''}`}
              role="switch"
              aria-checked={notifications.critical}
              aria-label="Cảnh báo nghiêm trọng"
              onClick={() => toggleNotification('critical')}
            >
              <span />
            </button>
          </div>

          <div className="settings-item">
            <div>
              <strong>Cảnh báo thông thường</strong>
              <p>Các thông số vượt ngưỡng cảnh báo.</p>
            </div>
            <button
              type="button"
              className={`settings-switch ${notifications.warning ? 'enabled' : ''}`}
              role="switch"
              aria-checked={notifications.warning}
              aria-label="Cảnh báo thông thường"
              onClick={() => toggleNotification('warning')}
            >
              <span />
            </button>
          </div>

          <div className="settings-item">
            <div>
              <strong>Thông tin hệ thống</strong>
              <p>Các thông báo cập nhật và trạng thái hoạt động.</p>
            </div>
            <button
              type="button"
              className={`settings-switch ${notifications.info ? 'enabled' : ''}`}
              role="switch"
              aria-checked={notifications.info}
              aria-label="Thông tin hệ thống"
              onClick={() => toggleNotification('info')}
            >
              <span />
            </button>
          </div>
        </section>

        <section className="settings-section">
          <div className="settings-section-heading">
            <div className="settings-section-icon">ⓘ</div>
            <div>
              <h2>Thông tin hệ thống</h2>
              <p>Thông tin về phiên bản ứng dụng hiện tại.</p>
            </div>
          </div>

          <div className="settings-info-row">
            <span>Tên ứng dụng</span>
            <strong>E-Safe Monitor</strong>
          </div>
          <div className="settings-info-row">
            <span>Phiên bản</span>
            <strong>0.1.0 Beta</strong>
          </div>
          <div className="settings-info-row">
            <span>Chế độ hoạt động</span>
            <strong className="settings-demo-status">Mô phỏng</strong>
          </div>
          <div className="settings-info-row">
            <span>Kết nối thiết bị</span>
            <strong>Chưa kết nối</strong>
          </div>
        </section>
      </div>
    </>
  )
}

export default SettingsPage
```

## `src/types/device.ts`

```typescript
export type DeviceStatus = 'normal' | 'warning' | 'offline'

export type Device = {
  id: string
  name: string
  location: string
  temperature: number
  current: number
  status: DeviceStatus
}
```

## `src/types/alert.ts`

```typescript
export type AlertLevel = 'warning' | 'critical' | 'info'
export type AlertStatus = 'new' | 'acknowledged' | 'resolved'

export type Alert = {
  id: string
  deviceId: string
  deviceName: string
  location: string
  level: AlertLevel
  status: AlertStatus
  title: string
  message: string
  temperature?: number
  current?: number
  createdAt: string
}
```

## `src/types/theme.ts`

```typescript
export type Theme = 'light' | 'dark'
```

## `src/data/devices.ts`

```typescript
import type { Device } from '../types/device'

export const devices: Device[] = [
  {
    id: 'ES-001',
    name: 'Tủ điện khu vực A',
    location: 'Tầng 1 · Khu vực A',
    temperature: 38.5,
    current: 2.4,
    status: 'normal',
  },
  {
    id: 'ES-002',
    name: 'Tủ điện khu vực B',
    location: 'Tầng 2 · Khu vực B',
    temperature: 67.2,
    current: 4.8,
    status: 'warning',
  },
  {
    id: 'ES-003',
    name: 'Tủ điện khu vực C',
    location: 'Tầng 2 · Khu vực C',
    temperature: 35.1,
    current: 1.9,
    status: 'normal',
  },
]
```

## `src/data/alerts.ts`

```typescript
import type { Alert } from '../types/alert'

export const alerts: Alert[] = [
  {
    id: 'AL-001',
    deviceId: 'ES-002',
    deviceName: 'Tủ điện khu vực B',
    location: 'Tầng 2 · Khu vực B',
    level: 'critical',
    status: 'new',
    title: 'Nhiệt độ tăng cao bất thường',
    message: 'Nhiệt độ tại điểm giám sát đã vượt ngưỡng cảnh báo.',
    temperature: 67.2,
    current: 4.8,
    createdAt: '5 phút trước',
  },
  {
    id: 'AL-002',
    deviceId: 'ES-002',
    deviceName: 'Tủ điện khu vực B',
    location: 'Tầng 2 · Khu vực B',
    level: 'warning',
    status: 'acknowledged',
    title: 'Dòng điện tăng cao',
    message: 'Dòng điện đang cao hơn mức vận hành thông thường.',
    temperature: 64.8,
    current: 4.8,
    createdAt: '18 phút trước',
  },
  {
    id: 'AL-003',
    deviceId: 'ES-001',
    deviceName: 'Tủ điện khu vực A',
    location: 'Tầng 1 · Khu vực A',
    level: 'info',
    status: 'resolved',
    title: 'Nhiệt độ đã trở về bình thường',
    message: 'Thông số nhiệt độ đã trở lại vùng vận hành ổn định.',
    temperature: 38.5,
    current: 2.4,
    createdAt: '1 giờ trước',
  },
]
```

## `src/components/layout/Topbar.tsx`

```tsx

type TopbarProps = {
  activePage: string
  navigation: string[]
  onNavigate: (page: string) => void
}

function Topbar({
  activePage,
  navigation,
  onNavigate,
}: TopbarProps) {
  return (
    <header className="topbar">
      <a className="brand" href="#" aria-label="E-Safe Monitor">
        <span className="brand-icon">E</span>
        <span className="brand-name">
          E-Safe<span> Monitor</span>
        </span>
      </a>

      <nav className="desktop-nav" aria-label="Điều hướng chính">
        {navigation.map((item) => (
          <button
            key={item}
            className={`nav-link ${activePage === item ? 'active' : ''}`}
            onClick={() => onNavigate(item)}
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="topbar-actions">
        <div className="connection-status">
          <span className="status-dot" />
          <span>Chế độ mô phỏng</span>
        </div>
      </div>
    </header>
  )
}

export default Topbar
```

## `src/components/layout/MobileNav.tsx`

```tsx

type MobileNavProps = {
  activePage: string
  navigation: string[]
  onNavigate: (page: string) => void
}

function MobileNav({
  activePage,
  navigation,
  onNavigate,
}: MobileNavProps) {
  const icons = ['⌂', '▦', '!', '⚙']

  return (
    <nav className="mobile-nav" aria-label="Điều hướng di động">
      {navigation.map((item, index) => (
        <button
          key={item}
          className={activePage === item ? 'active' : ''}
          onClick={() => onNavigate(item)}
        >
          <span>{icons[index]}</span>
          {item}
        </button>
      ))}
    </nav>
  )
}

export default MobileNav
```

## `src/App.css`

```css

.app-shell {
  min-height: 100vh;
  background: var(--bg);
}

.topbar {
  height: 72px;
  padding: 0 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 10;
}

.brand {
  display: flex;
  align-items: center;
  gap: 11px;
  flex-shrink: 0;
}

.brand-icon {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 11px;
  background: var(--primary);
  color: #fff;
  font-weight: 800;
  font-size: 20px;
}

.brand-name {
  font-size: 17px;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.brand-name span {
  color: var(--text-muted);
  font-weight: 500;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 7px;
  height: 100%;
}

.nav-link {
  height: 100%;
  padding: 0 15px;
  border: 0;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: var(--text-muted);
  font-size: 13px;
  font-weight: 600;
}

.nav-link:hover,
.nav-link.active {
  color: var(--primary);
}

.nav-link.active {
  border-bottom-color: var(--primary);
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 18px;
}

.connection-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--text-muted);
  white-space: nowrap;
}

.status-dot,
.update-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--success);
}

.main-content {
  width: min(1440px, 100%);
  margin: 0 auto;
  padding: 38px 5% 24px;
}

.page-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 27px;
}

.eyebrow {
  margin: 0 0 9px;
  color: var(--primary);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.5px;
}

.page-heading h1 {
  margin: 0;
  font-size: clamp(25px, 3vw, 32px);
  letter-spacing: -1px;
}

.page-description {
  margin: 8px 0 0;
  color: var(--text-muted);
  font-size: 13px;
}

.last-update {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted);
  font-size: 11px;
  white-space: nowrap;
}

.update-dot {
  width: 7px;
  height: 7px;
  background: var(--warning);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 22px;
}

.stat-card,
.panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 15px;
}

.stat-card {
  min-width: 0;
  padding: 19px;
}

.stat-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 600;
}

.stat-icon {
  width: 31px;
  height: 31px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  font-weight: 800;
}

.stat-icon.blue {
  color: #60a5fa;
  background: #3b82f61a;
}

.stat-icon.green {
  color: var(--success);
  background: #16a34a1a;
}

.stat-icon.orange {
  color: var(--warning);
  background: #d977061a;
}

.stat-icon.red {
  color: var(--danger);
  background: #dc26261a;
}

.stat-value {
  display: block;
  margin-top: 17px;
  font-size: 29px;
  letter-spacing: -1px;
}

.stat-note {
  display: block;
  margin-top: 4px;
  color: var(--text-muted);
  font-size: 11px;
}

.content-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(270px, 1fr);
  gap: 18px;
}

.panel {
  padding: 21px;
  min-width: 0;
}

.panel-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}

.panel-heading h2 {
  margin: 0;
  font-size: 15px;
}

.panel-heading p {
  margin: 5px 0 0;
  color: var(--text-muted);
  font-size: 11px;
}

.text-button {
  border: 0;
  background: transparent;
  color: var(--primary);
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
}

.text-button span {
  margin-left: 4px;
}

.device-list {
  display: flex;
  flex-direction: column;
}

.device-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  padding: 16px 0;
  border-top: 1px solid var(--border);
}

.device-main {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.device-icon {
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 11px;
  background: var(--surface-secondary);
  color: var(--primary);
  font-size: 19px;
}

.device-info {
  min-width: 0;
}

.device-info h3,
.alert-item h3 {
  margin: 0;
  font-size: 12px;
  font-weight: 700;
}

.device-info p,
.alert-item p {
  margin: 5px 0 0;
  color: var(--text-muted);
  font-size: 10px;
}

.device-metrics {
  display: flex;
  align-items: center;
  gap: 21px;
}

.metric {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 58px;
}

.metric span {
  color: var(--text-muted);
  font-size: 10px;
}

.metric strong {
  font-size: 12px;
  font-weight: 700;
}

.device-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  white-space: nowrap;
}

.device-status > span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.device-status.normal {
  color: var(--success);
}

.device-status.normal > span {
  background: var(--success);
}

.device-status.warning {
  color: var(--warning);
}

.device-status.warning > span {
  background: var(--warning);
}

.alert-count {
  padding: 5px 9px;
  border-radius: 7px;
  background: #d977061a;
  color: var(--warning);
  font-size: 11px;
  font-weight: 800;
}

.alert-item {
  display: flex;
  gap: 12px;
  padding: 15px;
  border: 1px solid #d9770633;
  border-radius: 12px;
  background: #d977060a;
}

.alert-icon {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 8px;
  background: #d9770620;
  color: var(--warning);
  font-weight: 800;
}

.alert-item strong {
  display: block;
  margin-top: 13px;
  color: var(--warning);
  font-size: 20px;
}

.alert-time {
  display: block;
  margin-top: 7px;
  color: var(--text-muted);
  font-size: 10px;
}

.alert-footer {
  margin-top: 15px;
  color: var(--text-muted);
  font-size: 10px;
  line-height: 1.6;
}

.footer {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-top: 28px;
  padding: 17px 0;
  border-top: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 10px;
}

.mobile-nav {
  display: none;
}

@media (max-width: 1050px) {
  .topbar {
    padding: 0 3%;
  }

  .main-content {
    padding-right: 3%;
    padding-left: 3%;
  }

  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 700px) {
  .topbar {
    height: 62px;
    padding: 0 17px;
    gap: 10px;
  }

  .brand-name {
    font-size: 15px;
  }

  .desktop-nav {
    display: none;
  }

  .topbar-actions {
    gap: 10px;
  }

  .connection-status {
    font-size: 0;
    gap: 0;
  }

  .status-dot {
    width: 9px;
    height: 9px;
  }

  .theme-button {
    width: 34px;
    height: 34px;
  }

  .main-content {
    padding: 27px 16px 95px;
  }

  .page-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 20px;
  }

  .page-description {
    max-width: 310px;
    line-height: 1.6;
  }

  .stats-grid {
    gap: 10px;
    margin-bottom: 14px;
  }

  .stat-card {
    padding: 14px;
    border-radius: 12px;
  }

  .stat-top {
    font-size: 10px;
  }

  .stat-icon {
    width: 27px;
    height: 27px;
  }

  .stat-value {
    margin-top: 12px;
    font-size: 25px;
  }

  .stat-note {
    font-size: 9px;
  }

  .panel {
    padding: 16px;
    border-radius: 12px;
  }

  .device-card {
    align-items: flex-start;
    flex-direction: column;
    gap: 13px;
  }

  .device-metrics {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    padding-left: 50px;
  }

  .device-status {
    grid-column: 1 / -1;
  }

  .footer {
    flex-direction: column;
    line-height: 1.5;
  }

  .mobile-nav {
    position: fixed;
    z-index: 20;
    right: 0;
    bottom: 0;
    left: 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 9px 5px calc(9px + env(safe-area-inset-bottom));
    border-top: 1px solid var(--border);
    background: var(--surface);
  }

  .mobile-nav button {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    border: 0;
    background: transparent;
    color: var(--text-muted);
    font-size: 9px;
    padding: 3px 0;
  }

  .mobile-nav button span {
    font-size: 18px;
  }

  .mobile-nav button.active {
    color: var(--primary);
    font-weight: 700;
  }
}

@media (max-width: 360px) {
  .brand-name {
    font-size: 13px;
  }

  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }

  .stat-card {
    padding: 11px;
  }
}
```

## `src/index.css`

```css

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

:root {
  font-family: 'Inter', sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;

  --bg: #f8fafc;
  --surface: #ffffff;
  --surface-secondary: #f1f5f9;
  --text: #0f172a;
  --text-muted: #64748b;
  --border: #e2e8f0;
  --primary: #0d9488;
  --primary-hover: #0f766e;
  --success: #16a34a;
  --warning: #d97706;
  --danger: #dc2626;

  color: var(--text);
  background: var(--bg);
}

:root[data-theme='dark'] {
  --bg: #0f172a;
  --surface: #1e293b;
  --surface-secondary: #334155;
  --text: #f8fafc;
  --text-muted: #94a3b8;
  --border: #334155;
  --primary: #2dd4bf;
  --primary-hover: #5eead4;
  --success: #4ade80;
  --warning: #fbbf24;
  --danger: #f87171;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
}

button,
input {
  font: inherit;
}

button {
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;
}

#root {
  min-height: 100vh;
}
```

## `src/pages/DevicesToolbar.css`

```css
/* ===== Device toolbar: tìm kiếm + lọc + sắp xếp =====
   Xóa các rule cũ: .device-filter-wrapper, .device-filter-trigger,
   .device-filter-menu, .device-filter-option, .filter-chevron
   và rule cũ của .device-toolbar / .device-search.
   Các biến màu bên dưới có giá trị dự phòng; đổi sang biến của dự án nếu có. */

.device-toolbar {
  --tb-bg: var(--surface, #ffffff);
  --tb-border: var(--border, #e2e8f0);
  --tb-text: var(--text, #0f172a);
  --tb-muted: var(--text-muted, #64748b);
  --tb-accent: var(--accent, #2563eb);
  --tb-accent-soft: var(--accent-soft, #eff6ff);
  --tb-hover: var(--surface-hover, #f8fafc);
  --tb-normal: #16a34a;
  --tb-warning: #d97706;
  --tb-offline: #dc2626;

  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.device-toolbar-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* ---------- Tìm kiếm ---------- */
.device-search-field {
  position: relative;
  flex: 1;
  min-width: 0;
}

.device-search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--tb-muted);
  pointer-events: none;
}

.device-search {
  width: 100%;
  height: 44px;
  padding: 0 40px 0 42px;
  border: 1px solid var(--tb-border);
  border-radius: 12px;
  background: var(--tb-bg);
  color: var(--tb-text);
  font: inherit;
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  -webkit-appearance: none;
  appearance: none;
}

.device-search::placeholder {
  color: var(--tb-muted);
}

.device-search::-webkit-search-cancel-button {
  display: none;
}

.device-search:focus {
  border-color: var(--tb-accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--tb-accent) 18%, transparent);
}

.device-search-clear {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 26px;
  height: 26px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: var(--tb-muted);
  font-size: 12px;
  cursor: pointer;
}

.device-search-clear:hover {
  background: var(--tb-hover);
  color: var(--tb-text);
}

/* ---------- Sắp xếp (select tùy chỉnh) ---------- */
.device-sort {
  position: relative;
  flex-shrink: 0;
}

.device-sort-trigger {
  height: 44px;
  min-width: 220px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 14px;
  border: 1px solid var(--tb-border);
  border-radius: 12px;
  background: var(--tb-bg);
  color: var(--tb-text);
  font: inherit;
  font-size: 14px;
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.device-sort-trigger:hover {
  border-color: color-mix(in srgb, var(--tb-accent) 40%, var(--tb-border));
}

.device-sort-trigger:focus-visible,
.device-sort-trigger.open {
  border-color: var(--tb-accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--tb-accent) 18%, transparent);
  outline: none;
}

.device-sort-label {
  color: var(--tb-muted);
}

.device-sort-value {
  flex: 1;
  text-align: left;
  font-weight: 600;
  white-space: nowrap;
}

.device-sort-chevron {
  color: var(--tb-muted);
  transition: transform 0.15s;
}

.device-sort-trigger.open .device-sort-chevron {
  transform: rotate(180deg);
}

.device-sort-menu {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  z-index: 20;
  min-width: 100%;
  padding: 6px;
  border: 1px solid var(--tb-border);
  border-radius: 12px;
  background: var(--tb-bg);
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.12);
  animation: tb-pop 0.12s ease-out;
}

@keyframes tb-pop {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.device-sort-option {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--tb-text);
  font: inherit;
  font-size: 14px;
  text-align: left;
  white-space: nowrap;
  cursor: pointer;
}

.device-sort-option:hover,
.device-sort-option:focus-visible {
  background: var(--tb-hover);
  outline: none;
}

.device-sort-option.selected {
  background: var(--tb-accent-soft);
  color: var(--tb-accent);
  font-weight: 600;
}

/* ---------- Chip lọc trạng thái ---------- */
.device-toolbar-row--chips {
  justify-content: space-between;
}

.status-chips {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 2px;
  scrollbar-width: none;
}

.status-chips::-webkit-scrollbar {
  display: none;
}

.status-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  padding: 0 8px 0 14px;
  border: 1px solid var(--tb-border);
  border-radius: 999px;
  background: var(--tb-bg);
  color: var(--tb-text);
  font: inherit;
  font-size: 13.5px;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}

.status-chip:hover {
  background: var(--tb-hover);
}

.status-chip:focus-visible {
  outline: 2px solid var(--tb-accent);
  outline-offset: 2px;
}

.status-chip-dot {
  width: 8px;
  height: 8px;
  margin-left: -2px;
  border-radius: 50%;
  background: var(--tb-muted);
}

.status-chip.normal .status-chip-dot {
  background: var(--tb-normal);
}
.status-chip.warning .status-chip-dot {
  background: var(--tb-warning);
}
.status-chip.offline .status-chip-dot {
  background: var(--tb-offline);
}

.status-chip-count {
  min-width: 22px;
  height: 22px;
  display: inline-grid;
  place-items: center;
  padding: 0 6px;
  border-radius: 999px;
  background: var(--tb-hover);
  color: var(--tb-muted);
  font-size: 12px;
  font-weight: 600;
}

.status-chip.active {
  border-color: var(--tb-accent);
  background: var(--tb-accent-soft);
  color: var(--tb-accent);
}

.status-chip.active .status-chip-count {
  background: var(--tb-accent);
  color: #fff;
}

.status-chip.normal.active {
  border-color: var(--tb-normal);
  background: color-mix(in srgb, var(--tb-normal) 10%, var(--tb-bg));
  color: var(--tb-normal);
}
.status-chip.normal.active .status-chip-count {
  background: var(--tb-normal);
}

.status-chip.warning.active {
  border-color: var(--tb-warning);
  background: color-mix(in srgb, var(--tb-warning) 10%, var(--tb-bg));
  color: var(--tb-warning);
}
.status-chip.warning.active .status-chip-count {
  background: var(--tb-warning);
}

.status-chip.offline.active {
  border-color: var(--tb-offline);
  background: color-mix(in srgb, var(--tb-offline) 10%, var(--tb-bg));
  color: var(--tb-offline);
}
.status-chip.offline.active .status-chip-count {
  background: var(--tb-offline);
}

/* ---------- Nút đặt lại ---------- */
.toolbar-reset {
  flex-shrink: 0;
  height: 36px;
  padding: 0 12px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--accent, #2563eb);
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
}

.toolbar-reset:hover {
  background: var(--accent-soft, #eff6ff);
}

.empty-state .toolbar-reset {
  margin-top: 8px;
  border: 1px solid var(--border, #e2e8f0);
}

/* ---------- Mobile ---------- */
@media (max-width: 640px) {
  .device-toolbar-row:first-child {
    flex-direction: column;
    align-items: stretch;
  }

  .device-sort-trigger {
    width: 100%;
    min-width: 0;
  }

  .device-sort-menu {
    left: 0;
    right: 0;
  }

  .device-toolbar-row--chips {
    gap: 8px;
  }
}
```

## `src/pages/AlertsPage.css`

```css
.alert-summary {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 22px;
}

.alert-summary-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 18px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
}

.alert-summary-card span,
.alert-metrics span {
  color: var(--text-muted);
  font-size: 13px;
}

.alert-summary-card strong {
  font-size: 26px;
  line-height: 1;
}

.alert-summary-card.critical strong { color: var(--danger); }
.alert-summary-card.warning strong { color: var(--warning); }
.alert-summary-card.info strong { color: var(--primary); }

.alert-toolbar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 18px;
}

.alert-level-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 4px;
  background: var(--surface-secondary);
  border-radius: 10px;
}

.alert-level-tabs button {
  padding: 9px 12px;
  color: var(--text-muted);
  background: transparent;
  border: 0;
  border-radius: 7px;
  font-size: 13px;
  font-weight: 600;
}

.alert-level-tabs button.active {
  color: var(--text);
  background: var(--surface);
  box-shadow: 0 1px 3px rgb(0 0 0 / 8%);
}

.alert-level-tabs button.active.critical { color: var(--danger); }
.alert-level-tabs button.active.warning { color: var(--warning); }
.alert-level-tabs button.active.info { color: var(--primary); }

.alert-status-select {
  min-height: 40px;
  padding: 0 12px;
  color: var(--text);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 9px;
  outline: none;
}

.alert-status-select:focus {
  border-color: var(--primary);
}

.alert-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.alert-card {
  display: grid;
  grid-template-columns: 4px minmax(0, 1fr) auto;
  gap: 16px;
  padding: 18px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
}

.alert-indicator {
  width: 4px;
  height: 100%;
  min-height: 90px;
  border-radius: 10px;
  background: var(--primary);
}

.alert-card.critical .alert-indicator { background: var(--danger); }
.alert-card.warning .alert-indicator { background: var(--warning); }
.alert-card.info .alert-indicator { background: var(--primary); }

.alert-main {
  min-width: 0;
}

.alert-top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.alert-level,
.alert-status {
  display: inline-flex;
  align-items: center;
  padding: 5px 9px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
}

.alert-level.critical {
  color: var(--danger);
  background: color-mix(in srgb, var(--danger) 12%, transparent);
}

.alert-level.warning {
  color: var(--warning);
  background: color-mix(in srgb, var(--warning) 12%, transparent);
}

.alert-level.info {
  color: var(--primary);
  background: color-mix(in srgb, var(--primary) 12%, transparent);
}

.alert-status.new {
  color: var(--danger);
  background: color-mix(in srgb, var(--danger) 9%, transparent);
}

.alert-status.acknowledged {
  color: var(--warning);
  background: color-mix(in srgb, var(--warning) 9%, transparent);
}

.alert-status.resolved {
  color: var(--success);
  background: color-mix(in srgb, var(--success) 9%, transparent);
}

.alert-main h3 {
  margin: 0 0 7px;
  color: var(--text);
  font-size: 16px;
}

.alert-message {
  margin: 0;
  color: var(--text-muted);
  font-size: 13px;
  line-height: 1.6;
}

.alert-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
  margin-top: 14px;
  color: var(--text-muted);
  font-size: 11px;
}

.alert-metrics {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-left: 12px;
}

.alert-metrics > div {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.alert-metrics strong {
  color: var(--text);
  font-size: 16px;
}

@media (max-width: 850px) {
  .alert-card {
    grid-template-columns: 4px minmax(0, 1fr);
  }

  .alert-metrics {
    grid-column: 2;
    padding: 12px 0 0;
    border-top: 1px solid var(--border);
  }
}

@media (max-width: 600px) {
  .alert-summary {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .alert-summary-card {
    padding: 14px;
  }

  .alert-summary-card strong {
    font-size: 23px;
  }

  .alert-toolbar {
    align-items: stretch;
  }

  .alert-level-tabs {
    width: 100%;
    overflow-x: auto;
    flex-wrap: nowrap;
  }

  .alert-level-tabs button {
    white-space: nowrap;
  }

  .alert-status-select {
    flex: 1;
    min-width: 0;
  }

  .alert-card {
    padding: 14px;
    gap: 12px;
  }

  .alert-meta {
    flex-direction: column;
    gap: 6px;
  }

  .alert-metrics {
    gap: 28px;
  }
}
```

## `src/pages/SettingsPage.css`

```css

/* ================================
   SETTINGS PAGE
================================ */

.settings-layout {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  margin-bottom: 32px;
  align-items: start;
}

.settings-section {
  min-width: 0;
  padding: 24px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 18px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.settings-section:hover {
  border-color: color-mix(in srgb, var(--primary) 35%, var(--border));
}

.settings-section:last-child {
  grid-column: 1 / -1;
}

/* Section heading */

.settings-section-heading {
  display: flex;
  align-items: center;
  gap: 13px;
  margin-bottom: 20px;
}

.settings-section-icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  color: var(--primary);
  background: color-mix(in srgb, var(--primary) 11%, var(--surface));
  border-radius: 13px;
  font-size: 21px;
}

.settings-section-heading h2 {
  margin: 0;
  color: var(--text);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.3px;
}

.settings-section-heading p {
  margin: 5px 0 0;
  color: var(--text-muted);
  font-size: 12px;
  line-height: 1.5;
}

/* Setting rows */

.settings-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  min-height: 76px;
  padding: 15px 0;
  border-top: 1px solid var(--border);
}

.settings-item > div {
  min-width: 0;
}

.settings-item strong {
  display: block;
  color: var(--text);
  font-size: 13px;
  font-weight: 650;
}

.settings-item p {
  margin: 5px 0 0;
  color: var(--text-muted);
  font-size: 12px;
  line-height: 1.5;
}

/* Toggle switch */

.settings-switch {
  appearance: none;
  -webkit-appearance: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  width: 48px;
  height: 28px;
  flex-shrink: 0;
  padding: 3px;
  border: 0 !important;
  border-radius: 999px;
  background: var(--surface-secondary) !important;
  box-shadow: inset 0 0 0 1px var(--border);
  cursor: pointer;
  transition:
    background 0.2s ease,
    box-shadow 0.2s ease;
}

.settings-switch span {
  display: block;
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 1px 4px #00000030;
  transform: translateX(0);
  transition: transform 0.22s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.settings-switch.enabled {
  background: var(--primary) !important;
  box-shadow: none;
}

.settings-switch.enabled span {
  transform: translateX(20px);
}

.settings-switch:hover {
  filter: brightness(0.96);
}

.settings-switch:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--primary) 35%, transparent);
  outline-offset: 3px;
}

/* System information */

.settings-info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 52px;
  padding: 12px 0;
  border-top: 1px solid var(--border);
}

.settings-info-row span {
  color: var(--text-muted);
  font-size: 13px;
}

.settings-info-row strong {
  color: var(--text);
  font-size: 13px;
  font-weight: 650;
  text-align: right;
}

.settings-info-row .settings-demo-status {
  color: var(--warning);
}

/* Responsive */

@media (max-width: 760px) {
  .settings-layout {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .settings-section:last-child {
    grid-column: auto;
  }

  .settings-section {
    padding: 20px;
    border-radius: 16px;
  }
}

@media (max-width: 420px) {
  .settings-section {
    padding: 17px;
  }

  .settings-item {
    gap: 12px;
  }

  .settings-item p {
    max-width: 230px;
  }

  .settings-info-row {
    gap: 10px;
  }
}
```
