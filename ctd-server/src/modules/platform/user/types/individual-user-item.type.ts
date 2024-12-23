export interface IndividualUserItem {
  // user表
  id: number;
  email: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  // info表
  fullName?: string;
  identificationNumber?: string;
  phoneNumber?: string;
  gender?: string;
  dateOfBirth?: string;
  residentialAddress?: string;
}
