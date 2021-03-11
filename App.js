import { StatusBar } from 'expo-status-bar';
import React, {Component, useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <InfoElement/>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

export default function App() {
  let [workFlag, setWorkFlag] = useState(true)
  let [runningFlag, setRunningFlag] = useState(false)
  let [timeRemaining, setTimeRemaining] = useState(120)
  let [timer, setTimer] = useState('2:00')
  let [workMinutes, setWorkMinutes] = useState('')
  let [workSeconds, setWorkSeconds] = useState('')
  let [restMinutes, setRestMinutes] = useState('')
  let [restSeconds, setRestSeconds] = useState('')

  let workColor = ['rgba(178, 82, 161, 1)', 'transparent']
  let restColor = ['rgba(255, 255, 255, 1)', 'transparent']

  const secondsToText = () =>{
      let minutes = Math.floor(timeRemaining/60)
      let seconds = timeRemaining % 60
      return (minutes + ":" + String(seconds).padStart(2, '0'))
  }

  const handleWorkMinutesInput = (text) => {
      setWorkMinutes(text)
      // console.log(workMinutes)
      if (workFlag){
          resetTimer()
      }
  }
  const handleWorkSecondsInput = (text) => {
      setWorkSeconds(workSeconds = text)
      if (workFlag){
          resetTimer()
      }
  }
  const handleRestMinutesInput = (text) => {
      setRestMinutes(restMinutes = text)
      if (!workFlag){
          resetTimer()
      }
  }
  const handleRestSecondsInput = (text) => {
      setRestSeconds(restSeconds = text)
      if (!workFlag){
          resetTimer()
      }
  }

  useEffect(
  () => {
      let interval;
      if (runningFlag) {
          interval = setInterval(
          () => {
              // console.log(timeRemaining)
              setTimeRemaining(timeRemaining = timeRemaining - 1)
              setTimer(secondsToText())
              // console.log(timeRemaining)
              // console.log('========')
              if (timeRemaining <= 0){
                  setWorkFlag(workFlag = !workFlag)
                  resetTimer()
              }
          },1000);
          
      }
      return () => clearInterval(interval);
  }, [runningFlag]);
  //dependency array, only runs on these updates

  const handlePause = () => setRunningFlag(!runningFlag)

  const handleReset = () => {
      setRunningFlag(false)
      resetTimer()
  }

  const resetTimer = () => {
      if (workFlag){
          // console.log('reset_work')
          console.log(timeRemaining)
          console.log(secondsToText(timeRemaining))
          setTimeRemaining(timeRemaining = (+workMinutes)*60 + (+workSeconds))
          setTimer(secondsToText(timeRemaining))
          console.log(timeRemaining)
          console.log(secondsToText(timeRemaining))
          
      }else{
          // console.log('reset_rest')
          setTimeRemaining(timeRemaining = (+restMinutes)*60 + (+restSeconds))
          setTimer(secondsToText(timeRemaining))
      }
  }

  return(
      <View style={workFlag ? styles.container_work : styles.container_rest}>
        <LinearGradient
        // Background Linear Gradient
        colors={workFlag ? workColor : restColor}
        style={styles.background}
        />
          <Text style={workFlag ? styles.titleWork : styles.titleRest}>
              {workFlag ? 'Work Timer' : 'Rest Timer'}
          </Text>
          <Text style={styles.timer}>
              {timer}
          </Text>
          <View style={styles.buttonContainer}>
              <Button style={styles.button} title={runningFlag ? "Pause" : "Start"} onPress={handlePause}/>
              <Button style={styles.button} title="Reset"onPress={handleReset}/>
          </View>
          <View style={{display: 'flex', flexDirection:'row', paddingBottom:10}}>
              <Text style={{fontWeight: 'bold', paddingRight: 30}}>Work Time:</Text>
              <Text style={{paddingRight: 5}}>Mins:</Text>
              <TextInput
                  style={styles.textBox}
                  onChangeText={text => handleWorkMinutesInput(text)}
                  value={workMinutes.toString()}
                  keyboardType='numeric'
                  placeholder='0'
              />
              <Text style={{paddingRight: 5, paddingLeft:10}}>Secs:</Text>
              <TextInput
                  style={styles.textBox}
                  onChangeText={text => handleWorkSecondsInput(text)}
                  value={workSeconds.toString()}
                  keyboardType='numeric'
                  placeholder='0'
              />
          </View>
              <View style={{display: 'flex', flexDirection:'row', paddingBottom:10}}>
              <Text style={{fontWeight: 'bold', paddingRight: 30}}>Break Time:</Text>
              <Text style={{paddingRight: 5}}>Mins:</Text>
              <TextInput
                  style={styles.textBox}
                  onChangeText={text => handleRestMinutesInput(text)}
                  value={restMinutes.toString()}
                  keyboardType='numeric'
                  placeholder='0'
              />
              <Text style={{paddingRight: 5, paddingLeft:10}}>Secs:</Text>
              <TextInput
                  style={styles.textBox}
                  onChangeText={text => handleRestSecondsInput(text)}
                  value={restSeconds.toString()}
                  keyboardType='numeric'
                  placeholder='0'
              />
          </View>
        
      </View>
  )
}

const styles = StyleSheet.create({
  container_work: {
    flex: 1,
    backgroundColor: '#dcd5d5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container_rest: {
    flex: 1,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWork: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#04dbc2',
  },
  titleRest: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#f2734f',
  },
  timer: {
      fontSize: 80,
      color: 'black'
  },
  buttonContainer:{
      display: 'flex',
      flexDirection: 'row',
      padding: 10,
  },
  button:{
      padding:50,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 900,
  },
  textBox: {
    borderColor: 'gray', 
    borderWidth: 1,  
    backgroundColor: 'white'
  }
});
