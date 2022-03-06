import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AddUserIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const includedUrls = [/** any routes that need the user id added in the 'user' field, e.g. 'accounts' or 'posts' */];

    if (includedUrls.includes(request.url.substring(1)) && request.method === 'POST') {
      request.body.user = request.user.id;
    }
    
    return next.handle();
  }
}