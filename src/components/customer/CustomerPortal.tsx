import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { KalaaColors } from '@/constants/kalaaTheme';
import { CustomerHome } from './CustomerHome';
import { CustomerExplore } from './CustomerExplore';
import { CustomerBookings } from './CustomerBookings';
import { CustomerProfile } from './CustomerProfile';

export function CustomerPortal() {
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'bookings' | 'profile'>('home');

  return (
    <View style={styles.container}>
      {/* Current Screen Body */}
      <View style={styles.screenContainer}>
        {activeTab === 'home' && (
          <CustomerHome onNavigateToTab={(tab) => setActiveTab(tab)} />
        )}
        {activeTab === 'explore' && <CustomerExplore />}
        {activeTab === 'bookings' && <CustomerBookings />}
        {activeTab === 'profile' && (
          <CustomerProfile onNavigateToBookings={() => setActiveTab('bookings')} />
        )}
      </View>

      {/* Bottom Navigation Bar matching PDF (Page 2) */}
      <View style={styles.bottomNav}>
        {[
          { id: 'home', label: 'Home', icon: 'home-outline', iconActive: 'home' },
          { id: 'explore', label: 'Explore', icon: 'search-outline', iconActive: 'search' },
          { id: 'bookings', label: 'Bookings', icon: 'calendar-outline', iconActive: 'calendar' },
          { id: 'profile', label: 'Profile', icon: 'person-outline', iconActive: 'person' },
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 4,
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
