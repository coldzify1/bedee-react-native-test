import rawQuestions from "@/assets/questions.json";
import AppContainer from "@/components/AppContainer";
import Question from "@/components/Question";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import IQuestion, { IAnswer, IScore } from '../types/index';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function QuestionScreen() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [name, setName] = useState("")
  const router = useRouter()

  useEffect(() => {
    let tmp_arr = JSON.parse(JSON.stringify(rawQuestions))
    // random question
    shuffle(tmp_arr)
    setQuestions(tmp_arr)
  }, [])

  useEffect(() => {
    getNameFromState()
  }, [])

  async function getNameFromState() {
    const name = await AsyncStorage.getItem('_name') || ""
    setName(name)
  }
  function onSelectAnswer(index: number, selectedAnswer: IAnswer) {
    let tmp = [...questions]
    tmp[index] = { ...tmp[index], selectedAnswer }
    setQuestions(tmp)
  }

  function calScore(): number {
    return questions.reduce((total, q) => q.selectedAnswer === q.answer ? total + 1 : total, 0)
  }

  async function onSubmit() {
    const score = calScore()
    const data = {
      score,
      name
    }
    let scoreList: IScore[] = []
    try {
      let str = await AsyncStorage.getItem('_scoreList')
      scoreList = str ? JSON.parse(str) : []
      if (!scoreList.length) {
        scoreList.push(data)
      }
      else {
        let old_score_index = scoreList.findIndex(item => item.name === name)
        if (old_score_index !== -1) {
          if (score > scoreList[old_score_index].score) {
            scoreList[old_score_index].score = score
          }
        }
        else {

          let isAdded = false
          for (let i = 0; i < scoreList.length; i++) {
            if (score > scoreList[i].score) {
              scoreList.splice(i, 0, data)
              isAdded = true
              break;
            }
          }
          if (!isAdded) {
            scoreList.push(data)
          }
        }


      }
      scoreList = scoreList.slice(0, 10)

      await AsyncStorage.setItem('_scoreList', JSON.stringify(scoreList))
      router.replace('/board')

    }
    catch (err) {
      console.log(err)
    }



  }

  const isAllSelected = useMemo(() => !!!questions.find(q => !q.selectedAnswer), [questions])

  // console.log(questions)

  return (
    <AppContainer>
      <ScrollView>
        {
          questions.map((item: IQuestion, index) => <Question key={item.question} index={index} question={item} onSelect={onSelectAnswer} />)
        }

      </ScrollView>
      <Button style={styles.button} mode="contained" onPress={onSubmit} disabled={!isAllSelected} >Submit</Button>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 16
  }
});

function shuffle(array: []) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}
