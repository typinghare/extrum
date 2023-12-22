import { DatumCreator, Metadata } from '../src'

describe('Test datum creator.', () => {
    it('Test passing a default metadata to the constructor.', () => {
        interface MyMetadata extends Metadata {
            description: string
            readonly: boolean
        }

        const datumCreator = new DatumCreator<MyMetadata>({
            description: 'Default description.',
            readonly: true,
        })
        const datum = datumCreator.create(10)

        expect(datum.getMeta('description')).toBe('Default description.')
        expect(datum.getMeta('readonly')).toBe(true)
    })
})