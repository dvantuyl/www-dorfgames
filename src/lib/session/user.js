import GUN from 'gun';
import 'gun/sea.js';
import { writable } from 'svelte/store';
import { variables } from '$lib/variables';

// Database
const peers = variables.gunServer ? [`${variables.gunServer}`] : ['http://localhost:8765/gun'];

export const db = GUN({ peers });

// Gun User
export const user = db.user().recall({ sessionStorage: true });

// Current User's username
export const username = writable('');

user.get('alias').on((v) => username.set(v));

db.on('auth', async () => {
	const alias = await user.get('alias'); // username string
	username.set(`${alias}`);

	console.log(`signed in as ${alias}`);
});
