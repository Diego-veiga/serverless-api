import AWS from 'aws-sdk';
import { IntegrationTables } from '../enums/IntegrationTables.enum';
import { IntegrationModelAttributes } from '../models/IntegrationAtributes';
import { injectable } from 'tsyringe';
import moment from 'moment';
import { IDynamoRepository } from '../interfaces/IDynamoRepository';



@injectable()
export class DynamoBaseRepository implements IDynamoRepository {
    tableName = IntegrationTables.DevsFuturo;

    dynamodb = new AWS.DynamoDB({});

    constructor() {
        this.dynamodb = new AWS.DynamoDB({});
    }

    findOne = async (pk: string, sk: string): Promise<AWS.DynamoDB.GetItemOutput> => {
        let result: AWS.DynamoDB.GetItemOutput = {};

        const params = {
            Key: {
                pk: { S: pk },
                sk: { S: sk },
            },
            TableName: this.tableName,
        } as any;
        console.log(`----- findOne query params: ${JSON.stringify(params)}`);

        result = await this.dynamodb.getItem(params).promise();

        return result;
    };

    create = async (item: IntegrationModelAttributes): Promise<AWS.DynamoDB.PutItemOutput> => {
        let result: AWS.DynamoDB.PutItemOutput = {};
        const params = {
            Item: {
                pk: { S: item.pk },
                sk: { S: item.sk },
                createAt: { S: moment().format('YYYY-MM-DD HH:mm:ss') },
                updateAt: { S: moment().format('YYYY-MM-DD HH:mm:ss') },
                model: { S: JSON.stringify(item.model) }
            },
            TableName: this.tableName,
        };

        result = await this.dynamodb.putItem(params).promise();

        return result;
    };

    delete = async (item: IntegrationModelAttributes): Promise<void> => {
        const params = {
            Key: {
                pk: { S: item.pk },
                sk: { S: item.sk },
            },
            TableName: this.tableName,
        } as any;

        await this.dynamodb.deleteItem(params).promise();
    };

    update = async (item: IntegrationModelAttributes): Promise<void> => {

        const params = {
            Key: {
                pk: { S: item.pk },
                sk: { S: item.sk },
            },
            UpdateExpression: 'set model = :item,  updateAt = :updateTime',
            ExpressionAttributeValues: {
                ':item': { S: JSON.stringify(item.model) },
                ':updateTime': { S: moment().format('YYYY-MM-DD HH:mm:ss') },

            },
            TableName: this.tableName,
        } as any;

        await this.dynamodb.updateItem(params).promise();
    };


}
