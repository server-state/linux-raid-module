const parser = require('./_gen-pegjs-parser');
const fs = require('fs');

describe('Test parser at normal mdstats', () => {
    it('should parse correctly typical mdstat', () => {
        expect(
            parser.parse(fs.readFileSync('./examples/mdstat/typical.mdstat', {encoding: 'utf-8'}))
        ).toMatchSnapshot();
    });
});

describe('Test parser at RAID0 definition', () => {
    it('should parse correctly a RAID0 definition', () => {
        expect(
            parser.parse(fs.readFileSync('./examples/mdstat/raid0.mdstat', {encoding: 'utf-8'}))
        ).toMatchSnapshot();
    });
});

describe('Test parser at different RAID1 definitions', () => {

    describe('Test especially RAID1 with 3 devices', () => {
        it('should parse correctly a syncing RAID1 definition phase 1', () => {
            expect(
                parser.parse(fs.readFileSync('./examples/mdstat/raid1w3.mdstat.0', {encoding: 'utf-8'}))
            ).toMatchSnapshot();
        });
    
        it('should parse correctly a syncing RAID1 definition phase 2', () => {
            expect(
                parser.parse(fs.readFileSync('./examples/mdstat/raid1w3.mdstat.2', {encoding: 'utf-8'}))
            ).toMatchSnapshot();
        });
    
        it('should parse correctly a stable RAID1 definition', () => {
            expect(
                parser.parse(fs.readFileSync('./examples/mdstat/raid1w3.mdstat.3', {encoding: 'utf-8'}))
            ).toMatchSnapshot();
        });

        it('should parse correctly a stable RAID1 definition with 1 failed device', () => {
            expect(
                parser.parse(fs.readFileSync('./examples/mdstat/raid1w3.mdstat.faulty.0', {encoding: 'utf-8'}))
            ).toMatchSnapshot();
        });

        it('should parse correctly a stable RAID1 definition with 2 failed devices', () => {
            expect(
                parser.parse(fs.readFileSync('./examples/mdstat/raid1w3.mdstat.faulty2.0', {encoding: 'utf-8'}))
            ).toMatchSnapshot();
        });
    });

    describe('Test especially RAID1 with 2 devices and 1 spare', () => {
        it('should parse correctly a syncing RAID1 definition phase 1', () => {
            expect(
                parser.parse(fs.readFileSync('./examples/mdstat/raid1ws.mdstat.0', {encoding: 'utf-8'}))
            ).toMatchSnapshot();
        });

        it('should parse correctly a syncing RAID1 definition phase 2', () => {
            expect(
                parser.parse(fs.readFileSync('./examples/mdstat/raid1ws.mdstat.2', {encoding: 'utf-8'}))
            ).toMatchSnapshot();
        });
    
        it('should parse correctly a stable RAID1 definition', () => {
            expect(
                parser.parse(fs.readFileSync('./examples/mdstat/raid1ws.mdstat.4', {encoding: 'utf-8'}))
            ).toMatchSnapshot();
        });

        it('should parse correctly a recovering RAID1 definition with 1 failed device phase 1', () => {
            expect(
                parser.parse(fs.readFileSync('./examples/mdstat/raid1ws.mdstat.faulty.0', {encoding: 'utf-8'}))
            ).toMatchSnapshot();
        });

        it('should parse correctly a recovering RAID1 definition with 1 failed device phase 2', () => {
            expect(
                parser.parse(fs.readFileSync('./examples/mdstat/raid1ws.mdstat.faulty.3', {encoding: 'utf-8'}))
            ).toMatchSnapshot();
        });

        it('should parse correctly a stable RAID1 definition with 1 failed device', () => {
            expect(
                parser.parse(fs.readFileSync('./examples/mdstat/raid1ws.mdstat.faulty.4', {encoding: 'utf-8'}))
            ).toMatchSnapshot();
        });

        it('should parse correctly a stable RAID1 definition with 2 failed devices', () => {
            expect(
                parser.parse(fs.readFileSync('./examples/mdstat/raid1ws.mdstat.faulty2.0', {encoding: 'utf-8'}))
            ).toMatchSnapshot();
        });

        it('should parse correctly a stable RAID1 definition with 1 removed device', () => {
            expect(
                parser.parse(fs.readFileSync('./examples/mdstat/raid1ws.mdstat.removed.0', {encoding: 'utf-8'}))
            ).toMatchSnapshot();
        });

        it('should parse correctly a stable RAID1 definition with 2 removed devices', () => {
            expect(
                parser.parse(fs.readFileSync('./examples/mdstat/raid1ws.mdstat.removed.1', {encoding: 'utf-8'}))
            ).toMatchSnapshot();
        });

        it('should parse correctly a rescueing RAID1 definition with 1 recovery drive phase 1', () => {
            expect(
                parser.parse(fs.readFileSync('./examples/mdstat/raid1ws.mdstat.replace.0', {encoding: 'utf-8'}))
            ).toMatchSnapshot();
        });

        it('should parse correctly a rescueing RAID1 definition with 1 recovery drive phase 2', () => {
            expect(
                parser.parse(fs.readFileSync('./examples/mdstat/raid1ws.mdstat.replace.2', {encoding: 'utf-8'}))
            ).toMatchSnapshot();
        });

        it('should parse correctly a stable RAID1 definition with 1 recovery drive', () => {
            expect(
                parser.parse(fs.readFileSync('./examples/mdstat/raid1ws.mdstat.replace.3', {encoding: 'utf-8'}))
            ).toMatchSnapshot();
        });

        it('should parse correctly a stable RAID1 definition with 1 removed drive', () => {
            expect(
                parser.parse(fs.readFileSync('./examples/mdstat/raid1ws.mdstat.replace.4', {encoding: 'utf-8'}))
            ).toMatchSnapshot();
        });
    });

    describe('Test especially RAID1 with 2 devices and bitmap', () => {
        it('should parse correctly a syncing RAID1 definition phase 1', () => {
            expect(
                parser.parse(fs.readFileSync('./examples/mdstat/raid1wsb.mdstat.0', {encoding: 'utf-8'}))
            ).toMatchSnapshot();
        });

        it('should parse correctly a recovering RAID1 definition with 1 failed device phase 1', () => {
            expect(
                parser.parse(fs.readFileSync('./examples/mdstat/raid1wsb.mdstat.faulty.0', {encoding: 'utf-8'}))
            ).toMatchSnapshot();
        });
    });
});

describe('Test parser at different RAID5 definitions', () => {

    describe('Test especially RAID5 with 3 devices and bitmap', () => {
        it('should parse correctly a syncing RAID5 definition phase 1', () => {
            expect(
                parser.parse(fs.readFileSync('./examples/mdstat/raid5wb.mdstat.0', {encoding: 'utf-8'}))
            ).toMatchSnapshot();
        });

        it('should parse correctly a syncing RAID5 definition phase 2', () => {
            expect(
                parser.parse(fs.readFileSync('./examples/mdstat/raid5wb.mdstat.1', {encoding: 'utf-8'}))
            ).toMatchSnapshot();
        });

        it('should parse correctly a stable RAID5 definition', () => {
            expect(
                parser.parse(fs.readFileSync('./examples/mdstat/raid5wb.mdstat.2', {encoding: 'utf-8'}))
            ).toMatchSnapshot();
        });

        it('should parse correctly a stable RAID5 definition with 1 failed device', () => {
            expect(
                parser.parse(fs.readFileSync('./examples/mdstat/raid5wb.mdstat.faulty.0', {encoding: 'utf-8'}))
            ).toMatchSnapshot();
        });
    });

    describe('Test especially RAID5 with 4 devices and 1 spare', () => {
        it('should parse correctly a syncing RAID5 definition phase 1', () => {
            expect(
                parser.parse(fs.readFileSync('./examples/mdstat/raid5ws.mdstat.0', {encoding: 'utf-8'}))
            ).toMatchSnapshot();
        });

        it('should parse correctly a syncing RAID5 definition phase 2', () => {
            expect(
                parser.parse(fs.readFileSync('./examples/mdstat/raid5ws.mdstat.4', {encoding: 'utf-8'}))
            ).toMatchSnapshot();
        });
    });
});

describe('Test parse at different RAID10 (linux) definitions', () => {

    describe('Test especially RAID10 with 2 devices and 1 spare', () => {
        it('should parse correctly a syncing RAID10 definition phase 1', () => {
            expect(
                parser.parse(fs.readFileSync('./examples/mdstat/raid10ws.mdstat.0', {encoding: 'utf-8'}))
            ).toMatchSnapshot();
        });

        it('should parse correctly a syncing RAID10 definition phase 2', () => {
            expect(
                parser.parse(fs.readFileSync('./examples/mdstat/raid10ws.mdstat.3', {encoding: 'utf-8'}))
            ).toMatchSnapshot();
        });

        it('should parse correctly a stable RAID10 definition', () => {
            expect(
                parser.parse(fs.readFileSync('./examples/mdstat/raid10ws.mdstat.4', {encoding: 'utf-8'}))
            ).toMatchSnapshot();
        });

        it('should parse correctly a recovering RAID10 definition with 1 failed device phase 1', () => {
            expect(
                parser.parse(fs.readFileSync('./examples/mdstat/raid10ws.mdstat.faulty.0', {encoding: 'utf-8'}))
            ).toMatchSnapshot();
        });

        it('should parse correctly a stable RAID10 definition with 2 failed devices', () => {
            expect(
                parser.parse(fs.readFileSync('./examples/mdstat/raid10ws.mdstat.faulty2.0', {encoding: 'utf-8'}))
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
