import { Todo } from "../../../../domain/entites/Todo";
import TodoDataSource from "../../TodoDataSource";
import { BaseApiService } from "../BaseApiService";

export class TodoApiDataSourceImpl
  extends BaseApiService<Todo>
  implements TodoDataSource
{
  private static instance: TodoApiDataSourceImpl;
  private constructor() {
    super(`/todo`);
  }
  async getTodos(): Promise<Todo[]> {
    const response = await super.list({});
    return response.data;
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): TodoApiDataSourceImpl {
    if (!TodoApiDataSourceImpl.instance) {
      TodoApiDataSourceImpl.instance = new TodoApiDataSourceImpl();
    }

    return TodoApiDataSourceImpl.instance;
  }
}

export const todoApiDataSourceImpl = TodoApiDataSourceImpl.getInstance;
