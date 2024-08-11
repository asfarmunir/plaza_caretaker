export interface IEmployee {
  fullname: string;
  email: string;
  dateOfBirth: string;
  employeeType: string;
  gender: string;
  phoneNumber: string;
  uid: string;
  assignedCustomers: string[];
  workTime: [{
    date: string;
    minutes: number;
  }];
    salariesPaid:[{
    month: string;
    salary: number;
  }]
}

export interface ICustomer {
  fullname: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  serviceType: string;
  totalTimeRequired: string;
  amount: string;
  uid: string;

}