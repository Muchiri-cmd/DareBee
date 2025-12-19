import { bodyParts } from '@/constants/contants'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import React, { useMemo, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

type BodyPart = {
  name: string
  img: any
}

type Goal = {
  id: string
  label: string
}

type Plan = {
  id: string
  label: string
  subtitle: string
}

const goals: Goal[] = [
  { id: 'strength', label: 'Strength' },
  { id: 'cardio', label: 'Cardio' },
  { id: 'hiit', label: 'HIIT' },
  { id: 'combat', label: 'Combat' },
  { id: 'stretching', label: 'Stretching' },
  { id: 'yoga', label: 'Yoga' },
]

const plans: Plan[] = [
  { id: 'ppl', label: 'PPL', subtitle: 'Push • Pull • Legs' },
  { id: 'bro', label: 'Classic bro split', subtitle: 'Chest • Back • Arms • Legs' },
  { id: '3days', label: '3 days / week', subtitle: 'Full body focus' },
  { id: '5days', label: '5 days / week', subtitle: 'Hybrid strength & cardio' },
  { id: '7days', label: '7 days / week', subtitle: 'Daily micro-sessions' },
]

const BodyParts = () => {
    const router = useRouter()

  const [activePart, setActivePart] = useState<BodyPart>(bodyParts[0])
  const [activeGoal, setActiveGoal] = useState<Goal>(goals[0])
  const [activePlan, setActivePlan] = useState<Plan>(plans[0])

  const chipsData = useMemo(
    () => bodyParts.map((bp) => ({ ...bp, key: bp.name })),
    []
  )

  return (
    <View style={styles.container}>
      {/* <View style={styles.sectionHeader}>
        <Text style={styles.title}>Goals</Text>
        <Text style={styles.subtitle}>What are you training for?</Text>
      </View> */}

      <FlatList
        data={goals}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.goalsContent}
        ItemSeparatorComponent={() => <View style={{ width: wp(2.5) }} />}
        renderItem={({ item }) => {
          const isActive = item.id === activeGoal.id
          return (
            <TouchableOpacity
              activeOpacity={0.85}
              style={[styles.goalCard, isActive && styles.goalCardActive]}
              onPress={() => setActiveGoal(item)}
            >
              <Text style={[styles.goalLabel, isActive && styles.goalLabelActive]}>
                {item.label}
              </Text>
              
            </TouchableOpacity>
          )
        }}
      />

      <View style={[styles.sectionHeader, { marginTop: hp(1.5) }]}>
        <Text style={styles.title}>Body Focus</Text>
        <Text style={styles.subtitle}>Choose an area to train today</Text>
      </View>

      <FlatList
        data={chipsData}
        horizontal
        keyExtractor={(item) => item.name}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsContent}
        ItemSeparatorComponent={() => <View style={{ width: wp(2) }} />}
        renderItem={({ item }) => {
          const isActive = item.name === activePart.name
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.chip, isActive && styles.chipActive]}
              onPress={() => setActivePart(item)}
            >
              <Text style={[styles.chipLabel, isActive && styles.chipLabelActive]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )
        }}
      />

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push({
          pathname: '/exercises',
          params: { 
            bodyPart: activePart.name
          }
        })}
        style={styles.focusCard}>
        <View style={styles.focusImageWrapper}>
          <Image
            source={activePart.img}
            style={styles.focusImage}
            contentFit="cover"
          />
        </View>

        <View style={styles.focusContent}>
          <Text style={styles.focusTitle}>
            {activePart.name.charAt(0).toUpperCase() + activePart.name.slice(1)} exercises
          </Text>
          <Text style={styles.focusSubtitle}>
            Curated home workouts to train your {activePart.name}.
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.sectionHeader}>
        <Text style={styles.title}>Custom plans</Text>
        <Text style={styles.subtitle}>Pick a structure that fits your week</Text>
      </View>

      <FlatList
        data={plans}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.plansContent}
        ItemSeparatorComponent={() => <View style={{ width: wp(3) }} />}
        renderItem={({ item }) => {
          const isActive = item.id === activePlan.id
          return (
            <TouchableOpacity
              activeOpacity={0.85}
              style={[styles.planCard, isActive && styles.planCardActive]}
              onPress={() => setActivePlan(item)}
            >
              <Text style={[styles.planLabel, isActive && styles.planLabelActive]}>
                {item.label}
              </Text>
              <Text style={[styles.planSubtitle, isActive && styles.planSubtitleActive]}>
                {item.subtitle}
              </Text>
            </TouchableOpacity>
          )
        }}
      />

      <View style={styles.customPlanCard}>
        <View style={styles.customPlanContent}>
          <Text style={styles.customPlanTitle}>Build your own plan</Text>
          <Text style={styles.customPlanSubtitle}>
            Design a custom schedule/workout that matches your goals and lifestyle.
          </Text>
        </View>
        <View style={styles.customPlanButton}>
          <Text style={styles.customPlanButtonText}>Start</Text>
        </View>
      </View>
    </View>
  )
}

export default BodyParts

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(5),
    marginTop: hp(3),
  },
  sectionHeader: {
    marginBottom: hp(1.2),
  },
  title: {
    fontSize: hp(2.1),
    fontWeight: '700',
    color: '#1B1B1F',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: hp(1.4),
    color: '#6B7280',
  },
  goalsContent: {
    paddingVertical: hp(0.5),
  },
  goalCard: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.6),
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  goalCardActive: {
    borderColor: '#0066CC',
  },
  goalLabel: {
    fontSize: hp(1.3),
    fontWeight: '500',
    color: '#4B5563',
  },
  goalLabelActive: {
    color: '#0066CC',
  },
  chipsContent: {
    paddingVertical: hp(1),
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(2.8),
    paddingVertical: hp(0.7),
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
  },
  chipActive: {
    backgroundColor: '#0066CC',
  },
  chipImage: {
    width: 22,
    height: 22,
    marginRight: 6,
  },
  chipLabel: {
    fontSize: hp(1.4),
    fontWeight: '500',
    color: '#4B5563',
    textTransform: 'capitalize',
  },
  chipLabelActive: {
    color: '#FFFFFF',
  },
  focusCard: {
    marginTop: hp(1.5),
    flexDirection: 'row',
    alignItems: 'center',
    padding: hp(1.6),
    borderRadius: 20,
    backgroundColor: '#F5F8FF',
  },
  focusImageWrapper: {
    width: 110,
    height: 110,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: wp(3),
    backgroundColor: '#FFFFFF',
  },
  focusImage: {
    width: '100%',
    height: '100%',
  },
  focusContent: {
    flex: 1,
  },
  focusTitle: {
    fontSize: hp(2),
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  focusSubtitle: {
    fontSize: hp(1.5),
    color: '#6B7280',
  },
  plansContent: {
    paddingVertical: hp(1),
  },
  planCard: {
    minWidth: wp(32),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.2),
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
  },
  planCardActive: {
    backgroundColor: '#E5F0FF',
    borderWidth: 1,
    borderColor: '#0066CC',
  },
  planLabel: {
    fontSize: hp(1.6),
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  planLabelActive: {
    color: '#0066CC',
  },
  planSubtitle: {
    fontSize: hp(1.3),
    color: '#6B7280',
  },
  planSubtitleActive: {
    color: '#374151',
  },
  customPlanCard: {
    marginTop: hp(1.5),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.6),
    borderRadius: 18,
    backgroundColor: '#0066CC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  customPlanContent: {
    flex: 1,
    marginRight: wp(3),
  },
  customPlanTitle: {
    fontSize: hp(1.9),
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  customPlanSubtitle: {
    fontSize: hp(1.4),
    color: 'rgba(255,255,255,0.9)',
  },
  customPlanButton: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
  },
  customPlanButtonText: {
    fontSize: hp(1.5),
    fontWeight: '600',
    color: '#0066CC',
  },
})