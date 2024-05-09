import React, { useState } from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';

const TaskModal = ({ isVisible, onClose, taskName, taskDescription, taskTime, taskTag, onChange, onSubmit, isEditing }) => {
  const [isImportanceModalVisible, setIsImportanceModalVisible] = useState(false);
  const [selectedImportance, setSelectedImportance] = useState(taskTag); // Lưu trữ mức độ quan trọng hiện tại

  const toggleImportanceModal = () => {
    setIsImportanceModalVisible(!isImportanceModalVisible);
  };

  const handleImportanceChange = (importance) => {
    setSelectedImportance(importance); // Cập nhật mức độ quan trọng mới
    toggleImportanceModal();
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{isEditing ? 'Cập Nhật Công Việc' : 'Thêm Công Việc'}</Text>
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
            <Text style={styles.importanceText}>Mức Độ Quan Trọng</Text>
            <Text style={styles.importanceLevel}>{selectedImportance}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>{isEditing ? 'Cập Nhật' : 'Thêm Mới'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={isImportanceModalVisible} animationType="slide" transparent={true} onRequestClose={toggleImportanceModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.importanceButton} onPress={() => handleImportanceChange('Thấp')}>
              <Text style={styles.importanceButtonText}>Thấp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.importanceButton} onPress={() => handleImportanceChange('Vừa')}>
              <Text style={styles.importanceButtonText}>Vừa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.importanceButton} onPress={() => handleImportanceChange('Cao')}>
              <Text style={styles.importanceButtonText}>Cao</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    padding: 35,
    borderRadius: 20,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    backgroundColor: 'grey',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  importanceButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  importanceText: {
    fontSize: 16,
  },
  importanceLevel: {
    fontSize: 16,
  },
});

export default TaskModal;
