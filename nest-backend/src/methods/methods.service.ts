import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as mammoth from 'mammoth';
import * as pdf from 'pdf-parse';
import { HttpStatus } from '@nestjs/common';
import * as argon from 'argon2';

@Injectable()
export class MethodsService {
	constructor(private prisma: PrismaService) { }

	//Temporal
	async cascadeCleanDatabase() {
		await this.prisma.user.deleteMany();
		await this.prisma.aI.deleteMany();
	}

	async fillDb() { //A automatizar en un SQL (y docker)
		try {
			//Base data
			await this.prisma.aI.create({ data: { name: 'Originality', is_free: false } });
			await this.prisma.aI.create({ data: { name: 'ChatGPT (GPT-4)', is_free: false } });
			await this.prisma.aI.create({ data: { name: 'Fast Detect GPT', is_free: true } });
			await this.prisma.aI.create({ data: { name: 'Lm Watermarking', is_free: true } });
			//await this.prisma.aI.create({ data: { name: 'PoC AI Detector', is_free: true } });

			//Temporal data
			let date = new Date();
			let currentDate = date.getDay() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
			console.log(currentDate);
			const hash = await argon.hash("admin");
			await this.prisma.user.create({ data: { username: 'admin', email: "newadmin@gmail.com", password: hash, created: currentDate } });
			let user = await this.prisma.user.findFirst({ where: { username: 'admin' } });
			console.log(user);
			let ai1 = await this.prisma.aI.findFirst({ where: { name: 'Originality' } });
			let ai2 = await this.prisma.aI.findFirst({ where: { name: 'ChatGPT (GPT-4)' } });
			let ai3 = await this.prisma.aI.findFirst({ where: { name: 'Fast Detect GPT' } });
			let ai4 = await this.prisma.aI.findFirst({ where: { name: 'Lm Watermarking' } });
			//let ai5 = await this.prisma.aI.findFirst({ where: { name: 'PoC AI Detector' } });
			await this.prisma.key.create({ data: { api_key: "1234567890", ai_id: ai1.id, user_id: user.id } });
			await this.prisma.key.create({ data: { api_key: "0987654321", ai_id: ai2.id, user_id: user.id } });

			await this.prisma.tag.create({ data: { name: 'Tag 1', user_id: user.id } });
			await this.prisma.tag.create({ data: { name: 'Tag 2', user_id: user.id } });
			await this.prisma.tag.create({ data: { name: 'Tag 3', user_id: user.id } });

			let tag1 = await this.prisma.tag.findFirst({ where: { name: 'Tag 1' } });
			let tag2 = await this.prisma.tag.findFirst({ where: { name: 'Tag 2' } });
			let tag3 = await this.prisma.tag.findFirst({ where: { name: 'Tag 3' } });
			await this.prisma.analysis.create({
				data: {
					title: "Analysis 1",
					user_id: user.id,
					created: currentDate,
					tags: {
						connect: [
							{ id: tag1.id },
							{ id: tag2.id },
							{ id: tag3.id }
						]
					},
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
		} catch (error) {
			throw new HttpException('Error: ' + error, HttpStatus.BAD_REQUEST);
		}
	}

	//Funcionalidades finales

	async getAnalyses(idUser: number) {
		//console.log('id user: ', idUser);
		return await this.prisma.analysis.findMany({
			where: {
				user_id: idUser
			},
			include: {
				documents: true,
				tags: true
			}
		});
	}

	async getAnalysis(id: number) {
		return await this.prisma.analysis.findUnique({
			where: {
				id: id
			},
			include: {
				documents: {
					include: {
						results: {
							include: {
								ai: true
							}
						}
					}
				}
			}
		});
	}

	async createKey(body: any) {
		console.log(body.body);
		return await this.prisma.key.create({
			data: {
				api_key: body.body.api_key,
				ai_id: body.body.ai_id,
				user_id: body.body.user_id
			}
		});
	}

	async getKeys(idUser: number) {
		console.log('id user: ', idUser);
		return await this.prisma.key.findMany({
			where: {
				user_id: idUser
			},
			include: {
				ai: true
			}
		});
	};


	async deleteKey(id: number) {
		return await this.prisma.key.delete({
			where: {
				id: id
			}
		});
	}

	async getAIs() {
		return await this.prisma.aI.findMany();
	}

	async getFreeAIs() {
		return await this.prisma.aI.findMany({
			where: {
				is_free: true
			}
		});
	}

	async getPaidAIs() {
		return await this.prisma.aI.findMany({
			where: {
				is_free: false
			}
		});
	}

	async getTags(idUser: number) {
		return await this.prisma.tag.findMany(
			{
				where: {
					user_id: idUser
				}
			}
		);
	}

	async createTag(body: any) {
		console.log(body);
		return await this.prisma.tag.create({
			data: {
				name: body.name,
				user_id: body.user_id
			}
		});
	}

	async deleteAnalysis(id: number) {
		return await this.prisma.analysis.delete({
			where: {
				id: id
			}
		});
	}

	// Extraer textos de documentos
	async extractTexts(docs: any) {
		console.log(docs);
		let texts = [];
		let texts_2048 = [];
		let texts_8192 = [];

		try {
			for (let i = 0; i < docs.length; i++) {
				let title = docs[i].originalname;
				let text = "";
				if (docs[i].mimetype === "application/pdf") { //Archivo es PDF
					console.log("Archivo " + i + ": PDF");
					try {
						console.log("Iniciado proceso de extracción de texto PDF...");
						const data = await pdf(docs[i].buffer);
						console.log("Texto extraido: " + data.text);
						text = data.text;
						const doc = { title: title, text: text };
						//console.log(text);
						texts.push(doc);
					} catch (error) {
						throw new HttpException('Failed to extract text ' + i + ' from PDF. Error: ' + error, HttpStatus.INTERNAL_SERVER_ERROR);
					}
					console.log(pdf);
				} else { //Archivo es DOCX
					console.log("Archivo " + i + ": DOCX");
					try {
						const result = await mammoth.extractRawText({ buffer: docs[i].buffer });
						console.log(result);
						text = result.value;
						console.log(text);
						const doc = { title: title, text: text };
						texts.push(doc);
					} catch (error) {
						throw new HttpException('Failed to extract text ' + i + ' from DOCX. Error: ' + error, HttpStatus.INTERNAL_SERVER_ERROR);
					}
				}
			}

			let wordToToken = parseFloat((100 / 45).toFixed(3));
			//Preprocesamiento adicional para ChatGPT (GPT-4) (Dividir cada texto en pedazos de 8192 caracteres)
			//console.log(texts);
			for (let i = 0; i < texts.length; i++) {
				const title = texts[i].title;
				let texts_8192_preprocess = [];
				const words = texts[i].text.split(' ');
				let chunk = '';
				let chunkCount = 0;
				for (let j = 0; j < words.length; j++) {
					chunk += words[j] + ' ';
					chunkCount += words[j].length + 1; //Letra
					//chunkCount += 1; //Palabra
					if (chunkCount >= 8192*wordToToken || j === words.length - 1) { //8192 * 2
						texts_8192_preprocess.push(chunk.trim());
						chunk = '';
						chunkCount = 0;
					}
				}
				console.log("Texts 8192 preprocess: ", texts_8192_preprocess.length);
				const doc = { title: title, text: texts_8192_preprocess };
				texts_8192.push(doc);
			}


			//Preprocesamiento adicional para Fast Detect GPT (Dividir cada texto en pedazos de 2048 caracteres)

			for (let i = 0; i < texts.length; i++) {
				const title = texts[i].title;
				let texts_2048_preprocess = [];
				const words = texts[i].text.split(' ');
				let chunk = '';
				let chunkCount = 0;
				
				for (let j = 0; j < words.length; j++) {
					chunk += words[j] + ' ';
					chunkCount += words[j].length + 1; //Letra
					//chunkCount += 1; //Palabra
					if (chunkCount >= 2048*wordToToken || j === words.length - 1) {
						texts_2048_preprocess.push(chunk.trim());
						chunk = '';
						chunkCount = 0;
					}
				}
				console.log("Texts 2048 preprocess: ", texts_2048_preprocess.length);
				const doc = { title: title, text: texts_2048_preprocess};
				texts_2048.push(doc);
			}

			const response = {
				texts: texts,
				texts_8192: texts_8192,
				texts_2048: texts_2048
			}
			return response;
		} catch (error) {
			console.log(error);
			throw new HttpException('Error: ' + error, HttpStatus.BAD_REQUEST);
		}
	}


	async createAnalysis(body: any) {
		console.log(body);
		let ids = [];
		for (let i = 0; i < body.tags.length; i++) {
			ids.push(body.tags[i].id);
		}
		return await this.prisma.analysis.create({
			data: {
				title: body.title,
				tags: {
					connect: ids.map((id) => ({ id: id })),
				},
				created: body.created,
				user_id: body.user_id
			}
		});
	}

	async createDocument(body: any) {
		console.log(body);
		return await this.prisma.document.create({
			data: {
				title: body.title,
				analysis_id: body.analysis_id
			}
		});
	}

	async createResult(body: any) {
		console.log(body);
		return await this.prisma.result.create({
			data: {
				ai_score: body.ai_score,
				ai_result: body.ai_result,
				ai_id: body.ai_id,
				document_id: body.document_id
			}
		});
	}

	async verifyOriginality(api_key: string) {
		return fetch("https://api.originality.ai/api/v1/account/credits/balance", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"X-OAI-API-KEY": api_key
			}
		});
	}

	async verifyChatGPT(api_key: string) {
		return fetch("https://api.openai.com/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + api_key
			},
			body: JSON.stringify({
				model: "gpt-4",
				messages: [{ role: "user", content: "Hi!" }],
				max_tokens: 5,
			}),
		});
	}

	async detectAIServiceOriginality(body: any) {
		return fetch("https://api.originality.ai/api/v1/scan/ai", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-OAI-API-KEY": body.api_key
			},
			body: JSON.stringify({
				"title": body.title,
				"content": body.text,
			})
		});
	}

	async detectAIServiceChatGPT(body: any) {
		const prompt = 'Quiero que actúes como un clasificador de texto experto en detección de IA. Te daré un texto, el cual clasificarás. Quiero que la salida esté en formato JSON, y sus campos sean el porcentaje de texto analizado que fué creado por IA ("ai_score"), la etiqueta de clasificación ("Human" si "ai_score" < 50, "AI" caso contrario) ("label") y quiero que almacenes en un arreglo los extractos del texto que crees fue hecho con IA ("ai_texts"). Aquí está el texto:';
		return fetch("https://api.openai.com/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + body.api_key
			},
			body: JSON.stringify({
				"model": "gpt-4",
				"messages": [
					{
						"role": "user",
						"content": prompt + body.text
					}
				]
			}),
		});
	}

	async detectAIServiceFastDetectGPT(body: any) {
		return fetch("http://localhost:8001/api/detect/fast-detect-gpt", {
			method: "POST",
			body: JSON.stringify({
				"text": body.text,
			})
		});
	}

	async detectAIServiceLmWatermarking(body: any) {
		return fetch("http://localhost:8002/api/detect/lm-watermarking", {
			method: "POST",
			body: JSON.stringify({
				"text": body.text,
			})
		});
	}

	async detectAIServiceFinetunedBert(body: any) {
		return fetch("http://localhost:8003/api/detect/finetuned-bert", {
			method: "POST",
			body: JSON.stringify({
				"text": body.text,
			})
		});
	}
}