import { Todo } from "../entites/Todo";

export interface TodoRepository {
  getTodos(): Promise<Todo[]>;
}
