import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { KalaaColors, KalaaShadow } from '@/constants/kalaaTheme';
import { useKalaa } from '@/context/KalaaContext';

export function PartnerTeam() {
  const { salons } = useKalaa();
  const currentSalon = salons[0];
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('Stylist');

  return (
    <View style={styles.container}>
      {/* Header (Page 25) */}
      <View style={styles.header}>
        <Text style={styles.title}>Team & staff</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setInviteModalVisible(true)}>
          <Ionicons name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {currentSalon.staff.map((stylist) => (
          <View key={stylist.id} style={styles.card}>
            <View
              style={[
                styles.avatar,
                { backgroundColor: stylist.avatarColor },
              ]}>
              <Text style={styles.avatarText}>{stylist.name.charAt(0)}</Text>
            </View>

            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={styles.name}>{stylist.name}</Text>
              <Text style={styles.role}>{stylist.role}</Text>
              <View style={styles.tagsRow}>
                <View style={[styles.tagPill, { backgroundColor: '#F3EEFB' }]}>
                  <Text style={[styles.tagText, { color: '#7C3AED' }]}>
                    Professional
                  </Text>
                </View>
                {stylist.services.map((s) => (
                  <View key={s} style={[styles.tagPill, { backgroundColor: '#FDF2F7' }]}>
                    <Text style={[styles.tagText, { color: KalaaColors.primary }]}>
                      {s}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.todayCountBox}>
              <Text style={styles.todayNum}>{stylist.todayAppointmentsCount}</Text>
              <Text style={styles.todayLabel}>today</Text>
            </View>
          </View>
        ))}

        {/* Roles & Permissions Card */}
        <View style={styles.rolesCard}>
          <Text style={styles.rolesHeading}>Roles & permissions</Text>
          <View style={styles.roleBullet}>
            <Text style={styles.roleTitle}>Owner</Text>
            <Text style={styles.roleDesc}>· full access across all branches</Text>
          </View>
          <View style={styles.roleBullet}>
            <Text style={styles.roleTitle}>Manager / Reception</Text>
            <Text style={styles.roleDesc}>· calendar, checkout, no finance</Text>
          </View>
          <View style={styles.roleBullet}>
            <Text style={styles.roleTitle}>Professional</Text>
            <Text style={styles.roleDesc}>· own bookings and assigned clients only</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.inviteDashedBtn}
          onPress={() => setInviteModalVisible(true)}>
          <Text style={styles.inviteDashedText}>+ Invite a team member</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Invite Modal */}
      <Modal visible={inviteModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.sheetHeader}>
              <TouchableOpacity
                style={styles.circleBtn}
                onPress={() => setInviteModalVisible(false)}>
                <Ionicons name="close" size={20} color="#1E121E" />
              </TouchableOpacity>
              <Text style={styles.sheetTitle}>Invite team member</Text>
              <View style={{ width: 36 }} />
            </View>

            <View style={{ padding: 20 }}>
              <Text style={styles.fieldLabel}>Full name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Megha Sharma"
                value={name}
                onChangeText={setName}
              />

              <Text style={[styles.fieldLabel, { marginTop: 14 }]}>
                Phone number
              </Text>
              <TextInput
                style={styles.input}
                placeholder="+91 98765 43210"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />

              <Text style={[styles.fieldLabel, { marginTop: 14 }]}>Role</Text>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                {['Senior Stylist', 'Nail Tech', 'Reception'].map((r) => (
                  <TouchableOpacity
                    key={r}
                    style={[
                      styles.rolePill,
                      role === r && styles.rolePillActive,
                    ]}
                    onPress={() => setRole(r)}>
                    <Text
                      style={[
                        styles.rolePillText,
                        role === r && styles.rolePillTextActive,
                      ]}>
                      {r}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={styles.sendInviteBtn}
                onPress={() => setInviteModalVisible(false)}>
                <Text style={styles.sendInviteText}>Send Invite via SMS</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  addBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: KalaaColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...KalaaShadow.button,
  },
  scroll: {
    padding: 16,
    paddingBottom: 70,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EFE7E0',
    ...KalaaShadow.soft,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  name: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E121E',
  },
  role: {
    fontSize: 12,
    color: '#6B5E68',
    marginTop: 2,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 6,
  },
  tagPill: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
  },
  todayCountBox: {
    alignItems: 'center',
    minWidth: 40,
  },
  todayNum: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F766E',
  },
  todayLabel: {
    fontSize: 10,
    color: '#8A7B87',
  },
  rolesCard: {
    backgroundColor: '#22122A',
    borderRadius: 18,
    padding: 18,
    marginTop: 8,
    marginBottom: 14,
  },
  rolesHeading: {
    color: '#E5A024',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 10,
  },
  roleBullet: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  roleTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  roleDesc: {
    color: '#C4AECD',
    fontSize: 12,
    flex: 1,
  },
  inviteDashedBtn: {
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#DFD5CD',
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  inviteDashedText: {
    color: KalaaColors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(20, 10, 24, 0.75)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#FFFBF8',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFE7E0',
  },
  circleBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3ECE4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E121E',
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E121E',
    marginBottom: 6,
  },
  input: {
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EFE7E0',
    paddingHorizontal: 14,
    fontSize: 14,
  },
  rolePill: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFE7E0',
    alignItems: 'center',
  },
  rolePillActive: {
    backgroundColor: KalaaColors.primary,
    borderColor: KalaaColors.primary,
  },
  rolePillText: {
    fontSize: 12,
    color: '#1E121E',
    fontWeight: '600',
  },
  rolePillTextActive: {
    color: '#FFFFFF',
  },
  sendInviteBtn: {
    backgroundColor: KalaaColors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  sendInviteText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
