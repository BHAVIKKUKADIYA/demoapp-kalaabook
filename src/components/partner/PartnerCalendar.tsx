import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { KalaaColors, KalaaShadow } from '@/constants/kalaaTheme';

export function PartnerCalendar() {
  const [viewMode, setViewMode] = useState<'Day' | 'Week' | 'By staff'>('Day');
  const [selectedDayNum, setSelectedDayNum] = useState('24');

  const days = [
    { day: 'S', num: '23' },
    { day: 'M', num: '24' },
    { day: 'T', num: '25' },
    { day: 'W', num: '26' },
    { day: 'T', num: '27' },
    { day: 'F', num: '28' },
  ];

  const slots = [
    {
      time: '10:00',
      title: 'Hair spa · Rhea',
      meta: 'Sana · 60 min · in progress',
      color: '#0D9488',
      bg: '#E6F7ED',
      staff: 'Sana',
    },
    {
      time: '11:00',
      title: 'Haircut + blow dry · Aarti',
      meta: 'Megha · 45 min',
      color: '#E11D48',
      bg: '#FDF2F7',
      staff: 'Megha',
    },
    {
      time: '12:00',
      isBreak: true,
      title: 'Lunch break',
    },
    {
      time: '1:30',
      title: 'Gel mani + pedi · Divya',
      meta: 'Sana · 90 min',
      color: '#0D9488',
      bg: '#E6F7ED',
      staff: 'Sana',
    },
    {
      time: '4:00',
      title: 'Hair colour · Riya',
      meta: 'Megha · 2 hrs',
      color: '#E11D48',
      bg: '#FDF2F7',
      staff: 'Megha',
    },
    {
      time: '6:00',
      title: 'Mehendi · Pooja',
      meta: 'Awaiting confirmation',
      color: '#D97706',
      bg: '#FEF9EE',
      isDashed: true,
      staff: 'Awaiting',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header (Page 7) */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Calendar</Text>
          <Text style={styles.subtitle}>Monday, 24 Nov</Text>
        </View>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* View Switcher: Day / Week / By staff */}
      <View style={styles.viewSwitcher}>
        {(['Day', 'Week', 'By staff'] as const).map((m) => (
          <TouchableOpacity
            key={m}
            style={[styles.switchTab, viewMode === m && styles.switchTabActive]}
            onPress={() => setViewMode(m)}>
            <Text
              style={[
                styles.switchTabText,
                viewMode === m && styles.switchTabTextActive,
              ]}>
              {m}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Date Row */}
      <View style={styles.dateRow}>
        {days.map((d) => {
          const isSelected = selectedDayNum === d.num;
          return (
            <TouchableOpacity
              key={d.num}
              style={[styles.dateCol, isSelected && styles.dateColActive]}
              onPress={() => setSelectedDayNum(d.num)}>
              <Text style={[styles.dayName, isSelected && styles.dateTextActive]}>
                {d.day}
              </Text>
              <Text style={[styles.dayNum, isSelected && styles.dateTextActive]}>
                {d.num}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Staff Legend */}
      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#E11D48' }]} />
          <Text style={styles.legendText}>Megha</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#0D9488' }]} />
          <Text style={styles.legendText}>Sana</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#D97706' }]} />
          <Text style={styles.legendText}>Awaiting confirm</Text>
        </View>
      </View>

      {/* Slots Timeline */}
      <ScrollView contentContainerStyle={styles.scroll}>
        {slots.map((slot, i) => {
          if (slot.isBreak) {
            return (
              <View key={i} style={styles.breakRow}>
                <Text style={styles.slotTime}>{slot.time}</Text>
                <View style={styles.breakCard}>
                  <Text style={styles.breakText}>{slot.title}</Text>
                </View>
              </View>
            );
          }

          return (
            <View key={i} style={styles.slotRow}>
              <Text style={styles.slotTime}>{slot.time}</Text>
              <View
                style={[
                  styles.slotCard,
                  { backgroundColor: slot.bg },
                  slot.isDashed && styles.slotCardDashed,
                ]}>
                <View
                  style={[
                    styles.slotLeftIndicator,
                    { backgroundColor: slot.color },
                  ]}
                />
                <View style={{ flex: 1, paddingLeft: 12 }}>
                  <Text style={styles.slotTitle}>{slot.title}</Text>
                  <Text style={styles.slotMeta}>{slot.meta}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1E121E',
  },
  subtitle: {
    fontSize: 12,
    color: '#6B5E68',
    marginTop: 2,
  },
  addBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: KalaaColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...KalaaShadow.button,
  },
  viewSwitcher: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 3,
    marginHorizontal: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EFE7E0',
  },
  switchTab: {
    flex: 1,
    paddingVertical: 7,
    alignItems: 'center',
    borderRadius: 16,
  },
  switchTabActive: {
    backgroundColor: '#22122A',
  },
  switchTabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B5E68',
  },
  switchTabTextActive: {
    color: '#FFFFFF',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  dateCol: {
    width: 46,
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFE7E0',
  },
  dateColActive: {
    backgroundColor: KalaaColors.primary,
    borderColor: KalaaColors.primary,
  },
  dayName: {
    fontSize: 11,
    color: '#8A7B87',
  },
  dayNum: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E121E',
    marginTop: 2,
  },
  dateTextActive: {
    color: '#FFFFFF',
  },
  legendRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 14,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 11,
    color: '#6B5E68',
    fontWeight: '600',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 70,
  },
  slotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  slotTime: {
    width: 52,
    fontSize: 13,
    fontWeight: '700',
    color: '#1E121E',
  },
  slotCard: {
    flex: 1,
    borderRadius: 16,
    padding: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  slotCardDashed: {
    borderWidth: 1.5,
    borderColor: '#D97706',
    borderStyle: 'dashed',
  },
  slotLeftIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  slotTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E121E',
  },
  slotMeta: {
    fontSize: 11,
    color: '#6B5E68',
    marginTop: 2,
  },
  breakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  breakCard: {
    flex: 1,
    backgroundColor: '#F3ECE4',
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  breakText: {
    fontSize: 12,
    color: '#8A7B87',
    fontWeight: '600',
  },
});
