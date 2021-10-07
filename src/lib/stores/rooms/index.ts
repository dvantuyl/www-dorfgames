import { joined } from './joined';
import { waiting } from './waiting';
import { create } from './create';
import { room as get } from './room';

function createRoomsStore() {
	return {
		waiting,
		joined,
		create,
		get
	};
}

export const rooms = createRoomsStore();
