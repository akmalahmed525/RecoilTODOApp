import React, {FC} from 'react';
import {useWindowDimensions} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {scaleHeight, scaleWidth} from '@src/utils';
import {todos, TodoPage, addTodos, AddTodoPage} from '@src/pages';
import {AppBarIcon} from '@src/components';
import {plus, leftArrow} from '@src/components/svgs';

export type RootStackParams = {
  todos: undefined;
  addTodos: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParams>();

export const AppRoot: FC<{}> = () => {
  const {height, width} = useWindowDimensions();

  const vh = scaleHeight(height);
  const hw = scaleWidth(width);

  const headerTitleStyle = {
    fontSize: vh(17),
    color: '#000000',
    fontFamily: 'Poppins-Regular',
  };

  const headerStyle = {
    shadowColor: '#000000',
    backgroundColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  };

  return (
    <RootStack.Navigator
      initialRouteName={todos}
      screenOptions={() => ({
        headerStyle,
        headerTitleStyle,
      })}>
      <RootStack.Screen
        name={todos}
        component={TodoPage}
        options={({navigation}) => ({
          title: 'TODOs 🖊️',
          headerRight: () => (
            <AppBarIcon
              xml={plus}
              onPress={() => navigation.navigate('addTodos')}
            />
          ),
        })}
      />
      <RootStack.Screen
        name={addTodos}
        component={AddTodoPage}
        options={({navigation}) => ({
          title: 'New TODO 🎉',
          headerLeft: () => (
            <AppBarIcon
              xml={leftArrow}
              onPress={() => navigation.navigate('todos')}
              iconStyle={{marginRight: hw(15)}}
            />
          ),
        })}
      />
    </RootStack.Navigator>
  );
};
