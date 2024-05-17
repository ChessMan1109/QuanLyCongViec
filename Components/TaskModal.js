import React, { useState } from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';

const ImportanceModal = ({ isVisible, onClose, onSelect }) => (
  <Modal visible={isVisible} animationType="slide" transparent={true} onRequestClose={onClose}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        {['Thấp', 'Vừa', 'Cao'].map(level => (
          <TouchableOpacity key={level} style={styles.importanceButton} onPress={() => onSelect(level)}>
            <Text style={styles.importanceButtonText}>{level}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  </Modal>
);

const TaskModal = ({ isVisible, onClose, taskName, taskDescription, taskTag, onChange, onSubmit, isEditing }) => {
  const [isImportanceModalVisible, setIsImportanceModalVisible] = useState(false);
  const [selectedImportance, setSelectedImportance] = useState(taskTag);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const handleImportanceChange = (importance) => {
    setSelectedImportance(importance);
    setIsImportanceModalVisible(false);
  };
  const handleDateChange = (event, date) => {
    if (date) {
      setSelectedDate(date);
      onChange('taskeTime', date);
    }
    setIsDatePickerVisible(false);
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
            onChangeText={text => onChange('taskName', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Nội Dung Công Việc"
            value={taskDescription}
            onChangeText={text => onChange('taskDescription', text)}
          />
          <TouchableOpacity style={styles.input} onPress={() => setIsDatePickerVisible(true)}>
            <Text>Thời Gian</Text>
            <Text>{selectedDate ? selectedDate.toLocaleString() : 'Chọn thời gian'}</Text>
          </TouchableOpacity>
          {isDatePickerVisible && (
            <DatePicker
              value={selectedDate || new Date()}
              mode="datetime"
              display="default"
              onChange={handleDateChange}
            />
          )}
          <TouchableOpacity style={styles.input} onPress={() => setIsImportanceModalVisible(true)}>
            <Text>Mức Độ Quan Trọng</Text>
            <Text>{selectedImportance}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>{isEditing ? 'Cập Nhật' : 'Thêm Mới'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ImportanceModal 
        isVisible={isImportanceModalVisible} 
        onClose={() => setIsImportanceModalVisible(false)} 
        onSelect={handleImportanceChange} 
      />
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
    padding: 30,
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
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
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
    backgroundColor: '#ddd',
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
