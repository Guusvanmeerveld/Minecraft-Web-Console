import { join } from 'path';
import { Low, JSONFile } from 'lowdb';

import Schema from '@models/database';

export default class Database {
	private db: Low<Schema>;

	constructor() {
		const file = join(process.cwd(), 'data', 'db.json');
		const adapter = new JSONFile<Schema>(file);

		this.db = new Low<Schema>(adapter);
	}
}
