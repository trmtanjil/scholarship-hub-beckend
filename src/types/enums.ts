/**
 * Custom enum types
 * These should be kept in sync with prisma/schema.prisma
 */

export enum Category {
  Full = 'Full',
  Partial = 'Partial',
}

export enum ApplicationStatus {
  Pending = 'Pending',
  Review = 'Review',
  Accepted = 'Accepted',
}

export enum PaymentStatus {
  Pending = 'Pending',
  Completed = 'Completed',
  Failed = 'Failed',
}
