// import Button from '@/components/Button';
import AppContainer from '@/components/AppContainer';
import { Link, useRouter } from 'expo-router';
import { Image, StyleSheet, Platform, View } from 'react-native';

import { Appbar, Button, Text } from 'react-native-paper';
export default function HomeScreen() {
    const router = useRouter()
    return (
        <AppContainer>
            <Button style={styles.button} mode="contained" onPress={() => router.push('/enter_name')}>Start</Button>

            <Button style={styles.button} mode="contained" onPress={() => router.push('/board')}>Leader Board</Button>
        </AppContainer>
    );
}

const styles = StyleSheet.create({
    button: {
        marginVertical: 16
    }
});
