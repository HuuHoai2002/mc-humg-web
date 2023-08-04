import { EResultCode } from "../../domain/enums";

export interface TypedResponseApi<T> {
  success: boolean;
  resultCode: EResultCode;
  message: any;
  validationErrors: Array<String>;
  data: T;
}
