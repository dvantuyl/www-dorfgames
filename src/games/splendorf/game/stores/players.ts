import { writable } from 'svelte/store';

export const players = writable({ currentPlayerIndex: 0, list: [] });
