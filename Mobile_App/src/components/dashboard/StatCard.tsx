
type StatCardProps = {
  label: string
  value: string
  note: string
  icon: string
  color: string
}

function StatCard({ label, value, note, icon, color }: StatCardProps) {
  return (
    <article className="stat-card">
      <div className="stat-top">
        <span>{label}</span>
        <span className={`stat-icon ${color}`}>{icon}</span>
      </div>

      <strong className="stat-value">{value}</strong>
      <span className="stat-note">{note}</span>
    </article>
  )
}

export default StatCard
