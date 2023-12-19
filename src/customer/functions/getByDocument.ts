import 'reflect-metadata';
import { diContainer } from '../../shared/container/DIRegister';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import ICustomerService from '../interfaces/ICustomerService';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    try {
        const { document } = event.pathParameters as any;
        const customerService: ICustomerService = diContainer.resolve('ICustomerService');
        const result = await customerService.getByDocument(document as string);
        return result ? { statusCode: 200, body: JSON.stringify(result) } : { statusCode: 400, body: JSON.stringify({ message: "Cliente não encontrado" }) };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error })
        };
    };
};