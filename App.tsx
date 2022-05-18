import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Provider } from 'react-redux';
import LoginScreen from './screens/Login';
import { UserDetailsScreen } from './screens/UserDetails';
import UserListScreen from './screens/Users';
import store from './store/store';
import { Pressable, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from './types/NavigationStackParams';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>

          <Stack.Screen
            name='Login'
            component={LoginScreen}
            options={{ headerShown: false }} />
          <Stack.Screen
            name='UserList'
            component={UserListScreen}
            options={({ navigation }: { navigation: NativeStackNavigationProp<RootStackParamList, 'Login'> }) => ({
              title: 'Git Users', headerRight: () => {
                return <Pressable onPress={() => {
                  AsyncStorage.clear();
                  navigation.replace('Login')
                }}>
                  <Text>Logout</Text>
                </Pressable>;
              }
            })}
          />
          <Stack.Screen
            name='UserDetails'
            component={UserDetailsScreen}
            options={{ title: 'User Details' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
