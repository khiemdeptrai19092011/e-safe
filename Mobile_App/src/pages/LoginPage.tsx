import { useState } from 'react'
import './LoginPage.css'

type LoginPageProps = {
  onLogin: () => void
}

function LoginPage({ onLogin }: LoginPageProps) {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // Chế độ giao diện thử nghiệm:
    // Chưa xác thực tài khoản và mật khẩu.
    onLogin()
  }

  return (
    <main className="login-page">
      <div className="login-container">
        <div className="login-brand">
          <div className="login-brand-icon">E</div>

          <div>
            <h1>E-SAFE <span>MONITOR</span></h1>
            <p>Hệ thống giám sát và cảnh báo sớm</p>
          </div>
        </div>

        <section className="login-card">
          <div className="login-heading">
            <div className="login-heading-icon">
              <span>⌂</span>
            </div>

            <h2>Đăng nhập</h2>
            <p>
              Đăng nhập bằng tài khoản hộ dân được cấp
              để truy cập hệ thống.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="login-field">
              <label htmlFor="login-account">
                Mã tài khoản hộ dân
              </label>

              <input
                id="login-account"
                type="text"
                placeholder="Ví dụ: HD001"
                value={account}
                onChange={(event) => setAccount(event.target.value)}
                autoComplete="username"
                required
              />
            </div>

            <div className="login-field">
              <label htmlFor="login-password">
                Mật khẩu
              </label>

              <div className="login-password-wrapper">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showPassword ? 'Ẩn' : 'Hiện'}
                </button>
              </div>
            </div>

            <button type="submit" className="login-submit">
              ĐĂNG NHẬP
              <span>→</span>
            </button>
          </form>

          <div className="login-notice">
            <span className="login-notice-icon">i</span>
            <p>
              Tài khoản được cấp bởi đơn vị quản lý hệ thống.
              Vui lòng liên hệ quản trị viên nếu cần hỗ trợ.
            </p>
          </div>
        </section>

        <footer className="login-footer">
          <span>E-Safe Monitor</span>
          <span>Bản thử nghiệm</span>
        </footer>
      </div>
    </main>
  )
}

export default LoginPage