import { UserDto } from '@/dtos/Applicattion/user.dto';

// password: q1w2e3r4
const userModel: UserDto[] = [
  { id: 1, email: 'lim@gmail.com', password: '$2b$10$hmrwtGwC.QlfWt6YWaT3S.FP9CarS3.V9n3Qr.d9y2ovcan0oxs56' },
  { id: 2, email: 'kim@gmail.com', password: '$2b$10$hmrwtGwC.QlfWt6YWaT3S.FP9CarS3.V9n3Qr.d9y2ovcan0oxs56' },
  { id: 3, email: 'park@gmail.com', password: '$2b$10$hmrwtGwC.QlfWt6YWaT3S.FP9CarS3.V9n3Qr.d9y2ovcan0oxs56' },
  { id: 4, email: 'choi@gmail.com', password: '$2b$10$hmrwtGwC.QlfWt6YWaT3S.FP9CarS3.V9n3Qr.d9y2ovcan0oxs56' },
];

export default userModel;
