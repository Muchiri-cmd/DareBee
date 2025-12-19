import Screen from '@/components/Screen'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { router, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

const ExerciseDetails = () => {
  const { exercise } = useLocalSearchParams<{ exercise: string }>()
  
  // Parse the exercise data
  const exerciseData = exercise ? JSON.parse(exercise as string) : null

  if (!exerciseData) {
    return (
      <Screen statusBarStyle="dark">
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Exercise not found</Text>
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={styles.errorButton}
          >
            <Text style={styles.errorButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </Screen>
    )
  }

  return (
    <Screen statusBarStyle="dark">
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={24} color="#111827" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Exercise Name */}
          <Text style={styles.exerciseName}>
            {exerciseData.name.split(' ').map((word: string) => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')}
          </Text>

          {/* Exercise Image/GIF */}
          {exerciseData.gifUrl && (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: exerciseData.gifUrl }}
                style={styles.image}
                contentFit="contain"
              />
            </View>
          )}

          {/* Content */}
          <View style={styles.content}>
            {/* Instructions */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>INSTRUCTIONS</Text>
              {exerciseData.instructions && exerciseData.instructions.length > 0 ? (
                exerciseData.instructions.map((instruction: string, index: number) => (
                  <Text key={index} style={styles.instructionText}>
                    {instruction}
                  </Text>
                ))
              ) : (
                <Text style={styles.instructionText}>
                  Follow the animation to perform this exercise correctly. Focus on proper form and controlled movements throughout the exercise.
                </Text>
              )}
            </View>

            {/* Target & Equipment Info */}
            {(exerciseData.target || exerciseData.equipment) && (
              <View style={styles.section}>
                {exerciseData.target && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Target Muscle:</Text>
                    <Text style={styles.infoValue}>
                      {exerciseData.target.charAt(0).toUpperCase() + exerciseData.target.slice(1)}
                    </Text>
                  </View>
                )}
                {exerciseData.equipment && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Equipment:</Text>
                    <Text style={styles.infoValue}>
                      {exerciseData.equipment === 'body weight' 
                        ? 'No equipment needed' 
                        : exerciseData.equipment.split(' ').map((word: string) => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}
                    </Text>
                  </View>
                )}
              </View>
            )}

            {/* Common Mistakes */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>COMMON MISTAKES</Text>
              <View style={styles.mistakeItem}>
                <Text style={styles.mistakeNumber}>1</Text>
                <View style={styles.mistakeContent}>
                  <Text style={styles.mistakeTitle}>Incorrect form</Text>
                  <Text style={styles.mistakeDescription}>
                    Make sure to maintain proper posture throughout the exercise to avoid injury and maximize effectiveness.
                  </Text>
                </View>
              </View>
              <View style={styles.mistakeItem}>
                <Text style={styles.mistakeNumber}>2</Text>
                <View style={styles.mistakeContent}>
                  <Text style={styles.mistakeTitle}>Moving too fast</Text>
                  <Text style={styles.mistakeDescription}>
                    Control your movements and focus on the muscle engagement rather than speed.
                  </Text>
                </View>
              </View>
              <View style={styles.mistakeItem}>
                <Text style={styles.mistakeNumber}>3</Text>
                <View style={styles.mistakeContent}>
                  <Text style={styles.mistakeTitle}>Not engaging core</Text>
                  <Text style={styles.mistakeDescription}>
                    Keep your core engaged throughout the exercise to maintain stability and protect your lower back.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Close Button */}
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Text style={styles.closeButtonText}>CLOSE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  )
}

export default ExerciseDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
    paddingBottom: hp(1),
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: hp(12),
  },
  exerciseName: {
    fontSize: hp(2.2),
    fontWeight: '700',
    color: '#111827',
    paddingHorizontal: wp(5),
    marginBottom: hp(1.5),
    textTransform: 'uppercase',
  },
  imageContainer: {
    width: '100%',
    height: hp(40),
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(2.5),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    paddingHorizontal: wp(5),
  },
  section: {
    marginBottom: hp(3),
  },
  sectionTitle: {
    fontSize: hp(1.6),
    fontWeight: '700',
    color: '#0066FF',
    marginBottom: hp(1.2),
    letterSpacing: 0.5,
  },
  instructionText: {
    fontSize: hp(1.7),
    color: '#374151',
    lineHeight: hp(2.5),
    marginBottom: hp(1.2),
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: hp(1),
  },
  infoLabel: {
    fontSize: hp(1.7),
    fontWeight: '600',
    color: '#111827',
    width: wp(35),
  },
  infoValue: {
    fontSize: hp(1.7),
    color: '#374151',
    flex: 1,
  },
  mistakeItem: {
    flexDirection: 'row',
    marginBottom: hp(2),
    gap: 12,
  },
  mistakeNumber: {
    fontSize: hp(1.8),
    fontWeight: '700',
    color: '#111827',
    width: 24,
  },
  mistakeContent: {
    flex: 1,
  },
  mistakeTitle: {
    fontSize: hp(1.7),
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  mistakeDescription: {
    fontSize: hp(1.6),
    color: '#6B7280',
    lineHeight: hp(2.4),
  },
  closeButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  closeButton: {
    backgroundColor: '#0066FF',
    paddingVertical: hp(2),
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: hp(2),
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(10),
  },
  errorText: {
    fontSize: hp(2.2),
    color: '#EF4444',
    fontWeight: '600',
    marginBottom: hp(3),
  },
  errorButton: {
    backgroundColor: '#0066FF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  errorButtonText: {
    color: '#FFFFFF',
    fontSize: hp(1.8),
    fontWeight: '600',
  },
})