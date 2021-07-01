export default interface CPUData {
	temperature?: number;
	speed: number;
	cores: Array<number>;
}

interface GraphModel {
	id: string | number;
	data: Array<{
		x: number | string | Date;
		y: number | string | Date;
	}>;
}

export interface CPUGraphData {
	temperature: Array<GraphModel>;
	cores: Array<GraphModel>;
}
