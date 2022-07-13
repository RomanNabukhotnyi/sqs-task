import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';
import Joi from 'joi';
import enjoi from 'enjoi';

const middleware = (schema: Joi.Schema):middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
    const requestMiddleware: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (request) => {
        if (schema) {
            request.event.body = await schema.validateAsync(request.event.body);
        }
    };
    const responseMiddleware: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (request) => {
        request.response = {
            statusCode: request.response.statusCode,
            body: JSON.stringify(request.response),
        };
    };
    const onErrorMiddleware: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (request) => {
        request.response = {
            statusCode: 400,
            body: JSON.stringify({
                error: request.error,
            }),
        };
    };
    return {
        before: requestMiddleware,
        after: responseMiddleware,
        onError: onErrorMiddleware,
    };
};

export const middyfy = (handler: Handler, schema = {}) => {
    return middy(handler).use(middyJsonBodyParser()).use(middleware(enjoi.schema(schema)));
};
