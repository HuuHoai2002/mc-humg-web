export interface BaseDataSource<T> {
  list(): Promise<T[]>;
}
