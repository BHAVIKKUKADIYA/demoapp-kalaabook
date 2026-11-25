import React, { useState } from 'react';
import {
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
import { Salon } from '@/types/kalaa';
import { SalonDetailModal } from './SalonDetailModal';

export function CustomerExplore() {
  const { salons, coupons } = useKalaa();
  const [activeFilter, setActiveFilter] = useState<'All' | 'Salons' | 'Artists' | 'Top Rated' | 'Deals'>('All');
  const [selectedTag, setSelectedTag] = useState<string>('Free today');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const [salonDetailVisible, setSalonDetailVisible] = useState(false);
  const [couponCopied, setCouponCopied] = useState<string | null>(null);

  const filteredSalons = salons.filter((s) => {
    if (activeFilter === 'Salons' && s.type !== 'Salon') return false;
    if (activeFilter === 'Artists' && s.type !== 'Artist') return false;
    if (activeFilter === 'Top Rated' && !s.isTopRated) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.location.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchHeader}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color="#8A7B87" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by service, salon or artist"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Main Filter Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll}>
        <View style={styles.tabsRow}>
          {(['All', 'Salons', 'Artists', 'Top Rated', 'Deals'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabPill,
                activeFilter === tab && styles.tabPillActive,
              ]}
              onPress={() => setActiveFilter(tab)}>
              <Text
                style={[
                  styles.tabPillText,
                  activeFilter === tab && styles.tabPillTextActive,
                ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Secondary Quick Filters */}
      <View style={styles.filterTagsRow}>
        {['Free today', 'Price ₹', 'Rating 4.5+ ★', 'Distance < 2km'].map((tag) => (
          <TouchableOpacity
            key={tag}
            style={[
              styles.filterTag,
              selectedTag === tag && styles.filterTagActive,
            ]}
            onPress={() => setSelectedTag(selectedTag === tag ? '' : tag)}>
            <Text
              style={[
                styles.filterTagText,
                selectedTag === tag && styles.filterTagTextActive,
              ]}>
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* If DEALS tab is active (Page 46) */}
        {activeFilter === 'Deals' ? (
          <View>
            <Text style={styles.sectionHeading}>Exclusive Coupons & Offers</Text>
            {coupons.map((c) => (
              <View key={c.code} style={styles.couponCard}>
                <View style={styles.couponBadge}>
                  <Text style={styles.couponBadgeCode}>{c.code}</Text>
                </View>
                <View style={{ flex: 1, marginHorizontal: 12 }}>
                  <Text style={styles.couponTitle}>{c.discountText}</Text>
                  <Text style={styles.couponSub}>Min spend ₹{c.minSpend} · {c.expiryText}</Text>
                </View>
                <TouchableOpacity
                  style={styles.useBtn}
                  onPress={() => {
                    setCouponCopied(c.code);
                    setTimeout(() => setCouponCopied(null), 1500);
                  }}>
                  <Text style={styles.useBtnText}>
                    {couponCopied === c.code ? 'Copied' : 'Use'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          /* Normal Salons & Artists List (Page 36, 45) */
          <View>
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsCount}>
                {filteredSalons.length} results · nearest first
              </Text>
            </View>

            {filteredSalons.map((salon, index) => (
              <TouchableOpacity
                key={salon.id}
                style={styles.card}
                onPress={() => {
                  setSelectedSalon(salon);
                  setSalonDetailVisible(true);
                }}
                activeOpacity={0.9}>
                {activeFilter === 'Top Rated' && (
                  <View style={styles.rankBadge}>
                    <Text style={styles.rankText}>{index + 1}</Text>
                  </View>
                )}
                <View
                  style={[
                    styles.avatarSquare,
                    { backgroundColor: salon.coverGradient[0] },
                  ]}>
                  <Text style={styles.avatarLetter}>{salon.name.charAt(0)}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 14 }}>
                  <View style={styles.cardTop}>
                    <Text style={styles.cardName}>{salon.name}</Text>
                    <View style={styles.typeTag}>
                      <Text style={styles.typeTagText}>{salon.type}</Text>
                    </View>
                  </View>
                  <Text style={styles.cardLocation}>{salon.location}</Text>
                  <View style={styles.ratingRow}>
                    <Text style={styles.ratingText}>{salon.rating} ★</Text>
                    <Text style={styles.reviewsText}>
                      ({salon.reviewsCount}) · {salon.distance}
                    </Text>
                  </View>
                  <Text style={styles.priceStart}>from ₹799</Text>
                </View>
                <TouchableOpacity
                  style={styles.bookSmallBtn}
                  onPress={() => {
                    setSelectedSalon(salon);
                    setSalonDetailVisible(true);
                  }}>
                  <Text style={styles.bookSmallBtnText}>Book</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Salon Details Modal */}
      <SalonDetailModal
        visible={salonDetailVisible}
        salon={selectedSalon}
        onClose={() => setSalonDetailVisible(false)}
        onBookingComplete={() => setSalonDetailVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF8',
  },
  searchHeader: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 46,
    borderWidth: 1,
    borderColor: '#EFE7E0',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#1E121E',
  },
  tabsScroll: {
    maxHeight: 46,
    paddingHorizontal: 16,
  },
  tabsRow: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
  },
  tabPill: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFE7E0',
  },
  tabPillActive: {
    backgroundColor: KalaaColors.primary,
    borderColor: KalaaColors.primary,
  },
  tabPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E121E',
  },
  tabPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  filterTagsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  filterTag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFE7E0',
  },
  filterTagActive: {
    backgroundColor: '#E6F7ED',
    borderColor: '#0F766E',
  },
  filterTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6B5E68',
  },
  filterTagTextActive: {
    color: '#0F766E',
    fontWeight: '700',
  },
  scroll: {
    padding: 16,
    paddingBottom: 70,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E121E',
    marginBottom: 12,
  },
  resultsHeader: {
    marginBottom: 12,
  },
  resultsCount: {
    fontSize: 12,
    color: '#6B5E68',
    fontWeight: '600',
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
  rankBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  rankText: {
    color: '#B45309',
    fontSize: 13,
    fontWeight: '800',
  },
  avatarSquare: {
    width: 60,
    height: 60,
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
  cardName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E121E',
  },
  typeTag: {
    backgroundColor: '#FDF2F7',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  typeTagText: {
    color: KalaaColors.primary,
    fontSize: 10,
    fontWeight: '700',
  },
  cardLocation: {
    fontSize: 12,
    color: '#6B5E68',
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  ratingText: {
    color: '#D97706',
    fontSize: 12,
    fontWeight: '700',
  },
  reviewsText: {
    color: '#6B5E68',
    fontSize: 11,
  },
  priceStart: {
    fontSize: 12,
    fontWeight: '700',
    color: KalaaColors.primary,
    marginTop: 3,
  },
  bookSmallBtn: {
    backgroundColor: KalaaColors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  bookSmallBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  couponCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EFE7E0',
  },
  couponBadge: {
    backgroundColor: KalaaColors.primary,
    paddingHorizontal: 10,
    paddingVertical: 14,
    borderRadius: 10,
  },
  couponBadgeCode: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  couponTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E121E',
  },
  couponSub: {
    fontSize: 11,
    color: '#6B5E68',
    marginTop: 2,
  },
  useBtn: {
    backgroundColor: '#FDF2F7',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: KalaaColors.primary,
  },
  useBtnText: {
    color: KalaaColors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
});
