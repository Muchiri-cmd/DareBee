import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

type Exercise = {
  id?: string
  name: string
  bodyPart?: string
  target?: string
  secondaryMuscles?: string[]
  equipment?: string
  instructions?: string[]
  gifUrl:string
}

type ExerciseListProps = {
  exercises?: Exercise[]
  onExercisePress?: (exercise: Exercise) => void
}

const ExerciseList = ({ exercises = [], onExercisePress }: ExerciseListProps) => {
    const router = useRouter();
    const handlePress = (exercise: Exercise) => {
        if (onExercisePress) {
          onExercisePress(exercise)
        } else {
          // Navigate to exercise details screen
          router.push({
            pathname: '/exerciseDetails',
            params: { 
              exercise: JSON.stringify(exercise)
            }
          })
        }
      }

  const renderExerciseCard = ({ item, index }: { item: Exercise; index: number }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.exerciseCard}
        onPress={() => handlePress(item)}
      >
        <View style={styles.imageWrapper}>
            {item.gifUrl ? (
                <Image
                source={{ uri: item.gifUrl }}
                style={{ width: '100%', height: '100%' }}
                />
            ) : (
                <View style={styles.placeholderImage}>
                <Ionicons name="barbell-outline" size={40} color="#9CA3AF" />
                </View>
            )}
            </View>


        <View style={styles.exerciseInfo}>
          <Text style={styles.exerciseName} numberOfLines={2}>
            {item.name}
          </Text>
          
          {item.target && (
            <View style={styles.muscleContainer}>
              <Ionicons name="locate" size={14} color="#0066CC" />
              <Text style={styles.muscleLabel}>Target: </Text>
              <Text style={styles.muscleText}>{item.target}</Text>
            </View>
          )}

          {item.secondaryMuscles && item.secondaryMuscles.length > 0 && (
            <View style={styles.muscleContainer}>
              <Ionicons name="body-outline" size={14} color="#6B7280" />
              <Text style={styles.muscleLabel}>Secondary: </Text>
              <Text style={styles.secondaryMuscleText}>
                {item.secondaryMuscles.join(', ')}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    )
  }

  if (exercises.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="fitness-outline" size={64} color="#D1D5DB" />
        <Text style={styles.emptyText}>No exercises found</Text>
        <Text style={styles.emptySubtext}>Try selecting a different body part</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Available Exercises</Text>
      </View>

      <FlatList
        data={exercises}
        renderItem={renderExerciseCard}
        keyExtractor={(item, index) => item.id || `exercise-${index}`}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  )
}

export default ExerciseList

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  sectionHeader: {
    marginBottom: hp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: hp(2.2),
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: hp(1.5),
    color: '#6B7280',
    fontWeight: '500',
  },
  listContent: {
    paddingBottom: hp(2),
  },
  exerciseCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  imageWrapper: {
    width: wp(35),
    height: wp(35),
    backgroundColor: '#F9FAFB',
    position: 'relative',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  equipmentBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 102, 204, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  equipmentText: {
    fontSize: hp(1.1),
    fontWeight: '600',
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  exerciseInfo: {
    flex: 1,
    padding: wp(4),
    justifyContent: 'space-between',
  },
  exerciseName: {
    fontSize: hp(1.9),
    fontWeight: '700',
    color: '#111827',
    marginBottom: hp(1),
    lineHeight: hp(2.4),
    letterSpacing: -0.2,
  },
  muscleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.8),
    gap: 4,
    flexWrap: 'wrap',
  },
  muscleLabel: {
    fontSize: hp(1.3),
    color: '#6B7280',
    fontWeight: '500',
  },
  muscleText: {
    fontSize: hp(1.3),
    color: '#111827',
    fontWeight: '600',
    textTransform: 'capitalize',
    flex: 1,
  },
  secondaryMuscleText: {
    fontSize: hp(1.3),
    color: '#6B7280',
    fontWeight: '500',
    textTransform: 'capitalize',
    flex: 1,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(0.5),
  },
  detailBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#F0F7FF',
    borderRadius: 12,
  },
  detailText: {
    fontSize: hp(1.3),
    fontWeight: '600',
    color: '#0066CC',
  },
  separator: {
    height: hp(2),
  },
  emptyContainer: {
    paddingVertical: hp(8),
    alignItems: 'center',
    paddingHorizontal: wp(10),
  },
  emptyText: {
    fontSize: hp(2),
    fontWeight: '600',
    color: '#374151',
    marginTop: hp(2),
    marginBottom: hp(0.5),
  },
  emptySubtext: {
    fontSize: hp(1.5),
    color: '#6B7280',
    textAlign: 'center',
  },
})