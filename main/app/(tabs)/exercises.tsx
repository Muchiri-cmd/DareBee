import { rapidAPIKey } from '@/api/apiKey'
import ExerciseList from '@/components/exerciseList'
import Screen from '@/components/Screen'
import { bodyParts } from '@/constants/contants'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import { Image } from 'expo-image'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { getExercisesByBodyPart } from '../../api/api'

const Exercises = () => {
  const [exercises, setExercises] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { bodyPart } = useLocalSearchParams<{ bodyPart: string }>()
  const router = useRouter()

  const selectedBodyPart = bodyParts.find(
    (bp) => bp.name.toLowerCase() === bodyPart?.toLowerCase()
  )

  useEffect(() => {
    if (selectedBodyPart) {
      fetchExercisesWithGifs(selectedBodyPart)
    }
  }, [selectedBodyPart])

  const fetchGifAsBase64 = async (exerciseId: string): Promise<string | null> => {
    try {
      const response = await axios.get('https://exercisedb.p.rapidapi.com/image', {
        params: {
          resolution: '720',
          exerciseId: exerciseId,
        },
        headers: {
          'x-rapidapi-key': rapidAPIKey,
          'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
        },
        responseType: 'arraybuffer',
      })

      const base64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      )
      
      return `data:image/gif;base64,${base64}`
    } catch (error) {
      console.warn(`Failed to fetch GIF for exercise ${exerciseId}:`, error)
      return null
    }
  }

  const fetchExercisesWithGifs = async (selectedBodyPart: any) => {
    setLoading(true)
    try {
      const exercisesData = await getExercisesByBodyPart(selectedBodyPart)

      const exercisesWithGifs = await Promise.all(
        exercisesData.map(async (exercise: any) => {
          const gifBase64 = await fetchGifAsBase64(exercise.id)
          return { 
            ...exercise, 
            gifUrl: gifBase64
          }
        })
      )

      const successCount = exercisesWithGifs.filter(e => e.gifUrl).length
      
      setExercises(exercisesWithGifs)
    } catch (error) {
      console.error('Error fetching exercises:', error)
      setExercises([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <Screen statusBarStyle="dark">
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {selectedBodyPart ? (
          <>
            <View style={styles.headerRow}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backButton}
                activeOpacity={0.7}
              >
                <Ionicons name="chevron-back" size={24} color="#0066CC" />
              </TouchableOpacity>
              
              <View style={styles.headerContent}>
                <Text style={styles.title}>
                  {selectedBodyPart.name.charAt(0).toUpperCase() + selectedBodyPart.name.slice(1)} Exercises
                </Text>
              </View>
            </View>

            <View style={styles.imageContainer}>
              <Image
                source={selectedBodyPart.img}
                style={styles.image}
                contentFit="cover"
              />
            </View>

            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0066CC" />
                <Text style={styles.loadingText}>Loading exercises and animations...</Text>
              </View>
            ) : (
              <View style={styles.exerciseContainer}>
                <ExerciseList exercises={exercises} />
              </View>
            )}
          </>
        ) : (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Body part not found</Text>
          </View>
        )}
      </ScrollView>
    </Screen>
  )
}

export default Exercises

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: hp(4),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
    marginBottom: hp(2),
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: hp(2.6),
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -0.5,
  },
  imageContainer: {
    width: wp(90),
    height: hp(25),
    alignSelf: 'center',
    marginBottom: hp(3),
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    paddingVertical: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: hp(1.8),
    color: '#6B7280',
    marginTop: hp(2),
    fontWeight: '500',
  },
  exerciseContainer: {
    paddingHorizontal: wp(5),
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(10),
  },
  errorText: {
    fontSize: hp(1.8),
    color: '#EF4444',
  },
})