import React, { createContext, useContext, useState } from 'react';
import {
  Booking,
  Coupon,
  DisputeItem,
  KYCApproval,
  Salon,
  ServiceItem,
  Stylist,
  UserRole,
} from '@/types/kalaa';

// Initial Mock Data matching the PDF screens
const INITIAL_SALONS: Salon[] = [
  {
    id: 'glow-studio',
    name: 'Glow Studio',
    type: 'Salon',
    rating: 4.7,
    reviewsCount: 412,
    location: 'Bandra West, Mumbai',
    distance: '1.5 km',
    openTill: 'Open till 8 pm',
    coverGradient: ['#E57373', '#FFB74D'],
    isTopRated: true,
    staff: [
      {
        id: 'megha',
        name: 'Megha S',
        role: 'Senior Stylist',
        rating: 4.9,
        reviewsCount: 247,
        experience: '6 yrs',
        services: ['Hair', 'Colour', 'Spa'],
        todayAppointmentsCount: 4,
        avatarColor: '#E11D48',
        pin: '1234',
      },
      {
        id: 'sana',
        name: 'Sana K',
        role: 'Nail Technician',
        rating: 4.8,
        reviewsCount: 180,
        experience: '4 yrs',
        services: ['Nails', 'Spa'],
        todayAppointmentsCount: 3,
        avatarColor: '#0D9488',
        pin: '2345',
      },
      {
        id: 'priya',
        name: 'Priya R',
        role: 'Reception & Manager',
        rating: 4.9,
        reviewsCount: 95,
        experience: '5 yrs',
        services: [],
        todayAppointmentsCount: 0,
        avatarColor: '#D97706',
        pin: '3456',
      },
    ],
    services: [
      {
        id: 's1',
        name: 'Haircut + blow dry',
        category: 'Hair',
        duration: '45 min',
        price: 799,
        homeVisitAvailable: true,
        assignedStaff: ['Megha S', 'All staff'],
      },
      {
        id: 's2',
        name: 'Hair colour + wash',
        category: 'Hair',
        duration: '2 hrs',
        price: 2499,
        homeVisitAvailable: false,
        assignedStaff: ['Megha S', 'Sana K'],
      },
      {
        id: 's3',
        name: 'Gel manicure + pedicure',
        category: 'Nails',
        duration: '90 min',
        price: 1499,
        homeVisitAvailable: true,
        assignedStaff: ['Sana K'],
      },
      {
        id: 's4',
        name: 'Party mehendi',
        category: 'Mehendi',
        duration: '60 min',
        price: 1200,
        homeVisitAvailable: true,
        assignedStaff: ['Megha S'],
      },
      {
        id: 's5',
        name: 'Hair spa',
        category: 'Spa',
        duration: '60 min',
        price: 1390,
        homeVisitAvailable: false,
        assignedStaff: ['Sana K'],
      },
    ],
  },
  {
    id: 'nail-lounge',
    name: 'Nail Lounge',
    type: 'Salon',
    rating: 4.8,
    reviewsCount: 356,
    location: 'Linking Rd, Bandra',
    distance: '2.1 km',
    openTill: 'Open till 9 pm',
    coverGradient: ['#4DB6AC', '#81C784'],
    isTopRated: true,
    staff: [],
    services: [],
  },
  {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    type: 'Artist',
    rating: 4.9,
    reviewsCount: 247,
    location: 'Bandra, Mumbai',
    distance: '1.2 km',
    openTill: 'Solo Artist · 6 yrs exp',
    coverGradient: ['#BA68C8', '#E57373'],
    isTopRated: true,
    staff: [],
    services: [
      {
        id: 'ps1',
        name: 'Bridal mehendi · both hands',
        category: 'Mehendi',
        duration: '4 to 5 hrs',
        price: 6500,
        homeVisitAvailable: true,
      },
      {
        id: 'ps2',
        name: 'Arabic mehendi · one hand',
        category: 'Mehendi',
        duration: '1 hr',
        price: 800,
        homeVisitAvailable: true,
      },
    ],
  },
];

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'KB-2641',
    customerName: 'Aarti Verma',
    customerPhone: '+91 98765 43210',
    salonId: 'glow-studio',
    salonName: 'Glow Studio',
    serviceName: 'Haircut + blow dry',
    serviceDuration: '45 min',
    stylistName: 'Megha',
    date: 'Wed 26 Nov',
    time: '2:00 PM',
    locationType: 'Home visit',
    address: 'Flat 302, Hill Rd, Bandra West',
    amount: 782,
    couponCode: 'GLOW20',
    discount: 196,
    status: 'Confirmed',
    paymentMode: 'Cash / Pay at appointment',
    paymentStatus: 'Unpaid',
    notes: 'Prefers shorter layers, no fringe.',
  },
  {
    id: 'KB-2638',
    customerName: 'Aarti Verma',
    customerPhone: '+91 98765 43210',
    salonId: 'priya-sharma',
    salonName: 'Priya Sharma',
    serviceName: 'Bridal mehendi',
    serviceDuration: '4 hrs',
    stylistName: 'Priya Sharma',
    date: 'Sat 29 Nov',
    time: '2:00 PM',
    locationType: 'Home visit',
    address: 'Flat 302, Hill Rd, Bandra West',
    amount: 6500,
    discount: 0,
    status: 'Awaiting',
    paymentMode: 'UPI',
    paymentStatus: 'Paid',
  },
  {
    id: 'KB-29B4710',
    customerName: 'Divya R',
    customerPhone: '+91 98200 44432',
    salonId: 'glow-studio',
    salonName: 'Glow Studio',
    serviceName: 'Gel manicure + pedicure',
    serviceDuration: '90 min',
    stylistName: 'Sana',
    date: 'Mon 24 Nov',
    time: '1:30 PM',
    locationType: 'At the salon',
    address: 'Bandra West, Mumbai',
    amount: 1946,
    discount: 0,
    status: 'Confirmed',
    paymentMode: 'Cash / Pay at appointment',
    paymentStatus: 'Unpaid',
  },
];

const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'GLOW20',
    discountText: '20% off, up to ₹200',
    discountPercent: 20,
    minSpend: 500,
    maxDiscount: 200,
    expiryText: 'till 31 Dec',
    usedCount: 34,
    totalLimit: 100,
  },
  {
    code: 'FIRST100',
    discountText: 'Flat ₹100 off · new customers',
    flatDiscount: 100,
    minSpend: 400,
    maxDiscount: 100,
    expiryText: 'no expiry',
    usedCount: 12,
    totalLimit: 1000,
  },
  {
    code: 'SHAADI15',
    discountText: '15% off bridal mehendi',
    discountPercent: 15,
    minSpend: 1000,
    maxDiscount: 500,
    expiryText: 'valid this month',
    usedCount: 5,
    totalLimit: 50,
  },
];

const INITIAL_APPROVALS: KYCApproval[] = [
  {
    id: 'app-1',
    businessName: 'Lotus Beauty Lounge',
    type: 'Salon',
    city: 'Juhu, Mumbai',
    ownerName: 'Rekha Nair',
    phone: '+91 98201 11210',
    submittedTime: '2h ago',
    gstStatus: 'verified',
    panStatus: 'verified',
    bankStatus: 'pending',
    status: 'New',
  },
  {
    id: 'app-2',
    businessName: 'Ankita Kulkarni',
    type: 'Artist',
    city: 'Pune · Makeup',
    ownerName: 'Ankita Kulkarni',
    phone: '+91 97654 32110',
    submittedTime: '6h ago',
    gstStatus: 'na',
    panStatus: 'verified',
    bankStatus: 'verified',
    status: 'New',
  },
];

interface KalaaContextType {
  // Current active portal
  role: UserRole;
  setRole: (role: UserRole) => void;
  
  // Data
  salons: Salon[];
  bookings: Booking[];
  coupons: Coupon[];
  approvals: KYCApproval[];
  userPoints: number;
  walletBalance: number;
  
  // Actions
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (bookingId: string, status: Booking['status']) => void;
  cancelBooking: (bookingId: string) => void;
  rescheduleBooking: (bookingId: string, newDate: string, newTime: string) => void;
  approveKYC: (id: string) => void;
  rejectKYC: (id: string) => void;
  addServiceToSalon: (salonId: string, service: ServiceItem) => void;
}

const KalaaContext = createContext<KalaaContextType | undefined>(undefined);

export function KalaaProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>('customer');
  const [salons, setSalons] = useState<Salon[]>(INITIAL_SALONS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [approvals, setApprovals] = useState<KYCApproval[]>(INITIAL_APPROVALS);
  const [userPoints, setUserPoints] = useState(2140);
  const [walletBalance, setWalletBalance] = useState(300);

  const addBooking = (booking: Booking) => {
    setBookings((prev) => [booking, ...prev]);
    setUserPoints((p) => p + 120);
  };

  const updateBookingStatus = (bookingId: string, status: Booking['status']) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
    );
  };

  const cancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled' } : b))
    );
  };

  const rescheduleBooking = (bookingId: string, newDate: string, newTime: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, date: newDate, time: newTime } : b
      )
    );
  };

  const approveKYC = (id: string) => {
    setApprovals((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: 'Approved', bankStatus: 'verified' } : a
      )
    );
  };

  const rejectKYC = (id: string) => {
    setApprovals((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Rejected' } : a))
    );
  };

  const addServiceToSalon = (salonId: string, service: ServiceItem) => {
    setSalons((prev) =>
      prev.map((s) =>
        s.id === salonId ? { ...s, services: [...s.services, service] } : s
      )
    );
  };

  return (
    <KalaaContext.Provider
      value={{
        role,
        setRole,
        salons,
        bookings,
        coupons,
        approvals,
        userPoints,
        walletBalance,
        addBooking,
        updateBookingStatus,
        cancelBooking,
        rescheduleBooking,
        approveKYC,
        rejectKYC,
        addServiceToSalon,
      }}>
      {children}
    </KalaaContext.Provider>
  );
}

export function useKalaa() {
  const context = useContext(KalaaContext);
  if (!context) {
    throw new Error('useKalaa must be used within a KalaaProvider');
  }
  return context;
}
