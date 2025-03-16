
import { useState, useContext } from 'react';
import { UserWrapper } from '@/store/types';
import { ThemedView } from '@/components/ThemedView';
import requests from '@/services/requests';
import styles from '@/assets/css/styles';
import { AuthContext } from '@/hooks/useAuthContext';

import { View, Pressable, Text } from 'react-native';

import { Modal, TextInput, Button } from 'react-native';



export default function LoginComponent() {

  const authContext = useContext(AuthContext)
  const [password, setPassword] = useState('');
  const [loginText, setLoginText] = useState('');
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);



  function openModal() {
    setModalVisible(true)
    setLoginText('')
  }

  function login() {
    console.log(email)
    requests.post('/users/login', { 'user': { 'email': email, 'password': password } }, (err: Body, resp: Body) => {
      if (err) {
        setLoginText('Incorrect email or password')
      } else {
        setLoginText('Successfully signed in')
        let userWrapper: UserWrapper = JSON.parse(JSON.stringify(resp.body))
        authContext?.setAuthUser(userWrapper.user)
      }
    },
      null
    )
  }

  return (
    <ThemedView>
      <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 70 }}>{authContext?.authUser != undefined ? 'Signed in as: ' + authContext.authUser.username : ''}</Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalView}>
              <Text>{loginText}</Text>
            </View>
            <TextInput
              style={styles.input}
              onChangeText={newText => setEmail(newText)}
              placeholder="email"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              placeholder="password"
              secureTextEntry={true}
            />

            <Button title='Login' onPress={login} />
            <Pressable
              style={[styles.button]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>

          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button]}
        onPress={() => openModal()}>
        <Text style={styles.textStyle}>{authContext?.authUser == undefined ? 'Log in' : 'Log out'}</Text>
      </Pressable>
    </ThemedView>
  );

}
