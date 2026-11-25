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

interface AdminOverviewProps {
  onNavigateToApprovals: () => void;
  onNavigateToDisputes: () => void;
}

export function AdminOverview({
  onNavigateToApprovals,
  onNavigateToDisputes,
}: AdminOverviewProps) {
  const [period, setPeriod] = useState<'Today' | 'This week' | 'Month'>('This week');

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Admin Header (Page 10) */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brandTitle}>कला बुक</Text>
            <Text style={styles.title}>Admin Console</Text>
            <Text style={styles.subtitle}>Platform · Mumbai HQ</Text>
          </View>

          {/* Time Filter Pills */}
          <View style={styles.periodRow}>
            {(['Today', 'This week', 'Month'] as const).map((p) => (
              <TouchableOpacity
                key={p}
                style={[
                  styles.periodPill,
                  period === p && styles.periodPillActive,
                ]}
                onPress={() => setPeriod(p)}>
                <Text
                  style={[
                    styles.periodText,
                    period === p && styles.periodTextActive,
                  ]}>
                  {p}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 4 Metric Cards */}
        <View style={styles.metricsGrid}>
          <View style={[styles.metricCard, { backgroundColor: KalaaColors.primary }]}>
            <View style={styles.metricIconWrap}>
              <Ionicons name="cash-outline" size={16} color="#FFF" />
              <Text style={styles.metricLabelLight}>GMV</Text>
            </View>
            <Text style={styles.metricValLight}>₹18.4L</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricIconWrap}>
              <Ionicons name="calendar-outline" size={16} color="#9E1B4F" />
              <Text style={styles.metricLabel}>Bookings</Text>
            </View>
            <Text style={styles.metricVal}>2,480</Text>
          </View>

          <View style={[styles.metricCard, { backgroundColor: '#EEF9F5' }]}>
            <View style={styles.metricIconWrap}>
              <Ionicons name="business-outline" size={16} color="#0D9488" />
              <Text style={[styles.metricLabel, { color: '#0D9488' }]}>Active salons</Text>
            </View>
            <Text style={[styles.metricVal, { color: '#0F766E' }]}>142</Text>
          </View>

          <View style={[styles.metricCard, { backgroundColor: '#FEF9EE' }]}>
            <View style={styles.metricIconWrap}>
              <Ionicons name="pie-chart-outline" size={16} color="#D97706" />
              <Text style={[styles.metricLabel, { color: '#D97706' }]}>Take rate</Text>
            </View>
            <Text style={[styles.metricVal, { color: '#B45309' }]}>12 %</Text>
          </View>
        </View>

        {/* Revenue Trend Card */}
        <View style={styles.trendCard}>
          <Text style={styles.trendTitle}>Revenue trend</Text>
          <View style={styles.trendVisual}>
            <View style={styles.curveArea} />
            <View style={styles.curveDot} />
          </View>
          <View style={styles.trendFooter}>
            <Text style={styles.trendGrowth}>+24.8% vs last week</Text>
            <Text style={styles.trendSub}>All Mumbai clusters</Text>
          </View>
        </View>

        {/* "Needs Action" Section */}
        <Text style={styles.sectionTitle}>Needs action</Text>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={onNavigateToApprovals}
          activeOpacity={0.85}>
          <View style={[styles.actionIconBox, { backgroundColor: '#FDF2F7' }]}>
            <Ionicons name="checkmark-done" size={20} color={KalaaColors.primary} />
          </View>
          <View style={{ flex: 1, marginHorizontal: 12 }}>
            <Text style={styles.actionCardTitle}>Business approvals</Text>
            <Text style={styles.actionCardSub}>14 salons · 32 artists</Text>
          </View>
          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>46</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={onNavigateToDisputes}
          activeOpacity={0.85}>
          <View style={[styles.actionIconBox, { backgroundColor: '#FEF9EE' }]}>
            <Ionicons name="warning-outline" size={20} color="#D97706" />
          </View>
          <View style={{ flex: 1, marginHorizontal: 12 }}>
            <Text style={styles.actionCardTitle}>Disputes & flagged reviews</Text>
            <Text style={styles.actionCardSub}>3 disputes · 8 reviews</Text>
          </View>
          <View style={[styles.countBadge, { backgroundColor: '#D97706' }]}>
            <Text style={styles.countBadgeText}>11</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.actionCard}>
          <View style={[styles.actionIconBox, { backgroundColor: '#EEF9F5' }]}>
            <Ionicons name="bar-chart-outline" size={20} color="#0D9488" />
          </View>
          <View style={{ flex: 1, marginHorizontal: 12 }}>
            <Text style={styles.actionCardTitle}>Finance & reports</Text>
            <Text style={styles.actionCardSub}>Payouts, revenue, exports</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#8A7B87" />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF8',
  },
  scroll: {
    padding: 16,
    paddingBottom: 70,
  },
  header: {
    marginBottom: 16,
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: KalaaColors.primary,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1E121E',
    marginTop: 2,
  },
  subtitle: {
    fontSize: 12,
    color: '#6B5E68',
    marginTop: 2,
  },
  periodRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  periodPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFE7E0',
  },
  periodPillActive: {
    backgroundColor: '#22122A',
    borderColor: '#22122A',
  },
  periodText: {
    fontSize: 12,
    color: '#6B5E68',
    fontWeight: '600',
  },
  periodTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EFE7E0',
    ...KalaaShadow.soft,
  },
  metricIconWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 12,
    color: '#6B5E68',
    fontWeight: '600',
  },
  metricLabelLight: {
    fontSize: 12,
    color: '#FFD4E5',
    fontWeight: '600',
  },
  metricVal: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1E121E',
  },
  metricValLight: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  trendCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFE7E0',
    marginBottom: 20,
    ...KalaaShadow.soft,
  },
  trendTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E121E',
  },
  trendVisual: {
    height: 70,
    backgroundColor: '#FDF2F7',
    borderRadius: 12,
    marginVertical: 12,
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  curveArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: '#FCE7F3',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 10,
  },
  curveDot: {
    position: 'absolute',
    right: 20,
    top: 20,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: KalaaColors.primary,
  },
  trendFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trendGrowth: {
    color: '#0F766E',
    fontWeight: '700',
    fontSize: 13,
  },
  trendSub: {
    color: '#8A7B87',
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E121E',
    marginBottom: 12,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EFE7E0',
  },
  actionIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E121E',
  },
  actionCardSub: {
    fontSize: 12,
    color: '#6B5E68',
    marginTop: 2,
  },
  countBadge: {
    backgroundColor: KalaaColors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
});
