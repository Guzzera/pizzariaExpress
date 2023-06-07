import { StatusBar, StyleSheet, Text, View } from 'react-native';
import SignIn from './src/pages/SignIn';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { AuthProvider } from './src/contexts/AuthContext';


export default function App() {
  return (
    <NavigationContainer>
     <AuthProvider>
      <StatusBar backgroundColor='#FCDEBE' barStyle='dark-content' translucent={false}/>
      <Routes/>
     </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
