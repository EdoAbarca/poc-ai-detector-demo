/*
import {
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { AuthDto, RegisterDto } from '../src/auth/dto';

import { PrismaService } from '../src/prisma/prisma.service';
import { EditUserDto } from '../src/user/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl(
      'http://localhost:3333',
    );
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const authDto: AuthDto = {
      email: 'vladderek@gmail.com',
      password: 'vladpass123',
    };
    const registerDto: RegisterDto = {
      email: 'vladderek@gmail.com',
      username: 'Vlad Derek',
      password: 'vladpass123',
    };
    describe('register', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({
            username: registerDto.username,
            password: registerDto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({
            email: registerDto.email,
            username: registerDto.username,
          })
          .expectStatus(400);
      });
      it('should throw if username empty', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({
            email: registerDto.email,
            password: registerDto.password,
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .expectStatus(400);
      });
      it('should register', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody(registerDto)
          .expectStatus(201);
      });
    });

    describe('login', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            password: authDto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            email: authDto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .expectStatus(400);
      });
      it('should login', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody(authDto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
    });
  });

  
  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });

    describe('Edit user', () => {
      it('should edit user', () => {
        const dto: EditUserDto = {
          username: 'Vladimir Derek',
          email: 'vladderek@codewithvlad.com',
          description: 'I am a software engineer',
        };
        return pactum
          .spec()
          .patch('/users')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.username)
          .expectBodyContains(dto.email)
          .expectBodyContains(dto.description);
      });
    });
  });

  
  
  describe('reports', () => {
    describe('Get empty reports', () => {
      it('should get reports', () => {
        return pactum
          .spec()
          .get('/reports')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBody([]);
      });
    });

    describe('Create report', () => {
      const dto: CreateReportDto = {
        title: 'First report',
        description: 'First report, follow the next link: https://www.youtube.com/watch?v=d6WC5n9G_sM',
      };
      it('should create report', () => {
        return pactum
          .spec()
          .post('/reports')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(201)
          .stores('reportId', 'id');
      });
    });

    describe('Get reports', () => {
      it('should get reports', () => {
        return pactum
          .spec()
          .get('/reports')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });

    describe('Get report by id', () => {
      it('should get report by id', () => {
        return pactum
          .spec()
          .get('/reports/{id}')
          .withPathParams('id', '$S{reportId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBodyContains('$S{reportId}');
      });
    });

    describe('Edit report by id', () => {
      const dto: EditReportDto = {
        title:
          'Kubernetes Course - Full Beginners Tutorial (Containerize Your Apps!)',
        description:
          'Learn how to use Kubernetes in this complete course. Kubernetes makes it possible to containerize applications and simplifies app deployment to production.',
      };
      it('should edit report', () => {
        return pactum
          .spec()
          .patch('/reports/{id}')
          .withPathParams('id', '$S{reportId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.title)
          .expectBodyContains(dto.description);
      });
    });

    describe('Delete report by id', () => {
      it('should delete report', () => {
        return pactum
          .spec()
          .delete('/reports/{id}')
          .withPathParams('id', '$S{reportId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(204);
      });

      it('should get empty reports', () => {
        return pactum
          .spec()
          .get('/reports')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectJsonLength(0);
      });
    });
  });
  
});
 */