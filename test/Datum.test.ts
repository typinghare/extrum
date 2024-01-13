import { Datum } from '../src'

describe('Test class Datum', function() {
    it('Basic tests', function() {
        const numberDatum = Datum.of(5)

        // Test default value.
        expect(numberDatum.value).toBe(5)
        expect(numberDatum.getDefaultValue()).toBe(5)

        // Assignment.
        numberDatum.value = 10
        expect(numberDatum.value).toBe(10)
    })

    it('Test metadata', function() {
        const stringDatum = Datum.of('Hello world!').setMetadata({
            length: 12,
        })

        // Test default metadata.
        expect(stringDatum.getMeta('length')).toBe(12)

        interface MyMetadata {
            label: string,
            description: string,
        }

        const booleanDatum = Datum.of(true).setMetadata<MyMetadata>({
            label: 'Dark Mode',
            description: 'Whether to turn on the dark mode.',
        })

        // Test default metadata.
        expect(booleanDatum.getMeta('label')).toBe('Dark Mode')
        expect(booleanDatum.getMeta('description')).toBe('Whether to turn on the dark mode.')

        booleanDatum.setMeta('label', '夜间模式')
        booleanDatum.setMeta('description', '是否打开夜间模式')
        expect(booleanDatum.getMeta('label')).toBe('夜间模式')
        expect(booleanDatum.getMeta('description')).toBe('是否打开夜间模式')
    })

    it('Test getValue() and setValue()', () => {
        const datum = Datum.of(5)
        datum.setValue(10)

        expect(datum.getValue()).toBe(10)
    })

    it('Test clone()', () => {
        const stringDatum = Datum.of('Hello world!').setMetadata({
            length: 12,
        })
        stringDatum.setValue('Bye!')

        const clonalStringDatum = stringDatum.clone()
        expect(clonalStringDatum.getDefaultValue()).toBe('Hello world!')
        expect(clonalStringDatum.getValue()).toBe('Bye!')
        expect(clonalStringDatum.getMetadata()).toEqual({ length: 12 })

        const clonalStringDatumCopyingMetadata = stringDatum.clone(false)
        expect(clonalStringDatumCopyingMetadata.getMetadata()).toBe(stringDatum.getMetadata())
    })
})