import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseIntPipe,
	Post,
	UploadedFiles,
	UseInterceptors,
  	UseGuards,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { MethodsService } from './methods.service';
import { JwtGuard } from '../auth/guard';

//@UseGuards(JwtGuard)
@Controller('api/final')
export class MethodsController {
	constructor(private methodsService: MethodsService) { }
	
	//temporales, a eliminar
	@Post('db')
	fillDb() {
		return this.methodsService.fillDb();
	}
	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete('db')
	deleteDb() {
		return this.methodsService.cascadeCleanDatabase();
	}

	//Funcionalidades
	@Get('analysis/user/:id')
	getAnalyses(@Param('id', ParseIntPipe) id: number) {
		return this.methodsService.getAnalyses(id);
	}

	@Post('key')
	createKey(@Body() body: any) {
		return this.methodsService.createKey(body);
	}

	@Get('key/user/:id')
	getKeys(@Param('id', ParseIntPipe) id: number) {
		return this.methodsService.getKeys(id);
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete('key/:id')
	deleteKey(@Param('id', ParseIntPipe) id: number) {
		return this.methodsService.deleteKey(id);
	}

	@Get('analysis/:id')
	getAnalysis(@Param('id', ParseIntPipe) id: number) {
		return this.methodsService.getAnalysis(id);
	}

	@Get('ai/free')
	getFreeAIs() {
		return this.methodsService.getFreeAIs();
	}

	@Get('ai/paid')
	getPaidAIs() {
		return this.methodsService.getPaidAIs();
	}

	@Get('tag/user/:id')
	getTags(@Param('id', ParseIntPipe) id: number) {
		return this.methodsService.getTags(id);
	}

	@Post('tag')
	createTag(@Body() body: any) {
		return this.methodsService.createTag(body);
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete('analysis/:id')
	deleteAnalysis(@Param('id', ParseIntPipe) id: number) {
		return this.methodsService.deleteAnalysis(id);
	}

	@Post('analysis')
	async createAnalysis(@Body() body: any) {
		return this.methodsService.createAnalysis(body);
	}

	@Post('document')
	async createDocument(@Body() body: any) {
		return this.methodsService.createDocument(body);
	}

	@Post('result')
	async createResult(@Body() body: any) {
		return this.methodsService.createResult(body);
	}

	//Funciones asociadas a proceso análisis
	//Verificar estado api key Originality
	@HttpCode(HttpStatus.OK)
	@Post('check/originality')
	async checkOriginality(@Body() body: any) {
		return this.methodsService.verifyOriginality(body);
	}

	//Verificar estado api key ChatGPT
	@HttpCode(HttpStatus.OK)
	@Post('check/chatgpt')
	async checkChatGPT(@Body() body: any) {
		return this.methodsService.verifyChatGPT(body);
	}

	//Titulo, keys y documentos verificados previo analisis, proceso es viable
	//Extraer texto de documentos
	@HttpCode(HttpStatus.OK)
	@Post('files')
	@UseInterceptors(FileFieldsInterceptor([{ name: 'documents' }]))
	async extractTextFromDocuments(@UploadedFiles() files: any) {
		return this.methodsService.extractTexts(files.documents);
	}

	//Llamada a detector externo Originality
	@HttpCode(HttpStatus.OK)
	@Post('detect/originality')
	async detectOriginality(@Body() body: any) {
		return this.methodsService.detectAIServiceOriginality(body);
	}

	//Llamada a detector externo ChatGPT (GPT-4)
	@HttpCode(HttpStatus.OK)
	@Post('detect/chat-gpt')
	async detectChatGPT(@Body() body: any) {
		return this.methodsService.detectAIServiceChatGPT(body);
	}

	//Llamada a detector interno Fast Detect GPT
	@HttpCode(HttpStatus.OK)
	@Post('detect/fast-detect-gpt')
	async detectFastDetectGPT(@Body() body: any) {
		return this.methodsService.detectAIServiceFastDetectGPT(body);
	}

	//Llamada a detector interno Lm Watermarking
	@HttpCode(HttpStatus.OK)
	@Post('detect/lm-watermarking')
	async detectLmWatermarking(@Body() body: any) {
		return this.methodsService.detectAIServiceLmWatermarking(body);
	}

	//Llamada a detector interno Finetuned Bert (PoC AI Detector)
	@HttpCode(HttpStatus.OK)
	@Post('detect/finetuned-bert')
	async detectFinetunedBert(@Body() body: any) {
		return this.methodsService.detectAIServiceFinetunedBert(body);
	}
}
