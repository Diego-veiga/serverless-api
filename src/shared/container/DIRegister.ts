import 'reflect-metadata';
import { container } from 'tsyringe';
import { DynamoBaseRepository } from '../repository/DynamoRepository';
import { CustomerService } from './../../customer/services/CustomerService.service';

container.register('IDynamoRepository', DynamoBaseRepository);
container.register('ICustomerService', CustomerService);

export const diContainer = container;