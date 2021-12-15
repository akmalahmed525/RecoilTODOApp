import React, {FC} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParams} from '@src/configs';
import {ToDoList} from './components/ToDoList';

export type TodoPageProps = {} & NativeStackScreenProps<
  RootStackParams,
  'todos'
>;
export const TodoPage: FC<TodoPageProps> = ({route, navigation}) => (
  <SafeAreaView style={styles.container}>
    <ToDoList navigation={navigation} route={route} />
  </SafeAreaView>
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
