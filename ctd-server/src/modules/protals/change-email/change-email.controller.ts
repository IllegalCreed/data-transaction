import { Controller, Logger } from '@nestjs/common';
import { ChangeEmailService } from './change-email.service';

@Controller('change-email')
export class ChangeEmailController {
  private readonly logger = new Logger(ChangeEmailController.name);
  constructor(private readonly changeEmailService: ChangeEmailService) {}
}
