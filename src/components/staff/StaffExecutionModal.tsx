import React, { useEffect, useState } from 'react';
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

interface StaffExecutionModalProps {
  visible: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export function StaffExecutionModal({
  visible,
  onClose,
  onComplete,
}: StaffExecutionModalProps) {
  // Timer state
  const [seconds, setSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  // Complete checklist modal (Page 33)
  const [checklistModalVisible, setChecklistModalVisible] = useState(false);
  const [checks, setChecks] = useState<{ [key: string]: boolean }>({
    delivered: true,
    cleaned: true,
    rebook: false,
  });
  const [nextVisitNotes, setNextVisitNotes] = useState('');

  useEffect(() => {
    let interval: any = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatTimer = () => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleFinishAppointment = () => {
    setChecklistModalVisible(false);
    onComplete();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.container}>
          {/* Header (Page 32) */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.circleBtn} onPress={onClose}>
              <Ionicons name="arrow-back" size={20} color="#1E121E" />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={styles.headerTitle}>Haircut + blow dry</Text>
              <Text style={styles.headerSub}>11:00 · Station 1 · 45 min</Text>
            </View>
            <View style={{ width: 36 }} />
          </View>

          <ScrollView contentContainerStyle={styles.scroll}>
            {/* Customer Profile Card */}
            <View style={styles.customerCard}>
              <View style={styles.customerAvatar}>
                <Text style={styles.customerAvatarText}>A</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={styles.customerName}>Aarti V.</Text>
                <Text style={styles.customerMeta}>Regular · 4 visits with you</Text>
              </View>
            </View>

            {/* Note badge */}
            <View style={styles.noteBanner}>
              <Text style={styles.noteBannerTitle}>Preferences / notes</Text>
              <Text style={styles.noteBannerContent}>
                "Prefers shorter layers, no fringe."
              </Text>
            </View>

            {/* Service info */}
            <View style={styles.serviceDetailCard}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Service</Text>
                <Text style={styles.detailVal}>Haircut + blow dry (45 min)</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Payment</Text>
                <Text style={styles.detailVal}>Handled at reception</Text>
              </View>
            </View>

            {/* Live Service Timer (Page 32) */}
            <View style={styles.timerCard}>
              <Text style={styles.timerDigits}>{formatTimer()}</Text>
              <Text style={styles.timerHint}>
                {timerRunning ? 'Service in progress...' : 'Tap start when you begin'}
              </Text>
            </View>

            {/* Actions: Start/Pause & Mark Complete */}
            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={[
                  styles.timerControlBtn,
                  timerRunning && { backgroundColor: '#FEE2E2' },
                ]}
                onPress={() => setTimerRunning(!timerRunning)}>
                <Text
                  style={[
                    styles.timerControlText,
                    timerRunning && { color: '#B91C1C' },
                  ]}>
                  {timerRunning ? 'Pause timer' : 'Start timer'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.markCompleteBtn}
                onPress={() => setChecklistModalVisible(true)}>
                <Text style={styles.markCompleteText}>Mark complete</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* CHECKLIST MODAL (Page 33) */}
          <Modal visible={checklistModalVisible} animationType="slide" transparent>
            <View style={styles.modalOverlay}>
              <View style={styles.checklistSheet}>
                <View style={styles.header}>
                  <TouchableOpacity
                    style={styles.circleBtn}
                    onPress={() => setChecklistModalVisible(false)}>
                    <Ionicons name="close" size={20} color="#1E121E" />
                  </TouchableOpacity>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={styles.headerTitle}>Mark complete</Text>
                    <Text style={styles.headerSub}>Haircut + blow dry · Aarti</Text>
                  </View>
                  <View style={{ width: 36 }} />
                </View>

                <ScrollView contentContainerStyle={{ padding: 20 }}>
                  <Text style={styles.checklistSectionTitle}>Before you finish</Text>

                  {[
                    { id: 'delivered', label: 'Service delivered as booked' },
                    { id: 'cleaned', label: 'Station cleaned' },
                    { id: 'rebook', label: 'Suggested a rebook date' },
                  ].map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      style={[
                        styles.checkRow,
                        checks[item.id] && styles.checkRowActive,
                      ]}
                      onPress={() =>
                        setChecks((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                      }>
                      <View
                        style={[
                          styles.checkSquare,
                          checks[item.id] && styles.checkSquareActive,
                        ]}>
                        {checks[item.id] && (
                          <Ionicons name="checkmark" size={16} color="#FFF" />
                        )}
                      </View>
                      <Text style={styles.checkLabel}>{item.label}</Text>
                    </TouchableOpacity>
                  ))}

                  <Text style={[styles.checklistSectionTitle, { marginTop: 18 }]}>
                    Note for next visit (optional)
                  </Text>
                  <TextInput
                    style={styles.notesInput}
                    placeholder="e.g. used shade 4N, liked shorter layers"
                    value={nextVisitNotes}
                    onChangeText={setNextVisitNotes}
                    multiline
                  />

                  <View style={styles.autoMoveNotice}>
                    <Text style={styles.autoMoveNoticeText}>
                      On complete the booking becomes Completed and payment moves to reception checkout.
                    </Text>
                  </View>
                </ScrollView>

                <View style={styles.sheetFooter}>
                  <TouchableOpacity
                    style={styles.finishBtn}
                    onPress={handleFinishAppointment}>
                    <Text style={styles.finishBtnText}>Complete appointment</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(20, 10, 24, 0.75)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#FFFBF8',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    height: '92%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E121E',
  },
  headerSub: {
    fontSize: 12,
    color: '#6B5E68',
    marginTop: 2,
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  customerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFE7E0',
    marginBottom: 14,
  },
  customerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#9E1B4F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customerAvatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  customerName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E121E',
  },
  customerMeta: {
    fontSize: 12,
    color: '#6B5E68',
    marginTop: 2,
  },
  noteBanner: {
    backgroundColor: '#FDF2F7',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F8D7E3',
    marginBottom: 14,
  },
  noteBannerTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: KalaaColors.primary,
    marginBottom: 4,
  },
  noteBannerContent: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#3B2939',
  },
  serviceDetailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFE7E0',
    marginBottom: 18,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 13,
    color: '#6B5E68',
  },
  detailVal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E121E',
  },
  timerCard: {
    backgroundColor: '#22122A',
    borderRadius: 22,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  timerDigits: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  timerHint: {
    fontSize: 13,
    color: '#CCFBF1',
    marginTop: 6,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  timerControlBtn: {
    flex: 1,
    backgroundColor: '#E6F7ED',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  timerControlText: {
    color: '#0F766E',
    fontSize: 15,
    fontWeight: '700',
  },
  markCompleteBtn: {
    flex: 1,
    backgroundColor: '#0F766E',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    ...KalaaShadow.button,
  },
  markCompleteText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  checklistSheet: {
    backgroundColor: '#FFFBF8',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    height: '85%',
  },
  checklistSectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E121E',
    marginBottom: 12,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: '#EFE7E0',
  },
  checkRowActive: {
    borderColor: '#0F766E',
    backgroundColor: '#E6F7ED',
  },
  checkSquare: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#D4C5C0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: '#FFFFFF',
  },
  checkSquareActive: {
    backgroundColor: '#0F766E',
    borderColor: '#0F766E',
  },
  checkLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E121E',
    flex: 1,
  },
  notesInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EFE7E0',
    padding: 14,
    height: 80,
    textAlignVertical: 'top',
    fontSize: 14,
    marginBottom: 16,
  },
  autoMoveNotice: {
    backgroundColor: '#FEF9EE',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  autoMoveNoticeText: {
    color: '#92400E',
    fontSize: 12,
    lineHeight: 18,
  },
  sheetFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EFE7E0',
    backgroundColor: '#FFFBF8',
  },
  finishBtn: {
    backgroundColor: '#0F766E',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
  },
  finishBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
