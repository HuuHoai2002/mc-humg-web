export enum EResultCode {
  GET = 200,
  CREATE = 201,
  UPDATE = 204,
  DELETE = 200,
  NOTFOUND = 404,
  UNAUTHORIZED = 401, // ko có quyền truy cập - chưa được xác thực
  BADREQUEST = 400, // yêu cầu hoặc cú pháp không hợp lệ
  FORBIDDEN = 403, // không có quyền truy cập vào nội dung nhưng đã được xác thực,
  INTERNALSERVERERROR = 500,
}
