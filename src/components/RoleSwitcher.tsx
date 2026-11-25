import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useKalaa } from '@/context/KalaaContext';
import { UserRole } from '@/types/kalaa';
import { KalaaColors } from '@/constants/kalaaTheme';

const ROLES: { id: UserRole; label: string; icon: string }[] = [
  { id: 'customer', label: 'Customer', icon: '🛍️' },
  { id: 'partner', label: 'Salon Partner', icon: '💈' },
  { id: 'staff', label: 'Stylist Staff', icon: '✂️' },
  { id: 'admin', label: 'Admin HQ', icon: '🏢' },
];

export function RoleSwitcher() {
  const { role, setRole } = useKalaa();

  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Text style={styles.badgeLabel}>ROLE SWITCHER</Text>
      </View>
      <View style={styles.row}>
        {ROLES.map((r) => {
          const isActive = role === r.id;
          return (
            <TouchableOpacity
              key={r.id}
              style={[
                styles.tab,
                isActive && styles.activeTab,
              ]}
              onPress={() => setRole(r.id)}
              activeOpacity={0.8}>
              <Text style={styles.icon}>{r.icon}</Text>
              <Text
                style={[
                  styles.label,
                  isActive && styles.activeLabel,
                ]}>
                {r.label}
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
    backgroundColor: '#1C0D22',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#361842',
  },
  badge: {
    alignSelf: 'center',
    backgroundColor: '#351642',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginBottom: 6,
  },
  badgeLabel: {
    color: '#D4AF37',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#271230',
    borderRadius: 12,
    padding: 3,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 9,
    gap: 4,
  },
  activeTab: {
    backgroundColor: KalaaColors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  icon: {
    fontSize: 12,
  },
  label: {
    color: '#BBA4C0',
    fontSize: 11,
    fontWeight: '600',
  },
  activeLabel: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
