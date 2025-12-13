export enum TariffType {
  SINGLE = 'SINGLE',
  GROUP = 'GROUP',
  TOURNAMENT = 'TOURNAMENT'
}

export interface Tariff {
  id: TariffType;
  name: string;
  pricePerHour: number;
  description: string;
}

export interface BookingState {
  step: number;
  selectedDate: Date;
  selectedSlots: string[]; // "HH:mm" format
  tariff: TariffType;
  racketCount: number;
  contactName: string;
  contactPhone: string;
  contactComment: string;
  isSubmitting: boolean;
  isSuccess: boolean;
}

export interface TimeSlot {
  time: string; // "07:00"
  available: boolean;
}