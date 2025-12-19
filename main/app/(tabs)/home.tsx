import ImageSlider from '@/components/ImageSlider'
import Screen from '@/components/Screen'
import BodyParts from '@/components/bodyParts'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

const home = () => {
  return (
    <Screen statusBarStyle="dark">
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.textContainer}>
            <Text style={styles.text1}>TRANSFORM</Text>
            <Text style={styles.text2}>YOUR BODY AT HOME</Text>
          </View>

          <View style={styles.rightContainer}>
            <TouchableOpacity activeOpacity={0.7} style={styles.calendarButton}>
              <Ionicons name="calendar-outline" size={24} color="#0066CC" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={styles.avatarButton}>
              <Image 
                source={require('../../assets/images/avatar.png')} 
                style={styles.avatar}
                contentFit="cover"
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.sliderWrapper}>
            <ImageSlider />
          </View>

          <BodyParts />
        </ScrollView>
      </View> 
    </Screen>
  )
}

export default home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: hp(4),
  },
  sliderWrapper: {
    marginBottom: hp(2.5),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
    paddingBottom: hp(1.5),
  },
  textContainer: {
    flex: 1,
    paddingRight: wp(3),
  },
  text1: {
    fontSize: hp(2.8),
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 0.5,
  },
  text2: {
    fontSize: hp(2.8),
    fontWeight: '700',
    color: '#0066CC',
    letterSpacing: 0.5,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
  },
  calendarButton: {
    position: 'relative',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
    calendarBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FF4444',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  // badgeText: {
  //   fontSize: 10,
  //   fontWeight: '700',
  //   color: '#FFFFFF',
  // },
  avatarButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#0066CC',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
})