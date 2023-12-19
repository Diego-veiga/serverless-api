import { IntegrationModelAttributes } from '../models/IntegrationAtributes';
import AWS from 'aws-sdk';

export interface IDynamoRepository {
    create(item: IntegrationModelAttributes): Promise<AWS.DynamoDB.QueryOutput>;
    update(item: IntegrationModelAttributes): Promise<void>;
    delete(item: IntegrationModelAttributes): Promise<void>;
    findOne(pk: string, sk: string): Promise<AWS.DynamoDB.GetItemOutput>;
}