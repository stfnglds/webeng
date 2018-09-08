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
  },
};