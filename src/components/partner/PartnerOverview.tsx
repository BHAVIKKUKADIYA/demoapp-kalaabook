import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { KalaaColors, KalaaShadow } from '@/constants/kalaaTheme';
import { useKalaa } from '@/context/KalaaContext';
import { PartnerPOS } from './PartnerPOS';

export function PartnerOverview({
  onNavigateToCalendar,
  onNavigateToServices,
}: {
  onNavigateToCalendar: () => void;
  onNavigateToServices: () => void;
}) {
  const { bookings, updateBookingStatus } = useKalaa();
  const [posModalVisible, setPosModalVisible] = useState(false);
  const [selectedBookingForPOS, setSelectedBookingForPOS] = useState<any>(null);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Salon Owner Header (Page 6) */}
        <View style={styles.header}>
          <View style={styles.headerUser}>
            <View style={styles.ownerAvatar}>
              <Text style={styles.ownerAvatarText}>G</Text>
            </View>
            <View>
              <Text style={styles.salonTitle}>Glow Studio</Text>
              <Text style={styles.ownerMeta}>Bandra · Owner</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationBtn}>
            <Ionicons name="notifications-outline" size={20} color="#1E121E" />
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>

        {/* 3 Metric Cards: Revenue / Bookings / Rating */}
        <View style={styles.metricsRow}>
          <View style={[styles.metricCard, { backgroundColor: KalaaColors.primary }]}>
            <View style={styles.metricIconWrap}>
              <Ionicons name="wallet-outline" size={16} color="#FFF" />
              <Text style={styles.metricLabelLight}>Revenue</Text>
            </View>
            <Text style={styles.metricValLight}>₹48,260</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricIconWrap}>
              <Ionicons name="calendar-outline" size={16} color="#9E1B4F" />
              <Text style={styles.metricLabel}>Bookings</Text>
            </View>
            <Text style={styles.metricVal}>64</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricIconWrap}>
              <Ionicons name="star" size={16} color="#D97706" />
              <Text style={styles.metricLabel}>Rating</Text>
            </View>
            <Text style={styles.metricVal}>4.7 ★</Text>
          </View>
        </View>

        {/* Pending Requests Alert */}
        <View style={styles.alertCard}>
          <View style={styles.alertBadge}>
            <Text style={styles.alertBadgeText}>3</Text>
          </View>
          <View style={{ flex: 1, marginHorizontal: 12 }}>
            <Text style={styles.alertTitle}>3 requests awaiting confirmation</Text>
          </View>
          <TouchableOpacity style={styles.alertActionBtn} onPress={onNavigateToCalendar}>
            <Text style={styles.alertActionText}>Review</Text>
          </TouchableOpacity>
        </View>

        {/* Weekly Revenue Bar Chart */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>This week</Text>
            <Text style={styles.chartMeta}>Mon to Sun</Text>
          </View>
          <View style={styles.barsContainer}>
            {[
              { day: 'M', height: 45, isPeak: false },
              { day: 'T', height: 60, isPeak: false },
              { day: 'W', height: 35, isPeak: false },
              { day: 'T', height: 75, isPeak: false },
              { day: 'F', height: 100, isPeak: true },
              { day: 'S', height: 55, isPeak: false },
              { day: 'S', height: 40, isDashed: true },
            ].map((bar, i) => (
              <View key={i} style={styles.barCol}>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.barFill,
                      { height: `${bar.height}%` },
                      bar.isPeak
                        ? { backgroundColor: KalaaColors.primary }
                        : bar.isDashed
                        ? {
                            backgroundColor: 'transparent',
                            borderWidth: 1.5,
                            borderColor: '#D4C5C0',
                            borderStyle: 'dashed',
                          }
                        : { backgroundColor: '#F3A6C2' },
                    ]}
                  />
                </View>
                <Text
                  style={[
                    styles.barDayText,
                    bar.isPeak && { color: KalaaColors.primary, fontWeight: '800' },
                  ]}>
                  {bar.day}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Action Buttons */}
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity
            style={styles.actionPill}
            onPress={() => onNavigateToServices()}>
            <View style={[styles.actionIconBox, { backgroundColor: '#FDF2F7' }]}>
              <Ionicons name="add" size={22} color={KalaaColors.primary} />
            </View>
            <Text style={styles.actionLabel}>Add service</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionPill}>
            <View style={[styles.actionIconBox, { backgroundColor: '#F3EEFB' }]}>
              <Ionicons name="ban-outline" size={20} color="#7C3AED" />
            </View>
            <Text style={styles.actionLabel}>Block slot</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionPill}
            onPress={onNavigateToCalendar}>
            <View style={[styles.actionIconBox, { backgroundColor: '#EEF9F5' }]}>
              <Ionicons name="people-outline" size={20} color="#0D9488" />
            </View>
            <Text style={styles.actionLabel}>Staff</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionPill}
            onPress={() => {
              setSelectedBookingForPOS(bookings[0]);
              setPosModalVisible(true);
            }}>
            <View style={[styles.actionIconBox, { backgroundColor: '#FEF9EE' }]}>
              <Ionicons name="card-outline" size={20} color="#D97706" />
            </View>
            <Text style={styles.actionLabel}>Checkout</Text>
          </TouchableOpacity>
        </View>

        {/* Today's Bookings List */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Today's bookings</Text>
          <TouchableOpacity onPress={onNavigateToCalendar}>
            <Text style={styles.calendarLink}>Calendar</Text>
          </TouchableOpacity>
        </View>

        {/* Live Appointment Cards */}
        {[
          {
            time: '11:00',
            service: 'Haircut + blow dry',
            client: 'Aarti · with Megha',
            status: 'Checked in',
            statusColor: '#0F766E',
            statusBg: '#E6F7ED',
          },
          {
            time: '1:30',
            service: 'Gel mani + pedi',
            client: 'Divya · with Sana',
            status: 'Confirmed',
            statusColor: '#D97706',
            statusBg: '#FEF3C7',
          },
          {
            time: '4:00',
            service: 'Hair colour',
            client: 'Riya · with Megha',
            status: 'Confirmed',
            statusColor: '#D97706',
            statusBg: '#FEF3C7',
          },
        ].map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.appointmentCard}
            onPress={() => {
              setSelectedBookingForPOS(bookings[0]);
              setPosModalVisible(true);
            }}>
            <Text style={styles.apptTime}>{item.time}</Text>
            <View style={styles.apptBar} />
            <View style={{ flex: 1, marginHorizontal: 12 }}>
              <Text style={styles.apptService}>{item.service}</Text>
              <Text style={styles.apptClient}>{item.client}</Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: item.statusBg },
              ]}>
              <Text style={[styles.statusText, { color: item.statusColor }]}>
                {item.status}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* POS Checkout Modal (Page 8, 22) */}
      <PartnerPOS
        visible={posModalVisible}
        booking={selectedBookingForPOS}
        onClose={() => setPosModalVisible(false)}
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
  ownerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#9E1B4F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ownerAvatarText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
  },
  salonTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E121E',
  },
  ownerMeta: {
    fontSize: 12,
    color: '#6B5E68',
    marginTop: 2,
  },
  notificationBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFE7E0',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notifDot: {
    position: 'absolute',
    top: 8,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: KalaaColors.primary,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
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
  metricLabelLight: {
    fontSize: 11,
    color: '#FFE4EF',
    fontWeight: '600',
  },
  metricVal: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E121E',
  },
  metricValLight: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF9EE',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  alertBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#D97706',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertBadgeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  alertTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#92400E',
  },
  alertActionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  alertActionText: {
    color: '#B45309',
    fontSize: 13,
    fontWeight: '800',
  },
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EFE7E0',
    ...KalaaShadow.soft,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E121E',
  },
  chartMeta: {
    fontSize: 12,
    color: '#8A7B87',
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 100,
    alignItems: 'flex-end',
    paddingHorizontal: 8,
  },
  barCol: {
    alignItems: 'center',
    width: 24,
    height: '100%',
    justifyContent: 'flex-end',
  },
  barTrack: {
    height: 80,
    width: 18,
    justifyContent: 'flex-end',
  },
  barFill: {
    width: '100%',
    borderRadius: 6,
  },
  barDayText: {
    fontSize: 11,
    color: '#8A7B87',
    marginTop: 6,
    fontWeight: '600',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionPill: {
    alignItems: 'center',
    width: '23%',
  },
  actionIconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#EFE7E0',
  },
  actionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#3B2939',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E121E',
  },
  calendarLink: {
    color: KalaaColors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  appointmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EFE7E0',
  },
  apptTime: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E121E',
    width: 48,
  },
  apptBar: {
    width: 3,
    height: 32,
    borderRadius: 1.5,
    backgroundColor: KalaaColors.primary,
  },
  apptService: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E121E',
  },
  apptClient: {
    fontSize: 12,
    color: '#6B5E68',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
