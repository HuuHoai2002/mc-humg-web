import { Todo } from "../../domain/entites/Todo";

export default interface TodoDataSource {
  getTodos(): Promise<Todo[]>;
}
