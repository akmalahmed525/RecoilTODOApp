import React, {FC} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParams} from '@src/configs';
import {ToDoForm} from './components/ToDoForm';

export type AddTodoPageProps = {} & NativeStackScreenProps<
  RootStackParams,
  'addTodos'
>;
export const AddTodoPage: FC<AddTodoPageProps> = ({route, navigation}) => (
  <SafeAreaView style={styles.container}>
    <ToDoForm route={route} navigation={navigation} />
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
