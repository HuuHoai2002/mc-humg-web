import { ObjectType } from "typescript";
import TodoDataSource from "../TodoDataSource";
import { BaseApiService } from "./BaseApiService";
import { todoApiDataSourceImpl } from "./repositories";

const dataApiSourceImpl: { [key: string]: any } = {
  todo: todoApiDataSourceImpl,
};

const ApiDataSourceFactory = {
  get: (name: string) => dataApiSourceImpl[name],
};

export default ApiDataSourceFactory;
