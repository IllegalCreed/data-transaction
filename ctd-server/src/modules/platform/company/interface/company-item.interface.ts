import { BaseCompany } from './base-company.interface';

export type CompanyItem = Omit<BaseCompany, 'description' | 'content'>;
