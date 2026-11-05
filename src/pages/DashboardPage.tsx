
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
