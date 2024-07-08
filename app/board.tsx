import AppContainer from "@/components/AppContainer";
import { IScore } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Text } from "react-native-paper";
// import {AsyncStorage} from 'react-native';

export default function LeaderBoardScreen() {
    const [list, setList] = useState<IScore[]>([])
    // const router = useRouter()

    useEffect(() => {
        getScoreList()
    }, [])

    async function getScoreList() {
        let str = await AsyncStorage.getItem('_scoreList')
        if (str) {
            setList(JSON.parse(str))
        }
    }

    return (
        <AppContainer>
            <Text variant="titleLarge" style={{textAlign : 'center',marginBottom : 12}}>Leader Board</Text>
            {
                list.map((item : IScore,index) => <Text key={index} variant="labelLarge">{index+1}.{item.name} score : {item.score}</Text> )
            }
        </AppContainer>
    );
}
