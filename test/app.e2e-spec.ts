import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';

const PORT = 8000;
describe('App EndToEnd tests', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  beforeAll(async () => {
    const appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = appModule.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    await app.listen(PORT);
    prismaService = app.get(PrismaService);
    await prismaService.cleanDatabase();
    pactum.request.setBaseUrl(`http://localhost:${PORT}`);
  });
  describe('Test Authenticaon', () => {
    describe('Register', () => {
      // it('should email empty', () => {
      //   return pactum
      //     .spec()
      //     .post('/auth/register')
      //     .withBody({
      //       username: '',
      //       password: 'Duy123456',
      //     })
      //     .expectStatus(400);
      //   //.inspect();
      // });
      // //
      // it('should show username error with invalid username format', () => {
      //   return pactum
      //     .spec()
      //     .post('/auth/register')
      //     .withBody({
      //       username: 's',
      //       password: 'Duy123456',
      //     })
      //     .expectStatus(400);
      //   //.inspect();
      // });
      // //
      // //
      // it('should show error IF invalid password is empty', () => {
      //   return pactum
      //     .spec()
      //     .post('/auth/register')
      //     .withBody({
      //       username: 'maixuanduy0605',
      //       password: '',
      //     })
      //     .expectStatus(400);
      //   //.inspect();
      // });
      //many other cases...
      it('should Register', () => {
        return pactum
          .spec()
          .post('/_api/auth/register')
          .withBody({
            email: 'testemail01@gamil.com',
            name: 'Mai Xuan Duy',
            password: 'Duy0605!@#',
            username: 'maixuanduy0605',
          })
          .expectStatus(201);
        //.inspect();
      });
    });
    // describe('Login', () => {
    //   it('should Login', () => {
    //     return pactum
    //       .spec()
    //       .post('/auth/login')
    //       .withBody({
    //         username: 'maixuanduy0605',
    //         password: 'Duy0605!@#',
    //       })
    //       .expectStatus(201)
    //       .stores('accessToken', 'accessToken');
    //     //.inspect();
    //   });
    // });
    // describe('User', () => {
    //   describe('Get CurrentUser', () => {
    //     it('should get detail user', () => {
    //       return pactum
    //         .spec()
    //         .get('/user/currentUser')
    //         .withBearerToken('$S{accessToken}')
    //         .expectStatus(200);
    //       //.inspect();
    //     });
    //   });
    // });
  });

  afterAll(async () => {
    app.close();
  });
  it.todo('should Pass');
});
