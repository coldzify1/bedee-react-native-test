import AppContainer from "@/components/AppContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
// import {AsyncStorage} from 'react-native';

export default function EnterNameScreen() {
  const [name, setName] = useState("");
  const router = useRouter()

  const onSubmit = async () => {
    
    try{
      await AsyncStorage.setItem('_name',name)
      router.push('/question')
    }
    catch(err){
      console.log(err)
    }

  }
  return (
    <AppContainer>
      <TextInput
        label="Name"
        placeholder="Enter your name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <Button style={styles.button} mode="contained" onPress={onSubmit} disabled={!name} >Start</Button>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  button : {
    marginVertical : 16
  }
});
