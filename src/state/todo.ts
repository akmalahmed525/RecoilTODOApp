import {atom, selector} from 'recoil';
import uuid from 'react-native-uuid';

import {storeData, getAllData, updateData, deleteData} from '@src/storage';

export type AppToDo = {
  _id?: string;
  title: string;
  description?: string;
  updatedAt: number;
};

export type AppToDos = Array<AppToDo>;

export type ToDoAction = {
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'READ';
  data: AppToDo | null;
};

export const todoAction = atom<ToDoAction>({
  key: 'todo-action',
  default: {
    action: 'READ',
    data: null,
  },
});

// const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const todoFilter = selector<AppToDos>({
  key: 'todo-filter',
  get: async ({get}) => {
    const todoActionData = get(todoAction);
    const {action, data} = todoActionData;

    switch (action) {
      case 'READ': {
        const storedData = await getAllData();
        return storedData;
      }
      case 'CREATE': {
        const _id = uuid.v4();
        await storeData(_id as string, JSON.stringify(data));
        const storedData = await getAllData();
        return storedData;
      }
      case 'UPDATE': {
        const {_id, title, description, updatedAt} = data as AppToDo;
        const uid = uuid.v4();
        await updateData(
          _id ? _id : (uid as string),
          JSON.stringify({title, description, updatedAt}),
        );
        const storedData = await getAllData();
        return storedData;
      }
      default: {
        const {_id} = data as AppToDo;
        await deleteData(_id ? _id : '');
        const storedData = await getAllData();
        return storedData;
      }
    }
  },
});
