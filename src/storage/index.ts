import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (id: string, value: string) => {
  try {
    await AsyncStorage.setItem(id, value);
  } catch (e) {
    throw e;
  }
};

export const getAllData = async () => {
  try {
    let entries = [];
    const keys = await AsyncStorage.getAllKeys();
    const values = await AsyncStorage.multiGet(keys);
    for (let i = 0; i < values.length; i++) {
      const [key, stringValue] = values[i];

      const data = {...JSON.parse(stringValue ? stringValue : '{}'), _id: key};
      entries.push(data);
    }
    return entries;
  } catch (e) {
    throw e;
  }
};

export const deleteData = async (id: string) => {
  try {
    await AsyncStorage.removeItem(id);
  } catch (e) {
    throw e;
  }
};

export const updateData = async (id: string, value: string) => {
  try {
    await AsyncStorage.mergeItem(id, value);
  } catch (e) {
    throw e;
  }
};
