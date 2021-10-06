import GUN from 'gun';
// import 'gun/sea.js';
import { variables } from '$lib/variables';

const peers = variables.gunServer ? [`${variables.gunServer}`] : ['http://localhost:8765/gun'];

export const db = GUN({ peers });
