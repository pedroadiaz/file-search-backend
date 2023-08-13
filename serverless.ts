import type { AWS } from '@serverless/typescript';
import { classFunctions } from '@functions/class/functions.config';
import { processFilesFunctions } from '@functions/processFiles/functions.config';
import { stripeFunctions } from '@functions/stripe/functions.config';
import { userFunctions } from '@functions/user/functions.config';

const userTable = "users";
const classTable = "class";

const serverlessConfiguration: AWS = {
  service: 'file-search-backend',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-dotenv-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
          "dynamodb:Scan",
          "dynamodb:Query",
          "dynamodb:PutItem",
          "dynamodb:GetItem",
          "dynamodb:DeleteItem"
        ],
        Resource: [
          'arn:aws:dynamodb:us-west-1:*:table/' + classTable + '-${opt:stage}',
          'arn:aws:dynamodb:us-west-1:*:table/' + classTable + '-${opt:stage}' + '/index/*',
          'arn:aws:dynamodb:us-west-1:*:table/' + userTable + '-${opt:stage}',
          'arn:aws:dynamodb:us-west-1:*:table/' + userTable + '-${opt:stage}' + '/index/*',
        ]
      }
    ],
  },
  // import the function via paths
  functions: { 
    ...classFunctions,
    ...processFilesFunctions,
    ...stripeFunctions,
    ...userFunctions,
   },
  package: { individually: true },
  resources: {
    Resources: {
      UserTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: userTable + '-${opt:stage}',
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S"
            },
            {
              AttributeName: "email",
              AttributeType: "S"
            }
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH"
            }
          ],
          BillingMode: "PAY_PER_REQUEST",
          GlobalSecondaryIndexes: [
            {
              IndexName:  `${userTable + '-${opt:stage}'}-email-index`,
              KeySchema:[
                {
                  AttributeName: "email",
                  KeyType: "HASH"
                }
              ],
              Projection:{
                ProjectionType: "ALL"
              }
            }
          ]
        }
      },
      ClassTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: classTable + '-${opt:stage}',
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S"
            },
            {
              AttributeName: "userId",
              AttributeType: "S"
            }
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH"
            }
          ],
          BillingMode: "PAY_PER_REQUEST",
          GlobalSecondaryIndexes: [
            {
              IndexName: `${classTable + '-${opt:stage}'}-userId-index`,
              KeySchema:[
                {
                  AttributeName: "userId",
                  KeyType: "HASH"
                }
              ],
              Projection:{
                ProjectionType: "ALL"
              }
            }
          ]
        }
      },
    }
  },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
