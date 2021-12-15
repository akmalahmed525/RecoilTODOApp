import React, {FC, Suspense} from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  TextInput,
  TextStyle,
  Pressable,
  Text,
  useWindowDimensions,
} from 'react-native';
import {useSetRecoilState} from 'recoil';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {ErrorBoundary} from 'react-error-boundary';
import LottieView from 'lottie-react-native';

import {scaleHeight, scaleWidth} from '@src/utils';
import {todoAction} from '@src/state';

const todoSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, '* Title is too short')
    .max(50, 'Title length is too long')
    .required('* Title is required'),
  description: Yup.string().optional(),
});

export type ToDoFormProps = {};
const _ToDoForm: FC<ToDoFormProps> = () => {
  const actionState = useSetRecoilState(todoAction);

  return (
    <>
      <Formik
        initialValues={{title: '', description: ''}}
        validationSchema={todoSchema}
        onSubmit={values => {
          actionState({
            action: 'CREATE',
            data: {title: values.title, description: values.description},
          });
        }}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <>
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                placeholder="Title"
                value={values.title}
                style={styles.inputStyle}
              />
              {errors.title && (
                <Text style={styles.errorText}>{errors.title}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                placeholder="Description (Optional)"
                value={values.description}
                style={[styles.inputStyle, styles.inputStyleText]}
                multiline
                numberOfLines={15}
              />
            </View>

            <Pressable style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Save TODO</Text>
            </Pressable>
          </>
        )}
      </Formik>
    </>
  );
};

const loadingAnimation = require('../../components/lottie/lf30_editor_raxsgauq.json');
const errorAnimation = require('../../components/lottie/38213-error.json');

export const ToDoForm: FC<ToDoFormProps> = ({...props}) => {
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
            Failed to load the form
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
              Processing TODO record
            </Text>
          </View>
        }>
        <_ToDoForm {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};

type AddTodoPageStyles = {
  container: ViewStyle;
  inputStyle: TextStyle;
  inputContainer: ViewStyle;
  inputStyleText: TextStyle;
  submitButton: ViewStyle;
  submitButtonText: TextStyle;
  errorText: TextStyle;
  infoText: TextStyle;
};
const styles = StyleSheet.create<AddTodoPageStyles>({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  inputStyle: {
    fontFamily: 'Poppins-Regular',
    color: '#000000',
  },
  inputStyleText: {
    textAlignVertical: 'top',
  },
  inputContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#808080',
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  submitButton: {
    backgroundColor: '#808080',
    marginHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  errorText: {
    color: '#FF0000',
    fontFamily: 'Poppins-Regular',
  },
  infoText: {
    fontFamily: 'Poppins-Regular',
    color: '#000000',
  },
});
