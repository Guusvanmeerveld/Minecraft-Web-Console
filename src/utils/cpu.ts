import si from 'systeminformation';

export default class CPU {
	static async getTemperature(): Promise<number | undefined> {
		const cpu = await si.cpuTemperature();

		if (typeof cpu.main != 'number') {
			return;
		}

		return cpu.main;
	}

	static async getUsage(): Promise<{ speed: number; cores: Array<number> }> {
		const cpu = await si.cpuCurrentSpeed();

		return {
			speed: cpu.avg,
			cores: cpu.cores,
		};
	}
}
