import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class SomeKindOfMiddleware implements NestMiddleware {
  constructor() {}

  use(req: any, res: any, next: () => void) {
    console.log('req.body in SomeKindOfMiddleware:::', req.body);
    console.log('req.headers in SomeKindOfMiddleware:::', req.headers);
    // This won't have access to req.user - it hasn't been added yet;
    next();
  }
}