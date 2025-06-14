// import { View, Text, Image } from 'react-native'
// import React from 'react'
// import Carousel,{ ParallaxImage } from 'react-native-snap-carousel'
// import { sliderImages } from '../constants'
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

// export default function ImageSlider() {
//   return (
//     <View style={{width: wp(100), height: hp(25)}}>
//       <Carousel
//           data={sliderImages}
//           loop={true}
//           autoplay={true}
//           renderItem={ItemCard}
//           hasParallaxImages={true}
//           sliderWidth={wp(100)}
//           firstItem={1}
//           autoplayInterval={4000}
//           itemWidth={wp(100)-70}
//           slideStyle={{display: 'flex', alignItems: 'center'}}
//       />
//     </View>
//   )
// }

// const ItemCard = ({item, index}) => {
//     return (
//         // <View style={{width: wp(100)-70, height: hp(25)}}>
//         //     <Image
//         //         source={item}
//         //         style={{
//         //             width: '100%',
//         //             height: '100%',
//         //             borderRadius: 30,
//         //             resizeMode: 'contain'
//         //         }}
//         //     />
//         // </View>
//         <Text>Slide</Text>
//     )
// }

// // import { View, Text, Image } from 'react-native'
// // import React from 'react'
// // import Carousel from 'react-native-snap-carousel'
// // import { sliderImages } from '../constants'
// // import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

// // export default function ImageSlider() {
// //   return (
// //     <View style={{width: wp(100), height: hp(25)}}>
// //       <Carousel
// //           data={sliderImages}
// //           loop={true}
// //           autoplay={true}
// //           renderItem={({item, index}) => (
// //             <ItemCard item={item} index={index} />
// //           )}
// //           hasParallaxImages={true}
// //           sliderWidth={wp(100)}
// //           firstItem={1}
// //           autoplayInterval={4000}
// //           itemWidth={wp(100)-70}
// //           slideStyle={{display: 'flex', alignItems: 'center'}}
// //       />
// //     </View>
// //   )
// // }

// // const ItemCard = ({item, index}) => {
// //     return (
// //         <View style={{width: wp(100)-70, height: hp(25)}}>
// //             <Image
// //                 source={item}
// //                 style={{
// //                     width: '100%',
// //                     height: '100%',
// //                     borderRadius: 30,
// //                     resizeMode: 'cover' // Changed from 'contain' to 'cover' for better appearance
// //                 }}
// //             />
// //         </View>
// //     )
// // }


import { View, Text, Image, ScrollView, Dimensions } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { sliderImages } from '../constants'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

const { width } = Dimensions.get('window');

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const itemWidth = wp(100) - 70;

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % sliderImages.length;
      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: nextIndex * itemWidth,
        animated: true,
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, itemWidth]);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / itemWidth);
    setCurrentIndex(index);
  };

  return (
    <View style={{width: wp(100), height: hp(25)}}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        contentContainerStyle={{
          alignItems: 'center',
          paddingHorizontal: 35, // Center the items
        }}
      >
        {sliderImages.map((item, index) => (
          <ItemCard key={index} item={item} index={index} />
        ))}
      </ScrollView>
      
      {/* Pagination dots */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
      }}>
        {sliderImages.map((_, index) => (
          <View
            key={index}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: index === currentIndex ? '#f43f5e' : '#d1d5db',
              marginHorizontal: 3,
            }}
          />
        ))}
      </View>
    </View>
  )
}

const ItemCard = ({item, index}) => {
  const itemWidth = wp(100) - 70;
  
  return (
    <View style={{
      width: itemWidth,
      height: hp(20),
      marginHorizontal: 5,
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
  )
}