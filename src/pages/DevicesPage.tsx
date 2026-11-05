import { useState } from 'react'
import { devices } from '../data/devices'

type FilterStatus = 'all' | 'normal' | 'warning' | 'offline'

function DevicesPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<FilterStatus>('all')

  const filteredDevices = devices.filter((device) => {
    const keyword = search.toLowerCase()

    const matchesSearch =
      device.name.toLowerCase().includes(keyword) ||
      device.id.toLowerCase().includes(keyword) ||
      device.location.toLowerCase().includes(keyword)

    const matchesStatus =
      filter === 'all' || device.status === filter

    return matchesSearch && matchesStatus
  })

  const statusLabels = {
    normal: 'Bình thường',
    warning: 'Cảnh báo',
    offline: 'Mất kết nối',
  }

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

      <section className="device-toolbar">
        <input
          className="device-search"
          type="text"
          placeholder="Tìm theo tên, mã hoặc vị trí..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          className="device-filter"
          value={filter}
          onChange={(event) =>
            setFilter(event.target.value as FilterStatus)
          }
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="normal">Bình thường</option>
          <option value="warning">Cảnh báo</option>
          <option value="offline">Mất kết nối</option>
        </select>
      </section>

      <section className="device-page-list">
        <div className="device-results">
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
          </div>
        )}
      </section>
    </>
  )
}

export default DevicesPage