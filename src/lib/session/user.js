import GUN from 'gun';
import 'gun/sea.js';
import 'gun/axe.js';
import { writable } from 'svelte/store';

// Database
export const db = GUN();

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
