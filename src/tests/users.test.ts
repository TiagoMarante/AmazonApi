import { MockContext, createMockContext } from '@/context';
import { Context } from 'vm';

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

test('should create new user ', async () => {
  const product = {
    id: '1',
    name: 'Bolachas',
    grossweight: 1,
    netWeight: 0.75,
    width: 10,
    lenght: 20,
    hscode: 'fiosdfudsuf',
    price_acq: 1.7,
    price_aux: [1.9, 2.64],
    ean: 'figdhudgfd',
    imgId: 'ugdfyguifhdgduifhgfd',
    supplierId: 'ghdfuijhgfdiughef',
  };

  const result = mockCtx.prisma.product_Wharehouse.create.mockResolvedValue(product);

  // await expect(createUser(user, ctx)).resolves.toEqual({
  //   id: 1,
  //   name: 'Rich',
  //   email: 'hello@prisma.io',
  //   acceptTermsAndConditions: true,
  // })
});

// afterAll(async () => {
//   await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
// });

// describe('Testing Users', () => {
//   describe('[GET] /users', () => {
//     it('response statusCode 200 / findAll', () => {
//       const findUser: UserDtoTests[] = userModel;

//       const app = new App([UsersController]);
//       const result = request(app.getServer()).get('/users');

//       return result.expect(200, { data: findUser, message: 'findAll' });
//     });
//   });

/*

describe('[GET] /users/:id', () => {
  it('response statusCode 200 / findOne', () => {
    const userId = 1;
    const findUser: UserDtoTests = userModel.find(user => user.id === userId);

    const app = new App([UsersController]);
    return request(app.getServer()).get(`/users/${userId}`).expect(200, { data: findUser, message: 'findOne' });
  });
});

describe('[POST] /users', () => {
  it('response statusCode 201 / created', async () => {
    const userData: CreateUserDto = {
      username: 'user1',
      email: 'test@email.com',
      password: 'q1w2e3r4',
      cc: '111111111',
      nif: '999999999',
      photo: 'https://www.google.com/',
      permissions: ['CREATER', 'BOXING'],
    };

    const app = new App([UsersController]);
    return request(app.getServer()).post('/users').send(userData).expect(201);
  });
});

describe('[PUT] /users/:id', () => {
  it('response statusCode 200 / updated', async () => {
    const userId = 1;
    const userData: CreateUserDto = {
      username: 'username2',
      email: 'test@email.com',
      password: 'q1w2e3r4',
      cc: '111111111',
      nif: '999999999',
      photo: 'https://www.google.com/',
      permissions: ['CREATER', 'BOXING'],
    };

    const app = new App([UsersController]);
    return request(app.getServer()).put(`/users/${userId}`).send(userData).expect(200);
  });
});

describe('[DELETE] /users/:id', () => {
  it('response statusCode 200 / deleted', () => {
    const userId = 1;

    const app = new App([UsersController]);
    return request(app.getServer()).delete(`/users/${userId}`).expect(200);
  });
});
});

*/
