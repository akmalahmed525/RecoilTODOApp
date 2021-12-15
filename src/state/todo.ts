import {atom, selector} from 'recoil';

export type AppToDo = {
  _id?: string;
  title: string;
  description?: string;
};

export type AppToDos = Array<AppToDo>;

export type ToDoAction = {
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'READ';
  data: AppToDo | null;
};

const wait = (milliseconds: number) =>
  new Promise(resolve => setTimeout(resolve, milliseconds));

export const todoAction = atom<ToDoAction>({
  key: 'todo-action',
  default: {
    action: 'READ',
    data: null,
  },
});

export const todoFilter = selector<AppToDos>({
  key: 'todo-filter',
  get: async ({get}) => {
    const todoActionData = get(todoAction);
    const {action, data} = todoActionData;
    await wait(5000);

    console.log(data);

    switch (action) {
      case 'READ': {
        return [];
      }
      case 'CREATE': {
        return [];
      }
      case 'UPDATE': {
        return [];
      }
      default: {
        return [];
      }
    }
  },
});
