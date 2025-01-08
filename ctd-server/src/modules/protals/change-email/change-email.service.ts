import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ChangeEmailService {
  private readonly logger = new Logger(ChangeEmailService.name);
}
