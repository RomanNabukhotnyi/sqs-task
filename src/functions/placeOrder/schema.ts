export default {
    type: 'object',
    properties: {
        user:{
            type: 'string',
            minLength: 1,
            maxLength: 20,
        },
        shop:{
            type: 'string',
            minLength: 1,
            maxLength: 20,
        },
    },
    required: ['user', 'shop'],
} as const;