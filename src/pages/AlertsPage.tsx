import { useMemo, useState } from 'react'
import type { Alert, AlertLevel, AlertStatus } from '../types/alert'
import './AlertsPage.css'

type AlertsPageProps = {
  alerts: Alert[]
  onAcknowledge: (alertId: string) => void
  onResolve: (alertId: string) => void
}

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

function AlertsPage({
  alerts,
  onAcknowledge,
  onResolve,
}: AlertsPageProps) {
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('all')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')

  // Thống kê số lượng cảnh báo theo mức độ
  const counts = useMemo(() => {
    return {
      all: alerts.length,
      critical: alerts.filter((alert) => alert.level === 'critical').length,
      warning: alerts.filter((alert) => alert.level === 'warning').length,
      info: alerts.filter((alert) => alert.level === 'info').length,
    }
  }, [alerts])

  // Lọc cảnh báo theo mức độ và trạng thái
  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const levelMatch =
        levelFilter === 'all' || alert.level === levelFilter

      const statusMatch =
        statusFilter === 'all' || alert.status === statusFilter

      return levelMatch && statusMatch
    })
  }, [alerts, levelFilter, statusFilter])

  const hasActiveFilters =
    levelFilter !== 'all' || statusFilter !== 'all'

  // Đặt lại bộ lọc
  function resetFilters() {
    setLevelFilter('all')
    setStatusFilter('all')
  }

  return (
    <>
      {/* Tiêu đề trang */}
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

      {/* Thống kê cảnh báo */}
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

      {/* Bộ lọc */}
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

      {/* Danh sách cảnh báo */}
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
                {/* Mức độ và trạng thái */}
                <div className="alert-top">
                  <span className={`alert-level ${alert.level}`}>
                    {levelLabels[alert.level]}
                  </span>

                  <span className={`alert-status ${alert.status}`}>
                    {statusLabels[alert.status]}
                  </span>
                </div>

                {/* Nội dung cảnh báo */}
                <h3>{alert.title}</h3>

                <p className="alert-message">
                  {alert.message}
                </p>

                {/* Thông tin thiết bị */}
                <div className="alert-meta">
                  <span>{alert.deviceName}</span>
                  <span>{alert.deviceId}</span>
                  <span>{alert.location}</span>
                  <span>{alert.createdAt}</span>
                </div>

                {/* Thao tác xử lý */}
                {alert.status !== 'resolved' && (
                  <div className="alert-actions">
                    {alert.status === 'new' && (
                      <button
                        type="button"
                        onClick={() => onAcknowledge(alert.id)}
                      >
                        Tiếp nhận
                      </button>
                    )}

                    {alert.status === 'acknowledged' && (
                      <button
                        type="button"
                        onClick={() => onResolve(alert.id)}
                      >
                        Đánh dấu đã xử lý
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Thông số đo */}
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