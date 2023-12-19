import 'reflect-metadata';
import { diContainer } from '../../shared/container/DIRegister';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import ICustomerService from '../interfaces/ICustomerService';
import { Customer } from '../models/customer';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    try {
        const { document } = event.pathParameters as any;
        const customer = JSON.parse(event.body!) as Customer;
        const customerService: ICustomerService = diContainer.resolve('ICustomerService');
        await customerService.update(customer, document as string);
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Cliente atualizado com sucesso'
            })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error })
        };
    }
};