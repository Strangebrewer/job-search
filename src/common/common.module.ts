import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { SomeKindOfMiddleware } from './middleware/some-kind-of.middleware';


@Module({})
export class CommonModule {
  configure(consumer: MiddlewareConsumer) {
    // a middle ware for all POST routes, for example - keeping only as an example
    consumer.apply(SomeKindOfMiddleware).forRoutes(
      { path: "*", method: RequestMethod.POST },
    )
  }
}
