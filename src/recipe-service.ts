import { User } from "./user";

export class RecipeService {
  findById(id: string) {

  }

  removeById(id: string) {

  }

  findAll ({ skip, take }: { skip: number, take: number }) {
    return [
      {
        id: 123,
        title: '',
        description: '',
        creationDate: '',
        ingredients: [],
      }
    ]
  }

  addNew({ data, user }: { data: any, user: User }): any {
  }
}