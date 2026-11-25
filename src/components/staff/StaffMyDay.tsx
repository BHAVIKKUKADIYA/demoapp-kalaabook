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
import { StaffExecutionModal } from './StaffExecutionModal';

export function StaffMyDay({
  stylistName,
  onSwitchStaff,
}: {
  stylistName: string;
  onSwitchStaff: () => void;
}) {
  const [executionVisible, setExecutionVisible] = useState(false);
  const [appointmentCompleted, setAppointmentCompleted] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Header (Page 9) */}
        <View style={styles.header}>
          <View style={styles.headerUser}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{stylistName.charAt(0)}</Text>
            </View>
            <View>
              <Text style={styles.greeting}>Hi, {stylistName}</Text>
              <Text style={styles.meta}>Monday 24 Nov · your day</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.switchStaffBtn} onPress={onSwitchStaff}>
            <Ionicons name="swap-horizontal" size={16} color="#0F766E" />
            <Text style={styles.switchStaffText}>Switch</Text>
          </TouchableOpacity>
        </View>

        {/* 3 Metric Badges: Appts (4) / Done (1) / Est. earn (₹1,860) */}
        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <View style={styles.metricIconWrap}>
              <Ionicons name="calendar-outline" size={14} color="#6B5E68" />
              <Text style={styles.metricLabel}>Appts</Text>
            </View>
            <Text style={styles.metricVal}>4</Text>
          </View>

          <View style={[styles.metricCard, { backgroundColor: '#E6F7ED' }]}>
            <View style={styles.metricIconWrap}>
              <Ionicons name="checkmark" size={14} color="#0F766E" />
              <Text style={[styles.metricLabel, { color: '#0F766E' }]}>Done</Text>
            </View>
            <Text style={[styles.metricVal, { color: '#0F766E' }]}>
              {appointmentCompleted ? '2' : '1'}
            </Text>
          </View>

          <View style={[styles.metricCard, { backgroundColor: '#FEF9EE' }]}>
            <View style={styles.metricIconWrap}>
              <Ionicons name="wallet-outline" size={14} color="#D97706" />
              <Text style={[styles.metricLabel, { color: '#D97706' }]}>Est. earn</Text>
            </View>
            <Text style={[styles.metricVal, { color: '#B45309' }]}>₹1,860</Text>
          </View>
        </View>

        {/* Next up Hero Card (Page 9) */}
        <View style={styles.nextUpCard}>
          <View style={styles.nextUpTag}>
            <Text style={styles.nextUpTagText}>Next up · 11:00</Text>
          </View>
          <Text style={styles.nextUpService}>Haircut + blow dry</Text>
          <Text style={styles.nextUpClient}>Aarti · Station 1 · 45 min</Text>

          <TouchableOpacity
            style={styles.openApptBtn}
            onPress={() => setExecutionVisible(true)}>
            <Text style={styles.openApptText}>Open appointment</Text>
          </TouchableOpacity>
        </View>

        {/* Later Today Queue */}
        <Text style={styles.sectionTitle}>Later today</Text>

        <View style={styles.queueCard}>
          <Text style={styles.queueTime}>4:00</Text>
          <View style={[styles.queueBar, { backgroundColor: KalaaColors.primary }]} />
          <View style={{ flex: 1, marginHorizontal: 12 }}>
            <Text style={styles.queueService}>Hair colour + wash</Text>
            <Text style={styles.queueClient}>Riya · 2 hrs</Text>
          </View>
          <View style={styles.confirmedBadge}>
            <Text style={styles.confirmedText}>Confirmed</Text>
          </View>
        </View>

        <View style={styles.queueCard}>
          <Text style={styles.queueTime}>6:00</Text>
          <View style={[styles.queueBar, { backgroundColor: '#D97706' }]} />
          <View style={{ flex: 1, marginHorizontal: 12 }}>
            <Text style={styles.queueService}>Mehendi · party</Text>
            <Text style={styles.queueClient}>Pooja</Text>
          </View>
          <View style={styles.awaitingBadge}>
            <Text style={styles.awaitingText}>Awaiting</Text>
          </View>
        </View>
      </ScrollView>

      {/* Appointment Live Execution Modal */}
      <StaffExecutionModal
        visible={executionVisible}
        onClose={() => setExecutionVisible(false)}
        onComplete={() => {
          setExecutionVisible(false);
          setAppointmentCompleted(true);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF8',
  },
  scroll: {
    padding: 16,
    paddingBottom: 70,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerUser: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0F766E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
  },
  greeting: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E121E',
  },
  meta: {
    fontSize: 12,
    color: '#6B5E68',
    marginTop: 2,
  },
  switchStaffBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: '#E6F7ED',
  },
  switchStaffText: {
    color: '#0F766E',
    fontSize: 12,
    fontWeight: '700',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EFE7E0',
    ...KalaaShadow.soft,
  },
  metricIconWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  metricLabel: {
    fontSize: 11,
    color: '#6B5E68',
    fontWeight: '600',
  },
  metricVal: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E121E',
  },
  nextUpCard: {
    backgroundColor: '#22122A',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    ...KalaaShadow.medium,
  },
  nextUpTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5A024',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 10,
  },
  nextUpTagText: {
    color: '#1E121E',
    fontSize: 11,
    fontWeight: '800',
  },
  nextUpService: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
  },
  nextUpClient: {
    color: '#C4AECD',
    fontSize: 13,
    marginTop: 4,
    marginBottom: 18,
  },
  openApptBtn: {
    backgroundColor: KalaaColors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    ...KalaaShadow.button,
  },
  openApptText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E121E',
    marginBottom: 12,
  },
  queueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EFE7E0',
  },
  queueTime: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E121E',
    width: 48,
  },
  queueBar: {
    width: 3,
    height: 32,
    borderRadius: 1.5,
  },
  queueService: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E121E',
  },
  queueClient: {
    fontSize: 12,
    color: '#6B5E68',
    marginTop: 2,
  },
  confirmedBadge: {
    backgroundColor: '#E6F7ED',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  confirmedText: {
    color: '#0F766E',
    fontSize: 11,
    fontWeight: '700',
  },
  awaitingBadge: {
    backgroundColor: '#FEF9EE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  awaitingText: {
    color: '#D97706',
    fontSize: 11,
    fontWeight: '700',
  },
});
