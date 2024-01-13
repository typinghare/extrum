import { DataCollection, Datum } from '../src'

describe('README', () => {
    interface MyConfig {
        username: string,
        fontSize: number
    }

    interface MyConfigMetadata {
        label: string
        optionList?: any[]
    }

    const dataCollection = new DataCollection<MyConfig, MyConfigMetadata>({
        username: Datum.of('TypingHare').setMetadata({
            label: 'The username of the user.',
        }),
        fontSize: Datum.of(16).setMetadata({
            label: 'The font size.',
            optionList: [12, 16, 20],
        }),
    })

    it('Get values from the data collection', () => {
        expect(dataCollection.getValue('username')).toBe('TypingHare')
        expect(dataCollection.getValue('fontSize')).toBe(16)
    })
})
