
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Device, DeviceStatus } from '../types/device'
import './DevicesToolbar.css'

type DevicesPageProps = {
  devices: Device[]
}

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

function DevicesPage({ devices }: DevicesPageProps) {
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

  // Tìm kiếm thiết bị
  const searchMatched = useMemo(
    () =>
      devices.filter(
        (device) =>
          device.name.toLowerCase().includes(keyword) ||
          device.id.toLowerCase().includes(keyword) ||
          device.location.toLowerCase().includes(keyword),
      ),
    [devices, keyword],
  )

  // Đếm số thiết bị theo từng trạng thái
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

  // Lọc và sắp xếp
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

  const currentSortLabel = sortOptions.find(
    (option) => option.value === sort,
  )?.label

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
                    {sort === option.value && (
                      <span aria-hidden="true">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Lọc trạng thái */}
        <div className="device-toolbar-row device-toolbar-row--chips">
          <div
            className="status-chips"
            role="group"
            aria-label="Lọc theo trạng thái"
          >
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
                {tab.value !== 'all' && (
                  <span className="status-chip-dot" />
                )}

                {tab.label}
                <span className="status-chip-count">
                  {counts[tab.value]}
                </span>
              </button>
            ))}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              className="toolbar-reset"
              onClick={resetAll}
            >
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
              <button
                type="button"
                className="toolbar-reset"
                onClick={resetAll}
              >
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
