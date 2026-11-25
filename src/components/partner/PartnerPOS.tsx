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

interface PartnerPOSProps {
  visible: boolean;
  booking: any;
  onClose: () => void;
}

export function PartnerPOS({ visible, booking, onClose }: PartnerPOSProps) {
  const [items, setItems] = useState([
    { id: '1', name: 'Gel manicure + pedicure', price: 1499, icon: '💅' },
    { id: '2', name: 'Cuticle add-on', price: 150, icon: '✂️' },
  ]);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [paymentMode, setPaymentMode] = useState<'Cash' | 'UPI' | 'Card'>('Cash');
  const [paymentCollected, setPaymentCollected] = useState(false);

  const subtotal = items.reduce((acc, it) => acc + it.price, 0) - discountAmount;
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      { id: Date.now().toString(), name: 'Nail Art Polish', price: 299, icon: '🎨' },
    ]);
  };

  const handleCollect = () => {
    setPaymentCollected(true);
    setTimeout(() => {
      setPaymentCollected(false);
      onClose();
    }, 1200);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.container}>
          {/* Header (Page 8) */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.circleBtn} onPress={onClose}>
              <Ionicons name="arrow-back" size={20} color="#1E121E" />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={styles.headerTitle}>Checkout</Text>
              <Text style={styles.headerSub}>Divya R · with Sana</Text>
            </View>
            <View style={styles.doneBadge}>
              <Text style={styles.doneBadgeText}>Service done</Text>
            </View>
          </View>

          <ScrollView contentContainerStyle={styles.scroll}>
            <Text style={styles.sectionTitle}>Items</Text>

            {items.map((item) => (
              <View key={item.id} style={styles.itemRow}>
                <View style={styles.itemIconWrap}>
                  <Text style={{ fontSize: 18 }}>{item.icon}</Text>
                </View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>₹{item.price}</Text>
              </View>
            ))}

            {/* Quick Actions: Add item & Discount */}
            <View style={styles.itemActionRow}>
              <TouchableOpacity style={styles.dashedBtn} onPress={handleAddItem}>
                <Text style={styles.dashedBtnText}>+ Add item</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dashedBtn}
                onPress={() => setDiscountAmount((d) => (d > 0 ? 0 : 100))}>
                <Text style={styles.dashedBtnText}>
                  {discountAmount > 0 ? 'Discount ₹100' : '% Discount'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Billing breakdown */}
            <View style={styles.billingCard}>
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Subtotal</Text>
                <Text style={styles.billVal}>₹{subtotal}</Text>
              </View>
              {discountAmount > 0 && (
                <View style={styles.billRow}>
                  <Text style={[styles.billLabel, { color: '#0F766E' }]}>Discount</Text>
                  <Text style={[styles.billVal, { color: '#0F766E' }]}>- ₹{discountAmount}</Text>
                </View>
              )}
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>GST (18%)</Text>
                <Text style={styles.billVal}>₹{gst}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.billRow}>
                <Text style={styles.billTotalLabel}>Total</Text>
                <Text style={styles.billTotalVal}>₹{total}</Text>
              </View>
            </View>

            {/* Payment Method Selector */}
            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
              Payment method
            </Text>
            <View style={styles.methodsRow}>
              {[
                { id: 'Cash', label: 'Cash', icon: 'cash-outline' },
                { id: 'UPI', label: 'UPI', icon: 'qr-code-outline' },
                { id: 'Card', label: 'Card', icon: 'card-outline' },
              ].map((m) => {
                const isSelected = paymentMode === m.id;
                return (
                  <TouchableOpacity
                    key={m.id}
                    style={[
                      styles.methodCard,
                      isSelected && styles.methodCardActive,
                    ]}
                    onPress={() => setPaymentMode(m.id as any)}>
                    <Ionicons
                      name={m.icon as any}
                      size={22}
                      color={isSelected ? '#FFFFFF' : '#1E121E'}
                    />
                    <Text
                      style={[
                        styles.methodLabel,
                        isSelected && styles.methodLabelActive,
                      ]}>
                      {m.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text style={styles.methodHint}>
              {paymentMode === 'UPI' && 'UPI shows a QR code for customer to scan.'}
              {paymentMode === 'Card' && 'Card opens POS card reader.'}
              {paymentMode === 'Cash' && 'Cash collected marks the booking as paid.'}
            </Text>
          </ScrollView>

          {/* Bottom Action Button */}
          <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.collectBtn} onPress={handleCollect}>
              <Text style={styles.collectBtnText}>
                {paymentCollected
                  ? '✓ Payment Collected!'
                  : `Collect payment ₹${total}`}
              </Text>
            </TouchableOpacity>
          </View>
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
    fontSize: 17,
    fontWeight: '800',
    color: '#1E121E',
  },
  headerSub: {
    fontSize: 12,
    color: '#6B5E68',
    marginTop: 2,
  },
  doneBadge: {
    backgroundColor: '#E6F7ED',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  doneBadgeText: {
    color: '#0F766E',
    fontSize: 11,
    fontWeight: '700',
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E121E',
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EFE7E0',
  },
  itemIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FEF9EE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#1E121E',
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E121E',
  },
  itemActionRow: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 10,
  },
  dashedBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#DFD5CD',
    borderStyle: 'dashed',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  dashedBtnText: {
    color: KalaaColors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  billingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFE7E0',
    marginTop: 12,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  billLabel: {
    fontSize: 13,
    color: '#6B5E68',
  },
  billVal: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E121E',
  },
  divider: {
    height: 1,
    backgroundColor: '#EFE7E0',
    marginVertical: 10,
  },
  billTotalLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E121E',
  },
  billTotalVal: {
    fontSize: 22,
    fontWeight: '900',
    color: KalaaColors.primary,
  },
  methodsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  methodCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#EFE7E0',
  },
  methodCardActive: {
    backgroundColor: '#22122A',
    borderColor: '#22122A',
  },
  methodLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E121E',
    marginTop: 6,
  },
  methodLabelActive: {
    color: '#FFFFFF',
  },
  methodHint: {
    fontSize: 11,
    color: '#8A7B87',
    textAlign: 'center',
    marginTop: 6,
  },
  bottomBar: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EFE7E0',
    backgroundColor: '#FFFBF8',
  },
  collectBtn: {
    backgroundColor: KalaaColors.primary,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    ...KalaaShadow.button,
  },
  collectBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
