import { Tariff, TariffType } from './types';

export const OPENING_HOUR = 7;
export const CLOSING_HOUR = 23;
export const SLOT_INTERVAL_MINUTES = 30;

export const RACKET_PRICE = 1000; // Flat fee per session/game

export const TARIFFS: Record<TariffType, Tariff> = {
  [TariffType.SINGLE]: {
    id: TariffType.SINGLE,
    name: "Обычная тренировка",
    pricePerHour: 3000,
    description: "Индивидуальная тренировка или игра 1 на 1"
  },
  [TariffType.GROUP]: {
    id: TariffType.GROUP,
    name: "Игра / Тренировка (до 4-х)",
    pricePerHour: 5000,
    description: "Аренда корта для компании до 4 человек"
  },
  [TariffType.TOURNAMENT]: {
    id: TariffType.TOURNAMENT,
    name: "Турнир",
    pricePerHour: 6500,
    description: "Организация турнирного матча"
  }
};

// Simulated mock unavailable slots for demo purposes
export const MOCK_UNAVAILABLE_SLOTS = ['18:00', '18:30', '19:00'];