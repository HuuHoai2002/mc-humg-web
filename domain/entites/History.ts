import { ProcedureDetail } from './ProcedureDetail'

export interface History {
  id: number
  maHoSo: string
  createdTime: Date
  createdBy: string
  thuTucId: number
  thoiGianXuLy: number
  tongSoBuoc: number
  buocDangXuLy: number
  trangThaiBuocXuLy: null
  trangThai: number
  updatedBy?: Date
  deletedBy?: Date
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
  thuTuc: ProcedureDetail
}
