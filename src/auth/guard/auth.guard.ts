import { AuthGuard } from '@nestjs/passport';

export class UserGuard extends AuthGuard('user') {
  constructor() {
    super();
  }
}
