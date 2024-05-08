  //Components/WeatherInfo.js
  import React from 'react';
  import { View, Text, StyleSheet } from 'react-native';

  const WeatherInfo = ({ weather }) => {
    return (
      <View style={styles.weatherContainer}>
        <Text style={styles.weatherText}>Thời Tiết Hôm Nay </Text>
        {weather && (
          <View>
            <Text style={styles.weatherText}>Thời Tiết: {weather.weather[0].description}</Text>
            <Text style={styles.weatherText}>Nhiệt Độ: {weather.main.temp} °C</Text>
          </View>
        )}
      </View>
    );
  };

  const styles = StyleSheet.create({
    weatherContainer: {
      flex: 0.3,
      marginTop: 20,
      padding: 10,
      backgroundColor: '#c1e1ff',
      borderRadius: 5,
    },
    weatherText: {
      fontSize: 16,
      marginBottom: 8,
      fontWeight: 'bold',
    },
  });

  export default WeatherInfo;
