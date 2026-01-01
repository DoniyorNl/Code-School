export enum PageCategory {
	Courses = 1,
	Books = 2,
}

export interface HhData {
	count: number
	juniorSalary: number
	middleSalary: number
	seniorSalary: number
}

export interface AdvatnageData {
	title: string
	description: string
	id: string
}

export interface PageModel {
	_id: string
	alias: string
	title: string
	tags: string[]
	description: string
	hh: HhData
	advantages: AdvatnageData[]
	category: string
}
