import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

import { KalaaProvider, useKalaa } from '@/context/KalaaContext';
import { RoleSwitcher } from '@/components/RoleSwitcher';
import { CustomerPortal } from '@/components/customer/CustomerPortal';
import { PartnerPortal } from '@/components/partner/PartnerPortal';
import { StaffPortal } from '@/components/staff/StaffPortal';
import { AdminPortal } from '@/components/admin/AdminPortal';

function KalaaMainApp() {
  const { role } = useKalaa();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar style="light" />

      {/* Role Switcher Pill Bar at the Top */}
      <RoleSwitcher />

      {/* Dynamic Portal View based on Selected Role */}
      <View style={styles.body}>
        {role === 'customer' && <CustomerPortal />}
        {role === 'partner' && <PartnerPortal />}
        {role === 'staff' && <StaffPortal />}
        {role === 'admin' && <AdminPortal />}
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <KalaaProvider>
      <KalaaMainApp />
    </KalaaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1C0D22',
  },
  body: {
    flex: 1,
    backgroundColor: '#FFFBF8',
  },
});
