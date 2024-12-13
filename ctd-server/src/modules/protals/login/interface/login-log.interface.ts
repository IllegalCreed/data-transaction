export interface ILoginLog {
  id: string;
  email: string;
  loginTime: Date;
  ipAddress: string;
  userAgent: string;
  success: boolean;
  failureReason?: string;
}
