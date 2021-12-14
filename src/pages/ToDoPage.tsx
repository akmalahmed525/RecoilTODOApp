import React, {FC} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export type TodoPageProps = {};
export const TodoPage: FC<TodoPageProps> = () => (
  <SafeAreaView style={styles.container} />
);

type TodoPageStyles = {
  container: ViewStyle;
};
const styles = StyleSheet.create<TodoPageStyles>({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

export const todos = 'todos';
