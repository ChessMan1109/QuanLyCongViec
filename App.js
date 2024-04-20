import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Modal, AsyncStorage } from 'react-native';
import axios from 'axios';


const API_KEY = '7d40e471578637e632120513b54533fd'; // Thay YOUR_API_KEY bằng API key của bạn
const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&q=Hanoi`;

const App = () => {
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
    if (!taskName || !taskDescription || !taskTime || !taskTag) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    const newTask = {
      name: taskName,
      description: taskDescription,
      time: taskTime,
      tag: taskTag,
    };

    setTasks([...tasks, newTask]);
    resetForm();
  };

  const deleteTask = index => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
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
      tag: taskTag,
    };
    setTasks(updatedTasks);
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
    setTaskTag(tasks[index].tag);
    toggleModal();
  };
  
  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(API_URL);
      setWeather(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu thời tiết:', error);
    }
  };

  // Lưu danh sách công việc vào bộ nhớ thiết bị
  const saveTasksToStorage = async (tasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Lỗi khi lưu danh sách công việc:', error);
    }
  };

  // Tải danh sách công việc từ bộ nhớ thiết bị
  const loadTasks = async () => {
    try {
      const tasksFromStorage = await AsyncStorage.getItem('tasks');
      if (tasksFromStorage) {
        const parsedTasks = JSON.parse(tasksFromStorage);
        if (Array.isArray(parsedTasks)) {
          setTasks(parsedTasks);
        } else {
          console.error('Dữ liệu không phải là một mảng.');
        }
      } else {
        console.log('Không có dữ liệu được lưu trữ.');
      }
    } catch (error) {
      console.error('Lỗi khi tải danh sách công việc:', error);
    }
  };

  return (
    <View style={styles.container}>
      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>Thời Tiết: {weather.weather[0].description}</Text>
          <Text style={styles.weatherText}>Nhiệt Độ: {weather.main.temp} °C</Text>
        </View>
      )}

      <View style={styles.taskContainer}>
        <Text style={styles.heading}>Quản Lý Công Việc</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Tên Công Việc"
            value={taskName}
            onChangeText={text => setTaskName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Nội Dung Công Việc"
            value={taskDescription}
            onChangeText={text => setTaskDescription(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Thời Gian (YYYY-MM-DD)"
            value={taskTime}
            onChangeText={text => setTaskTime(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Mức Độ Quan Trọng"
            value={taskTag}
            onChangeText={text => setTaskTag(text)}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={isEditing ? editTask : addTask}>
          <Text style={styles.buttonText}>{isEditing ? 'Cập Nhật' : 'Thêm Công Việc'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => setTasks([...tasks.sort((a, b) => new Date(a.time) - new Date(b.time))])}>
          <Text style={styles.buttonText}>Sắp Xếp Theo Thời Gian</Text>
        </TouchableOpacity>

        <ScrollView style={{ flex: 1, width: '100%', marginTop: 10 }}>
          {tasks.map((task, index) => (
            <TouchableOpacity key={index} style={styles.task} onPress={() => openEditModal(index)}>
              <Text style={styles.taskText}>{task.name}</Text>
              <Text style={styles.taskText}>{task.time}</Text>
              <TouchableOpacity onPress={() => deleteTask(index)}>
                <Text style={styles.deleteButton}>Xóa</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={toggleModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.input}
                placeholder="Tên Công Việc"
                value={taskName}
                onChangeText={text => setTaskName(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Nội Dung Công Việc"
                value={taskDescription}
                onChangeText={text => setTaskDescription(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Thời Gian (YYYY-MM-DD)"
                value={taskTime}
                onChangeText={text => setTaskTime(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Mức Độ Quan Trọng"
                value={taskTag}
                onChangeText={text => setTaskTag(text)}
              />
              <TouchableOpacity style={styles.button} onPress={isEditing ? editTask : addTask}>
                <Text style={styles.buttonText}>{isEditing ? 'Cập Nhật' : 'Thêm Công Việc'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                <Text style={styles.closeButtonText}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  taskContainer: {
    flex: 3,
    width: '100%',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
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
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  taskText: {
    fontSize: 16,
  },
  deleteButton: {
    color: 'red',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  closeButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  weatherContainer: {
    flex: 0.15,
    marginTop: 20,
    padding: 10,
    backgroundColor: '#c1e1ff',
    borderRadius: 5,
  },
  weatherText: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
});

export default App;
