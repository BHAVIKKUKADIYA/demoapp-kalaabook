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
import { Salon, ServiceItem } from '@/types/kalaa';
import { BookingFlowModal } from './BookingFlowModal';

interface SalonDetailModalProps {
  visible: boolean;
  salon: Salon | null;
  onClose: () => void;
  onBookingComplete: (bookingId: string) => void;
}

export function SalonDetailModal({
  visible,
  salon,
  onClose,
  onBookingComplete,
}: SalonDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'Services' | 'Team' | 'Reviews' | 'About'>('Services');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [bookingModalVisible, setBookingModalVisible] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  if (!salon) return null;

  const handleStartBooking = (service: ServiceItem) => {
    setSelectedService(service);
    setBookingModalVisible(true);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header Image Area with Decorative Curve */}
          <View
            style={[
              styles.heroBanner,
              { backgroundColor: salon.coverGradient[0] },
            ]}>
            <View style={styles.heroNav}>
              <TouchableOpacity style={styles.circleBtn} onPress={onClose}>
                <Ionicons name="arrow-back" size={20} color="#1E121E" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.circleBtn}
                onPress={() => setIsFavorite(!isFavorite)}>
                <Ionicons
                  name={isFavorite ? 'heart' : 'heart-outline'}
                  size={20}
                  color={isFavorite ? KalaaColors.primary : '#1E121E'}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.heroCircleAccent} />
          </View>

          {/* Salon Info Header */}
          <View style={styles.salonInfoCard}>
            <View style={styles.titleRow}>
              <Text style={styles.salonName}>{salon.name}</Text>
              <View style={styles.typeBadge}>
                <Text style={styles.typeBadgeText}>{salon.type}</Text>
              </View>
            </View>

            <View style={styles.ratingRow}>
              <View style={styles.starBadge}>
                <Text style={styles.starText}>{salon.rating} ★</Text>
              </View>
              <Text style={styles.reviewsMeta}>
                {salon.reviewsCount} reviews · {salon.location} · {salon.distance}
              </Text>
            </View>
            <Text style={styles.openMeta}>{salon.openTill}</Text>

            {/* Navigation Tabs */}
            <View style={styles.tabsRow}>
              {(['Services', 'Team', 'Reviews', 'About'] as const).map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[
                    styles.tabItem,
                    activeTab === tab && styles.tabItemActive,
                  ]}
                  onPress={() => setActiveTab(tab)}>
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === tab && styles.tabTextActive,
                    ]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Tab Content */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollBody}>
            {activeTab === 'Services' && (
              <View>
                {/* Pro recommendation banner */}
                <View style={styles.proBanner}>
                  <View style={styles.proBubbles}>
                    <View style={[styles.proBubble, { backgroundColor: '#E11D48' }]} />
                    <View style={[styles.proBubble, { backgroundColor: '#E5A024' }]} />
                    <View style={[styles.proBubble, { backgroundColor: '#0D9488' }]} />
                  </View>
                  <Text style={styles.proBannerText}>
                    4 professionals. Pick anyone or let us assign.
                  </Text>
                  <Text style={styles.proBannerLink}>View</Text>
                </View>

                {/* Hair Category */}
                <Text style={styles.categoryHeading}>Hair</Text>
                {salon.services
                  .filter((s) => s.category === 'Hair')
                  .map((service) => (
                    <View key={service.id} style={styles.serviceCard}>
                      <View style={styles.serviceIconWrap}>
                        <Text style={{ fontSize: 18 }}>✂️</Text>
                      </View>
                      <View style={{ flex: 1, marginHorizontal: 12 }}>
                        <Text style={styles.serviceTitle}>{service.name}</Text>
                        <Text style={styles.serviceDuration}>
                          {service.duration} · ₹{service.price}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={styles.addBtn}
                        onPress={() => handleStartBooking(service)}>
                        <Text style={styles.addBtnText}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  ))}

                {/* Nails / Mehendi Category */}
                <Text style={[styles.categoryHeading, { marginTop: 18 }]}>
                  Nails & Mehendi
                </Text>
                {salon.services
                  .filter((s) => s.category !== 'Hair')
                  .map((service) => (
                    <View key={service.id} style={styles.serviceCard}>
                      <View style={styles.serviceIconWrap}>
                        <Text style={{ fontSize: 18 }}>💅</Text>
                      </View>
                      <View style={{ flex: 1, marginHorizontal: 12 }}>
                        <Text style={styles.serviceTitle}>{service.name}</Text>
                        <Text style={styles.serviceDuration}>
                          {service.duration} · ₹{service.price}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={styles.addBtn}
                        onPress={() => handleStartBooking(service)}>
                        <Text style={styles.addBtnText}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
              </View>
            )}

            {activeTab === 'Team' && (
              <View>
                {salon.staff.map((stylist) => (
                  <View key={stylist.id} style={styles.staffCard}>
                    <View
                      style={[
                        styles.staffAvatar,
                        { backgroundColor: stylist.avatarColor },
                      ]}>
                      <Text style={styles.staffAvatarText}>
                        {stylist.name.charAt(0)}
                      </Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: 14 }}>
                      <Text style={styles.staffName}>{stylist.name}</Text>
                      <Text style={styles.staffRole}>{stylist.role}</Text>
                      <Text style={styles.staffMeta}>
                        {stylist.rating} ★ · {stylist.experience || '4 yrs'} exp
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {activeTab === 'Reviews' && (
              <View>
                <View style={styles.reviewSummary}>
                  <Text style={styles.bigRating}>{salon.rating}</Text>
                  <Text style={styles.bigRatingStars}>★★★★★</Text>
                  <Text style={styles.reviewSub}>Based on {salon.reviewsCount} verified bookings</Text>
                </View>
                {[
                  { user: 'Sneha P.', rating: 5, text: 'Amazing haircut and Megha is so polite!', date: 'Yesterday' },
                  { user: 'Rhea M.', rating: 5, text: 'Clean studio, punctual service, loved the hair spa.', date: '3 days ago' },
                ].map((r, i) => (
                  <View key={i} style={styles.customerReviewCard}>
                    <Text style={styles.customerReviewUser}>{r.user}</Text>
                    <Text style={styles.customerReviewRating}>{'★'.repeat(r.rating)}</Text>
                    <Text style={styles.customerReviewText}>{r.text}</Text>
                    <Text style={styles.customerReviewDate}>{r.date}</Text>
                  </View>
                ))}
              </View>
            )}

            {activeTab === 'About' && (
              <View style={styles.aboutCard}>
                <Text style={styles.aboutHeading}>About {salon.name}</Text>
                <Text style={styles.aboutText}>
                  Specialized in premium hair styling, nail care, and bridal makeup. 
                  Providing walk-in luxury salon experiences as well as home visits across Bandra and Mumbai.
                </Text>
                <Text style={[styles.aboutHeading, { marginTop: 16 }]}>Address & Hours</Text>
                <Text style={styles.aboutText}>{salon.location}</Text>
                <Text style={styles.aboutText}>Mon - Sun: 10:00 AM - 8:00 PM</Text>
              </View>
            )}
          </ScrollView>

          {/* Floating Book Now Bar */}
          <View style={styles.floatingBottom}>
            <TouchableOpacity style={styles.callBtn}>
              <Ionicons name="call-outline" size={20} color="#1E121E" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bookNowBtn}
              onPress={() =>
                handleStartBooking(
                  salon.services[0] || {
                    id: 'default',
                    name: 'General Service',
                    category: 'Hair',
                    duration: '45 min',
                    price: 799,
                    homeVisitAvailable: true,
                  }
                )
              }>
              <Text style={styles.bookNowText}>Book now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Booking flow nested modal */}
      <BookingFlowModal
        visible={bookingModalVisible}
        salon={salon}
        initialService={selectedService}
        onClose={() => setBookingModalVisible(false)}
        onSuccess={(id) => {
          setBookingModalVisible(false);
          onClose();
          onBookingComplete(id);
        }}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(20, 10, 24, 0.75)',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFBF8',
    marginTop: 30,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: 'hidden',
  },
  heroBanner: {
    height: 140,
    paddingHorizontal: 16,
    paddingTop: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  heroCircleAccent: {
    position: 'absolute',
    right: -20,
    top: -20,
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  heroNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  circleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    ...KalaaShadow.soft,
  },
  salonInfoCard: {
    backgroundColor: '#FFFFFF',
    marginTop: -24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EFE7E0',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  salonName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1E121E',
  },
  typeBadge: {
    backgroundColor: '#FDF2F7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  typeBadgeText: {
    color: KalaaColors.primary,
    fontSize: 11,
    fontWeight: '700',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 8,
  },
  starBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  starText: {
    color: '#B45309',
    fontSize: 12,
    fontWeight: '800',
  },
  reviewsMeta: {
    fontSize: 13,
    color: '#6B5E68',
  },
  openMeta: {
    fontSize: 12,
    color: '#0F766E',
    fontWeight: '600',
    marginTop: 4,
  },
  tabsRow: {
    flexDirection: 'row',
    marginTop: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EFE7E0',
  },
  tabItem: {
    paddingVertical: 10,
    marginRight: 20,
  },
  tabItemActive: {
    borderBottomWidth: 2.5,
    borderBottomColor: KalaaColors.primary,
  },
  tabText: {
    fontSize: 14,
    color: '#6B5E68',
    fontWeight: '600',
  },
  tabTextActive: {
    color: KalaaColors.primary,
    fontWeight: '700',
  },
  scrollBody: {
    padding: 20,
    paddingBottom: 90,
  },
  proBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22122A',
    padding: 12,
    borderRadius: 14,
    marginBottom: 16,
  },
  proBubbles: {
    flexDirection: 'row',
    marginRight: 10,
  },
  proBubble: {
    width: 22,
    height: 22,
    borderRadius: 11,
    marginLeft: -6,
    borderWidth: 1.5,
    borderColor: '#22122A',
  },
  proBannerText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  proBannerLink: {
    color: '#F5A623',
    fontWeight: '700',
    fontSize: 12,
    marginLeft: 6,
  },
  categoryHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E121E',
    marginBottom: 10,
  },
  serviceCard: {
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
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FDF2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E121E',
  },
  serviceDuration: {
    fontSize: 12,
    color: '#6B5E68',
    marginTop: 2,
  },
  addBtn: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: KalaaColors.primary,
  },
  addBtnText: {
    color: KalaaColors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  staffCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EFE7E0',
  },
  staffAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  staffAvatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  staffName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E121E',
  },
  staffRole: {
    fontSize: 12,
    color: '#6B5E68',
    marginTop: 2,
  },
  staffMeta: {
    fontSize: 12,
    color: '#D97706',
    fontWeight: '600',
    marginTop: 2,
  },
  reviewSummary: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#EFE7E0',
  },
  bigRating: {
    fontSize: 36,
    fontWeight: '900',
    color: '#1E121E',
  },
  bigRatingStars: {
    color: '#D97706',
    fontSize: 18,
    marginVertical: 4,
  },
  reviewSub: {
    fontSize: 12,
    color: '#6B5E68',
  },
  customerReviewCard: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EFE7E0',
  },
  customerReviewUser: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E121E',
  },
  customerReviewRating: {
    color: '#D97706',
    fontSize: 12,
    marginTop: 2,
  },
  customerReviewText: {
    fontSize: 13,
    color: '#332431',
    marginTop: 6,
  },
  customerReviewDate: {
    fontSize: 11,
    color: '#9B8E98',
    marginTop: 4,
  },
  aboutCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EFE7E0',
  },
  aboutHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E121E',
    marginBottom: 6,
  },
  aboutText: {
    fontSize: 13,
    color: '#554452',
    lineHeight: 19,
  },
  floatingBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFBF8',
    borderTopWidth: 1,
    borderTopColor: '#EFE7E0',
    gap: 12,
  },
  callBtn: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFE7E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookNowBtn: {
    flex: 1,
    backgroundColor: KalaaColors.primary,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    ...KalaaShadow.button,
  },
  bookNowText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
