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

export function CustomerProfile({
  onNavigateToBookings,
}: {
  onNavigateToBookings: () => void;
}) {
  const { userPoints, walletBalance, bookings } = useKalaa();
  const [rewardsModalVisible, setRewardsModalVisible] = useState(false);
  const [referModalVisible, setReferModalVisible] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* User Card Header (Page 44) */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarLargeText}>A</Text>
          </View>
          <Text style={styles.userName}>Aarti Verma</Text>
          <Text style={styles.userMeta}>+91 98765 43210 · Member since 2024</Text>
        </View>

        {/* 3 Metric Badges: Bookings / Saved / Points */}
        <View style={styles.statsRow}>
          <TouchableOpacity style={styles.statPill} onPress={onNavigateToBookings}>
            <Text style={styles.statVal}>{bookings.length}</Text>
            <Text style={styles.statLabel}>Bookings</Text>
          </TouchableOpacity>

          <View style={styles.statPill}>
            <Text style={styles.statVal}>8</Text>
            <Text style={styles.statLabel}>Saved</Text>
          </View>

          <TouchableOpacity
            style={styles.statPill}
            onPress={() => setRewardsModalVisible(true)}>
            <Text style={[styles.statVal, { color: '#B45309' }]}>{userPoints}</Text>
            <Text style={styles.statLabel}>Points</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Options */}
        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem} onPress={onNavigateToBookings}>
            <Ionicons name="calendar-outline" size={20} color="#9E1B4F" />
            <Text style={styles.menuItemText}>My bookings</Text>
            <Ionicons name="chevron-forward" size={18} color="#8A7B87" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="location-outline" size={20} color="#9E1B4F" />
            <Text style={styles.menuItemText}>Saved addresses</Text>
            <Text style={styles.menuMetaText}>2</Text>
            <Ionicons name="chevron-forward" size={18} color="#8A7B87" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => setRewardsModalVisible(true)}>
            <Ionicons name="gift-outline" size={20} color="#D97706" />
            <Text style={styles.menuItemText}>Rewards & points</Text>
            <Text style={styles.menuMetaBadge}>{userPoints} pts</Text>
            <Ionicons name="chevron-forward" size={18} color="#8A7B87" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => setReferModalVisible(true)}>
            <Ionicons name="people-outline" size={20} color="#0D9488" />
            <Text style={styles.menuItemText}>Refer & earn</Text>
            <Text style={styles.menuHighlightText}>₹200</Text>
            <Ionicons name="chevron-forward" size={18} color="#8A7B87" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="wallet-outline" size={20} color="#6366F1" />
            <Text style={styles.menuItemText}>KalaaBook Wallet</Text>
            <Text style={styles.menuMetaText}>Balance ₹{walletBalance}</Text>
            <Ionicons name="chevron-forward" size={18} color="#8A7B87" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="help-circle-outline" size={20} color="#6B5E68" />
            <Text style={styles.menuItemText}>Help & support</Text>
            <Ionicons name="chevron-forward" size={18} color="#8A7B87" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]}>
            <Ionicons name="log-out-outline" size={20} color="#B91C1C" />
            <Text style={[styles.menuItemText, { color: '#B91C1C' }]}>Sign out</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.versionText}>KalaaBook v1.0.0 · Style apna, artist apna</Text>
      </ScrollView>

      {/* REWARDS MODAL (Page 50) */}
      <Modal visible={rewardsModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.sheetHeader}>
              <TouchableOpacity
                style={styles.circleBtn}
                onPress={() => setRewardsModalVisible(false)}>
                <Ionicons name="close" size={20} color="#1E121E" />
              </TouchableOpacity>
              <Text style={styles.sheetTitle}>Rewards & Points</Text>
              <View style={{ width: 36 }} />
            </View>

            <ScrollView contentContainerStyle={{ padding: 20 }}>
              {/* Big Points Card */}
              <View style={styles.pointsHero}>
                <Text style={styles.pointsLabel}>Your points</Text>
                <Text style={styles.pointsVal}>{userPoints}</Text>
                <Text style={styles.pointsSub}>≈ ₹{Math.round(userPoints / 10)} off your next booking</Text>

                {/* Tier Progress */}
                <View style={styles.tierContainer}>
                  <View style={styles.tierLabels}>
                    <Text style={styles.tierCurrent}>Silver</Text>
                    <Text style={styles.tierNext}>Gold at 3,000</Text>
                  </View>
                  <View style={styles.tierProgressBar}>
                    <View style={[styles.tierProgressFill, { width: '70%' }]} />
                  </View>
                  <Text style={styles.tierHelp}>
                    {3000 - userPoints} points to Gold. Unlocks priority slots and 2x points.
                  </Text>
                </View>
              </View>

              {/* Redeem section */}
              <Text style={styles.sectionTitle}>Redeem points</Text>

              <View style={styles.redeemCard}>
                <View style={styles.redeemIcon}>
                  <Text style={{ fontSize: 20 }}>🏷️</Text>
                </View>
                <View style={{ flex: 1, marginHorizontal: 12 }}>
                  <Text style={styles.redeemTitle}>₹100 off any booking</Text>
                  <Text style={styles.redeemCost}>1,000 points</Text>
                </View>
                <TouchableOpacity style={styles.redeemBtn}>
                  <Text style={styles.redeemBtnText}>Redeem</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.redeemCard}>
                <View style={styles.redeemIcon}>
                  <Text style={{ fontSize: 20 }}>🎁</Text>
                </View>
                <View style={{ flex: 1, marginHorizontal: 12 }}>
                  <Text style={styles.redeemTitle}>Free add-on service</Text>
                  <Text style={styles.redeemCost}>1,500 points</Text>
                </View>
                <TouchableOpacity style={styles.redeemBtn}>
                  <Text style={styles.redeemBtnText}>Redeem</Text>
                </TouchableOpacity>
              </View>

              {/* Membership Packages */}
              <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
                Membership packages
              </Text>
              <View style={styles.memberRow}>
                <View style={[styles.memberCard, { backgroundColor: '#F3EEFB' }]}>
                  <Text style={styles.memberTitle}>Glow+</Text>
                  <Text style={styles.memberSub}>10% off all year</Text>
                  <Text style={styles.memberPrice}>₹1,999/yr</Text>
                </View>

                <View style={[styles.memberCard, { backgroundColor: '#EEF9F5' }]}>
                  <Text style={styles.memberTitle}>Unlimited Mani</Text>
                  <Text style={styles.memberSub}>4 visits/mo</Text>
                  <Text style={styles.memberPrice}>₹2,999/mo</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* REFER & EARN MODAL (Page 51) */}
      <Modal visible={referModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.sheetHeader}>
              <TouchableOpacity
                style={styles.circleBtn}
                onPress={() => setReferModalVisible(false)}>
                <Ionicons name="close" size={20} color="#1E121E" />
              </TouchableOpacity>
              <Text style={styles.sheetTitle}>Refer & Earn</Text>
              <View style={{ width: 36 }} />
            </View>

            <ScrollView contentContainerStyle={{ padding: 20, alignItems: 'center' }}>
              <View style={styles.referHero}>
                <Text style={styles.referHeroTitle}>Give ₹200,{'\n'}get ₹200</Text>
                <Text style={styles.referHeroSub}>
                  Friends get ₹200 off their first booking. You get ₹200 when they complete it.
                </Text>
              </View>

              {/* Code Box */}
              <View style={styles.codeContainer}>
                <Text style={styles.referralCode}>AARTI200</Text>
                <TouchableOpacity
                  style={styles.copyBtn}
                  onPress={() => {
                    setCodeCopied(true);
                    setTimeout(() => setCodeCopied(false), 2000);
                  }}>
                  <Text style={styles.copyBtnText}>
                    {codeCopied ? 'Copied!' : 'Copy'}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.whatsappBtn}>
                <Ionicons name="logo-whatsapp" size={20} color="#FFFFFF" />
                <Text style={styles.whatsappBtnText}>Share via WhatsApp</Text>
              </TouchableOpacity>

              {/* How it works */}
              <View style={styles.howItWorksBox}>
                <Text style={styles.howItWorksTitle}>How it works</Text>
                {[
                  { step: '1', text: 'Share your code with friends' },
                  { step: '2', text: 'They book and complete their first appointment' },
                  { step: '3', text: '₹200 lands in your KalaaBook wallet' },
                ].map((item) => (
                  <View key={item.step} style={styles.stepRow}>
                    <View style={styles.stepBadge}>
                      <Text style={styles.stepBadgeText}>{item.step}</Text>
                    </View>
                    <Text style={styles.stepText}>{item.text}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.earnedBox}>
                <View>
                  <Text style={styles.earnedLabel}>Earned so far</Text>
                  <Text style={styles.earnedSub}>3 friends joined · 1 pending</Text>
                </View>
                <Text style={styles.earnedAmount}>₹600</Text>
              </View>
            </ScrollView>
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
  scroll: {
    padding: 16,
    paddingBottom: 70,
  },
  profileHeader: {
    backgroundColor: '#22122A',
    borderRadius: 22,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarLarge: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: KalaaColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatarLargeText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  userMeta: {
    fontSize: 12,
    color: '#C4AECD',
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  statPill: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EFE7E0',
  },
  statVal: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E121E',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B5E68',
    marginTop: 2,
    fontWeight: '600',
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#EFE7E0',
    ...KalaaShadow.soft,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3ECE4',
  },
  menuItemText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#1E121E',
    marginLeft: 14,
  },
  menuMetaText: {
    fontSize: 13,
    color: '#8A7B87',
    marginRight: 6,
    fontWeight: '600',
  },
  menuMetaBadge: {
    fontSize: 12,
    color: '#B45309',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 6,
    fontWeight: '700',
  },
  menuHighlightText: {
    fontSize: 13,
    color: '#0F766E',
    fontWeight: '700',
    marginRight: 6,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 11,
    color: '#9B8E98',
    marginTop: 24,
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
  pointsHero: {
    backgroundColor: '#22122A',
    borderRadius: 20,
    padding: 22,
    alignItems: 'center',
    marginBottom: 20,
  },
  pointsLabel: {
    color: '#C4AECD',
    fontSize: 13,
  },
  pointsVal: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '900',
    marginTop: 2,
  },
  pointsSub: {
    color: '#E5A024',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  tierContainer: {
    width: '100%',
    marginTop: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 14,
    padding: 14,
  },
  tierLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  tierCurrent: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  tierNext: {
    color: '#E5A024',
    fontSize: 12,
    fontWeight: '700',
  },
  tierProgressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  tierProgressFill: {
    height: '100%',
    backgroundColor: '#E5A024',
  },
  tierHelp: {
    color: '#C4AECD',
    fontSize: 11,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E121E',
    marginBottom: 12,
  },
  redeemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EFE7E0',
  },
  redeemIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#FEF9EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  redeemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E121E',
  },
  redeemCost: {
    fontSize: 12,
    color: '#B45309',
    fontWeight: '600',
    marginTop: 2,
  },
  redeemBtn: {
    backgroundColor: KalaaColors.primary,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 12,
  },
  redeemBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  memberRow: {
    flexDirection: 'row',
    gap: 12,
  },
  memberCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EFE7E0',
  },
  memberTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E121E',
  },
  memberSub: {
    fontSize: 12,
    color: '#6B5E68',
    marginTop: 2,
  },
  memberPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: KalaaColors.primary,
    marginTop: 10,
  },
  referHero: {
    backgroundColor: KalaaColors.primary,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    marginBottom: 18,
  },
  referHeroTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 30,
  },
  referHeroSub: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 18,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#EFE7E0',
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 12,
    width: '100%',
    marginBottom: 14,
  },
  referralCode: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E121E',
    letterSpacing: 1,
    marginLeft: 8,
  },
  copyBtn: {
    backgroundColor: '#FDF2F7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  copyBtnText: {
    color: KalaaColors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  whatsappBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F766E',
    paddingVertical: 14,
    borderRadius: 14,
    width: '100%',
    gap: 8,
    marginBottom: 20,
  },
  whatsappBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  howItWorksBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    width: '100%',
    borderWidth: 1,
    borderColor: '#EFE7E0',
    marginBottom: 14,
  },
  howItWorksTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E121E',
    marginBottom: 12,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stepBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: KalaaColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  stepBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  stepText: {
    fontSize: 13,
    color: '#4A3B47',
    flex: 1,
  },
  earnedBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FEF9EE',
    borderRadius: 14,
    padding: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  earnedLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#92400E',
  },
  earnedSub: {
    fontSize: 11,
    color: '#B45309',
    marginTop: 2,
  },
  earnedAmount: {
    fontSize: 22,
    fontWeight: '900',
    color: '#92400E',
  },
});
