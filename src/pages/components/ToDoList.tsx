import React, {FC, Suspense, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ViewStyle,
  useWindowDimensions,
  TextStyle,
  Pressable,
  Alert,
  Vibration,
} from 'react-native';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {ErrorBoundary} from 'react-error-boundary';
import LottieView from 'lottie-react-native';
import {FlatList} from 'react-native-gesture-handler';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import moment from 'moment';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withRepeat,
  cancelAnimation,
} from 'react-native-reanimated';

import {todoFilter, todoAction} from '@src/state';
import {scaleHeight, scaleWidth} from '@src/utils';
import type {RootStackParams} from '@src/configs';

export type ToDoListProps = {} & NativeStackScreenProps<
  RootStackParams,
  'todos'
>;

const emptyAnimation = require('../../components/lottie/51382-astronaut-light-theme.json');
const loadingAnimation = require('../../components/lottie/lf30_editor_2bcya7fr.json');
const errorAnimation = require('../../components/lottie/38213-error.json');

const _TodoList: FC<ToDoListProps> = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const vh = scaleHeight(height);
  const hw = scaleWidth(width);

  const [pressedItem, setPressedItem] = useState<number>(0);
  const actionState = useSetRecoilState(todoAction);
  const todoData = useRecoilValue(todoFilter);

  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateZ: `${rotation.value}deg`}],
    };
  });
  return (
    <FlatList
      data={todoData}
      keyExtractor={(_, index) => String(index)}
      contentContainerStyle={[
        !todoData.length
          ? styles.listContentEmpty
          : {
              ...styles.listContent,
              paddingVertical: vh(15),
              paddingHorizontal: hw(10),
            },
      ]}
      ItemSeparatorComponent={() => <View style={styles.listItemSeparator} />}
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
      renderItem={({item, index}) => (
        <Animated.View style={pressedItem === index ? animatedStyle : {}}>
          <Pressable
            onPressIn={() => {
              setPressedItem(index);
            }}
            onPress={() => {
              navigation.navigate('addTodos', {...item});
            }}
            onLongPress={() => {
              Vibration.vibrate(100);
              rotation.value = withSequence(
                withTiming(-2, {duration: 50}),
                withRepeat(withTiming(5, {duration: 100}), 6, true),
                withTiming(0, {duration: 50}),
              );
              Alert.alert(
                'Delete',
                `Do you want to delete the record ${item._id}?`,
                [
                  {
                    text: 'Cancel',
                    onPress: () => {
                      cancelAnimation(rotation);
                    },
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      actionState({
                        action: 'DELETE',
                        data: {
                          ...item,
                        },
                      });
                    },
                  },
                ],
              );
            }}
            style={styles.listItem}>
            <Text style={[styles.listItemTimeStamp, {fontSize: vh(12)}]}>
              {moment(item.updatedAt * 1000).format('MM ddd, YYYY HH:mm:ss a')}
            </Text>
            <View style={styles.underline} />
            <Text style={[styles.listItemTitle, {fontSize: vh(20)}]}>
              {item.title}
            </Text>
            <Text style={[styles.listItemSubtitle, {fontSize: vh(15)}]}>
              {item.description}
            </Text>
          </Pressable>
        </Animated.View>
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
  listItemTimeStamp: TextStyle;
  listItemTitle: TextStyle;
  listItemSubtitle: TextStyle;
  listItemSeparator: ViewStyle;
  underline: ViewStyle;
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
  listItemSeparator: {
    height: 8,
  },
  listItemTimeStamp: {
    fontFamily: 'Poppins-Regular',
    color: '#000000',
  },
  underline: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#0A0A0A',
    marginVertical: 5,
  },
});
