import { Todo } from "../../domain/entites/Todo";
import { TodoRepository } from "../../domain/repositories/TodoRepository";
import TodoDataSource from "../datasources/TodoDataSource";

export class TodoRepositoryImpl implements TodoRepository {
  dataSource: TodoDataSource;

  constructor(_datasource: TodoDataSource) {
    this.dataSource = _datasource;
  }

  async getTodos(): Promise<Todo[]> {
    return this.dataSource.getTodos();
  }
}
