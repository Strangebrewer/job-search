import { ArgumentMetadata, Inject, Injectable, PipeTransform } from "@nestjs/common";
import slugify from "slugify";
import { UsersService } from "../users.service";

@Injectable()
export class TransformUserDataPipe implements PipeTransform {
  constructor(@Inject(UsersService) private readonly usersService: UsersService) { }

  transform(value: any, metadata: ArgumentMetadata) {
    if (value.email) {
      value.normalized_email = value.email.toLowerCase();
    }

    if (value.username) {
      const trimmed = slugify(value.username, ' ').trim();
      value.username = trimmed;
      value.normalized_username = slugify(trimmed, { lower: true });
    }

    if (value.password) {
      value.password = this.usersService.hashPassword(value.password);
    }

    return value;
  }
}
