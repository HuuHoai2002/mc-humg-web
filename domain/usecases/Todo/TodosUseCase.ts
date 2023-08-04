import { Todo } from "../../entites/Todo";

export interface TodosUseCase {
  getToDos: () => Promise<Todo[]>;
}
