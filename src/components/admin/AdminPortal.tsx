import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { KalaaColors } from '@/constants/kalaaTheme';
import { AdminOverview } from './AdminOverview';
import { AdminApprovals } from './AdminApprovals';
import { AdminDisputes } from './AdminDisputes';

export function AdminPortal() {
  const [activeTab, setActiveTab] = useState<'overview' | 'approvals' | 'disputes'>('overview');

  return (
    <View style={styles.container}>
      <View style={styles.screenContainer}>
        {activeTab === 'overview' && (
          <AdminOverview
            onNavigateToApprovals={() => setActiveTab('approvals')}
            onNavigateToDisputes={() => setActiveTab('disputes')}
          />
        )}
        {activeTab === 'approvals' && <AdminApprovals />}
        {activeTab === 'disputes' && <AdminDisputes />}
      </View>

      {/* Admin Bottom Nav */}
      <View style={styles.bottomNav}>
        {[
          { id: 'overview', label: 'Console', icon: 'speedometer-outline', iconActive: 'speedometer' },
          { id: 'approvals', label: 'Approvals', icon: 'shield-checkmark-outline', iconActive: 'shield-checkmark' },
          { id: 'disputes', label: 'Disputes', icon: 'alert-circle-outline', iconActive: 'alert-circle' },
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
                  isActive && { color: KalaaColors.primary, fontWeight: '800' },
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
});
