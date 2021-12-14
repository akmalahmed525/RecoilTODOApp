import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {todos, TodoPage, addTodos, AddTodoPage} from '@src/pages';

export type RootStackParams = {
  todos: undefined;
  addTodos: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParams>();

export const AppRoot: FC<{}> = () => (
  <RootStack.Navigator initialRouteName={todos}>
    <RootStack.Screen name={todos} component={TodoPage} />
    <RootStack.Screen name={addTodos} component={AddTodoPage} />
  </RootStack.Navigator>
);
