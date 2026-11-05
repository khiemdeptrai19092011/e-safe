
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
