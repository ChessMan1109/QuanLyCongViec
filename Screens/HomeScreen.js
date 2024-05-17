//Components/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import Task from '../Components/Task.js';
import TaskModal from '../Components/TaskModal.js';
import WeatherInfo from '../Components/WeatherInfo.js';
import { TaskService } from '../Services/TaskService.js';
import { WeatherService } from '../Services/WeatherService.js';

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    taskName: '',
    taskDescription: '',
    taskTag: '',
    taskDate: null,
  });
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetchWeatherData();
    loadTasks();
  }, []);

  const handleChange = (key, value) => {
    setTask(prevTask => ({
      ...prevTask,
      [key]: value,
    }));
  };

  const addTask = () => {
    const { taskName, taskDescription, taskDate, taskTag } = task;
    if (!taskName || !taskDescription) {
      alert('Vui Lòng Điền Thông Tin Đầy Đủ');
      return;
    }

    Alert.alert('Thành công', 'Công việc đã được thêm vào');
    const newTask = {
      name: taskName,
      description: taskDescription,
      time: taskDate,
      tag: taskTag,
    };

    setTasks([...tasks, newTask]);
    TaskService.saveTasks([...tasks, newTask]);
    resetForm();
    toggleModal();
  };

  const deleteTask = index => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    TaskService.saveTasks(updatedTasks);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const resetForm = () => {
    setTask({
      taskName: '',
      taskDescription: '',
      taskTag: '',
      taskDate: null,
    });
  };

  const editTask = () => {
    const updatedTasks = [...tasks];
    updatedTasks[selectedTaskIndex] = {
      name: task.taskName,
      description: task.taskDescription,
      time: task.taskDate,
      tag: task.taskTag,
    };
    setTasks(updatedTasks);
    TaskService.saveTasks(updatedTasks);
    toggleModal();
    resetForm();
    setIsEditing(false);
  };

  const openEditModal = index => {
    setSelectedTaskIndex(index);
    setIsEditing(true);
    setTask({
      taskName: tasks[index].name,
      taskDescription: tasks[index].description,
      taskDate: tasks[index].time,
      taskTag: tasks[index].tag,
    });
    toggleModal();
  };

  const fetchWeatherData = async () => {
    try {
      const response = await WeatherService.getWeatherData();
      setWeather(response.data);
    } catch (error) {
      console.error('Lỗi khi tìm nạp dữ liệu thời tiết:', error);
    }
  };

  const loadTasks = async () => {
    try {
      const tasksFromStorage = await TaskService.loadTasks();
      if (tasksFromStorage) {
        setTasks(tasksFromStorage);
      }
    } catch (error) {
      console.error('Lỗi khi tải danh sách công việc:', error);
    }
  };

  return (
    <View style={styles.container}>
      <WeatherInfo weather={weather} />

      <View style={styles.taskContainer}>
        <Text style={styles.heading}>Quản Lý Công Việc</Text>

        <ScrollView style={{ flex: 1, width: '100%', marginTop: 10 }}>
          {tasks.map((task, index) => (
            <Task
              key={index}
              task={task}
              onDelete={() => deleteTask(index)}
              onEdit={() => openEditModal(index)}
            />
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.button} onPress={toggleModal}>
          <Text style={styles.buttonText}>Thêm Công Việc</Text>
        </TouchableOpacity>

        <TaskModal
          isVisible={isModalVisible}
          onClose={toggleModal}
          taskName={task.taskName}
          taskDescription={task.taskDescription}
          taskTag={task.taskTag}
          taskDate={task.taskDate}
          onChange={handleChange}
          onSubmit={isEditing ? editTask : addTask}
          isEditing={isEditing}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  taskContainer: {
    flex: 3,
    width: '100%',
  },
  heading: {
    fontSize: 24,
    marginBottom: 1,
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
