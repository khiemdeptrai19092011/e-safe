import { useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import type { Device, DeviceStatus } from '../types/device'
import './DevicesToolbar.css'
import './DevicesPage.css'

type DevicesPageProps = {
  devices: Device[]
  onUpdateDevice: (device: Device) => void
  onAddDevice: (device: Device) => void
  onDeleteDevice: (deviceId: string) => void
}

type FilterStatus = 'all' | DeviceStatus
type SortKey = 'default' | 'severity' | 'name' | 'temperature' | 'current'
type ModalMode = 'create' | 'edit' | null

type DeviceFormData = {
  name: string
  location: string
  temperature: string
  current: string
  status: DeviceStatus
}

const statusLabels: Record<DeviceStatus, string> = {
  normal: 'Bình thường',
  warning: 'Cảnh báo',
  offline: 'Mất kết nối',
}

const statusTabs: { value: FilterStatus; label: string }[] = [
  { value: 'all', label: 'Tất cả' },
  { value: 'normal', label: statusLabels.normal },
  { value: 'warning', label: statusLabels.warning },
  { value: 'offline', label: statusLabels.offline },
]

const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'default', label: 'Mặc định' },
  { value: 'severity', label: 'Cần chú ý trước' },
  { value: 'name', label: 'Tên A → Z' },
  { value: 'temperature', label: 'Nhiệt độ cao nhất' },
  { value: 'current', label: 'Dòng điện cao nhất' },
]

const severityRank: Record<DeviceStatus, number> = {
  offline: 0,
  warning: 1,
  normal: 2,
}

const emptyForm: DeviceFormData = {
  name: '',
  location: '',
  temperature: '',
  current: '',
  status: 'normal',
}

function DevicesPage({
  devices,
  onUpdateDevice,
  onAddDevice,
  onDeleteDevice,
}: DevicesPageProps) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<FilterStatus>('all')
  const [sort, setSort] = useState<SortKey>('default')
  const [isSortOpen, setIsSortOpen] = useState(false)

  const [modalMode, setModalMode] = useState<ModalMode>(null)
  const [editingDevice, setEditingDevice] = useState<Device | null>(null)
  const [formData, setFormData] = useState<DeviceFormData>(emptyForm)
  const [formError, setFormError] = useState('')

  const sortRef = useRef<HTMLDivElement>(null)

  // Đóng menu sắp xếp khi bấm ra ngoài hoặc nhấn Esc
  useEffect(() => {
    if (!isSortOpen) return

    const handlePointerDown = (event: MouseEvent) => {
      if (!sortRef.current?.contains(event.target as Node)) {
        setIsSortOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsSortOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isSortOpen])

  // Đóng modal bằng phím Esc
  useEffect(() => {
    if (!modalMode) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal()
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [modalMode])

  // Sinh mã thiết bị đầu tiên chưa được sử dụng
  function generateDeviceId() {
    let number = 1
    const existingIds = new Set(devices.map((device) => device.id))

    while (existingIds.has(`ES-${String(number).padStart(3, '0')}`)) {
      number += 1
    }

    return `ES-${String(number).padStart(3, '0')}`
  }

  // Mở modal thêm thiết bị
  function openCreateModal() {
    setEditingDevice(null)
    setFormData(emptyForm)
    setFormError('')
    setModalMode('create')
  }

  // Mở modal chỉnh sửa
  function openEditModal(device: Device) {
    setEditingDevice(device)
    setFormData({
      name: device.name,
      location: device.location,
      temperature: String(device.temperature),
      current: String(device.current),
      status: device.status,
    })
    setFormError('')
    setModalMode('edit')
  }

  // Đóng modal
  function closeModal() {
    setModalMode(null)
    setEditingDevice(null)
    setFormData(emptyForm)
    setFormError('')
  }

  // Cập nhật dữ liệu trong form
  function updateForm<K extends keyof DeviceFormData>(
    field: K,
    value: DeviceFormData[K],
  ) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }))
  }

  // Thêm hoặc cập nhật thiết bị
  function handleSaveDevice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const temperature = Number(formData.temperature)
    const current = Number(formData.current)

    if (!formData.name.trim()) {
      setFormError('Vui lòng nhập tên thiết bị.')
      return
    }

    if (!formData.location.trim()) {
      setFormError('Vui lòng nhập vị trí thiết bị.')
      return
    }

    if (
      formData.temperature.trim() === '' ||
      !Number.isFinite(temperature) ||
      temperature < 0
    ) {
      setFormError('Nhiệt độ phải là số hợp lệ và không được âm.')
      return
    }

    if (
      formData.current.trim() === '' ||
      !Number.isFinite(current) ||
      current < 0
    ) {
      setFormError('Dòng điện phải là số hợp lệ và không được âm.')
      return
    }

    if (modalMode === 'create') {
      const newDevice: Device = {
        id: generateDeviceId(),
        name: formData.name.trim(),
        location: formData.location.trim(),
        temperature,
        current,
        status: formData.status,
      }

      onAddDevice(newDevice)
      setSearch('')
      setFilter('all')
      setSort('default')
    } else if (modalMode === 'edit' && editingDevice) {
      const updatedDevice: Device = {
        ...editingDevice,
        name: formData.name.trim(),
        location: formData.location.trim(),
        temperature,
        current,
        status: formData.status,
      }

      onUpdateDevice(updatedDevice)
    }

    closeModal()
  }

  // Xóa thiết bị sau khi xác nhận
  function handleDeleteDevice(device: Device) {
    const confirmed = window.confirm(
      `Bạn có chắc chắn muốn xóa thiết bị "${device.name}" (${device.id}) không?`,
    )

    if (!confirmed) return

    onDeleteDevice(device.id)
  }

  const keyword = search.trim().toLowerCase()

  // Tìm kiếm thiết bị
  const searchMatched = useMemo(
    () =>
      devices.filter(
        (device) =>
          device.name.toLowerCase().includes(keyword) ||
          device.id.toLowerCase().includes(keyword) ||
          device.location.toLowerCase().includes(keyword),
      ),
    [devices, keyword],
  )

  // Đếm số thiết bị theo từng trạng thái
  const counts = useMemo(() => {
    const result: Record<FilterStatus, number> = {
      all: searchMatched.length,
      normal: 0,
      warning: 0,
      offline: 0,
    }

    searchMatched.forEach((device) => {
      result[device.status] += 1
    })

    return result
  }, [searchMatched])

  // Lọc và sắp xếp
  const filteredDevices = useMemo(() => {
    const list =
      filter === 'all'
        ? [...searchMatched]
        : searchMatched.filter((device) => device.status === filter)

    switch (sort) {
      case 'severity':
        list.sort((a, b) => severityRank[a.status] - severityRank[b.status])
        break

      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name, 'vi'))
        break

      case 'temperature':
        list.sort((a, b) => b.temperature - a.temperature)
        break

      case 'current':
        list.sort((a, b) => b.current - a.current)
        break
    }

    return list
  }, [searchMatched, filter, sort])

  const hasActiveFilters =
    search !== '' || filter !== 'all' || sort !== 'default'

  const resetAll = () => {
    setSearch('')
    setFilter('all')
    setSort('default')
  }

  const currentSortLabel = sortOptions.find(
    (option) => option.value === sort,
  )?.label

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

      <section className="device-toolbar" aria-label="Tìm kiếm và lọc thiết bị">
        <div className="device-toolbar-row">
          <div className="device-search-field">
            <svg
              className="device-search-icon"
              viewBox="0 0 20 20"
              width="18"
              height="18"
              aria-hidden="true"
            >
              <circle
                cx="9"
                cy="9"
                r="5.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path
                d="M13.2 13.2 17 17"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>

            <input
              className="device-search"
              type="search"
              placeholder="Tìm theo tên, mã hoặc vị trí..."
              aria-label="Tìm kiếm thiết bị"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Escape') setSearch('')
              }}
            />

            {search && (
              <button
                type="button"
                className="device-search-clear"
                aria-label="Xóa từ khóa"
                onClick={() => setSearch('')}
              >
                ✕
              </button>
            )}
          </div>

          <div className="device-sort" ref={sortRef}>
            <button
              type="button"
              className={`device-sort-trigger ${isSortOpen ? 'open' : ''}`}
              onClick={() => setIsSortOpen((open) => !open)}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown') {
                  event.preventDefault()
                  setIsSortOpen(true)
                }
              }}
              aria-expanded={isSortOpen}
              aria-haspopup="listbox"
            >
              <span className="device-sort-label">Sắp xếp</span>
              <span className="device-sort-value">{currentSortLabel}</span>
              <span className="device-sort-chevron" aria-hidden="true">
                ⌄
              </span>
            </button>

            {isSortOpen && (
              <div className="device-sort-menu" role="listbox">
                {sortOptions.map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    role="option"
                    aria-selected={sort === option.value}
                    className={`device-sort-option ${
                      sort === option.value ? 'selected' : ''
                    }`}
                    onClick={() => {
                      setSort(option.value)
                      setIsSortOpen(false)
                    }}
                  >
                    <span>{option.label}</span>
                    {sort === option.value && (
                      <span aria-hidden="true">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="device-toolbar-row device-toolbar-row--chips">
          <div
            className="status-chips"
            role="group"
            aria-label="Lọc theo trạng thái"
          >
            {statusTabs.map((tab) => (
              <button
                type="button"
                key={tab.value}
                className={`status-chip ${tab.value} ${
                  filter === tab.value ? 'active' : ''
                }`}
                aria-pressed={filter === tab.value}
                onClick={() => setFilter(tab.value)}
              >
                {tab.value !== 'all' && (
                  <span className="status-chip-dot" />
                )}

                {tab.label}
                <span className="status-chip-count">
                  {counts[tab.value]}
                </span>
              </button>
            ))}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              className="toolbar-reset"
              onClick={resetAll}
            >
              Đặt lại
            </button>
          )}
        </div>
      </section>

      <section className="device-page-list">
        <div className="device-list-heading">
          <div className="device-results" aria-live="polite">
            Hiển thị {filteredDevices.length} / {devices.length} thiết bị
          </div>

          <button
            type="button"
            className="device-add-button"
            onClick={openCreateModal}
          >
            <span aria-hidden="true">＋</span>
            Thêm thiết bị
          </button>
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

                <div className="device-card-actions">
                  <button
                    type="button"
                    className="device-edit-button"
                    onClick={() => openEditModal(device)}
                    aria-label={`Chỉnh sửa ${device.name}`}
                  >
                    <span aria-hidden="true">✎</span>
                    Chỉnh sửa
                  </button>

                  <button
                    type="button"
                    className="device-delete-button"
                    onClick={() => handleDeleteDevice(device)}
                    aria-label={`Xóa ${device.name}`}
                  >
                    <span aria-hidden="true">⌫</span>
                    Xóa
                  </button>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="empty-state">
            <strong>
              {devices.length === 0
                ? 'Chưa có thiết bị nào'
                : 'Không tìm thấy thiết bị'}
            </strong>
            <p>
              {devices.length === 0
                ? 'Bắt đầu bằng cách thêm thiết bị đầu tiên.'
                : 'Thử thay đổi từ khóa hoặc bộ lọc của bạn.'}
            </p>

            {devices.length === 0 ? (
              <button
                type="button"
                className="device-add-button"
                onClick={openCreateModal}
              >
                ＋ Thêm thiết bị
              </button>
            ) : (
              hasActiveFilters && (
                <button
                  type="button"
                  className="toolbar-reset"
                  onClick={resetAll}
                >
                  Xóa tất cả bộ lọc
                </button>
              )
            )}
          </div>
        )}
      </section>

      {/* Modal thêm / chỉnh sửa thiết bị */}
      {modalMode && (
        <div
          className="device-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal()
            }
          }}
        >
          <section
            className="device-edit-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="device-modal-title"
          >
            <div className="device-modal-header">
              <div>
                <p className="eyebrow">QUẢN LÝ THIẾT BỊ</p>
                <h2 id="device-modal-title">
                  {modalMode === 'create'
                    ? 'Thêm thiết bị mới'
                    : 'Chỉnh sửa thiết bị'}
                </h2>
                <p>
                  {modalMode === 'create'
                    ? `Mã thiết bị: ${generateDeviceId()}`
                    : editingDevice?.id}
                </p>
              </div>

              <button
                type="button"
                className="device-modal-close"
                onClick={closeModal}
                aria-label="Đóng cửa sổ"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveDevice}>
              <div className="device-form-grid">
                <label className="device-form-field device-form-full">
                  <span>Tên thiết bị</span>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(event) =>
                      updateForm('name', event.target.value)
                    }
                    placeholder="Nhập tên thiết bị"
                    required
                  />
                </label>

                <label className="device-form-field device-form-full">
                  <span>Vị trí lắp đặt</span>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(event) =>
                      updateForm('location', event.target.value)
                    }
                    placeholder="Nhập vị trí"
                    required
                  />
                </label>

                <label className="device-form-field">
                  <span>Nhiệt độ (°C)</span>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={formData.temperature}
                    onChange={(event) =>
                      updateForm('temperature', event.target.value)
                    }
                    required
                  />
                </label>

                <label className="device-form-field">
                  <span>Dòng điện (A)</span>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={formData.current}
                    onChange={(event) =>
                      updateForm('current', event.target.value)
                    }
                    required
                  />
                </label>

                <label className="device-form-field device-form-full">
                  <span>Trạng thái thiết bị</span>
                  <select
                    value={formData.status}
                    onChange={(event) =>
                      updateForm(
                        'status',
                        event.target.value as DeviceStatus,
                      )
                    }
                  >
                    <option value="normal">Bình thường</option>
                    <option value="warning">Cảnh báo</option>
                    <option value="offline">Mất kết nối</option>
                  </select>
                </label>
              </div>

              {formError && (
                <p className="device-form-error" role="alert">
                  {formError}
                </p>
              )}

              <div className="device-modal-actions">
                <button
                  type="button"
                  className="device-cancel-button"
                  onClick={closeModal}
                >
                  Hủy
                </button>

                <button
                  type="submit"
                  className="device-save-button"
                >
                  {modalMode === 'create' ? 'Thêm thiết bị' : 'Lưu thay đổi'}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  )
}

export default DevicesPage