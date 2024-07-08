import IQuestion, { IAnswer } from "@/types";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";


interface Props {
    index : number,
    question: IQuestion
    onSelect : (index : number,selectedAnswer : IAnswer) => void
}
export default function Question(props: Props) {
    const { index,question,onSelect } = props
    return (
        <Card style={{ padding: 16, marginTop: 16 }}>
            <Text>{index+1}.{question.question}</Text>
            <View style={styles.row}>
                <Card style={[styles.choice, question.selectedAnswer === 'A' && styles.selected]} onPress={() => onSelect(index,'A')} >
                    <Text>A : {question.A}</Text>
                </Card>
                <Card style={[styles.choice,styles.choiceRight, question.selectedAnswer === 'B' && styles.selected]} onPress={() => onSelect(index,'B')}>
                    <Text>B : {question.B}</Text>
                </Card>
            </View>
            <View style={styles.row}>
                <Card style={[styles.choice, question.selectedAnswer === 'C' && styles.selected]} onPress={() => onSelect(index,'C')}>
                    <Text>C : {question.C}</Text>
                </Card>
                <Card style={[styles.choice,styles.choiceRight, question.selectedAnswer === 'D' && styles.selected]} onPress={() => onSelect(index,'D')}>
                    <Text>D : {question.D}</Text>
                </Card>
            </View>
        </Card>

    )
}

const styles = StyleSheet.create({
    row: {
        flex : 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop : 12
    },
    choice : {
        width : '44%',
        padding : 6,
        paddingLeft : 12,
        // marginLeft : 12,
       
    },
    choiceRight : {
        marginLeft : '6%',
    },
    selected : {
        backgroundColor : 'orange'
    }
});
