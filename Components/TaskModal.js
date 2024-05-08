import React, { useState } from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';

const TaskModal = ({ isVisible, onClose, taskName, taskDescription, taskTime, taskTag, onChange, onSubmit, isEditing }) => {
  const [isImportanceModalVisible, setIsImportanceModalVisible] = useState(false);
  const [selectedImportance, setSelectedImportance] = useState(taskTag);


  const toggleImportanceModal = () => {
    setIsImportanceModalVisible(!isImportanceModalVisible);
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.input}
            placeholder="Tên Công Việc"
            value={taskName}
            onChangeText={text => onChange('Tên Công Việc', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Nội Dung Công Việc"
            value={taskDescription}
            onChangeText={text => onChange('Nội Dung Công Việc', text)}
          />    

          <TouchableOpacity style={styles.input} onPress={toggleImportanceModal}>
            <Text>Mức Độ Quan Trọng: {selectedImportance}</Text>
          </TouchableOpacity>

          <Modal visible={isImportanceModalVisible} animationType="slide" transparent={true} onRequestClose={toggleImportanceModal}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity style={styles.importanceButton} onPress={() => {
                  setSelectedImportance('Cao');
                  toggleImportanceModal();
                }}>
                  <Text style={styles.importanceButtonText}>Cao</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.importanceButton} onPress={() => {
                  setSelectedImportance('Vừa');
                  toggleImportanceModal();
                }}>
                  <Text style={styles.importanceButtonText}>Vừa</Text>     
                </TouchableOpacity>
                <TouchableOpacity style={styles.importanceButton} onPress={() => {
                  setSelectedImportance('Thấp');
                  toggleImportanceModal();
                }}>
                  <Text style={styles.importanceButtonText}>Thấp</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>{isEditing ? 'Cập Nhật' : 'Thêm Công Việc'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 20,
    width: '80%',
    maxHeight: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 35,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },

  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  importanceButton: {
    backgroundColor: 'yellow',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  importanceButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TaskModal;
