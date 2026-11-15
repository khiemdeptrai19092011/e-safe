
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
