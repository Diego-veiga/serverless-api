
import 'reflect-metadata';
import { diContainer } from '../../shared/container/DIRegister';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import ICustomerService from '../interfaces/ICustomerService';
import { CreateCustomer } from '../models/DTOs/CreateCustomer';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const customer = JSON.parse(event.body!) as CreateCustomer;
        const customerService: ICustomerService = diContainer.resolve('ICustomerService');
        await customerService.create(customer);
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Cliente cadastrado com sucesso '
            })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error })
        };
    }

};