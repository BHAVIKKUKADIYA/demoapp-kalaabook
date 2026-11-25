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
import { Booking } from '@/types/kalaa';
import { useKalaa } from '@/context/KalaaContext';

export function CustomerBookings() {
  const { bookings, cancelBooking, rescheduleBooking } = useKalaa();
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Past' | 'Cancelled'>('Upcoming');

  // Modals
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [rescheduleModalVisible, setRescheduleModalVisible] = useState(false);
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);

  // Reschedule state
  const [newRescheduleDate, setNewRescheduleDate] = useState('Thu 27 Nov');
  const [newRescheduleTime, setNewRescheduleTime] = useState('2:00 PM');

  // Chat state
  const [messages, setMessages] = useState([
    { id: '1', sender: 'stylist', text: 'Hi! Looking forward to your appointment tomorrow at 2 PM.', time: '1:04 PM' },
    { id: '2', sender: 'user', text: 'Thanks! Should I wash my hair before?', time: '1:06 PM' },
    { id: '3', sender: 'stylist', text: 'Please come with dry, unwashed hair. It works better for the style.', time: '1:08 PM' },
    { id: '4', sender: 'user', text: 'Got it, see you then', time: '1:09 PM' },
    { id: '5', sender: 'stylist', text: "Address confirmed as Hill Road? I'll reach 10 min early.", time: '1:10 PM' },
  ]);
  const [chatInput, setChatInput] = useState('');

  // Review state
  const [reviewRating, setReviewRating] = useState(4);
  const [reviewTags, setReviewTags] = useState<{ [key: string]: boolean }>({
    punctual: true,
    skill: true,
  });
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'Upcoming') return b.status === 'Confirmed' || b.status === 'Awaiting' || b.status === 'Checked in';
    if (activeTab === 'Past') return b.status === 'Completed';
    return b.status === 'Cancelled';
  });

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'user',
        text: chatInput.trim(),
        time: 'Just now',
      },
    ]);
    setChatInput('');
  };

  const handleConfirmReschedule = () => {
    if (selectedBooking) {
      rescheduleBooking(selectedBooking.id, newRescheduleDate, newRescheduleTime);
      setRescheduleModalVisible(false);
      setDetailModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.header}>
        <Text style={styles.title}>My bookings</Text>
      </View>

      {/* Tabs: Upcoming / Past / Cancelled */}
      <View style={styles.tabsRow}>
        {(['Upcoming', 'Past', 'Cancelled'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
            onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {filteredBookings.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Text style={{ fontSize: 36 }}>📅</Text>
            </View>
            <Text style={styles.emptyTitle}>No bookings yet</Text>
            <Text style={styles.emptySub}>
              When you book a salon or artist, it will show up here.
            </Text>
          </View>
        ) : (
          filteredBookings.map((booking) => (
            <TouchableOpacity
              key={booking.id}
              style={styles.card}
              onPress={() => {
                setSelectedBooking(booking);
                setDetailModalVisible(true);
              }}
              activeOpacity={0.9}>
              {/* Left Date Box */}
              <View style={styles.dateBox}>
                <Text style={styles.dateBoxDay}>{booking.date.split(' ')[0]}</Text>
                <Text style={styles.dateBoxNum}>{booking.date.split(' ')[1] || '26'}</Text>
              </View>

              {/* Right Details */}
              <View style={{ flex: 1, marginLeft: 14 }}>
                <View style={styles.cardTopRow}>
                  <Text style={styles.bookingId}>{booking.id}</Text>
                  <View
                    style={[
                      styles.statusPill,
                      booking.status === 'Confirmed' && { backgroundColor: '#E6F7ED' },
                      booking.status === 'Awaiting' && { backgroundColor: '#FEF3C7' },
                      booking.status === 'Cancelled' && { backgroundColor: '#FEE2E2' },
                    ]}>
                    <Text
                      style={[
                        styles.statusPillText,
                        booking.status === 'Confirmed' && { color: '#0F766E' },
                        booking.status === 'Awaiting' && { color: '#D97706' },
                        booking.status === 'Cancelled' && { color: '#B91C1C' },
                      ]}>
                      {booking.status}
                    </Text>
                  </View>
                </View>

                <Text style={styles.serviceName}>{booking.serviceName}</Text>
                <Text style={styles.stylistMeta}>
                  {booking.salonName} · {booking.stylistName} · {booking.time}
                </Text>

                <View style={styles.cardFooter}>
                  <Text style={styles.amountText}>₹{booking.amount}</Text>

                  {/* Actions depending on status */}
                  {activeTab === 'Past' ? (
                    <TouchableOpacity
                      style={styles.reviewBtn}
                      onPress={() => {
                        setSelectedBooking(booking);
                        setReviewModalVisible(true);
                      }}>
                      <Text style={styles.reviewBtnText}>Leave a review</Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.viewRow}>
                      <Text style={styles.viewDetailsText}>View details</Text>
                      <Ionicons name="chevron-forward" size={14} color={KalaaColors.primary} />
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* DETAIL MODAL (Page 42) */}
      <Modal visible={detailModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            {selectedBooking && (
              <>
                <View style={styles.sheetHeader}>
                  <TouchableOpacity
                    style={styles.circleBtn}
                    onPress={() => setDetailModalVisible(false)}>
                    <Ionicons name="arrow-back" size={20} color="#1E121E" />
                  </TouchableOpacity>
                  <Text style={styles.sheetTitle}>Booking · {selectedBooking.id}</Text>
                  <View
                    style={[
                      styles.statusPill,
                      { backgroundColor: '#E6F7ED' },
                    ]}>
                    <Text style={{ color: '#0F766E', fontSize: 11, fontWeight: '700' }}>
                      {selectedBooking.status}
                    </Text>
                  </View>
                </View>

                <ScrollView contentContainerStyle={{ padding: 20 }}>
                  {/* Hero Date Banner */}
                  <View style={styles.heroTimeCard}>
                    <Text style={styles.heroTimeTitle}>
                      {selectedBooking.date} · {selectedBooking.time}
                    </Text>
                    <Text style={styles.heroTimeSub}>in 2 days · {selectedBooking.serviceDuration}</Text>
                  </View>

                  {/* Stylist & Chat Action */}
                  <View style={styles.detailCard}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View style={styles.avatarMini}>
                        <Text style={styles.avatarMiniText}>
                          {selectedBooking.stylistName.charAt(0)}
                        </Text>
                      </View>
                      <View style={{ flex: 1, marginLeft: 12 }}>
                        <Text style={styles.proNameTitle}>
                          {selectedBooking.salonName} · {selectedBooking.stylistName}
                        </Text>
                        <Text style={styles.proSubTitle}>
                          {selectedBooking.serviceName}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={styles.chatActionBtn}
                        onPress={() => setChatModalVisible(true)}>
                        <Ionicons name="chatbubble-ellipses" size={20} color="#9E1B4F" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Location Card */}
                  <View style={styles.detailCard}>
                    <Text style={styles.cardHeaderSmall}>Where</Text>
                    <Text style={styles.locationTitleSmall}>
                      {selectedBooking.locationType}
                    </Text>
                    <Text style={styles.locationSubSmall}>
                      {selectedBooking.address}
                    </Text>
                  </View>

                  {/* Payment Breakdown Card */}
                  <View style={styles.detailCard}>
                    <Text style={styles.cardHeaderSmall}>Payment</Text>
                    <View style={styles.priceRow}>
                      <Text style={styles.priceLabel}>Total</Text>
                      <Text style={styles.priceValBold}>₹{selectedBooking.amount}</Text>
                    </View>
                    {selectedBooking.discount > 0 && (
                      <View style={styles.priceRow}>
                        <Text style={[styles.priceLabel, { color: '#0F766E' }]}>
                          Coupon {selectedBooking.couponCode}
                        </Text>
                        <Text style={[styles.priceVal, { color: '#0F766E' }]}>
                          - ₹{selectedBooking.discount}
                        </Text>
                      </View>
                    )}
                    <View style={styles.priceRow}>
                      <Text style={styles.priceLabel}>Mode</Text>
                      <Text style={styles.priceVal}>{selectedBooking.paymentMode}</Text>
                    </View>
                  </View>
                </ScrollView>

                {/* Bottom Sheet Actions */}
                <View style={styles.sheetActions}>
                  <TouchableOpacity
                    style={styles.rescheduleBtn}
                    onPress={() => setRescheduleModalVisible(true)}>
                    <Text style={styles.rescheduleText}>Reschedule</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={() => {
                      cancelBooking(selectedBooking.id);
                      setDetailModalVisible(false);
                    }}>
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* RESCHEDULE MODAL (Page 49) */}
      <Modal visible={rescheduleModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.sheetHeader}>
              <TouchableOpacity
                style={styles.circleBtn}
                onPress={() => setRescheduleModalVisible(false)}>
                <Ionicons name="close" size={20} color="#1E121E" />
              </TouchableOpacity>
              <Text style={styles.sheetTitle}>Reschedule</Text>
              <View style={{ width: 36 }} />
            </View>

            <View style={{ padding: 20 }}>
              <Text style={styles.cardHeaderSmall}>Currently</Text>
              <Text style={styles.strikeCurrentDate}>Wed 26 Nov · 2:00 PM</Text>

              <Text style={[styles.cardHeaderSmall, { marginTop: 18 }]}>Pick a new date</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.datePickerRow}>
                  {['Thu 27 Nov', 'Fri 28 Nov', 'Sat 29 Nov', 'Sun 30 Nov'].map((d) => (
                    <TouchableOpacity
                      key={d}
                      style={[
                        styles.datePillSmall,
                        newRescheduleDate === d && styles.datePillSmallActive,
                      ]}
                      onPress={() => setNewRescheduleDate(d)}>
                      <Text
                        style={[
                          styles.datePillText,
                          newRescheduleDate === d && styles.datePillTextActive,
                        ]}>
                        {d}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>

              <Text style={[styles.cardHeaderSmall, { marginTop: 18 }]}>Available times</Text>
              <View style={styles.timeGridSmall}>
                {['10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '5:00 PM'].map((t) => (
                  <TouchableOpacity
                    key={t}
                    style={[
                      styles.timePillSmall,
                      newRescheduleTime === t && styles.timePillSmallActive,
                    ]}
                    onPress={() => setNewRescheduleTime(t)}>
                    <Text
                      style={[
                        styles.timePillText,
                        newRescheduleTime === t && styles.timePillTextActive,
                      ]}>
                      {t}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.freeRescheduleBadge}>
                <Text style={styles.freeRescheduleText}>
                  Free to reschedule. You are more than 24 hrs away. The artist will be notified.
                </Text>
              </View>
            </View>

            <View style={styles.sheetFooterSingle}>
              <TouchableOpacity
                style={styles.confirmRescheduleBtn}
                onPress={handleConfirmReschedule}>
                <Text style={styles.confirmRescheduleText}>
                  Confirm {newRescheduleDate} · {newRescheduleTime}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* CHAT WITH STYLIST (Page 48) */}
      <Modal visible={chatModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheetFull}>
            <View style={styles.sheetHeader}>
              <TouchableOpacity
                style={styles.circleBtn}
                onPress={() => setChatModalVisible(false)}>
                <Ionicons name="arrow-back" size={20} color="#1E121E" />
              </TouchableOpacity>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={styles.sheetTitle}>Megha · Glow Studio</Text>
                <Text style={{ fontSize: 11, color: '#0F766E' }}>Replies in minutes</Text>
              </View>
              <View style={{ width: 36 }} />
            </View>

            <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
              <View style={styles.chatBookingBadge}>
                <Text style={styles.chatBookingBadgeText}>Booking KB-2641 · Wed 26 Nov</Text>
              </View>

              {messages.map((m) => (
                <View
                  key={m.id}
                  style={[
                    styles.msgBubble,
                    m.sender === 'user' ? styles.userMsg : styles.stylistMsg,
                  ]}>
                  <Text
                    style={[
                      styles.msgText,
                      m.sender === 'user' && { color: '#FFFFFF' },
                    ]}>
                    {m.text}
                  </Text>
                  <Text
                    style={[
                      styles.msgTime,
                      m.sender === 'user' ? { color: '#FFD4E5' } : { color: '#9B8E98' },
                    ]}>
                    {m.time}
                  </Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.chatInputBar}>
              <TextInput
                style={styles.chatTextInput}
                placeholder="Message Megha..."
                value={chatInput}
                onChangeText={setChatInput}
                onSubmitEditing={handleSendMessage}
              />
              <TouchableOpacity style={styles.chatSendBtn} onPress={handleSendMessage}>
                <Ionicons name="send" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* WRITE A REVIEW MODAL (Page 43) */}
      <Modal visible={reviewModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.sheetHeader}>
              <TouchableOpacity
                style={styles.circleBtn}
                onPress={() => setReviewModalVisible(false)}>
                <Ionicons name="close" size={20} color="#1E121E" />
              </TouchableOpacity>
              <Text style={styles.sheetTitle}>Write a review</Text>
              <View style={{ width: 36 }} />
            </View>

            <View style={{ padding: 20 }}>
              <View style={styles.ratingBox}>
                <Text style={styles.howWasItText}>How was your experience?</Text>
                <View style={styles.starsRow}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity
                      key={star}
                      onPress={() => setReviewRating(star)}>
                      <Text style={{ fontSize: 32 }}>
                        {star <= reviewRating ? '★' : '☆'}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={styles.ratingLabelText}>{reviewRating} / 5 Stars</Text>
              </View>

              <Text style={[styles.cardHeaderSmall, { marginTop: 16 }]}>What went well?</Text>
              <View style={styles.tagWrap}>
                {['Punctual', 'Great skill', 'Clean hygiene', 'Friendly', 'Value for money'].map((tag) => (
                  <TouchableOpacity
                    key={tag}
                    style={[
                      styles.reviewTagPill,
                      reviewTags[tag] && styles.reviewTagPillActive,
                    ]}
                    onPress={() =>
                      setReviewTags((prev) => ({ ...prev, [tag]: !prev[tag] }))
                    }>
                    <Text
                      style={[
                        styles.reviewTagText,
                        reviewTags[tag] && styles.reviewTagTextActive,
                      ]}>
                      {tag} {reviewTags[tag] ? '✓' : ''}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TextInput
                style={styles.reviewTextInput}
                placeholder="Tell others what made it good..."
                value={reviewComment}
                onChangeText={setReviewComment}
                multiline
              />

              <TouchableOpacity
                style={styles.confirmRescheduleBtn}
                onPress={() => {
                  setReviewSubmitted(true);
                  setTimeout(() => {
                    setReviewModalVisible(false);
                    setReviewSubmitted(false);
                  }, 800);
                }}>
                <Text style={styles.confirmRescheduleText}>
                  {reviewSubmitted ? '✓ Review Submitted!' : 'Submit Review'}
                </Text>
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
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
    marginRight: 24,
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
  dateBox: {
    width: 60,
    height: 70,
    borderRadius: 14,
    backgroundColor: KalaaColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateBoxDay: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  dateBoxNum: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookingId: {
    fontSize: 11,
    color: '#8A7B87',
    fontWeight: '700',
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '700',
  },
  serviceName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E121E',
    marginTop: 4,
  },
  stylistMeta: {
    fontSize: 12,
    color: '#6B5E68',
    marginTop: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  amountText: {
    fontSize: 15,
    fontWeight: '800',
    color: KalaaColors.primary,
  },
  reviewBtn: {
    backgroundColor: '#FDF2F7',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  reviewBtnText: {
    color: KalaaColors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewDetailsText: {
    color: KalaaColors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F8F1EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E121E',
  },
  emptySub: {
    fontSize: 13,
    color: '#6B5E68',
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: 30,
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
  modalSheetFull: {
    backgroundColor: '#FFFBF8',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    height: '92%',
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
  heroTimeCard: {
    backgroundColor: KalaaColors.primary,
    padding: 18,
    borderRadius: 18,
    marginBottom: 14,
  },
  heroTimeTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  heroTimeSub: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13,
    marginTop: 4,
  },
  detailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFE7E0',
    marginBottom: 12,
  },
  avatarMini: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E11D48',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarMiniText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  proNameTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E121E',
  },
  proSubTitle: {
    fontSize: 13,
    color: '#6B5E68',
    marginTop: 2,
  },
  chatActionBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FDF2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHeaderSmall: {
    fontSize: 12,
    color: '#8A7B87',
    fontWeight: '700',
    marginBottom: 6,
  },
  locationTitleSmall: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E121E',
  },
  locationSubSmall: {
    fontSize: 12,
    color: '#6B5E68',
    marginTop: 2,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  priceLabel: {
    fontSize: 13,
    color: '#6B5E68',
  },
  priceVal: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E121E',
  },
  priceValBold: {
    fontSize: 16,
    fontWeight: '800',
    color: KalaaColors.primary,
  },
  sheetActions: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#EFE7E0',
    backgroundColor: '#FFFBF8',
  },
  rescheduleBtn: {
    flex: 1,
    backgroundColor: '#FEF3C7',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  rescheduleText: {
    color: '#92400E',
    fontSize: 15,
    fontWeight: '700',
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#FEE2E2',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  cancelText: {
    color: '#B91C1C',
    fontSize: 15,
    fontWeight: '700',
  },
  strikeCurrentDate: {
    fontSize: 15,
    color: '#8A7B87',
    textDecorationLine: 'line-through',
  },
  datePickerRow: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 4,
  },
  datePillSmall: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFE7E0',
  },
  datePillSmallActive: {
    backgroundColor: KalaaColors.primary,
    borderColor: KalaaColors.primary,
  },
  datePillText: {
    fontSize: 13,
    color: '#1E121E',
    fontWeight: '600',
  },
  datePillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  timeGridSmall: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timePillSmall: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFE7E0',
  },
  timePillSmallActive: {
    backgroundColor: '#22122A',
    borderColor: '#22122A',
  },
  timePillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E121E',
  },
  timePillTextActive: {
    color: '#FFFFFF',
  },
  freeRescheduleBadge: {
    backgroundColor: '#E6F7ED',
    padding: 12,
    borderRadius: 12,
    marginTop: 18,
  },
  freeRescheduleText: {
    fontSize: 12,
    color: '#0F766E',
    lineHeight: 17,
  },
  sheetFooterSingle: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EFE7E0',
    backgroundColor: '#FFFBF8',
  },
  confirmRescheduleBtn: {
    backgroundColor: KalaaColors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    ...KalaaShadow.button,
  },
  confirmRescheduleText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  chatBookingBadge: {
    alignSelf: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 8,
  },
  chatBookingBadgeText: {
    color: '#92400E',
    fontSize: 12,
    fontWeight: '700',
  },
  msgBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  userMsg: {
    alignSelf: 'flex-end',
    backgroundColor: KalaaColors.primary,
    borderBottomRightRadius: 4,
  },
  stylistMsg: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFE7E0',
    borderBottomLeftRadius: 4,
  },
  msgText: {
    fontSize: 14,
    color: '#1E121E',
  },
  msgTime: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  chatInputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EFE7E0',
    gap: 10,
  },
  chatTextInput: {
    flex: 1,
    height: 42,
    backgroundColor: '#F7F2EB',
    borderRadius: 21,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  chatSendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: KalaaColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingBox: {
    backgroundColor: '#FEF9EE',
    padding: 20,
    borderRadius: 18,
    alignItems: 'center',
  },
  howWasItText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E121E',
  },
  starsRow: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 10,
  },
  ratingLabelText: {
    color: '#B45309',
    fontWeight: '700',
    fontSize: 13,
  },
  tagWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 12,
  },
  reviewTagPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFE7E0',
  },
  reviewTagPillActive: {
    backgroundColor: '#0F766E',
    borderColor: '#0F766E',
  },
  reviewTagText: {
    fontSize: 12,
    color: '#1E121E',
    fontWeight: '600',
  },
  reviewTagTextActive: {
    color: '#FFFFFF',
  },
  reviewTextInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EFE7E0',
    padding: 14,
    height: 90,
    textAlignVertical: 'top',
    fontSize: 14,
    marginBottom: 16,
  },
});
