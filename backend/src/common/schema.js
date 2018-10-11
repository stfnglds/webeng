const schemas = exports;

schemas.EntryCreate = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            required: true,
            maxLength: 50,
        },
        address: {
            type: 'string',
            required: false,
            maxLength: 50,
        },
        group: {
            type: 'int',
            required: false,
        },
        _id: {
            type: 'int',
            required: false,
        },
        rating: {
            type: 'int',
            required: false,
        },
    },
};

schemas.GroupCreate = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            required: true,
            maxLength: 50,
        },
        _id: {
            type: 'int',
            required: false,
        },
        addressbook: {
            type: 'int',
            required: false,
        },
    },
};

schemas.AddressbookCreate = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            required: true,
            maxLength: 50,
        },
        _id: {
            type: 'int',
            required: false,
        },
    },
};
