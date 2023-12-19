import { CreateCustomer } from './../models/DTOs/CreateCustomer';
import { Converter } from 'aws-sdk/clients/dynamodb';
import { IDynamoRepository } from 'src/shared/interfaces/IDynamoRepository';
import { inject, injectable } from 'tsyringe';
import ICustomerService from '../interfaces/ICustomerService';
import { Customer } from '../models/customer';
import { IntegrationModelAttributes } from '../../shared/models/IntegrationAtributes';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

@injectable()
export class CustomerService implements ICustomerService {
    constructor(@inject("IDynamoRepository") private dynamoRepository: IDynamoRepository) { }

    async create(customer: CreateCustomer): Promise<void> {
        const customerCreated = {
            ...customer,
            id: uuidv4(),
            create_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            update_at: undefined
        } as Customer;
        const item = {
            pk: 'DevsFuturo',
            sk: `customer:${customer.document}`,
            model: customerCreated,
        } as IntegrationModelAttributes;
        await this.dynamoRepository.create(item);
    }
    async update(customer: Customer, document: string): Promise<void> {

        const item = {
            pk: 'DevsFuturo',
            sk: `customer:${document}`,
            model: customer,

        } as IntegrationModelAttributes;
        await this.dynamoRepository.update(item);
    }
    async delete(document: string): Promise<void> {
        const item = {
            pk: 'DevsFuturo',
            sk: `customer:${document}`,
        } as IntegrationModelAttributes;
        await this.dynamoRepository.delete(item);
    }
    async getByDocument(document: string): Promise<Customer | null> {
        const result = await this.dynamoRepository.findOne('DevsFuturo', `customer:${document}`);
        if (Object.keys(result).length) {
            const customer = JSON.parse(JSON.stringify(Converter.unmarshall(result.Item!)));
            return JSON.parse(customer.model) as Customer;
        }
        return null;
    }
}