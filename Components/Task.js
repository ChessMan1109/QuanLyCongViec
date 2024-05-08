//Components/Task.js
import React from 'react';
import {  Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Task = ({ task, onDelete, onEdit }) => {
  console.log("Task:", task); 
  
  if (!task) {
    return null; 
  }
  const handleDelete = () => {
    Alert.alert(
      'Xác Nhận Xóa',
      'Bạn có chắc chắn muốn xóa không?',
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
    <TouchableOpacity style={styles.task} >
      <Text style={styles.taskText}>{task.name}</Text>
      <Text style={styles.taskText}>{task.time}</Text>
      <TouchableOpacity onPress={onEdit}>
        <Text style={styles.editButton}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDelete}>
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
  editButton: {
    color: 'green',
  },
});

export default Task;
