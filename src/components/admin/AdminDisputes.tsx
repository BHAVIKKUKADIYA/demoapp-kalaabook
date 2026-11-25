import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { KalaaColors, KalaaShadow } from '@/constants/kalaaTheme';

export function AdminDisputes() {
  const [activeTab, setActiveTab] = useState<'Disputes' | 'Flagged reviews' | 'Resolved'>('Disputes');
  const [dispute1Status, setDispute1Status] = useState<string | null>(null);
  const [flaggedReviewAction, setFlaggedReviewAction] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      {/* Header (Page 16) */}
      <View style={styles.header}>
        <Text style={styles.title}>Disputes & Reviews</Text>
      </View>

      {/* 3 Metric Cards */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: KalaaColors.primary }]}>
          <Text style={styles.statValLight}>3</Text>
          <Text style={styles.statLabelLight}>Open disputes</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: '#FEF9EE' }]}>
          <Text style={[styles.statVal, { color: '#B45309' }]}>8</Text>
          <Text style={styles.statLabel}>Flagged reviews</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statVal}>2d</Text>
          <Text style={styles.statLabel}>Avg resolve</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        {(['Disputes', 'Flagged reviews', 'Resolved'] as const).map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tabBtn, activeTab === t && styles.tabBtnActive]}
            onPress={() => setActiveTab(t)}>
            <Text
              style={[styles.tabText, activeTab === t && styles.tabTextActive]}>
              {t} {t === 'Disputes' ? '(3)' : t === 'Flagged reviews' ? '(8)' : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {activeTab === 'Disputes' && (
          <View>
            {/* Dispute 1 (Page 16) */}
            <View style={styles.disputeCard}>
              <View style={styles.disputeTopRow}>
                <Text style={styles.disputeId}>KB-29B4710 · refund request</Text>
                <View style={styles.openBadge}>
                  <Text style={styles.openBadgeText}>Open</Text>
                </View>
              </View>

              <View style={styles.disputeVersus}>
                <Text style={styles.disputeParties}>Customer vs Glow Studio</Text>
                <Text style={styles.disputeAmount}>₹782</Text>
              </View>

              <Text style={styles.disputeReason}>
                Customer claims stylist arrived 45 mins late. Salon claims they informed customer.
              </Text>

              {dispute1Status ? (
                <View style={styles.resolvedNotice}>
                  <Text style={styles.resolvedNoticeText}>{dispute1Status}</Text>
                </View>
              ) : (
                <View style={styles.disputeActionRow}>
                  <TouchableOpacity
                    style={styles.refundBtn}
                    onPress={() => setDispute1Status('✓ Refunded customer ₹782')}>
                    <Text style={styles.refundText}>Refund customer</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.sideSalonBtn}
                    onPress={() => setDispute1Status('✓ Upheld salon position')}>
                    <Text style={styles.sideSalonText}>Side with salon</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Dispute 2 */}
            <View style={styles.disputeCard}>
              <View style={styles.disputeTopRow}>
                <Text style={styles.disputeId}>KB-28F3812 · no-show charge</Text>
                <View style={styles.openBadge}>
                  <Text style={styles.openBadgeText}>Open</Text>
                </View>
              </View>
              <View style={styles.disputeVersus}>
                <Text style={styles.disputeParties}>Aarti vs Nail Lounge</Text>
                <Text style={styles.disputeAmount}>₹300</Text>
              </View>
              <View style={styles.disputeActionRow}>
                <TouchableOpacity style={styles.refundBtn}>
                  <Text style={styles.refundText}>Waive charge</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sideSalonBtn}>
                  <Text style={styles.sideSalonText}>Uphold charge</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {activeTab === 'Flagged reviews' && (
          <View>
            <View style={styles.disputeCard}>
              <View style={styles.disputeTopRow}>
                <Text style={styles.disputeId}>Review for Glow Studio</Text>
                <View style={[styles.openBadge, { backgroundColor: '#FEE2E2' }]}>
                  <Text style={[styles.openBadgeText, { color: '#B91C1C' }]}>Spam?</Text>
                </View>
              </View>

              <Text style={styles.flaggedStars}>★☆☆☆☆</Text>
              <Text style={styles.flaggedReviewText}>
                "Terrible service never going again."
              </Text>
              <Text style={styles.flaggedReason}>
                Flagged by salon: "Fake review by competitor"
              </Text>

              {flaggedReviewAction ? (
                <View style={styles.resolvedNotice}>
                  <Text style={styles.resolvedNoticeText}>{flaggedReviewAction}</Text>
                </View>
              ) : (
                <View style={styles.disputeActionRow}>
                  <TouchableOpacity
                    style={styles.refundBtn}
                    onPress={() => setFlaggedReviewAction('✓ Review kept')}>
                    <Text style={styles.refundText}>Keep review</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => setFlaggedReviewAction('✓ Removed flagged review')}>
                    <Text style={styles.removeText}>Remove review</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>
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
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EFE7E0',
    alignItems: 'center',
  },
  statVal: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1E121E',
  },
  statValLight: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 10,
    color: '#6B5E68',
    marginTop: 2,
    fontWeight: '600',
  },
  statLabelLight: {
    fontSize: 10,
    color: '#FFD4E5',
    marginTop: 2,
    fontWeight: '600',
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
    fontSize: 13,
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
  disputeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#EFE7E0',
    ...KalaaShadow.soft,
  },
  disputeTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  disputeId: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8A7B87',
  },
  openBadge: {
    backgroundColor: '#FEF9EE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  openBadgeText: {
    color: '#D97706',
    fontSize: 11,
    fontWeight: '700',
  },
  disputeVersus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  disputeParties: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E121E',
  },
  disputeAmount: {
    fontSize: 16,
    fontWeight: '800',
    color: KalaaColors.primary,
  },
  disputeReason: {
    fontSize: 12,
    color: '#554452',
    lineHeight: 18,
    marginBottom: 12,
  },
  disputeActionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  refundBtn: {
    flex: 1,
    backgroundColor: '#FDF2F7',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: KalaaColors.primary,
  },
  refundText: {
    color: KalaaColors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  sideSalonBtn: {
    flex: 1,
    backgroundColor: '#22122A',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  sideSalonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  removeBtn: {
    flex: 1,
    backgroundColor: '#FEE2E2',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  removeText: {
    color: '#B91C1C',
    fontSize: 12,
    fontWeight: '700',
  },
  resolvedNotice: {
    backgroundColor: '#E6F7ED',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  resolvedNoticeText: {
    color: '#0F766E',
    fontWeight: '700',
    fontSize: 13,
  },
  flaggedStars: {
    fontSize: 16,
    color: '#D97706',
    marginBottom: 4,
  },
  flaggedReviewText: {
    fontSize: 13,
    color: '#1E121E',
    fontStyle: 'italic',
    marginBottom: 6,
  },
  flaggedReason: {
    fontSize: 11,
    color: '#8A7B87',
    marginBottom: 12,
  },
});
