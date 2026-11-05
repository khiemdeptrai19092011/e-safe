export type DeviceStatus = 'normal' | 'warning' | 'offline'

export type Device = {
  id: string
  name: string
  location: string
  temperature: number
  current: number
  status: DeviceStatus
}