import type { Card, PlayerCards } from '../types';
import { createColors } from './colors.model';

export function createPlayerCards(): PlayerCards {
	return createColors<Card[]>([], { holds: [] }) as PlayerCards;
}
