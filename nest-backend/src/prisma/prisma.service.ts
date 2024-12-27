import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
	constructor(config: ConfigService) {
		super({
			datasources: {
				db: {
					url: config.get('DATABASE_URL'),
				},
			},
		});
	}
	async cleanDb() {
		this.analysis.deleteMany();
		this.aI.deleteMany();
	}
	async fillDb() { //Aquí se hará el llenado de la db
		await this.aI.create({ data: { name: 'Originality', is_free: false } });
		await this.aI.create({ data: { name: 'ChatGPT (GPT-4)', is_free: false } });
		await this.aI.create({ data: { name: 'Fast Detect GPT', is_free: true } });
		await this.aI.create({ data: { name: 'Lm Watermarking', is_free: true } });
		//await this.aI.create({ data: { name: 'PoC AI Detector', is_free: true } });

		//Temporal data
		let date = new Date();
		let currentDate = date.getDay() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
		await this.user.create({ data: { username: 'admin', email: "newadmin@gmail.com", password: "admin", created: currentDate } });
		let user = await this.user.findFirst({ where: { username: 'admin' } });
		let ai1 = await this.aI.findFirst({ where: { name: 'Originality' } });
		let ai2 = await this.aI.findFirst({ where: { name: 'ChatGPT (GPT-4)' } });
		let ai3 = await this.aI.findFirst({ where: { name: 'Fast Detect GPT' } });
		let ai4 = await this.aI.findFirst({ where: { name: 'Lm Watermarking' } });
		//let ai5 = await this.aI.findFirst({ where: { name: 'PoC AI Detector' } });
		await this.key.create({ data: { api_key: "1234567890", ai_id: ai1.id, user_id: user.id } });
		await this.key.create({ data: { api_key: "0987654321", ai_id: ai2.id, user_id: user.id } });

		await this.analysis.create({
			data: {
				title: "Analysis 1",
				user_id: user.id,
				created: currentDate,
				documents: {
					create: [
						{
							title: "Document 1",
							results: {
								create: [
									{
										ai_score: 65,
										ai_result: "IA",
										ai_id: ai1.id,
									},
									{
										ai_score: 90,
										ai_result: "IA",
										ai_id: ai2.id,
									},
									{
										ai_score: 100,
										ai_result: "IA",
										ai_id: ai3.id,
									}
								]
							}
						},
						{
							title: "Document 2",
							results: {
								create: [
									{
										ai_score: 30,
										ai_result: "Humano",
										ai_id: ai1.id,
									},
									{
										ai_score: 12,
										ai_result: "Humano",
										ai_id: ai2.id,
									},
									{
										ai_score: 5,
										ai_result: "Humano",
										ai_id: ai4.id,
									}
								]
							}
						}
					]
				}
			}
		});
	}
}
