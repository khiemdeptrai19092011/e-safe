
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
