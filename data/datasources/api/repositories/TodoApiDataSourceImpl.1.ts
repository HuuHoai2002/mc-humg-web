import { Todo } from "../../../../domain/entites/Todo";
import TodoDataSource from "../../TodoDataSource";
import { BaseApiService } from "../BaseApiService";

export class TodoApiDataSourceImpl
  extends BaseApiService<Todo>
  implements TodoDataSource
{
  // private static instance: TodoApiDataSourceImpl;
  public constructor() {
    super(`/todo`);
  }
  async getTodos(): Promise<Todo[]> {
    const response = await super.list({});
    return response.data;
  }
}
