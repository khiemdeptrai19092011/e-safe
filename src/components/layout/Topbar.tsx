
type TopbarProps = {
  activePage: string
  navigation: string[]
  theme: 'light' | 'dark'
  onNavigate: (page: string) => void
  onToggleTheme: () => void
}

function Topbar({
  activePage,
  navigation,
  theme,
  onNavigate,
  onToggleTheme,
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
          <span>Hệ thống hoạt động</span>
        </div>

        <button
          className="theme-button"
          onClick={onToggleTheme}
          aria-label="Đổi giao diện"
          title="Đổi giao diện"
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </div>
    </header>
  )
}

export default Topbar
