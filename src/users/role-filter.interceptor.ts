/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// role-filter.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RoleFilterInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const roleHeader = (req.headers['role'] as string) || '';
    const role = roleHeader.toLowerCase(); // "admin" ou "client"

    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((user) => this.filterUser(user, role));
        }
        return this.filterUser(data, role);
      }),
    );
  }

  private filterUser(user: any, role: string) {
    if (!user) return user;

    const id = user._id ?? user.id; // pour Mongo

    if (role === 'admin') {
      // vue complète admin
      return {
        id,
        email: user.email,
        role: user.role,
        active: user.active,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    }

    // else client
    return {
      id,
      email: user.email,
    };
  }
}
