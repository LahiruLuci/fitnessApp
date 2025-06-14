import { View, Text, Image, ScrollView, Dimensions, Animated } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { sliderImages } from '../constants'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

const { width } = Dimensions.get('window');

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const itemWidth = wp(100) - 70;
  const autoScrollTimer = useRef(null);

  // Auto-scroll functionality with smooth animation
  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  const startAutoScroll = () => {
    autoScrollTimer.current = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % sliderImages.length;
        
        // Smooth animated scroll
        scrollViewRef.current?.scrollTo({
          x: nextIndex * (itemWidth + 10), // Add margin
          animated: true,
        });
        
        return nextIndex;
      });
    }, 4000);
  };

  const stopAutoScroll = () => {
    if (autoScrollTimer.current) {
      clearInterval(autoScrollTimer.current);
      autoScrollTimer.current = null;
    }
  };

  const handleScrollBegin = () => {
    stopAutoScroll();
  };

  const handleScrollEnd = () => {
    startAutoScroll();
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { 
      useNativeDriver: false,
      listener: (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / (itemWidth + 10));
        setCurrentIndex(Math.max(0, Math.min(index, sliderImages.length - 1)));
      }
    }
  );

  return (
    <View style={{width: wp(100), height: hp(28)}}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onScrollBeginDrag={handleScrollBegin}
        onScrollEndDrag={handleScrollEnd}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={itemWidth + 10}
        snapToAlignment="center"
        contentContainerStyle={{
          alignItems: 'center',
          paddingHorizontal: 35,
        }}
        style={{
          overflow: 'visible',
        }}
      >
        {sliderImages.map((item, index) => (
          <AnimatedItemCard 
            key={index} 
            item={item} 
            index={index} 
            scrollX={scrollX}
            itemWidth={itemWidth}
          />
        ))}
      </ScrollView>
      
      {/* Enhanced pagination dots with smooth animations */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
      }}>
        {sliderImages.map((_, index) => {
          const inputRange = [
            (index - 1) * (itemWidth + 10),
            index * (itemWidth + 10),
            (index + 1) * (itemWidth + 10),
          ];

          const dotOpacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          const dotScale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.3, 0.8],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: '#f43f5e',
                marginHorizontal: 4,
                opacity: dotOpacity,
                transform: [{ scale: dotScale }],
              }}
            />
          );
        })}
      </View>
    </View>
  )
}

const AnimatedItemCard = ({item, index, scrollX, itemWidth}) => {
  const inputRange = [
    (index - 1) * (itemWidth + 10),
    index * (itemWidth + 10),
    (index + 1) * (itemWidth + 10),
  ];

  // Smooth scale animation
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.85, 1, 0.85],
    extrapolate: 'clamp',
  });

  // Smooth opacity animation
  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.6, 1, 0.6],
    extrapolate: 'clamp',
  });

  // Smooth translation for parallax effect
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [-15, 0, 15],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={{
      width: itemWidth,
      height: hp(20),
      marginHorizontal: 5,
      transform: [
        { scale },
        { translateX }
      ],
      opacity,
    }}>
      <View style={{
        width: '100%',
        height: '100%',
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 8,
        backgroundColor: 'white',
      }}>
        <Image
          source={item}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 30,
            resizeMode: 'cover'
          }}
        />
      </View>
    </Animated.View>
  )
}