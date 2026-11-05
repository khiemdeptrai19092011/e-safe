export type AlertLevel = 'warning' | 'critical' | 'info'
export type AlertStatus = 'new' | 'acknowledged' | 'resolved'

export type Alert = {
  id: string
  deviceId: string
  deviceName: string
  location: string
  level: AlertLevel
  status: AlertStatus
  title: string
  message: string
  temperature?: number
  current?: number
  createdAt: string
}