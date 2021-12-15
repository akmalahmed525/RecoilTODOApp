import React, {FC, Suspense} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ViewStyle,
  useWindowDimensions,
  TextStyle,
} from 'react-native';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {ErrorBoundary} from 'react-error-boundary';
import LottieView from 'lottie-react-native';
import {FlatList} from 'react-native-gesture-handler';

import {todoFilter, todoAction} from '@src/state';
import {scaleHeight, scaleWidth} from '@src/utils';

export type ToDoListProps = {};

const emptyAnimation = require('../../components/lottie/51382-astronaut-light-theme.json');
const loadingAnimation = require('../../components/lottie/lf30_editor_2bcya7fr.json');
const errorAnimation = require('../../components/lottie/38213-error.json');

const _TodoList: FC<ToDoListProps> = () => {
  const {height, width} = useWindowDimensions();
  const vh = scaleHeight(height);
  const hw = scaleWidth(width);

  const actionState = useSetRecoilState(todoAction);
  const todoData = useRecoilValue(todoFilter);

  return (
    <FlatList
      data={todoData}
      keyExtractor={(_, index) => String(index)}
      contentContainerStyle={[
        !todoData.length
          ? styles.listContentEmpty
          : {
              ...styles.listContent,
              paddingTop: vh(15),
              paddingHorizontal: hw(5),
            },
      ]}
      ListEmptyComponent={
        <View style={styles.container}>
          <LottieView
            source={emptyAnimation}
            autoPlay
            resizeMode="cover"
            style={{width: hw(300)}}
          />
          <View style={[styles.listInfoSpacing, {height: vh(60)}]} />
          <Text style={[styles.infoText, {fontSize: vh(20)}]}>
            TODO Records Empty
          </Text>
        </View>
      }
      renderItem={({item}) => (
        <View style={styles.listItem}>
          <Text style={[styles.listItemTitle, {fontSize: vh(20)}]}>
            {item.title}
          </Text>
          <Text style={[styles.listItemSubtitle, {fontSize: vh(12)}]}>
            {item.description}
          </Text>
        </View>
      )}
    />
  );
};

export const ToDoList: FC<ToDoListProps> = ({...props}) => {
  const {height, width} = useWindowDimensions();
  const vh = scaleHeight(height);
  const hw = scaleWidth(width);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <View style={styles.container}>
          <LottieView
            source={errorAnimation}
            autoPlay
            resizeMode="cover"
            style={{width: hw(300)}}
          />
          <Text style={[styles.infoText, {fontSize: vh(20)}]}>
            Failed to fetch TODO records
          </Text>
        </View>
      )}>
      <Suspense
        fallback={
          <View style={styles.container}>
            <LottieView
              source={loadingAnimation}
              autoPlay
              resizeMode="cover"
              style={{width: hw(300)}}
            />
            <Text style={[styles.infoText, {fontSize: vh(20)}]}>
              Fetching TODO records
            </Text>
          </View>
        }>
        <_TodoList {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};

type ToDoListStyles = {
  container: ViewStyle;
  listContentEmpty: ViewStyle;
  listContent: ViewStyle;
  infoText: TextStyle;
  listInfoSpacing: ViewStyle;
  listItem: ViewStyle;
  listItemTitle: TextStyle;
  listItemSubtitle: TextStyle;
};
const styles = StyleSheet.create<ToDoListStyles>({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContentEmpty: {flexGrow: 1},
  listContent: {
    flexGrow: 1,
  },
  infoText: {
    fontFamily: 'Poppins-Regular',
    color: '#000000',
  },
  listInfoSpacing: {},
  listItem: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  listItemTitle: {
    fontFamily: 'Poppins-Regular',
    color: '#000000',
  },
  listItemSubtitle: {
    fontFamily: 'Poppins-Regular',
    color: '#808080',
  },
});
