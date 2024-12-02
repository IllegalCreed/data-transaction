export class LoginLogDto {
  id: string;
  userId: string;
  email: string;
  loginTime: Date;
  ipAddress: string;
  userAgent: string;
  success: boolean;
  failureReason?: string;
}
