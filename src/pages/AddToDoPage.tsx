import React, {FC} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ToDoForm} from './components/ToDoForm';

export type AddTodoPageProps = {};
export const AddTodoPage: FC<AddTodoPageProps> = () => (
  <SafeAreaView style={styles.container}>
    <ToDoForm />
  </SafeAreaView>
);

type AddTodoPageStyles = {
  container: ViewStyle;
};
const styles = StyleSheet.create<AddTodoPageStyles>({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

export const addTodos = 'addTodos';
