import si from 'systeminformation';

export default class CPU {
	static async getTemperature(): Promise<number> {
		const cpu = await si.cpuTemperature();

		if (typeof cpu.main != 'number') {
			throw 'Could not read CPU temperature';
		}

		return cpu.main;
	}

	static async getUsage(): Promise<[number, number, number]> {
		const cpu = await si.cpu();

		return [cpu.speed, cpu.speedMin, cpu.speedMax];
	}
}
