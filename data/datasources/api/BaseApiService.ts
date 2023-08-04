import { TypedResponseApi } from "../../models";
import BaseApiDataSource from "./repositories/BaseApiDataSource";

export abstract class BaseApiService<T> {
  private _url = "";

  constructor(url: string) {
    this._url = url;
  }

  async list(query: Object): Promise<TypedResponseApi<Array<T>>> {
    const response = await BaseApiDataSource.get<TypedResponseApi<Array<T>>>(
      this._url,
      { ...query }
    );
    return response;
  }

  async listOTherType<TEntity>(payload: {
    url: string;
    params: Object;
  }): Promise<TypedResponseApi<Array<TEntity>>> {
    const response = await BaseApiDataSource.get<
      TypedResponseApi<Array<TEntity>>
    >(`${payload.url}`, {
      ...payload.params,
    });
    return response;
  }

  get = async (id: number): Promise<TypedResponseApi<T>> => {
    const response = await BaseApiDataSource.get<TypedResponseApi<T>>(
      `${this._url}/${id}`
    );
    return response;
  };

  async getOtherType<TEntity>(payload: {
    url: string;
    params: Object;
  }): Promise<TypedResponseApi<TEntity>> {
    const response = await BaseApiDataSource.get<TypedResponseApi<TEntity>>(
      `${payload.url}`,
      {
        ...payload.params,
      }
    );
    return response;
  }

  create = async (payload: Object): Promise<TypedResponseApi<T>> => {
    const response = await BaseApiDataSource.post<TypedResponseApi<T>>(
      `${this._url}`,
      payload
    );
    return response;
  };

  async createOtherType<TEntity>(payload: {
    url: string;
    value: Object;
  }): Promise<TypedResponseApi<TEntity>> {
    const response = await BaseApiDataSource.post<TypedResponseApi<TEntity>>(
      `${payload.url}`,
      payload.value
    );
    return response;
  }

  update = async (
    id: number,
    payload: Object
  ): Promise<TypedResponseApi<T>> => {
    const response = await BaseApiDataSource.put<TypedResponseApi<T>>(
      `${this._url}/${id}`,
      payload
    );
    return response;
  };

  async updateOtherType<TEntity>(payload: {
    url: string;
    value: Object;
  }): Promise<TypedResponseApi<TEntity>> {
    const response = await BaseApiDataSource.put<TypedResponseApi<TEntity>>(
      `${payload.url}`,
      payload.value
    );
    return response;
  }

  remove = async (id: number): Promise<TypedResponseApi<T>> => {
    const response = await BaseApiDataSource.delete<TypedResponseApi<T>>(
      `${this._url}/${id}`
    );
    return response;
  };

  async removeOtherType<TEntity>(
    url: string
  ): Promise<TypedResponseApi<TEntity>> {
    const response = await BaseApiDataSource.delete<TypedResponseApi<TEntity>>(
      `${url}`
    );
    return response;
  }
}
