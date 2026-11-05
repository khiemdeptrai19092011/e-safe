
import StatCard from '../components/dashboard/StatCard'

import type { Device } from '../types/device'
import type { Alert } from '../types/alert'

type DashboardPageProps = {
  devices: Device[]
  alerts: Alert[]
  onNavigate: (page: string) => void
}

function DashboardPage({
  devices,
  alerts,
  onNavigate,
}: DashboardPageProps) {
  // Tính toán thống kê thiết bị
  const totalDevices = devices.length

  const normalDevices = devices.filter(
    (device) => device.status === 'normal',
  ).length

  const warningDevices = devices.filter(
    (device) => device.status === 'warning',
  ).length

  const offlineDevices = devices.filter(
    (device) => device.status === 'offline',
  ).length

  // Chỉ lấy cảnh báo chưa được xử lý
  const activeAlerts = alerts.filter(
    (alert) => alert.status !== 'resolved',
  )

  const latestAlert = activeAlerts[0]

  // Chuyển trạng thái thiết bị thành nhãn tiếng Việt
  function getDeviceStatusLabel(status: Device['status']) {
    switch (status) {
      case 'normal':
        return 'Bình thường'
      case 'warning':
        return 'Cảnh báo'
      case 'offline':
        return 'Mất kết nối'
    }
  }

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
          value={String(totalDevices).padStart(2, '0')}
          note="Điểm giám sát"
          icon="▦"
          color="blue"
        />

        <StatCard
          label="Hoạt động bình thường"
          value={String(normalDevices).padStart(2, '0')}
          note="Trong ngưỡng an toàn"
          icon="✓"
          color="green"
        />

        <StatCard
          label="Cảnh báo"
          value={String(warningDevices).padStart(2, '0')}
          note="Cần kiểm tra"
          icon="!"
          color="orange"
        />

        <StatCard
          label="Mất kết nối"
          value={String(offlineDevices).padStart(2, '0')}
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
                    {getDeviceStatusLabel(device.status)}
                  </span>
                </div>
              </article>
            ))}

            {devices.length === 0 && (
              <p>Chưa có thiết bị nào trong hệ thống.</p>
            )}
          </div>
        </div>

        <aside className="panel alerts-panel">
          <div className="panel-heading">
            <div>
              <h2>Cảnh báo gần đây</h2>
              <p>Các sự kiện cần chú ý</p>
            </div>

            <span className="alert-count">
              {String(activeAlerts.length).padStart(2, '0')}
            </span>
          </div>

          {latestAlert ? (
            <article className="alert-item">
              <div className="alert-icon">!</div>

              <div>
                <h3>{latestAlert.title}</h3>
                <p>
                  {latestAlert.deviceId} · {latestAlert.deviceName}
                </p>

                {latestAlert.temperature !== undefined && (
                  <strong>{latestAlert.temperature}°C</strong>
                )}

                <span className="alert-time">
                  {latestAlert.createdAt}
                </span>
              </div>
            </article>
          ) : (
            <div className="alert-item">
              <div>
                <h3>Không có cảnh báo đang hoạt động</h3>
                <p>Hệ thống hiện không ghi nhận cảnh báo mới.</p>
              </div>
            </div>
          )}

          <div className="alert-footer">
            Đây là cảnh báo mô phỏng, không phải dữ liệu từ thiết bị thật.
          </div>
        </aside>
      </section>
    </>
  )
}

export default DashboardPage
