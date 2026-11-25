import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { KalaaColors } from '@/constants/kalaaTheme';
import { PartnerOverview } from './PartnerOverview';
import { PartnerCalendar } from './PartnerCalendar';
import { PartnerServices } from './PartnerServices';
import { PartnerTeam } from './PartnerTeam';

export function PartnerPortal() {
  const [activeTab, setActiveTab] = useState<'overview' | 'calendar' | 'services' | 'team'>('overview');

  return (
    <View style={styles.container}>
      <View style={styles.screenContainer}>
        {activeTab === 'overview' && (
          <PartnerOverview
            onNavigateToCalendar={() => setActiveTab('calendar')}
            onNavigateToServices={() => setActiveTab('services')}
          />
        )}
        {activeTab === 'calendar' && <PartnerCalendar />}
        {activeTab === 'services' && <PartnerServices />}
        {activeTab === 'team' && <PartnerTeam />}
      </View>

      {/* Partner Bottom Tabs (Page 6) */}
      <View style={styles.bottomNav}>
        {[
          { id: 'overview', label: 'Overview', icon: 'grid-outline', iconActive: 'grid' },
          { id: 'calendar', label: 'Calendar', icon: 'calendar-outline', iconActive: 'calendar' },
          { id: 'services', label: 'Services', icon: 'cut-outline', iconActive: 'cut' },
          { id: 'team', label: 'Team', icon: 'people-outline', iconActive: 'people' },
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
                color={isActive ? KalaaColors.primary : '#8A7B87'}
              />
              <Text
                style={[
                  styles.navLabel,
                  isActive && styles.navLabelActive,
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
  navLabelActive: {
    color: KalaaColors.primary,
    fontWeight: '800',
  },
});
