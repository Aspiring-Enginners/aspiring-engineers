// Enums and Constants
export enum ExamType {
  JEE_MAIN = "JEE_MAIN",
  JEE_ADVANCED = "JEE_ADVANCED",
  NEET = "NEET",
  WBJEE = "WBJEE",
  BITSAT = "BITSAT",
  COMEDK = "COMEDK",
}

export enum PackageType {
  TEST_SERIES = "test-series",
  COURSE = "course",
  BUNDLE = "bundle",
}

export enum PackageStatus {
  ACTIVE = "active",
  DRAFT = "draft",
  ARCHIVED = "archived",
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  profilePicture?: string;
  dateOfBirth?: string;
  examTargets: ExamType[];
  targetYear: number;
  createdAt: string;
  updatedAt: string;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  dateOfBirth: string;
  examTargets: ExamType[];
  targetYear: number;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// Package Types (Test Series)
export interface PackageMetadata {
  difficulty: "EASY" | "MEDIUM" | "HARD";
  targetYear: number;
  rating: number;
  totalStudents: number;
  language: string;
}

export interface Package {
  _id: string;
  title: string;
  description: string;
  packageId: string;
  type: PackageType;
  status: PackageStatus;
  price: number;
  discountPrice?: number;
  currency: string;
  examTypes: string[];
  subjects: string[];
  thumbnail?: string;
  banner?: string;
  features: string[];
  validityDays: number;
  totalTests: number;
  totalQuestions: number;
  enrollments?: number;
  revenue?: number;
  metadata: PackageMetadata;
  createdAt: string;
}

export interface PackagePagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PackagesResponse {
  success: boolean;
  message: string;
  data: Package[];
  pagination: PackagePagination;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  timestamp: string;
}

// Package Test (inside package detail)
export interface PackageTest {
  _id: string;
  title: string;
  category: string;
  type: string;
  duration: number;
  totalMarks: number;
}

// Package Detail (extended package with tests)
export interface PackageDetail extends Omit<Package, "metadata"> {
  tests: PackageTest[];
  metadata: PackageMetadata & {
    instructors?: string[];
  };
  launchDate?: string;
  expiryDate?: string;
}

export interface PackageDetailResponse {
  success: boolean;
  message: string;
  data: PackageDetail;
}

// Payment Types
export interface PaymentRequest {
  amount: number;
  currency: string;
  productId: string;
}

export interface Payment {
  _id: string;
  userId: string;
  amount: number;
  currency: string;
  productId: string;
  status: "SUCCESS" | "PENDING" | "FAILED";
  paymentMethod: string;
  transactionId: string;
  createdAt: string;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  data: Payment;
}

// Cashfree Order Types
export interface CashfreeOrderRequest {
  amount: number;
  packageId: string;
  packageType: "test_package" | "counselling_package";
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  returnUrl: string;
}

export interface CashfreeOrderResponse {
  success: boolean;
  message: string;
  data: {
    orderId: string;
    paymentSessionId: string;
    amount: number;
    currency: string;
    status: "PENDING" | "ACTIVE" | "PAID" | "EXPIRED";
    createdAt: string;
    expiresAt: string;
  };
}

// Cashfree Verification Types
export interface CashfreeVerifyRequest {
  orderId: string;
}

export interface CashfreeVerifyResponse {
  success: boolean;
  message: string;
  data: {
    orderId: string;
    orderAmount: number;
    orderCurrency: string;
    orderStatus: "ACTIVE" | "PAID" | "EXPIRED";
    paymentStatus: "SUCCESS" | "FAILED" | "PENDING";
    cfOrderId?: string;
    cfPaymentId?: number;
    paymentTime?: string;
    paymentMethod?: string;
    paymentDetails?: any;
    productId: string;
    productName: string;
    accessGranted: boolean;
    validUntil?: string;
    errorMessage?: string;
  };
}

// Purchased Content Types
export interface PurchasedPackage {
  productId: string;
  productName: string;
  amount: number;
  currency: string;
  purchaseDate: string;
  validUntil: string;
  daysRemaining: number;
  status: "ACTIVE" | "EXPIRED";
  paymentId: string;
  orderId: string;
  paymentMethod: string;
}

export interface PurchasedContentResponse {
  totalPurchases: number;
  totalSpent: number;
  purchasedProducts: string[];
  purchases: PurchasedPackage[];
}

// Team Member Types
export interface TeamMember {
  _id: string;
  name: string;
  title: string;
  image: string;
  expertise: string[];
  displayOrder: number;
  isActive: boolean;
  bio?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
