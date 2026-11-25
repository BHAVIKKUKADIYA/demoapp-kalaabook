import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { KalaaColors } from '@/constants/kalaaTheme';
import { StaffSignIn } from './StaffSignIn';
import { StaffMyDay } from './StaffMyDay';

export function StaffPortal() {
  const [signedInStaff, setSignedInStaff] = useState<string | null>('Megha');
  const [activeTab, setActiveTab] = useState<'myday' | 'appointments' | 'earnings'>('myday');

  if (!signedInStaff) {
    return <StaffSignIn onSuccess={(staff) => setSignedInStaff(staff)} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.screenContainer}>
        {activeTab === 'myday' && (
          <StaffMyDay
            stylistName={signedInStaff}
            onSwitchStaff={() => setSignedInStaff(null)}
          />
        )}

        {/* Appointments List Tab (Page 31) */}
        {activeTab === 'appointments' && (
          <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>My appointments</Text>
            <View style={styles.statsRowMini}>
              <View style={styles.miniStatCard}>
                <Text style={styles.miniStatNum}>4</Text>
                <Text style={styles.miniStatLabel}>Today</Text>
              </View>
              <View style={[styles.miniStatCard, { backgroundColor: '#E6F7ED' }]}>
                <Text style={[styles.miniStatNum, { color: '#0F766E' }]}>1</Text>
                <Text style={[styles.miniStatLabel, { color: '#0F766E' }]}>Done</Text>
              </View>
              <View style={[styles.miniStatCard, { backgroundColor: '#FEF9EE' }]}>
                <Text style={[styles.miniStatNum, { color: '#D97706' }]}>11:00</Text>
                <Text style={[styles.miniStatLabel, { color: '#D97706' }]}>Next</Text>
              </View>
            </View>

            {[
              { time: '10:00', title: 'Hair spa · Rhea', meta: '60 min · Station 1', status: 'Done', color: '#0F766E', bg: '#E6F7ED' },
              { time: '11:00', title: 'Haircut + blow dry · Aarti', meta: '45 min · Station 1 · now', status: 'Next', color: '#FFF', bg: KalaaColors.primary },
              { time: '1:30', title: 'Gel mani + pedi · Divya', meta: '90 min · Station 2', status: 'Confirmed', color: '#D97706', bg: '#FEF9EE' },
              { time: '4:00', title: 'Hair colour · Riya', meta: '2 hrs · Station 2', status: 'Confirmed', color: '#D97706', bg: '#FEF9EE' },
            ].map((item, idx) => (
              <View key={idx} style={styles.apptRowCard}>
                <Text style={styles.apptTime}>{item.time}</Text>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.apptTitle}>{item.title}</Text>
                  <Text style={styles.apptMeta}>{item.meta}</Text>
                </View>
                <View style={[styles.badge, { backgroundColor: item.bg }]}>
                  <Text style={[styles.badgeText, { color: item.color }]}>{item.status}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Staff Earnings Tab (Page 34) */}
        {activeTab === 'earnings' && (
          <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>My earnings</Text>
            <View style={styles.earningsHero}>
              <Text style={styles.earningsHeroLabel}>Earnings this week</Text>
              <Text style={styles.earningsHeroVal}>₹9,860</Text>
              <View style={styles.earningsBreakdown}>
                <View style={styles.earnCol}>
                  <Text style={styles.earnColVal}>₹8,120</Text>
                  <Text style={styles.earnColLabel}>Commission</Text>
                </View>
                <View style={styles.earnCol}>
                  <Text style={styles.earnColVal}>₹1,740</Text>
                  <Text style={styles.earnColLabel}>Tips</Text>
                </View>
                <View style={styles.earnCol}>
                  <Text style={styles.earnColVal}>14</Text>
                  <Text style={styles.earnColLabel}>Services</Text>
                </View>
              </View>
            </View>

            <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Completed services</Text>
            {[
              { name: 'Hair spa · Rhea', time: 'Mon 10:00', amount: '₹390' },
              { name: 'Haircut · Aarti', time: 'Mon 11:00', amount: '₹240' },
              { name: 'Hair colour · Priya', time: 'Sun 3:00', amount: '₹750' },
            ].map((s, i) => (
              <View key={i} style={styles.completedServiceRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.completedServiceName}>{s.name}</Text>
                  <Text style={styles.completedServiceTime}>{s.time}</Text>
                </View>
                <Text style={styles.completedServiceAmount}>{s.amount}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Staff Bottom Tabs */}
      <View style={styles.bottomNav}>
        {[
          { id: 'myday', label: 'My day', icon: 'sunny-outline', iconActive: 'sunny' },
          { id: 'appointments', label: 'Appointments', icon: 'calendar-outline', iconActive: 'calendar' },
          { id: 'earnings', label: 'Earnings', icon: 'cash-outline', iconActive: 'cash' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.navItem}
              onPress={() => setActiveTab(tab.id as any)}
              activeOpacity={0.8}>
              <Ionicons
                name={(isActive ? tab.iconActive : tab.icon) as any}
                size={22}
                color={isActive ? '#0F766E' : '#8A7B87'}
              />
              <Text
                style={[
                  styles.navLabel,
                  isActive && { color: '#0F766E', fontWeight: '800' },
                ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF8',
  },
  screenContainer: {
    flex: 1,
  },
  tabContent: {
    padding: 20,
  },
  tabTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1E121E',
    marginBottom: 14,
  },
  statsRowMini: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  miniStatCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EFE7E0',
    alignItems: 'center',
  },
  miniStatNum: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E121E',
  },
  miniStatLabel: {
    fontSize: 11,
    color: '#6B5E68',
    marginTop: 2,
    fontWeight: '600',
  },
  apptRowCard: {
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
  apptTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E121E',
  },
  apptMeta: {
    fontSize: 12,
    color: '#6B5E68',
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  earningsHero: {
    backgroundColor: '#0F766E',
    borderRadius: 20,
    padding: 22,
    alignItems: 'center',
    marginBottom: 16,
  },
  earningsHeroLabel: {
    color: '#CCFBF1',
    fontSize: 13,
  },
  earningsHeroVal: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '900',
    marginTop: 4,
  },
  earningsBreakdown: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 14,
    padding: 12,
    marginTop: 16,
  },
  earnCol: {
    flex: 1,
    alignItems: 'center',
  },
  earnColVal: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  earnColLabel: {
    color: '#CCFBF1',
    fontSize: 11,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E121E',
    marginBottom: 10,
  },
  completedServiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#EFE7E0',
  },
  completedServiceName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E121E',
  },
  completedServiceTime: {
    fontSize: 12,
    color: '#6B5E68',
    marginTop: 2,
  },
  completedServiceAmount: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F766E',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EFE7E0',
    paddingVertical: 8,
    paddingBottom: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 3,
  },
  navLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8A7B87',
  },
});
