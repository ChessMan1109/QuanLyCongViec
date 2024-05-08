//Services/TaskService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TaskService = {
  saveTasks: async (tasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      throw new Error('Lỗi khi lưu danh sách công việc:', error);
    }
  },
  loadTasks: async () => {
    try {
      const tasksFromStorage = await AsyncStorage.getItem('tasks');
      if (tasksFromStorage) {
        return JSON.parse(tasksFromStorage);
      }
      return null;
    } catch (error) {
      throw new Error('Lỗi khi tải danh sách công việc:', error);
    }
  },
};
