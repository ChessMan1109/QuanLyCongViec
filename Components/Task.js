//Components/Task.js
import React from 'react';
import {  Text, TouchableOpacity, StyleSheet, Alert, View } from 'react-native';

const Task = ({ task, onDelete, onEdit }) => {
  console.log("Task:", task); 
  
  if (!task) {
    return null; 
  }
  const handleDelete = () => {
    Alert.alert(
      'Xác Nhận Xóa',
      'Bạn muốn xóa công việc này không?',
      [
        {
          text: 'Không',
          style: 'Không',
        },
        {
          text: 'Xóa',
          onPress: () => onDelete(task.id), 
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };''

  return (
    <TouchableOpacity style={styles.task}>
      <View style={styles.taskDetails}>
        <Text style={styles.taskText}>{task.name}</Text>
        <Text style={styles.taskText}>{task.time}</Text>
        <Text style={styles.taskText}>{task.tag}</Text>
      </View>
      <TouchableOpacity onPress={onEdit} style={styles.buttonContainer}>
        <Text style={styles.editButton}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDelete} style={styles.buttonContainer}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    borderColor: 'black',
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
  editButton: {
    color: 'green',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 30, 
  },
  taskDetails: {
    flex: 0.8, 
  },
});

export default Task;
