// app/(tabs)/cctv.tsx
import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { useColorScheme } from 'nativewind';
import MapView from 'react-native-maps'; // Will need to install this later
import '../../app/global.css';
import colors from '../../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function CctvLiveScreen() {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
  <SafeAreaView className={`flex-1 ${isDarkMode ? 'bg-darkBackground' : 'bg-white'}`}>
    
      {/* Map View Placeholder */}
      <View className="w-full h-60 bg-gray-200 dark:bg-gray-700 items-center justify-center">
        {/* You'll replace this with MapView component later */}
        <Text className="text-gray-600 dark:text-gray-400 text-lg">Map View Placeholder</Text>
        {/* Example of MapView, uncomment and install react-native-maps later */}
        {/*
        <MapView
          className="w-full h-full"
          initialRegion={{
            latitude: -7.291234,
            longitude: 112.791234,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        */}
      </View>

      <View className="p-4 flex-1">
        <Text className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Rekaman Live CCTV
        </Text>
        <Text className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Pantau rekaman live kamera CCTV secara realtime.
        </Text>

        {/* Location Details */}
        <View className="mb-4">
          <Text className={`text-base font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            PRU.QQL-2, Marga Enas, Tajinbali, kec. Sukolilo, Surabaya.
          </Text>
          <Text className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Lat: -7.29xxxx Long:112.xxxxxx
          </Text>
        </View>

        {/* CCTV Video Player Placeholder */}
        <View
          className="w-full bg-black items-center justify-center rounded-lg overflow-hidden"
          style={{ height: width * (9 / 16) }} // Maintain 16:9 aspect ratio
        >
          <Text className="text-white text-lg">CCTV Video Player Placeholder</Text>
          {/* This is where your RTSP video player will go */}
        </View>
      </View>
    
  </SafeAreaView>
  );
}