import { DatumCreator, Metadata } from '../src'

describe('Test datum creator', () => {
    interface MyMetadata extends Metadata {
        description: string
        readonly: boolean
    }

    it('Test passing a default metadata to the constructor', () => {
        const datumCreator = new DatumCreator<MyMetadata>({
            description: 'Default description.',
            readonly: true,
        })
        const datum = datumCreator.create(10)

        expect(datum.meta('description')).toBe('Default description.')
        expect(datum.meta('readonly')).toBe(true)
    })

    it('Test constructor cloneMetadata parameter', () => {
        const metadata: MyMetadata = {
            description: 'Default description.',
            readonly: true,
        }
        const datumCreator = new DatumCreator<MyMetadata>(metadata, false)
        const datum = datumCreator.create(10)

        expect(datum.getMetadata()).toBe(metadata)
    })
})
