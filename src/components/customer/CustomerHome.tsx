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
import { Salon } from '@/types/kalaa';
import { useKalaa } from '@/context/KalaaContext';
import { SalonDetailModal } from './SalonDetailModal';

interface CustomerHomeProps {
  onNavigateToTab: (tabName: 'home' | 'explore' | 'bookings' | 'profile') => void;
  onFilterCategory?: (cat: string) => void;
}

export function CustomerHome({ onNavigateToTab, onFilterCategory }: CustomerHomeProps) {
  const { salons } = useKalaa();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const [salonDetailVisible, setSalonDetailVisible] = useState(false);

  const categories = [
    { id: 'mehendi', name: 'Mehendi', icon: '✋', color: '#FDF2F4' },
    { id: 'nails', name: 'Nails', icon: '💅', color: '#FEF9EE' },
    { id: 'makeup', name: 'Makeup', icon: '💄', color: '#EEF9F5' },
    { id: 'hair', name: 'Hair', icon: '✂️', color: '#F3EEFB' },
    { id: 'salon', name: 'Salon', icon: '💈', color: '#F1F5FD' },
    { id: 'mens', name: "Men's", icon: '🧔', color: '#EEF7F7' },
    { id: 'kids', name: 'Kids', icon: '⭐', color: '#FEF6ED' },
    { id: 'spa', name: 'Spa', icon: '💆', color: '#FDF2F8' },
  ];

  const handleOpenSalon = (salon: Salon) => {
    setSelectedSalon(salon);
    setSalonDetailVisible(true);
  };

  const filteredSalons = salons.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Top Header - Aarti, Mumbai */}
        <View style={styles.topHeader}>
          <View style={styles.userSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>A</Text>
            </View>
            <View>
              <Text style={styles.greeting}>Namaste, Aarti</Text>
              <View style={styles.locationPill}>
                <Ionicons name="location-sharp" size={13} color="#9E1B4F" />
                <Text style={styles.locationText}>Bandra West, Mumbai</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.bellBtn}>
            <Ionicons name="notifications-outline" size={20} color="#1E121E" />
            <View style={styles.bellDot} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color="#8A7B87" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search services, salons or artists"
            placeholderTextColor="#8A7B87"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Hero Banner: Wedding Season */}
        <View style={styles.heroBanner}>
          <View style={styles.bannerDecorCircle} />
          <View style={{ zIndex: 2 }}>
            <Text style={styles.bannerTag}>Wedding season</Text>
            <Text style={styles.bannerHeadline}>Bridal mehendi,{'\n'}booked in minutes</Text>
          </View>
        </View>

        {/* Big Action Tiles: Book a Salon / Book an Artist */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: '#9E1B4F' }]}
            onPress={() => onNavigateToTab('explore')}
            activeOpacity={0.9}>
            <View style={styles.actionIcon}>
              <Ionicons name="business" size={22} color="#FFF" />
            </View>
            <Text style={styles.actionTitle}>Book a salon</Text>
            <Text style={styles.actionSub}>Walk-in or at home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: '#E5A024' }]}
            onPress={() => onNavigateToTab('explore')}
            activeOpacity={0.9}>
            <View style={styles.actionIcon}>
              <Ionicons name="person" size={22} color="#FFF" />
            </View>
            <Text style={styles.actionTitle}>Book an artist</Text>
            <Text style={styles.actionSub}>Independent pros</Text>
          </TouchableOpacity>
        </View>

        {/* Mini Tiles: Top Rated / Deals */}
        <View style={styles.miniActionRow}>
          <TouchableOpacity
            style={styles.miniCard}
            onPress={() => onNavigateToTab('explore')}>
            <Text style={{ fontSize: 20 }}>⭐</Text>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.miniTitle}>Top rated</Text>
              <Text style={styles.miniSub}>Best this week</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.miniCard}
            onPress={() => onNavigateToTab('explore')}>
            <Text style={{ fontSize: 20 }}>🏷️</Text>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.miniTitle}>Deals</Text>
              <Text style={styles.miniSub}>Coupons and offers</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Browse by Service */}
        <Text style={styles.sectionTitle}>Browse by service</Text>
        <View style={styles.categoryGrid}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={styles.catItem}
              onPress={() => onNavigateToTab('explore')}>
              <View style={[styles.catIconWrap, { backgroundColor: cat.color }]}>
                <Text style={{ fontSize: 22 }}>{cat.icon}</Text>
              </View>
              <Text style={styles.catLabel}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Salons near you */}
        <View style={styles.salonsHeaderRow}>
          <Text style={styles.sectionTitle}>Salons near you</Text>
          <TouchableOpacity onPress={() => onNavigateToTab('explore')}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.salonsList}>
          {filteredSalons.map((salon) => (
            <TouchableOpacity
              key={salon.id}
              style={styles.salonCard}
              onPress={() => handleOpenSalon(salon)}
              activeOpacity={0.9}>
              <View
                style={[
                  styles.salonImageBanner,
                  { backgroundColor: salon.coverGradient[0] },
                ]}>
                <View style={styles.salonRatingBadge}>
                  <Text style={styles.salonRatingText}>{salon.rating} ★</Text>
                </View>
              </View>
              <View style={styles.salonCardBody}>
                <View style={styles.salonCardTitleRow}>
                  <Text style={styles.salonCardName}>{salon.name}</Text>
                  <View style={styles.badgeSmall}>
                    <Text style={styles.badgeSmallText}>{salon.type}</Text>
                  </View>
                </View>
                <Text style={styles.salonCardMeta}>
                  {salon.location} · {salon.distance}
                </Text>
                <Text style={styles.salonCardOpen}>{salon.openTill}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Salon Details Modal */}
      <SalonDetailModal
        visible={salonDetailVisible}
        salon={selectedSalon}
        onClose={() => setSalonDetailVisible(false)}
        onBookingComplete={() => {
          setSalonDetailVisible(false);
          onNavigateToTab('bookings');
        }}
      />
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
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#9E1B4F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  greeting: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E121E',
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 3,
  },
  locationText: {
    fontSize: 12,
    color: '#6B5E68',
    fontWeight: '500',
  },
  bellBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFE7E0',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bellDot: {
    position: 'absolute',
    top: 8,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: KalaaColors.primary,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: '#EFE7E0',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#1E121E',
  },
  heroBanner: {
    backgroundColor: '#22122A',
    borderRadius: 20,
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 16,
  },
  bannerDecorCircle: {
    position: 'absolute',
    right: -25,
    top: -25,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#E5A024',
    opacity: 0.85,
  },
  bannerTag: {
    color: '#E5A024',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  bannerHeadline: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 26,
    marginTop: 6,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  actionCard: {
    flex: 1,
    borderRadius: 18,
    padding: 16,
    minHeight: 120,
    justifyContent: 'space-between',
    ...KalaaShadow.soft,
  },
  actionIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 8,
  },
  actionSub: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 2,
  },
  miniActionRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  miniCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EFE7E0',
  },
  miniTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E121E',
  },
  miniSub: {
    fontSize: 11,
    color: '#6B5E68',
    marginTop: 1,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1E121E',
    marginBottom: 12,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  catItem: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 14,
  },
  catIconWrap: {
    width: 58,
    height: 58,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#EFE7E0',
  },
  catLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3B2939',
  },
  salonsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAllText: {
    color: KalaaColors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  salonsList: {
    gap: 14,
  },
  salonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EFE7E0',
    ...KalaaShadow.soft,
  },
  salonImageBanner: {
    height: 100,
    padding: 12,
    position: 'relative',
    alignItems: 'flex-end',
  },
  salonRatingBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  salonRatingText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#B45309',
  },
  salonCardBody: {
    padding: 14,
  },
  salonCardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  salonCardName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E121E',
  },
  badgeSmall: {
    backgroundColor: '#FDF2F7',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeSmallText: {
    color: KalaaColors.primary,
    fontSize: 11,
    fontWeight: '700',
  },
  salonCardMeta: {
    fontSize: 12,
    color: '#6B5E68',
    marginTop: 4,
  },
  salonCardOpen: {
    fontSize: 11,
    color: '#0F766E',
    fontWeight: '600',
    marginTop: 4,
  },
});
