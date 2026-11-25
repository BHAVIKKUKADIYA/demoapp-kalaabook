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
import { KYCApproval } from '@/types/kalaa';

export function AdminApprovals() {
  const { approvals, approveKYC, rejectKYC } = useKalaa();
  const [activeTab, setActiveTab] = useState<'New' | 'In review' | 'Approved' | 'Rejected'>('New');
  const [selectedKYC, setSelectedKYC] = useState<KYCApproval | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  const filtered = approvals.filter((a) => {
    if (activeTab === 'New') return a.status === 'New';
    if (activeTab === 'Approved') return a.status === 'Approved';
    if (activeTab === 'Rejected') return a.status === 'Rejected';
    return a.status === 'In review';
  });

  return (
    <View style={styles.container}>
      {/* Header (Page 12) */}
      <View style={styles.header}>
        <Text style={styles.title}>Approvals ({approvals.length})</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        {(['New', 'In review', 'Approved', 'Rejected'] as const).map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tabBtn, activeTab === t && styles.tabBtnActive]}
            onPress={() => setActiveTab(t)}>
            <Text
              style={[styles.tabText, activeTab === t && styles.tabTextActive]}>
              {t} {t === 'New' ? `(${approvals.filter((a) => a.status === 'New').length})` : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {filtered.map((item) => (
          <View key={item.id} style={styles.card}>
            <View
              style={[
                styles.avatarSquare,
                { backgroundColor: item.type === 'Salon' ? '#9E1B4F' : '#0D9488' },
              ]}>
              <Text style={styles.avatarLetter}>{item.businessName.charAt(0)}</Text>
            </View>

            <View style={{ flex: 1, marginLeft: 14 }}>
              <View style={styles.cardTop}>
                <Text style={styles.businessName}>{item.businessName}</Text>
                <View style={styles.typeBadge}>
                  <Text style={styles.typeBadgeText}>{item.type}</Text>
                </View>
              </View>
              <Text style={styles.submittedMeta}>
                Submitted {item.submittedTime} · {item.city}
              </Text>

              {/* KYC badges */}
              <View style={styles.badgesRow}>
                <View style={styles.badgeGreen}>
                  <Text style={styles.badgeGreenText}>GST {item.gstStatus}</Text>
                </View>
                <View style={styles.badgeGreen}>
                  <Text style={styles.badgeGreenText}>PAN {item.panStatus}</Text>
                </View>
                <View
                  style={
                    item.bankStatus === 'verified'
                      ? styles.badgeGreen
                      : styles.badgeYellow
                  }>
                  <Text
                    style={
                      item.bankStatus === 'verified'
                        ? styles.badgeGreenText
                        : styles.badgeYellowText
                    }>
                    Bank {item.bankStatus}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.reviewBtn}
                onPress={() => {
                  setSelectedKYC(item);
                  setDetailModalVisible(true);
                }}>
                <Text style={styles.reviewBtnText}>Review KYC</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* KYC DETAIL MODAL (Page 13) */}
      <Modal visible={detailModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            {selectedKYC && (
              <>
                <View style={styles.sheetHeader}>
                  <TouchableOpacity
                    style={styles.circleBtn}
                    onPress={() => setDetailModalVisible(false)}>
                    <Ionicons name="arrow-back" size={20} color="#1E121E" />
                  </TouchableOpacity>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={styles.sheetTitle}>{selectedKYC.businessName}</Text>
                    <Text style={styles.sheetSub}>
                      {selectedKYC.type} · pending review
                    </Text>
                  </View>
                  <View style={{ width: 36 }} />
                </View>

                <ScrollView contentContainerStyle={{ padding: 20 }}>
                  {/* Business info card */}
                  <View style={styles.detailCard}>
                    <Text style={styles.cardSectionHeading}>Business info</Text>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Owner</Text>
                      <Text style={styles.detailVal}>{selectedKYC.ownerName}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Phone</Text>
                      <Text style={styles.detailVal}>+91 ••••• ••210</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Address</Text>
                      <Text style={styles.detailVal}>{selectedKYC.city}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Staff</Text>
                      <Text style={styles.detailVal}>4 professionals</Text>
                    </View>
                  </View>

                  {/* KYC documents verification */}
                  <View style={styles.detailCard}>
                    <Text style={styles.cardSectionHeading}>KYC documents</Text>
                    <View style={styles.kycDocRow}>
                      <Text style={styles.kycDocName}>GST certificate</Text>
                      <Text style={styles.docVerified}>Verified · View</Text>
                    </View>
                    <View style={styles.kycDocRow}>
                      <Text style={styles.kycDocName}>PAN card</Text>
                      <Text style={styles.docVerified}>Verified · View</Text>
                    </View>
                    <View style={styles.kycDocRow}>
                      <Text style={styles.kycDocName}>Bank proof</Text>
                      <Text
                        style={
                          selectedKYC.bankStatus === 'verified'
                            ? styles.docVerified
                            : styles.docPending
                        }>
                        {selectedKYC.bankStatus === 'verified'
                          ? 'Verified · View'
                          : 'Pending · View'}
                      </Text>
                    </View>
                  </View>

                  {/* Action buttons */}
                  <View style={styles.kycActionsRow}>
                    <TouchableOpacity
                      style={styles.rejectBtn}
                      onPress={() => {
                        rejectKYC(selectedKYC.id);
                        setDetailModalVisible(false);
                      }}>
                      <Text style={styles.rejectText}>Reject</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.askInfoBtn}>
                      <Text style={styles.askInfoText}>Ask info</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.approveBtn}
                      onPress={() => {
                        approveKYC(selectedKYC.id);
                        setDetailModalVisible(false);
                      }}>
                      <Text style={styles.approveText}>Approve</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </>
            )}
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1E121E',
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
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EFE7E0',
    ...KalaaShadow.soft,
  },
  avatarSquare: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  businessName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E121E',
  },
  typeBadge: {
    backgroundColor: '#FDF2F7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  typeBadgeText: {
    color: KalaaColors.primary,
    fontSize: 11,
    fontWeight: '700',
  },
  submittedMeta: {
    fontSize: 12,
    color: '#6B5E68',
    marginTop: 2,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 6,
    marginVertical: 8,
  },
  badgeGreen: {
    backgroundColor: '#E6F7ED',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeGreenText: {
    color: '#0F766E',
    fontSize: 10,
    fontWeight: '700',
  },
  badgeYellow: {
    backgroundColor: '#FEF9EE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeYellowText: {
    color: '#D97706',
    fontSize: 10,
    fontWeight: '700',
  },
  reviewBtn: {
    backgroundColor: KalaaColors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  reviewBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
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
    fontWeight: '800',
    color: '#1E121E',
  },
  sheetSub: {
    fontSize: 12,
    color: '#6B5E68',
    marginTop: 2,
  },
  detailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFE7E0',
    marginBottom: 14,
  },
  cardSectionHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E121E',
    marginBottom: 10,
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
  kycDocRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3ECE4',
  },
  kycDocName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E121E',
  },
  docVerified: {
    color: '#0F766E',
    fontSize: 13,
    fontWeight: '700',
  },
  docPending: {
    color: '#D97706',
    fontSize: 13,
    fontWeight: '700',
  },
  kycActionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  rejectBtn: {
    flex: 1,
    backgroundColor: '#FEE2E2',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  rejectText: {
    color: '#B91C1C',
    fontSize: 14,
    fontWeight: '700',
  },
  askInfoBtn: {
    flex: 1,
    backgroundColor: '#FEF9EE',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  askInfoText: {
    color: '#D97706',
    fontSize: 14,
    fontWeight: '700',
  },
  approveBtn: {
    flex: 1,
    backgroundColor: '#0F766E',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    ...KalaaShadow.button,
  },
  approveText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
