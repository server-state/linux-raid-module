const parser = require('./_gen-pegjs-parser');
const fs = require('fs');

const TEST_DEFINITION = [
    // different RAIDs
    [
        'RAID0',
        [
            // different configurations
            [
                '3 devices',
                [
                    // different tests per configuration
                    [
                        'stable',
                        './examples/mdstat/raid0.mdstat'
                    ]
                ]
            ]
        ]
    ],
    [
        'RAID1',
        [
            [
                '3 devices',
                [
                    [
                        'syncing phase 1',
                        './examples/mdstat/raid1w3.mdstat.0'
                    ],
                    [
                        'syncing phase 2',
                        './examples/mdstat/raid1w3.mdstat.2'
                    ],
                    [
                        'stable',
                        './examples/mdstat/raid1w3.mdstat.3'
                    ],
                    [
                        'stable with 1 failed device',
                        './examples/mdstat/raid1w3.mdstat.faulty.0'
                    ],
                    [
                        'stable with 2 failed devices',
                        './examples/mdstat/raid1w3.mdstat.faulty2.0'
                    ]
                ]
            ],
            [
                '2 devices and 1 spare',
                [
                    [
                        'syncing phase 1',
                        './examples/mdstat/raid1ws.mdstat.0'
                    ],
                    [
                        'syncing phase 2',
                        './examples/mdstat/raid1ws.mdstat.2'
                    ],
                    [
                        'stable',
                        './examples/mdstat/raid1ws.mdstat.4'
                    ],
                    [
                        'recovering with 1 failed device phase 1',
                        './examples/mdstat/raid1ws.mdstat.faulty.0'
                    ],
                    [
                        'recovering with 1 failed device phase 2',
                        './examples/mdstat/raid1ws.mdstat.faulty.3'
                    ],
                    [
                        'stable with 1 failed device',
                        './examples/mdstat/raid1ws.mdstat.faulty.4'
                    ],
                    [
                        'stable with 2 failed devices',
                        './examples/mdstat/raid1ws.mdstat.faulty2.0'
                    ],
                    [
                        'stable with 1 removed device',
                        './examples/mdstat/raid1ws.mdstat.removed.0'
                    ],
                    [
                        'stable with 2 removed devices',
                        './examples/mdstat/raid1ws.mdstat.removed.1'
                    ],
                    [
                        'rescueing with 1 recovering device phase 1',
                        './examples/mdstat/raid1ws.mdstat.replace.0'
                    ],
                    [
                        'rescueing with 1 recovering device phase 2',
                        './examples/mdstat/raid1ws.mdstat.replace.2'
                    ],
                    [
                        'stable with 1 recovering device',
                        './examples/mdstat/raid1ws.mdstat.replace.3'
                    ],
                    [
                        'stable with 1 removed recovering device',
                        './examples/mdstat/raid1ws.mdstat.replace.4'
                    ]
                ]
            ],
            [
                '2 devices and a bitmap',
                [
                    [
                        'syncing phase 1',
                        './examples/mdstat/raid1wsb.mdstat.0'
                    ],
                    [
                        'recovering with 1 failed device phase 1',
                        './examples/mdstat/raid1wsb.mdstat.faulty.0'
                    ]
                ]
            ]
        ]
    ],
    [
        'RAID5',
        [
            [
                '3 devices and a bitmap',
                [
                    [
                        'syncing phase 1',
                        './examples/mdstat/raid5wb.mdstat.0'
                    ],
                    [
                        'syncing phase 2',
                        './examples/mdstat/raid5wb.mdstat.1'
                    ],
                    [
                        'stable',
                        './examples/mdstat/raid5wb.mdstat.2'
                    ],
                    [
                        'stable with 1 failed device',
                        './examples/mdstat/raid5wb.mdstat.faulty.0'
                    ]
                ]
            ],
            [
                '4 devices and 1 spare',
                [
                    [
                        'syncing phase 1',
                        './examples/mdstat/raid5ws.mdstat.0'
                    ],
                    [
                        'syncing phase 2',
                        './examples/mdstat/raid5ws.mdstat.4'
                    ]
                ]
            ]
        ]
    ],
    [
        'RAID10',
        [
            [
                '2 devices and 1 spare',
                [
                    [
                        'syncing phase 1',
                        './examples/mdstat/raid10ws.mdstat.0'
                    ],
                    [
                        'syncing phase 2',
                        './examples/mdstat/raid10ws.mdstat.3'
                    ],
                    [
                        'stable',
                        './examples/mdstat/raid10ws.mdstat.4'
                    ],
                    [
                        'recovering with 1 failed device phase 1',
                        './examples/mdstat/raid10ws.mdstat.faulty.0'
                    ],
                    [
                        'stable with 2 failed devices',
                        './examples/mdstat/raid10ws.mdstat.faulty2.0'
                    ]
                ]
            ]
        ]
    ]
];



describe('Test parser at normal mdstats', () => {
    it('should parse correctly typical mdstat', () => {
        expect(
            parser.parse(fs.readFileSync('./examples/mdstat/typical.mdstat', {encoding: 'utf-8'}))
        ).toMatchSnapshot();
    });
});


describe.each(TEST_DEFINITION)('Test parser at different %s definitions', (raid, specifics) => {

    describe.each(specifics)('Test especially ' + raid + ' with %s', (_specific, tests) => {
        it.each(tests)('should parse correctly a ' + raid + ' definition %s', (_desc, path) => {
            expect(
                parser.parse(fs.readFileSync(path, {encoding: 'utf-8'}))
            ).toMatchSnapshot();
        });
    });
});


describe('Test parser at other edge cases', () => {
    it('should parse correctly an minimal mdstat', () => {
        expect(
            parser.parse(fs.readFileSync('./examples/mdstat/minimal.mdstat', {encoding: 'utf-8'}))
        ).toMatchSnapshot();
    });

    it('should parse correctly an inactive and read-only raid', () => {
        expect(
            parser.parse(fs.readFileSync('./examples/mdstat/inactive.mdstat', {encoding: 'utf-8'}))
        ).toMatchSnapshot();
    });

    it('except with an empty string', () => {
        expect(() => {
            parser.parse('');
        }).toThrow();
    });
});
