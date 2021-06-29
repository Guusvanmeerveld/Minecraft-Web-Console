export default interface Schema {
	temperature: Temperature[];
}

export interface Temperature {
	timestamp: number;
	value: number;
}
