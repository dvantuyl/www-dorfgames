import { createColors } from '..';
import type { Card, PlayerCards } from '../types';

export function createPlayerCards(): PlayerCards {
	return createColors<Card[]>([], { holds: [] }) as PlayerCards;
}
