export const groupsJsonSchema: object = {
    'definitions': {},
    '$schema': 'http://json-schema.org/draft-07/schema#',
    '$id': 'http://example.com/root.json',
    'type': 'array',
    'title': 'The Root Schema',
    'items': {
        '$id': '#/items',
        'type': 'object',
        'title': 'The Items Schema',
        'required': [
            'name',
            'coach',
            'pendingParticipation',
        ],
        'properties': {
            'name': {
                '$id': '#/items/properties/name',
                'type': 'string',
                'title': 'The Name Schema',
                'default': '',
                'examples': [
                    '2a',
                ],
                'pattern': '^(.*)$',
            },
            'coach': {
                '$id': '#/items/properties/coach',
                'type': 'string',
                'title': 'The Coach Schema',
                'default': '',
                'examples': [
                    'Max Muster',
                ],
                'pattern': '^(.*)$',
            },
            'pendingParticipation': {
                '$id': '#/items/properties/pendingParticipation',
                'type': 'boolean',
                'title': 'The Pendingparticipation Schema',
                'default': false,
                'examples': [
                    true,
                ],
            },
        },
    },
};

export const groupJsonSchema: object = {
    'definitions': {},
    '$schema': 'http://json-schema.org/draft-07/schema#',
    '$id': 'http://example.com/root.json',
    'type': 'object',
    'title': 'The Root Schema',
    'required': [
        'name',
        'coach',
        'pendingParticipation',
    ],
    'properties': {
        'name': {
            '$id': '#/properties/name',
            'type': 'string',
            'title': 'The Name Schema',
            'default': '',
            'examples': [
                '2a',
            ],
            'pattern': '^(.*)$',
        },
        'coach': {
            '$id': '#/properties/coach',
            'type': 'string',
            'title': 'The Coach Schema',
            'default': '',
            'examples': [
                'Max Muster',
            ],
            'pattern': '^(.*)$',
        },
        'pendingParticipation': {
            '$id': '#/properties/pendingParticipation',
            'type': 'boolean',
            'title': 'The Pendingparticipation Schema',
            'default': false,
            'examples': [
                true,
            ],
        },
    },
};
