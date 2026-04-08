import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class IsAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    console.log('IsAdminGuard');
    const request = context.switchToHttp().getRequest<Request>();
    const role = request['user']?.role;
    return role === 'admin'; // Se for false não passa a rota e se for true passa
  }
}
