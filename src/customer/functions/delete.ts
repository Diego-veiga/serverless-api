import 'reflect-metadata';
import { diContainer } from '../../shared/container/DIRegister';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import ICustomerService from '../interfaces/ICustomerService';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    try {
        const { document } = event.pathParameters as any;
        const customerService: ICustomerService = diContainer.resolve('ICustomerService');
        await customerService.delete(document as string);
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Cliente removido com sucesso'
            })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error })
        };
    }
};