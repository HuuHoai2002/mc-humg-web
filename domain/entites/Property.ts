import { EDataType } from '../enums'

export interface Property {
  id: number
  maThuocTinh: string
  tenThuocTinh: string
  kieuDuLieu: EDataType
  doRongDuLieu: number
  giaTriMax?: number
  giaTriMin?: number
  giaTriMacDinh?: number
  ghiChu: string
  trangthai: number
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}
