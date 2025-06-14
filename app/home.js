import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ImageSlider from '../components/imageSlider'
import BodyParts from '../components/bodyParts'

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-white flex space-y-5" edges={['top']}>
      <StatusBar style = "dark" />

      {/* punching and avatar */}

      <View className="flex-row justify-between items-center mx-5">
        <View className="space-y-2">
          <Text
            style = {{fontSize: hp(5)}}
            className = "font-bold tracking-wider text-neutral-700"
          >
            READY TO 
          </Text>

          <Text
            style = {{fontSize: hp(5)}}
            className = "font-bold tracking-wider text-rose-500"
          >
            WORKOUT 
          </Text>
        </View>
        <View className="flex justify-center items-center space-y-2">
          <Image source={require('../assets/images/avatar.png')}
          className = "rounded-full"
          style = {{height: hp(10), width: wp(20), borderWidth: 1, borderColor: 'red'}}
          />
          <Text
            style = {{fontSize: hp(2)}}
            className = "font-bold tracking-wider text-neutral-700"
          >
            Max
          </Text>
          <View 
            className="bg-neutral-200 rounded-full flex justify-center items-center border-[3px] border-neutral-300"
            style = {{height: hp(5.5), width: wp(11)}}
          >
            <Ionicons name="notifications" size={hp(3)} color="gray"/>
          </View>
        </View>
      </View>

      {/* image slider */}
      <View>
        <ImageSlider/>
      </View>

      {/* body parts component */}
      <View className= "flex-1">
        <BodyParts/>
      </View>

    </SafeAreaView>
  )
}