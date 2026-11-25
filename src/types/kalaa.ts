export type UserRole = 'customer' | 'partner' | 'staff' | 'admin';

export interface ServiceItem {
  id: string;
  name: string;
  category: 'Hair' | 'Nails' | 'Makeup' | 'Mehendi' | 'Spa' | 'Salon' | "Men's" | 'Kids';
  duration: string;
  price: number;
  description?: string;
  assignedStaff?: string[];
  homeVisitAvailable: boolean;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  rating: number;
  reviewsCount?: number;
  experience?: string;
  services: string[];
  todayAppointmentsCount: number;
  avatarColor: string;
  pin: string;
}

export interface Salon {
  id: string;
  name: string;
  type: 'Salon' | 'Artist';
  rating: number;
  reviewsCount: number;
  location: string;
  distance: string;
  openTill: string;
  coverGradient: [string, string];
  services: ServiceItem[];
  staff: Stylist[];
  isTopRated?: boolean;
}

export interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  salonId: string;
  salonName: string;
  serviceName: string;
  serviceDuration: string;
  stylistName: string;
  date: string;
  time: string;
  locationType: 'At the salon' | 'Home visit';
  address: string;
  amount: number;
  couponCode?: string;
  discount: number;
  status: 'Confirmed' | 'Checked in' | 'In progress' | 'Completed' | 'Awaiting' | 'Cancelled';
  paymentMode: 'UPI' | 'Card' | 'Wallet' | 'Cash / Pay at appointment';
  paymentStatus: 'Paid' | 'Unpaid';
  notes?: string;
}

export interface Coupon {
  code: string;
  discountText: string;
  discountPercent?: number;
  flatDiscount?: number;
  minSpend: number;
  maxDiscount: number;
  expiryText: string;
  usedCount: number;
  totalLimit: number;
}

export interface DisputeItem {
  id: string;
  bookingId: string;
  customer: string;
  salon: string;
  amount: number;
  reason: string;
  status: 'Open' | 'Resolved';
}

export interface KYCApproval {
  id: string;
  businessName: string;
  type: 'Salon' | 'Artist';
  city: string;
  ownerName: string;
  phone: string;
  submittedTime: string;
  gstStatus: 'verified' | 'pending' | 'na';
  panStatus: 'verified' | 'pending';
  bankStatus: 'verified' | 'pending';
  status: 'New' | 'In review' | 'Approved' | 'Rejected';
}
