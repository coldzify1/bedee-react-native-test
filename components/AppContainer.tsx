import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

export default function AppContainer(props: PropsWithChildren) {
    return (
        <View style={styles.container}>
            {props.children}
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        flex : 1,
        padding: 20,
        // alignContent : 'center',
        // alignItems : 'center',
    },
    button: {
        marginVertical: 16
    }
});