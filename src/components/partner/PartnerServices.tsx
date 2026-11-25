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
import { ServiceItem } from '@/types/kalaa';

export function PartnerServices() {
  const { salons, addServiceToSalon } = useKalaa();
  const currentSalon = salons[0]; // Glow Studio
  const [activeTab, setActiveTab] = useState<'Services' | 'Staff' | 'Timings' | 'Policies'>('Services');

  // Add Service Modal (Page 24)
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'Hair' | 'Nails' | 'Mehendi' | 'Spa'>('Hair');
  const [duration, setDuration] = useState('45 min');
  const [price, setPrice] = useState('799');
  const [assignedStaff, setAssignedStaff] = useState('All staff');
  const [atSalon, setAtSalon] = useState(true);
  const [homeVisit, setHomeVisit] = useState(true);

  const handleSaveService = () => {
    if (!name.trim()) return;
    const newService: ServiceItem = {
      id: Date.now().toString(),
      name: name.trim(),
      category: category as any,
      duration,
      price: parseInt(price, 10) || 500,
      homeVisitAvailable: homeVisit,
      assignedStaff: [assignedStaff],
    };
    addServiceToSalon(currentSalon.id, newService);
    setName('');
    setAddModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Header (Page 23) */}
      <View style={styles.header}>
        <Text style={styles.title}>Services & menu</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setAddModalVisible(true)}>
          <Ionicons name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        {(['Services', 'Staff', 'Timings', 'Policies'] as const).map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tabBtn, activeTab === t && styles.tabBtnActive]}
            onPress={() => setActiveTab(t)}>
            <Text
              style={[styles.tabText, activeTab === t && styles.tabTextActive]}>
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Hair Section */}
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryTitle}>Hair</Text>
          <Text style={styles.categoryCount}>· {currentSalon.services.filter((s) => s.category === 'Hair').length}</Text>
        </View>

        {currentSalon.services
          .filter((s) => s.category === 'Hair')
          .map((service) => (
            <View key={service.id} style={styles.serviceRow}>
              <View style={styles.serviceIconWrap}>
                <Text style={{ fontSize: 18 }}>✂️</Text>
              </View>
              <View style={{ flex: 1, marginHorizontal: 12 }}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceMeta}>
                  {service.duration} · {service.assignedStaff?.join(', ') || 'all staff'}
                </Text>
              </View>
              <Text style={styles.servicePrice}>₹{service.price}</Text>
              <TouchableOpacity style={styles.editBtn}>
                <Ionicons name="pencil" size={16} color={KalaaColors.primary} />
              </TouchableOpacity>
            </View>
          ))}

        {/* Nails & Others */}
        <View style={[styles.categoryHeader, { marginTop: 18 }]}>
          <Text style={styles.categoryTitle}>Nails & Other Services</Text>
          <Text style={styles.categoryCount}>· {currentSalon.services.filter((s) => s.category !== 'Hair').length}</Text>
        </View>

        {currentSalon.services
          .filter((s) => s.category !== 'Hair')
          .map((service) => (
            <View key={service.id} style={styles.serviceRow}>
              <View style={styles.serviceIconWrap}>
                <Text style={{ fontSize: 18 }}>💅</Text>
              </View>
              <View style={{ flex: 1, marginHorizontal: 12 }}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceMeta}>
                  {service.duration} · {service.assignedStaff?.join(', ') || 'Sana'}
                </Text>
              </View>
              <Text style={styles.servicePrice}>₹{service.price}</Text>
              <TouchableOpacity style={styles.editBtn}>
                <Ionicons name="pencil" size={16} color={KalaaColors.primary} />
              </TouchableOpacity>
            </View>
          ))}

        <TouchableOpacity
          style={styles.addDashedBtn}
          onPress={() => setAddModalVisible(true)}>
          <Text style={styles.addDashedText}>+ Add a new service</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ADD SERVICE MODAL (Page 24) */}
      <Modal visible={addModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.sheetHeader}>
              <TouchableOpacity
                style={styles.circleBtn}
                onPress={() => setAddModalVisible(false)}>
                <Ionicons name="close" size={20} color="#1E121E" />
              </TouchableOpacity>
              <Text style={styles.sheetTitle}>Add a service</Text>
              <View style={{ width: 36 }} />
            </View>

            <ScrollView contentContainerStyle={{ padding: 20 }}>
              <Text style={styles.fieldLabel}>Service name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Haircut + blow dry"
                value={name}
                onChangeText={setName}
              />

              <View style={{ flexDirection: 'row', gap: 12, marginTop: 14 }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.fieldLabel}>Category</Text>
                  <View style={styles.categoryRowPills}>
                    {(['Hair', 'Nails', 'Mehendi'] as const).map((c) => (
                      <TouchableOpacity
                        key={c}
                        style={[
                          styles.catPill,
                          category === c && styles.catPillActive,
                        ]}
                        onPress={() => setCategory(c)}>
                        <Text
                          style={[
                            styles.catPillText,
                            category === c && styles.catPillTextActive,
                          ]}>
                          {c}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={{ width: 110 }}>
                  <Text style={styles.fieldLabel}>Price (₹)</Text>
                  <TextInput
                    style={styles.input}
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <Text style={[styles.fieldLabel, { marginTop: 16 }]}>
                Who can do it
              </Text>
              <View style={styles.staffPillsRow}>
                {['All staff', 'Megha', 'Sana'].map((s) => (
                  <TouchableOpacity
                    key={s}
                    style={[
                      styles.staffPill,
                      assignedStaff === s && styles.staffPillActive,
                    ]}
                    onPress={() => setAssignedStaff(s)}>
                    <Text
                      style={[
                        styles.staffPillText,
                        assignedStaff === s && styles.staffPillTextActive,
                      ]}>
                      {s} {assignedStaff === s ? '✓' : ''}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={[styles.fieldLabel, { marginTop: 16 }]}>
                Available for
              </Text>
              <View style={styles.staffPillsRow}>
                <TouchableOpacity
                  style={[styles.staffPill, atSalon && styles.staffPillActive]}
                  onPress={() => setAtSalon(!atSalon)}>
                  <Text
                    style={[
                      styles.staffPillText,
                      atSalon && styles.staffPillTextActive,
                    ]}>
                    At salon {atSalon ? '✓' : ''}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.staffPill, homeVisit && styles.staffPillActive]}
                  onPress={() => setHomeVisit(!homeVisit)}>
                  <Text
                    style={[
                      styles.staffPillText,
                      homeVisit && styles.staffPillTextActive,
                    ]}>
                    Home visit {homeVisit ? '✓' : ''}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

            <View style={styles.sheetFooter}>
              <TouchableOpacity
                style={styles.saveServiceBtn}
                onPress={handleSaveService}>
                <Text style={styles.saveServiceText}>Save service</Text>
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
    paddingBottom: 8,
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
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EFE7E0',
    marginBottom: 10,
  },
  tabBtn: {
    paddingVertical: 12,
    marginRight: 20,
  },
  tabBtnActive: {
    borderBottomWidth: 2.5,
    borderBottomColor: KalaaColors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B5E68',
  },
  tabTextActive: {
    color: KalaaColors.primary,
    fontWeight: '700',
  },
  scroll: {
    padding: 16,
    paddingBottom: 70,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E121E',
  },
  categoryCount: {
    fontSize: 13,
    color: '#6B5E68',
    marginLeft: 4,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EFE7E0',
  },
  serviceIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FDF2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E121E',
  },
  serviceMeta: {
    fontSize: 12,
    color: '#6B5E68',
    marginTop: 2,
  },
  servicePrice: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E121E',
    marginRight: 10,
  },
  editBtn: {
    padding: 6,
  },
  addDashedBtn: {
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#DFD5CD',
    borderStyle: 'dashed',
    alignItems: 'center',
    marginTop: 10,
  },
  addDashedText: {
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
    maxHeight: '90%',
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
  categoryRowPills: {
    flexDirection: 'row',
    gap: 6,
  },
  catPill: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFE7E0',
  },
  catPillActive: {
    backgroundColor: KalaaColors.primary,
    borderColor: KalaaColors.primary,
  },
  catPillText: {
    fontSize: 12,
    color: '#1E121E',
    fontWeight: '600',
  },
  catPillTextActive: {
    color: '#FFFFFF',
  },
  staffPillsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  staffPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFE7E0',
  },
  staffPillActive: {
    backgroundColor: KalaaColors.primary,
    borderColor: KalaaColors.primary,
  },
  staffPillText: {
    fontSize: 12,
    color: '#1E121E',
    fontWeight: '600',
  },
  staffPillTextActive: {
    color: '#FFFFFF',
  },
  sheetFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EFE7E0',
    backgroundColor: '#FFFBF8',
  },
  saveServiceBtn: {
    backgroundColor: KalaaColors.primary,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
  },
  saveServiceText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
