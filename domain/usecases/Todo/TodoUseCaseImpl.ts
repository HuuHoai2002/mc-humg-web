import { Todo } from "../../entites/Todo";
import { TodoRepository } from "../../repositories/TodoRepository";
import { TodosUseCase } from "./TodosUseCase";

export class TodoUseCaseImpl implements TodosUseCase {
  private todoRepo: TodoRepository;
  constructor(_todoRepo: TodoRepository) {
    this.todoRepo = _todoRepo;
  }
  async getToDos() {
    return await this.todoRepo.getTodos();
  }
}
