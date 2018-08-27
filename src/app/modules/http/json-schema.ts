export const responseErrorSchema: object = {
    'definitions': {},
    '$schema': 'http://json-schema.org/draft-07/schema#',
    '$id': 'http://example.com/root.json',
    'type': 'object',
    'title': 'The Root Schema',
    'required': [
        'timestamp',
        'status',
        'error',
        'message',
        'path',
    ],
    'properties': {
        'timestamp': {
            '$id': '#/properties/timestamp',
            'type': 'string',
            'title': 'The Timestamp Schema',
            'default': '',
            'examples': [
                '2018-08-26T12:40:52.638+0000',
            ],
            'pattern': '^(.*)$',
        },
        'status': {
            '$id': '#/properties/status',
            'type': 'integer',
            'title': 'The Status Schema',
            'default': 0,
            'examples': [
                400,
            ],
        },
        'error': {
            '$id': '#/properties/error',
            'type': 'string',
            'title': 'The Error Schema',
            'default': '',
            'examples': [
                'Bad Request',
            ],
            'pattern': '^(.*)$',
        },
        'message': {
            '$id': '#/properties/message',
            'type': 'string',
            'title': 'The Message Schema',
            'default': '',
            'examples': [
                'Some error',
            ],
            'pattern': '^(.*)$',
        },
        'path': {
            '$id': '#/properties/path',
            'type': 'string',
            'title': 'The Path Schema',
            'default': '',
            'examples': [
                '/participant/1',
            ],
            'pattern': '^(.*)$',
        },
    },
};
