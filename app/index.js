import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {useRouter} from 'expo-router';

export default function Welcome() {
  const router = useRouter();
  return (
    <View className="flex-1 flex justify-end">
      <StatusBar style='light'/>
      <Image className="h-full w-full absolute" source={require('../assets/images/welcome.png')}/>
      <LinearGradient
        colors={['transparent', '#18181b']}
        style={{width: wp(100), height: hp(100)}}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 0.8}}
        className="flex justify-end pb-12 space-y-8"
      >
        <Animated.View entering={FadeInDown.delay(100).springify()} className="flex items-center">
          <Text style={{fontSize: hp(5)}} className="text-white font-bold text-center tracking-wide">
            Best <Text className="text-rose-500">Workouts</Text>
          </Text>
          <Text style={{fontSize: hp(5)}} className="text-white font-bold text-center tracking-wide">
            For  <Text className="text-rose-500">you</Text>
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).springify()} >
          <TouchableOpacity
            onPress={() => router.push('home')}
            style={{height: hp(7), width: wp(80)}}
            className="bg-rose-500 rounded-full flex items-center justify-center mx-auto border-[2px] border-neutral-200"
          >
            <Text style={{fontSize: hp(3)}} className="text-white font-bold tracking-widest">
              Get Started
            </Text> 
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </View>
  );
}