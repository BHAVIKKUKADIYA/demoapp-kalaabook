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
import { Salon, ServiceItem, Stylist } from '@/types/kalaa';
import { useKalaa } from '@/context/KalaaContext';

interface BookingFlowModalProps {
  visible: boolean;
  salon: Salon | null;
  initialService: ServiceItem | null;
  onClose: () => void;
  onSuccess: (bookingId: string) => void;
}

export function BookingFlowModal({
  visible,
  salon,
  initialService,
  onClose,
  onSuccess,
}: BookingFlowModalProps) {
  const { addBooking, coupons } = useKalaa();

  // Booking steps: 1 = Pro & Add-ons, 2 = Date & Time, 3 = Review & Coupon, 4 = Payment, 5 = Confirmed
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Selections
  const [selectedPro, setSelectedPro] = useState<string>('Megha');
  const [selectedAddons, setSelectedAddons] = useState<{ [key: string]: boolean }>({
    conditioning: true,
  });
  const [locationType, setLocationType] = useState<'At the salon' | 'Home visit'>('Home visit');
  const [selectedDate, setSelectedDate] = useState<string>('Wed 26 Nov');
  const [selectedTime, setSelectedTime] = useState<string>('2:00 PM');
  const [couponCode, setCouponCode] = useState<string>('GLOW20');
  const [couponApplied, setCouponApplied] = useState<boolean>(true);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'Wallet' | 'Cash / Pay at appointment'>('UPI');
  const [generatedBookingId, setGeneratedBookingId] = useState<string>('KB-2641');

  if (!salon || !initialService) return null;

  // Pricing calculations
  const basePrice = initialService.price;
  const addonHeadMassage = selectedAddons['head'] ? 199 : 0;
  const addonConditioning = selectedAddons['conditioning'] ? 399 : 0;
  const addonsTotal = addonHeadMassage + addonConditioning;
  const travelFee = locationType === 'Home visit' ? 150 : 0;
  const platformFee = 29;
  const subtotal = basePrice + addonsTotal + travelFee + platformFee;
  const discount = couponApplied ? Math.min(200, Math.round(subtotal * 0.2)) : 0;
  const total = subtotal - discount;

  const handleConfirmBooking = () => {
    const newId = `KB-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedBookingId(newId);
    addBooking({
      id: newId,
      customerName: 'Aarti Verma',
      customerPhone: '+91 98765 43210',
      salonId: salon.id,
      salonName: salon.name,
      serviceName: initialService.name,
      serviceDuration: initialService.duration,
      stylistName: selectedPro,
      date: selectedDate,
      time: selectedTime,
      locationType,
      address: 'Flat 302, Hill Rd, Bandra West',
      amount: total,
      couponCode: couponApplied ? couponCode : undefined,
      discount,
      status: 'Confirmed',
      paymentMode: paymentMethod,
      paymentStatus: paymentMethod === 'Cash / Pay at appointment' ? 'Unpaid' : 'Paid',
    });
    setStep(5); // Go to confirmed screen
  };

  const resetAndClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          {/* Header */}
          <View style={styles.topHeader}>
            {step > 1 && step < 5 ? (
              <TouchableOpacity
                style={styles.backBtn}
                onPress={() => setStep((s) => ((s - 1) as any))}>
                <Ionicons name="arrow-back" size={20} color="#1E121E" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.backBtn} onPress={resetAndClose}>
                <Ionicons name="close" size={20} color="#1E121E" />
              </TouchableOpacity>
            )}
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={styles.headerTitle}>
                {step === 1 && 'Choose professional'}
                {step === 2 && 'Pick date & time'}
                {step === 3 && 'Review & confirm'}
                {step === 4 && 'Payment'}
                {step === 5 && 'Booking Confirmed'}
              </Text>
              {step < 5 && (
                <Text style={styles.headerSub}>
                  {salon.name} · {initialService.name}
                </Text>
              )}
            </View>
            <View style={{ width: 36 }} />
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}>
            {/* STEP 1: CHOOSE PROFESSIONAL & ADDONS */}
            {step === 1 && (
              <View>
                <View style={styles.selectedServiceBanner}>
                  <View style={styles.bannerIcon}>
                    <Text style={{ fontSize: 18 }}>✂️</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.bannerServiceName}>{initialService.name}</Text>
                    <Text style={styles.bannerServiceMeta}>
                      {initialService.duration} · ₹{initialService.price}
                    </Text>
                  </View>
                </View>

                <Text style={styles.sectionTitle}>Who will do it?</Text>
                <View style={styles.proRow}>
                  <TouchableOpacity
                    style={[
                      styles.proCard,
                      selectedPro === 'Any available' && styles.proCardActive,
                    ]}
                    onPress={() => setSelectedPro('Any available')}>
                    <View style={[styles.proAvatar, { backgroundColor: '#6B5E68' }]}>
                      <Text style={styles.proAvatarText}>+</Text>
                    </View>
                    <Text style={styles.proName}>Any</Text>
                    <Text style={styles.proRole}>Auto-assign</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.proCard,
                      selectedPro === 'Megha' && styles.proCardActive,
                    ]}
                    onPress={() => setSelectedPro('Megha')}>
                    <View style={[styles.proAvatar, { backgroundColor: '#E11D48' }]}>
                      <Text style={styles.proAvatarText}>M</Text>
                    </View>
                    <Text style={styles.proName}>Megha</Text>
                    <Text style={styles.proRating}>4.9 ★</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.proCard,
                      selectedPro === 'Sana' && styles.proCardActive,
                    ]}
                    onPress={() => setSelectedPro('Sana')}>
                    <View style={[styles.proAvatar, { backgroundColor: '#0D9488' }]}>
                      <Text style={styles.proAvatarText}>S</Text>
                    </View>
                    <Text style={styles.proName}>Sana</Text>
                    <Text style={styles.proRating}>4.8 ★</Text>
                  </TouchableOpacity>
                </View>

                <Text style={[styles.sectionTitle, { marginTop: 24 }]}>
                  Add-ons (optional)
                </Text>

                <TouchableOpacity
                  style={[
                    styles.addonCard,
                    selectedAddons['head'] && styles.addonCardActive,
                  ]}
                  onPress={() =>
                    setSelectedAddons((prev) => ({ ...prev, head: !prev['head'] }))
                  }>
                  <View style={styles.checkbox}>
                    {selectedAddons['head'] && (
                      <Ionicons name="checkmark" size={16} color="#FFF" />
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.addonTitle}>Head massage</Text>
                    <Text style={styles.addonMeta}>15 min</Text>
                  </View>
                  <Text style={styles.addonPrice}>+₹199</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.addonCard,
                    selectedAddons['conditioning'] && styles.addonCardActive,
                  ]}
                  onPress={() =>
                    setSelectedAddons((prev) => ({
                      ...prev,
                      conditioning: !prev['conditioning'],
                    }))
                  }>
                  <View style={styles.checkbox}>
                    {selectedAddons['conditioning'] && (
                      <Ionicons name="checkmark" size={16} color="#FFF" />
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.addonTitle}>Deep conditioning</Text>
                    <Text style={styles.addonMeta}>20 min</Text>
                  </View>
                  <Text style={styles.addonPrice}>+₹399</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* STEP 2: PICK DATE & TIME */}
            {step === 2 && (
              <View>
                <Text style={styles.sectionTitle}>Where</Text>
                <View style={styles.locationRow}>
                  <TouchableOpacity
                    style={[
                      styles.locationCard,
                      locationType === 'At the salon' && styles.locationCardActive,
                    ]}
                    onPress={() => setLocationType('At the salon')}>
                    <Ionicons
                      name="storefront-outline"
                      size={24}
                      color={
                        locationType === 'At the salon'
                          ? KalaaColors.primary
                          : '#6B5E68'
                      }
                    />
                    <Text style={styles.locationTitle}>At the salon</Text>
                    <Text style={styles.locationSub}>Bandra West</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.locationCard,
                      locationType === 'Home visit' && styles.locationCardActive,
                    ]}
                    onPress={() => setLocationType('Home visit')}>
                    <Ionicons
                      name="home-outline"
                      size={24}
                      color={
                        locationType === 'Home visit'
                          ? KalaaColors.primary
                          : '#6B5E68'
                      }
                    />
                    <Text style={styles.locationTitle}>Home visit</Text>
                    <Text style={styles.locationSub}>+ travel fee ₹150</Text>
                  </TouchableOpacity>
                </View>

                <Text style={[styles.sectionTitle, { marginTop: 20 }]}>When</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.dateRow}>
                    {[
                      { day: 'Mon', num: '24' },
                      { day: 'Tue', num: '25' },
                      { day: 'Wed', num: '26' },
                      { day: 'Thu', num: '27' },
                      { day: 'Fri', num: '28' },
                    ].map((d) => {
                      const fullDate = `${d.day} ${d.num} Nov`;
                      const isSelected = selectedDate === fullDate;
                      return (
                        <TouchableOpacity
                          key={d.num}
                          style={[
                            styles.datePill,
                            isSelected && styles.datePillActive,
                          ]}
                          onPress={() => setSelectedDate(fullDate)}>
                          <Text
                            style={[
                              styles.dateDay,
                              isSelected && styles.dateTextActive,
                            ]}>
                            {d.day}
                          </Text>
                          <Text
                            style={[
                              styles.dateNum,
                              isSelected && styles.dateTextActive,
                            ]}>
                            {d.num}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </ScrollView>

                <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Morning</Text>
                <View style={styles.timeGrid}>
                  {['9:00', '9:30', '10:00', '11:00'].map((t) => (
                    <TouchableOpacity
                      key={t}
                      style={[
                        styles.timePill,
                        selectedTime === `${t} AM` && styles.timePillActive,
                      ]}
                      onPress={() => setSelectedTime(`${t} AM`)}>
                      <Text
                        style={[
                          styles.timeText,
                          selectedTime === `${t} AM` && styles.timeTextActive,
                        ]}>
                        {t}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
                  Afternoon
                </Text>
                <View style={styles.timeGrid}>
                  {['2:00', '3:00', '4:00', '5:00'].map((t) => (
                    <TouchableOpacity
                      key={t}
                      style={[
                        styles.timePill,
                        selectedTime === `${t} PM` && styles.timePillActive,
                      ]}
                      onPress={() => setSelectedTime(`${t} PM`)}>
                      <Text
                        style={[
                          styles.timeText,
                          selectedTime === `${t} PM` && styles.timeTextActive,
                        ]}>
                        {t}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* STEP 3: REVIEW & CONFIRM */}
            {step === 3 && (
              <View>
                <View style={styles.reviewCard}>
                  <Text style={styles.reviewHeading}>Booking Details</Text>
                  <View style={styles.reviewRow}>
                    <Text style={styles.reviewLabel}>Service</Text>
                    <Text style={styles.reviewVal}>{initialService.name}</Text>
                  </View>
                  <View style={styles.reviewRow}>
                    <Text style={styles.reviewLabel}>Professional</Text>
                    <Text style={styles.reviewVal}>{selectedPro}</Text>
                  </View>
                  <View style={styles.reviewRow}>
                    <Text style={styles.reviewLabel}>When</Text>
                    <Text style={styles.reviewVal}>
                      {selectedDate} · {selectedTime}
                    </Text>
                  </View>
                  <View style={styles.reviewRow}>
                    <Text style={styles.reviewLabel}>Where</Text>
                    <Text style={styles.reviewVal}>
                      {locationType} · Hill Rd, Bandra
                    </Text>
                  </View>
                </View>

                {/* Coupon Box */}
                <View style={styles.couponCard}>
                  <View style={styles.couponInputRow}>
                    <TextInput
                      style={styles.couponInput}
                      value={couponCode}
                      onChangeText={setCouponCode}
                      placeholder="Enter coupon code"
                    />
                    <TouchableOpacity
                      style={styles.applyBtn}
                      onPress={() => setCouponApplied(true)}>
                      <Text style={styles.applyBtnText}>
                        {couponApplied ? 'Applied' : 'Apply'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {couponApplied && (
                    <Text style={styles.couponSuccess}>
                      🎉 {couponCode} applied · 20% off up to ₹200
                    </Text>
                  )}
                </View>

                {/* Price Breakdown */}
                <View style={styles.priceCard}>
                  <Text style={styles.reviewHeading}>Price Details</Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>{initialService.name}</Text>
                    <Text style={styles.priceVal}>₹{basePrice}</Text>
                  </View>
                  {addonsTotal > 0 && (
                    <View style={styles.priceRow}>
                      <Text style={styles.priceLabel}>Add-ons</Text>
                      <Text style={styles.priceVal}>₹{addonsTotal}</Text>
                    </View>
                  )}
                  {travelFee > 0 && (
                    <View style={styles.priceRow}>
                      <Text style={styles.priceLabel}>Home-visit travel</Text>
                      <Text style={styles.priceVal}>₹{travelFee}</Text>
                    </View>
                  )}
                  <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>Platform fee</Text>
                    <Text style={styles.priceVal}>₹{platformFee}</Text>
                  </View>
                  {discount > 0 && (
                    <View style={styles.priceRow}>
                      <Text style={[styles.priceLabel, { color: '#0F766E' }]}>
                        Coupon {couponCode}
                      </Text>
                      <Text style={[styles.priceVal, { color: '#0F766E' }]}>
                        - ₹{discount}
                      </Text>
                    </View>
                  )}
                  <View style={styles.divider} />
                  <View style={styles.priceRow}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalVal}>₹{total}</Text>
                  </View>
                  {discount > 0 && (
                    <View style={styles.savedBadge}>
                      <Text style={styles.savedText}>You saved ₹{discount}</Text>
                    </View>
                  )}
                </View>
              </View>
            )}

            {/* STEP 4: PAYMENT */}
            {step === 4 && (
              <View>
                <View style={styles.amountDueCard}>
                  <Text style={styles.amountDueLabel}>Amount due</Text>
                  <Text style={styles.amountDueVal}>₹{total}</Text>
                  <Text style={styles.secureBadge}>🔒 Secure · Razorpay</Text>
                </View>

                <Text style={styles.sectionTitle}>Choose payment method</Text>

                {[
                  {
                    id: 'UPI',
                    title: 'UPI',
                    sub: 'GPay · PhonePe · Paytm · QR',
                    icon: 'qr-code-outline',
                  },
                  {
                    id: 'Card',
                    title: 'Credit / Debit card',
                    sub: 'Visa · Mastercard · RuPay',
                    icon: 'card-outline',
                  },
                  {
                    id: 'Wallet',
                    title: 'KalaaBook Wallet',
                    sub: 'Balance: ₹300',
                    icon: 'wallet-outline',
                  },
                  {
                    id: 'Cash / Pay at appointment',
                    title: 'Pay at appointment',
                    sub: 'Cash / UPI / card to the pro',
                    icon: 'cash-outline',
                  },
                ].map((m) => {
                  const isChosen = paymentMethod === m.id;
                  return (
                    <TouchableOpacity
                      key={m.id}
                      style={[
                        styles.paymentOptionCard,
                        isChosen && styles.paymentOptionActive,
                      ]}
                      onPress={() => setPaymentMethod(m.id as any)}>
                      <Ionicons
                        name={m.icon as any}
                        size={24}
                        color={isChosen ? KalaaColors.primary : '#4A3B47'}
                      />
                      <View style={{ flex: 1, marginLeft: 12 }}>
                        <Text style={styles.paymentOptionTitle}>{m.title}</Text>
                        <Text style={styles.paymentOptionSub}>{m.sub}</Text>
                      </View>
                      <View
                        style={[
                          styles.radioCircle,
                          isChosen && styles.radioCircleActive,
                        ]}>
                        {isChosen && <View style={styles.radioDot} />}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}

            {/* STEP 5: BOOKING CONFIRMED */}
            {step === 5 && (
              <View style={styles.confirmedContainer}>
                <View style={styles.confirmedHero}>
                  <View style={styles.checkCircle}>
                    <Ionicons name="checkmark" size={36} color="#FFF" />
                  </View>
                  <Text style={styles.confirmedTitle}>Booking confirmed</Text>
                  <Text style={styles.confirmedSub}>
                    Confirmation sent on WhatsApp. {selectedPro} will see you on{' '}
                    {selectedDate.split(' ')[0]}.
                  </Text>
                </View>

                <View style={styles.ticketCard}>
                  <Text style={styles.ticketSalon}>{salon.name}</Text>
                  <Text style={styles.ticketService}>
                    {initialService.name} · {selectedPro}
                  </Text>
                  <View style={styles.ticketDivider} />
                  <View style={styles.ticketDetails}>
                    <View>
                      <Text style={styles.ticketMetaLabel}>When</Text>
                      <Text style={styles.ticketMetaVal}>
                        {selectedDate} · {selectedTime}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.ticketMetaLabel}>Where</Text>
                      <Text style={styles.ticketMetaVal}>{locationType}</Text>
                    </View>
                    <View>
                      <Text style={styles.ticketMetaLabel}>ID</Text>
                      <Text style={[styles.ticketMetaVal, { color: KalaaColors.primary }]}>
                        {generatedBookingId}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.shareRow}>
                  <TouchableOpacity style={styles.pillBtn}>
                    <Ionicons name="calendar-outline" size={16} color="#1E121E" />
                    <Text style={styles.pillBtnText}>Add to calendar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.pillBtn}>
                    <Ionicons name="share-social-outline" size={16} color="#1E121E" />
                    <Text style={styles.pillBtnText}>Share</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Bottom Action Footer */}
          <View style={styles.bottomBar}>
            {step === 1 && (
              <TouchableOpacity
                style={styles.mainActionBtn}
                onPress={() => setStep(2)}>
                <Text style={styles.mainActionText}>Pick Date & Time</Text>
              </TouchableOpacity>
            )}

            {step === 2 && (
              <TouchableOpacity
                style={styles.mainActionBtn}
                onPress={() => setStep(3)}>
                <Text style={styles.mainActionText}>Continue to Review</Text>
              </TouchableOpacity>
            )}

            {step === 3 && (
              <TouchableOpacity
                style={styles.mainActionBtn}
                onPress={() => setStep(4)}>
                <Text style={styles.mainActionText}>Proceed to Pay ₹{total}</Text>
              </TouchableOpacity>
            )}

            {step === 4 && (
              <TouchableOpacity
                style={styles.mainActionBtn}
                onPress={handleConfirmBooking}>
                <Text style={styles.mainActionText}>Pay Securely ₹{total}</Text>
              </TouchableOpacity>
            )}

            {step === 5 && (
              <TouchableOpacity
                style={styles.mainActionBtn}
                onPress={() => {
                  onSuccess(generatedBookingId);
                  resetAndClose();
                }}>
                <Text style={styles.mainActionText}>Done & View Bookings</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(20, 10, 24, 0.75)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#FFFBF8',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    height: '92%',
    display: 'flex',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EFE7E0',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3ECE4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1E121E',
  },
  headerSub: {
    fontSize: 12,
    color: '#6B5E68',
    marginTop: 2,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  selectedServiceBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EFE7E0',
  },
  bannerIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FDF2F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  bannerServiceName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E121E',
  },
  bannerServiceMeta: {
    fontSize: 13,
    color: '#6B5E68',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E121E',
    marginBottom: 12,
  },
  proRow: {
    flexDirection: 'row',
    gap: 12,
  },
  proCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#EFE7E0',
  },
  proCardActive: {
    borderColor: KalaaColors.primary,
    backgroundColor: '#FDF2F7',
  },
  proAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  proAvatarText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  proName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E121E',
  },
  proRole: {
    fontSize: 11,
    color: '#6B5E68',
    marginTop: 2,
  },
  proRating: {
    fontSize: 12,
    color: '#D97706',
    fontWeight: '600',
    marginTop: 2,
  },
  addonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: '#EFE7E0',
  },
  addonCardActive: {
    borderColor: KalaaColors.primary,
    backgroundColor: '#FDF2F7',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    backgroundColor: KalaaColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  addonTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E121E',
  },
  addonMeta: {
    fontSize: 12,
    color: '#6B5E68',
    marginTop: 2,
  },
  addonPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: KalaaColors.primary,
  },
  locationRow: {
    flexDirection: 'row',
    gap: 12,
  },
  locationCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#EFE7E0',
    alignItems: 'center',
  },
  locationCardActive: {
    borderColor: KalaaColors.primary,
    backgroundColor: '#FDF2F7',
  },
  locationTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E121E',
    marginTop: 8,
  },
  locationSub: {
    fontSize: 12,
    color: '#6B5E68',
    marginTop: 2,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 4,
  },
  datePill: {
    width: 60,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EFE7E0',
  },
  datePillActive: {
    backgroundColor: KalaaColors.primary,
    borderColor: KalaaColors.primary,
  },
  dateDay: {
    fontSize: 12,
    color: '#6B5E68',
  },
  dateNum: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E121E',
    marginTop: 2,
  },
  dateTextActive: {
    color: '#FFFFFF',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  timePill: {
    width: '22%',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EFE7E0',
  },
  timePillActive: {
    backgroundColor: '#22122A',
    borderColor: '#22122A',
  },
  timeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E121E',
  },
  timeTextActive: {
    color: '#FFFFFF',
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EFE7E0',
    marginBottom: 16,
  },
  reviewHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E121E',
    marginBottom: 12,
  },
  reviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reviewLabel: {
    fontSize: 13,
    color: '#6B5E68',
  },
  reviewVal: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E121E',
  },
  couponCard: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EFE7E0',
    marginBottom: 16,
  },
  couponInputRow: {
    flexDirection: 'row',
    gap: 10,
  },
  couponInput: {
    flex: 1,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DFD5CD',
    paddingHorizontal: 12,
    fontSize: 14,
    fontWeight: '600',
  },
  applyBtn: {
    backgroundColor: KalaaColors.primary,
    paddingHorizontal: 16,
    borderRadius: 10,
    justifyContent: 'center',
  },
  applyBtnText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 13,
  },
  couponSuccess: {
    fontSize: 12,
    color: '#0F766E',
    fontWeight: '600',
    marginTop: 8,
  },
  priceCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EFE7E0',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
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
  divider: {
    height: 1,
    backgroundColor: '#EFE7E0',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E121E',
  },
  totalVal: {
    fontSize: 18,
    fontWeight: '800',
    color: KalaaColors.primary,
  },
  savedBadge: {
    backgroundColor: '#E6F7ED',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 8,
  },
  savedText: {
    color: '#0F766E',
    fontSize: 11,
    fontWeight: '700',
  },
  amountDueCard: {
    backgroundColor: '#22122A',
    padding: 20,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 20,
  },
  amountDueLabel: {
    color: '#C4AECD',
    fontSize: 13,
  },
  amountDueVal: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    marginTop: 4,
  },
  secureBadge: {
    color: '#4ADE80',
    fontSize: 12,
    marginTop: 6,
  },
  paymentOptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: '#EFE7E0',
  },
  paymentOptionActive: {
    borderColor: KalaaColors.primary,
    backgroundColor: '#FDF2F7',
  },
  paymentOptionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E121E',
  },
  paymentOptionSub: {
    fontSize: 12,
    color: '#6B5E68',
    marginTop: 2,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#DFD5CD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleActive: {
    borderColor: KalaaColors.primary,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: KalaaColors.primary,
  },
  confirmedContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  confirmedHero: {
    backgroundColor: '#0F766E',
    width: '100%',
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  checkCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#14B8A6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  confirmedTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
  },
  confirmedSub: {
    color: '#CCFBF1',
    fontSize: 13,
    textAlign: 'center',
  },
  ticketCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#EFE7E0',
    marginBottom: 14,
  },
  ticketSalon: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E121E',
  },
  ticketService: {
    fontSize: 13,
    color: '#6B5E68',
    marginTop: 2,
  },
  ticketDivider: {
    height: 1,
    backgroundColor: '#EFE7E0',
    marginVertical: 12,
  },
  ticketDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ticketMetaLabel: {
    fontSize: 11,
    color: '#9B8E98',
  },
  ticketMetaVal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E121E',
    marginTop: 2,
  },
  shareRow: {
    flexDirection: 'row',
    gap: 12,
  },
  pillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EFE7E0',
  },
  pillBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E121E',
  },
  bottomBar: {
    padding: 16,
    backgroundColor: '#FFFBF8',
    borderTopWidth: 1,
    borderTopColor: '#EFE7E0',
  },
  mainActionBtn: {
    backgroundColor: KalaaColors.primary,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    ...KalaaShadow.button,
  },
  mainActionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
