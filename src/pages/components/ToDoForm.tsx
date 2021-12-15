import React, {FC} from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  TextInput,
  TextStyle,
  Pressable,
  Text,
} from 'react-native';
import * as Yup from 'yup';
import {useSetRecoilState} from 'recoil';
import {Formik} from 'formik';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import moment from 'moment';

import {todoAction} from '@src/state';
import {RootStackParams} from '@src/configs';

const todoSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, '* Title is too short')
    .max(50, 'Title length is too long')
    .required('* Title is required'),
  description: Yup.string().optional(),
});

export type ToDoFormProps = {} & NativeStackScreenProps<
  RootStackParams,
  'addTodos'
>;
export const ToDoForm: FC<ToDoFormProps> = ({route, navigation}) => {
  const actionState = useSetRecoilState(todoAction);

  const initialData = route.params
    ? route.params
    : {title: '', description: ''};

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialData}
        validationSchema={todoSchema}
        onSubmit={values => {
          const action = route.params ? 'UPDATE' : 'CREATE';
          const data = route.params
            ? {
                ...route.params,
                ...values,
                updatedAt: moment().unix(),
              }
            : {
                title: values.title,
                description: values.description,
                updatedAt: moment().unix(),
              };
          actionState({
            action,
            data,
          });
          navigation.goBack();
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
              <Text style={styles.submitButtonText}>
                {route.params ? 'Update TODO 💾' : 'Save TODO 💾'}
              </Text>
            </Pressable>
          </>
        )}
      </Formik>
    </>
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
    backgroundColor: '#0A0A0A',
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
});
