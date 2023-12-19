import { Customer } from '../models/customer';
import { CreateCustomer } from '../models/DTOs/CreateCustomer';

export default interface ICustomerService {
    create(customer: CreateCustomer): Promise<void>;
    update(customer: Customer, document: string): Promise<void>;
    delete(document: string): Promise<void>;
    getByDocument(document: string): Promise<Customer | null>;
}