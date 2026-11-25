import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { KalaaColors, KalaaShadow } from '@/constants/kalaaTheme';

interface StaffSignInProps {
  onSuccess: (stylist: string) => void;
}

export function StaffSignIn({ onSuccess }: StaffSignInProps) {
  const [selectedStylist, setSelectedStylist] = useState<'Megha' | 'Sana' | 'Priya'>('Megha');
  const [passcode, setPasscode] = useState<string>('');

  const handleDigit = (digit: string) => {
    if (passcode.length < 4) {
      const next = passcode + digit;
      setPasscode(next);
      if (next.length === 4) {
        setTimeout(() => onSuccess(selectedStylist), 300);
      }
    }
  };

  const handleDelete = () => {
    setPasscode((p) => p.slice(0, -1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.heroTop}>
        <View style={styles.heroCircleDecor} />
        <Text style={styles.title}>Staff sign in</Text>
        <Text style={styles.subtitle}>Glow Studio · Bandra</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Select you</Text>
        <View style={styles.stylistRow}>
          {[
            { id: 'Megha', initial: 'M', color: '#E11D48' },
            { id: 'Sana', initial: 'S', color: '#0D9488' },
            { id: 'Priya', initial: 'P', color: '#D97706' },
          ].map((s) => {
            const isSelected = selectedStylist === s.id;
            return (
              <TouchableOpacity
                key={s.id}
                style={[
                  styles.stylistPill,
                  isSelected && styles.stylistPillActive,
                ]}
                onPress={() => setSelectedStylist(s.id as any)}>
                <View style={[styles.avatar, { backgroundColor: s.color }]}>
                  <Text style={styles.avatarText}>{s.initial}</Text>
                </View>
                <Text style={styles.stylistName}>{s.id}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 24, textAlign: 'center' }]}>
          Enter passcode
        </Text>

        {/* 4 PIN Dots */}
        <View style={styles.dotsRow}>
          {[0, 1, 2, 3].map((index) => {
            const filled = passcode.length > index;
            return (
              <View
                key={index}
                style={[styles.pinDot, filled && styles.pinDotFilled]}
              />
            );
          })}
        </View>

        {/* Keypad */}
        <View style={styles.keypad}>
          {[
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9'],
            ['', '0', 'del'],
          ].map((row, rIdx) => (
            <View key={rIdx} style={styles.keypadRow}>
              {row.map((btn, cIdx) => {
                if (btn === '') {
                  return <View key={cIdx} style={styles.keypadKeyEmpty} />;
                }
                if (btn === 'del') {
                  return (
                    <TouchableOpacity
                      key={cIdx}
                      style={[styles.keypadKey, { backgroundColor: '#FEE2E2' }]}
                      onPress={handleDelete}>
                      <Ionicons name="backspace-outline" size={22} color="#B91C1C" />
                    </TouchableOpacity>
                  );
                }
                return (
                  <TouchableOpacity
                    key={cIdx}
                    style={styles.keypadKey}
                    onPress={() => handleDigit(btn)}>
                    <Text style={styles.keypadDigit}>{btn}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.signInBtn}
          onPress={() => onSuccess(selectedStylist)}>
          <Text style={styles.signInBtnText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF8',
  },
  heroTop: {
    backgroundColor: '#0F766E',
    paddingTop: 36,
    paddingBottom: 28,
    paddingHorizontal: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  heroCircleDecor: {
    position: 'absolute',
    right: -25,
    top: -25,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#E5A024',
    opacity: 0.85,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
  },
  subtitle: {
    color: '#CCFBF1',
    fontSize: 13,
    marginTop: 4,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFBF8',
    marginTop: -16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E121E',
    marginBottom: 12,
  },
  stylistRow: {
    flexDirection: 'row',
    gap: 12,
  },
  stylistPill: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#EFE7E0',
  },
  stylistPillActive: {
    borderColor: '#0F766E',
    backgroundColor: '#E6F7ED',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  stylistName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E121E',
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginVertical: 14,
  },
  pinDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#D4C5C0',
    backgroundColor: '#FFFFFF',
  },
  pinDotFilled: {
    backgroundColor: '#0F766E',
    borderColor: '#0F766E',
  },
  keypad: {
    marginVertical: 10,
    alignItems: 'center',
  },
  keypadRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 10,
  },
  keypadKey: {
    width: 70,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFE7E0',
    alignItems: 'center',
    justifyContent: 'center',
    ...KalaaShadow.soft,
  },
  keypadKeyEmpty: {
    width: 70,
    height: 52,
  },
  keypadDigit: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E121E',
  },
  signInBtn: {
    backgroundColor: '#0F766E',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
    ...KalaaShadow.button,
  },
  signInBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
