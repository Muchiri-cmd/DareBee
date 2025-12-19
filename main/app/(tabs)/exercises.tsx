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
    const [exercises, setExercises] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { bodyPart } = useLocalSearchParams<{ bodyPart: string }>();
    const router = useRouter();
  
    const selectedBodyPart = bodyParts.find(
      (bp) => bp.name.toLowerCase() === bodyPart?.toLowerCase()
    );
  
    useEffect(() => {
      if (selectedBodyPart) {
        fetchExercisesWithGifs(selectedBodyPart);
      }
    }, [selectedBodyPart]);
  
    const fetchExercisesWithGifs = async (selectedBodyPart: any) => {
      setLoading(true);
      try {
        const exercisesData = await getExercisesByBodyPart(selectedBodyPart);
  
        const exercisesWithGifs = await Promise.all(
          exercisesData.map(async (exercise: any) => {
            try {
              const response = await axios.get('https://exercisedb.p.rapidapi.com/image', {
                params: {
                  resolution: '720',
                  exerciseId: exercise.id,
                },
                headers: {
                  'x-rapidapi-key': rapidAPIKey,
                  'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
                },
              });
  
              return { ...exercise, gifUrl: response.data.gifUrl };
    
            } catch (error) {
              console.warn(`Failed to fetch GIF for ${exercise.name}:`, error);
              return exercise; 
            }
          })
        );
  
        setExercises(exercisesWithGifs);
      } catch (error) {
        console.error('Error fetching exercises:', error);
        setExercises([]);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <Screen statusBarStyle="dark">
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {selectedBodyPart ? (
            <>
              <TouchableOpacity
                onPress={() => router.back()}
                style={{ margin: 16 }}
                activeOpacity={0.7}
              >
                <Ionicons name="chevron-back" size={24} color="#0066CC" />
              </TouchableOpacity>
  
              <View style={{ paddingHorizontal: 16 }}>
                <Text style={{ fontSize: 24, fontWeight: '700', marginBottom: 12 }}>
                  {selectedBodyPart.name.charAt(0).toUpperCase() + selectedBodyPart.name.slice(1)} Exercises
                </Text>
  
                <View style={{ height: 200, marginBottom: 16 }}>
                  <Image
                    source={selectedBodyPart.img}
                    style={{ width: '100%', height: '100%', borderRadius: 16 }}r
                  />
                </View>
  
                {loading ? (
                  <View style={{ alignItems: 'center', marginTop: 40 }}>
                    <ActivityIndicator size="large" color="#0066CC" />
                    <Text style={{ marginTop: 12 }}>Loading exercises...</Text>
                  </View>
                ) : (
                  <ExerciseList exercises={exercises} />
                )}
              </View>
            </>
          ) : (
            <View style={{ alignItems: 'center', marginTop: 80 }}>
              <Text style={{ fontSize: 18, color: '#FF0000' }}>Body part not found</Text>
            </View>
          )}
        </ScrollView>
      </Screen>
    );
  };
  

export default Exercises

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: hp(4),
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(5),
    marginTop: hp(2),
    marginBottom: hp(1),
  },
  header: {
    paddingHorizontal: wp(5),
    marginBottom: hp(2),
  },
  title: {
    fontSize: hp(3),
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: hp(1.6),
    color: '#6B7280',
    fontWeight: '400',
  },
  imageContainer: {
    width: '100%',
    height: hp(25),
    marginHorizontal: wp(5),
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
