import React, {FC} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export type AddTodoPageProps = {};
export const AddTodoPage: FC<AddTodoPageProps> = () => (
  <SafeAreaView style={styles.container} />
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
