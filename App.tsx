import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Provider } from 'react-redux';
import LoginScreen from './screens/Login';
import { UserDetailsScreen } from './screens/UserDetails';
import UserListScreen from './screens/Users';
import store from './store/store';

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
            options={{ title: 'Git Users' }}
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
