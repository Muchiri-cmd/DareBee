import Screen from '@/components/Screen'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

const index = () => {
  const router = useRouter()
  return (
    <Screen statusBarStyle="dark">
      <View style={styles.container}>
        <Image 
          style={styles.welcome_img} 
          source={require('../../assets/images/slide1.jpg')}
          resizeMode="cover"
        />
        <LinearGradient 
          colors={["rgba(0, 102, 204, 0.85)", "rgba(0, 51, 153, 0.95)"]}
          style={styles.overlay}
        />

        <View style={styles.contentContainer}>
          <Animated.View 
            entering={FadeInDown.delay(300).duration(800)} 
            style={styles.brandContainer}
          >
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>DB</Text>
            </View>
            <Text style={styles.brandName}>DareBee</Text>
            <Text style={styles.slogan}>No gym, no problem.</Text>
          </Animated.View>
          
          <Animated.View 
            entering={FadeInDown.delay(500).duration(800)} 
            style={styles.headingContainer}
          >
            <Text style={styles.heading}>
              Transform Your{'\n'}
              <Text style={styles.headingAccent}>Home Workouts</Text>
            </Text>
            
            <Text style={styles.subheading}>
              Professional training programs{'\n'}
              designed for your success at the comfort of your home
            </Text>
          </Animated.View>

          <Animated.View 
            entering={FadeInUp.delay(700).duration(800)} 
            style={styles.featuresContainer}
          >
            <View style={styles.featureItem}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>Customizable workout plans</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>Progress tracking</Text>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>Science Based Workouts</Text>
            </View>

          </Animated.View>

          <Animated.View 
            entering={FadeInUp.delay(900).duration(800)} 
            style={styles.buttonContainer}
          >
            <TouchableOpacity 
              style={styles.primaryButton}
              activeOpacity={0.8}
              onPress={() => router.replace('/(tabs)/home')}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
              <View style={styles.buttonArrow}>
                <Text style={styles.arrowText}>→</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
          
          <Animated.View 
            entering={FadeIn.delay(1100).duration(800)} 
            style={styles.secondaryContainer}
          >
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.secondaryText}>
                Already have an account? <Text style={styles.secondaryLink}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </Screen>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  welcome_img: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: wp(6),
    paddingTop: hp(8),
    paddingBottom: hp(6),
    zIndex: 1,
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: hp(2),
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0066CC',
    letterSpacing: 1,
  },
  brandName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  slogan: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '400',
    letterSpacing: 0.3,
  },
  headingContainer: {
    marginTop: hp(4),
  },
  heading: {
    fontSize: 42,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 50,
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  headingAccent: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  subheading: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 26,
    fontWeight: '400',
    letterSpacing: 0.3,
  },
  featuresContainer: {
    marginTop: hp(4),
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  featureText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.95)',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  buttonContainer: {
    marginTop: hp(4),
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0066CC',
    letterSpacing: 0.5,
  },
  buttonArrow: {
    marginLeft: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#0066CC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  secondaryContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  secondaryText: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '400',
  },
  secondaryLink: {
    color: '#FFFFFF',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
})