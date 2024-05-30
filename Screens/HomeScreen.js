//Components/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import Task from '../Components/Task.js'; 
import TaskModal from '../Components/TaskModal.js'; 
import WeatherInfo from '../Components/WeatherInfo.js'; 
import { TaskService } from '../Services/TaskService.js'; 
import  { WeatherService } from '../Services/WeatherService.js'; 

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]); 
  const [taskName, setTaskName] = useState(''); 
  const [taskDescription, setTaskDescription] = useState(''); 
  const [taskTime, setTaskTime] = useState(''); 
  const [taskTag, setTaskTag] = useState(''); 
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null); 
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [isEditing, setIsEditing] = useState(false); 
  const [weather, setWeather] = useState(null); 

  useEffect(() => {
    fetchWeatherData(); 
    loadTasks(); 
  }, []);

  const addTask = () => {
    if (!taskName || !taskDescription) {
      alert('Vui Lòng Điền Thông Tin Đầy Đủ');
      return;
    }
   
   
    Alert.alert('Thành công', 'Công việc đã được thêm vào');  
  const newTask = {
      name: taskName,
      description: taskDescription,
      time: taskTime,
      tag: taskTag,
    };  

 console.log(newTask);

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
    resetForm();
  };

  const resetForm = () => { 
    setTaskName('');
    setTaskDescription('');
    setTaskTime('');
    setTaskTag('');
  };

  const editTask = () => {
    const updatedTasks = [...tasks];
    updatedTasks[selectedTaskIndex] = {
      name: taskName,
      description: taskDescription,
      time: taskTime,
    };
    setTasks(updatedTasks); 
    TaskService.saveTasks(updatedTasks); 
    toggleModal(); 
    resetForm(); 
    setIsEditing(false); 
  };

  const openEditModal = (index) => {
    setSelectedTaskIndex(index);
    setIsEditing(true);
    setTaskName(tasks[index].name);
    setTaskDescription(tasks[index].description);
    setTaskTime(tasks[index].time);
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
            <Task key={index} task={task} onDelete={() => deleteTask(index)} onEdit={() => openEditModal(index)} />
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.button} onPress={toggleModal}>
          <Text style={styles.buttonText}>Thêm Công Việc</Text>
        </TouchableOpacity>
        

        <TaskModal
          isVisible={isModalVisible}
          onClose={toggleModal}
          taskName={taskName}
          taskDescription={taskDescription}
          taskTime={taskTime}
          taskTag={taskTag}
          onChange={(name, value) => {
            if (name === 'Tên Công Việc') setTaskName(value);
            else if (name === 'Nội Dung Công Việc') setTaskDescription(value);
            else if (name === 'Thời Gian Công Việc') setTaskTime(value);
            else if (name === 'Mức Độ Quan Trọng') setTaskTag(value);
          }}
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
