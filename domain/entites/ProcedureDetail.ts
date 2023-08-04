import { ProcedureProperty } from './ProcedureProperty'

export interface ProcedureDetail {
  id: number
  maThuTuc: string
  tieuDe: string
  noiDung: string
  dieuKienKiemTra: string
  donVi: string
  thoiGianXuLyText: string
  thoiGianXuLy: number
  lePhi: number
  trangThai: number
  createdBy: string
  updatedBy?: string
  deletedBy?: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date

  listThuTucThuocTinhs: ProcedureProperty[]
}
