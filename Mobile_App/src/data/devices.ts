import type { Device } from '../types/device'

export const devices: Device[] = [
  {
    id: 'ES-001',
    name: 'Tủ điện khu vực A',
    location: 'Tầng 1 · Khu vực A',
    temperature: 38.5,
    current: 2.4,
    status: 'normal',
  },
  {
    id: 'ES-002',
    name: 'Tủ điện khu vực B',
    location: 'Tầng 2 · Khu vực B',
    temperature: 67.2,
    current: 4.8,
    status: 'warning',
  },
  {
    id: 'ES-003',
    name: 'Tủ điện khu vực C',
    location: 'Tầng 2 · Khu vực C',
    temperature: 35.1,
    current: 1.9,
    status: 'normal',
  },
]