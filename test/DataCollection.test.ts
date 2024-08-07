import { DataCollection, Datum, DatumCreator } from '../src'

describe('Test class DataCollection', function() {
    it('Basic tests', function() {
        type MyData = {
            username: string,
            age: number,
            gender: 'male' | 'female' | 'non-binary' | 'other'
        }

        const dataCollection = new DataCollection<MyData>({
            username: Datum.of('James Chan'),
            age: Datum.of(24),
            gender: Datum.of('male'),
        })

        expect(dataCollection.get('username')).toBeInstanceOf(Datum)
        expect(dataCollection.get('age').value).toBe(24)
        expect(dataCollection.getValue('gender')).toBe('male')

        // Get data
        const data = dataCollection.getData()
        expect(Object.keys(data).length).toBe(3)

        // Check if a name exist
        expect(dataCollection.exist('username')).toBe(true)
        expect(dataCollection.exist('password')).toBe(false)

        // Get datum list
        expect(dataCollection.getList().length).toBe(3)
    })

    it('Test metadata', () => {
        type MyData = {
            username: string,
            age: number
        }

        const dataCollection = new DataCollection<MyData>({
            username: Datum.of('James Chan').setMetadata({
                public: true,
            }),
            age: Datum.of(24).setMetadata({
                public: false,
            }),
        })

        expect(dataCollection.getMetadata('username')).toMatchObject({ public: true })
        expect(dataCollection.getMetadata('age').public).toBe(false)
    })

    it('Test getDataMapping()', () => {
        type MyData = {
            username: string,
            age: number
        }

        const dataCollection = new DataCollection<MyData>({
            username: Datum.of('James Chan').setMetadata({
                public: true,
            }),
            age: Datum.of(24).setMetadata({
                public: false,
            }),
        })
        const dataMapping = dataCollection.getDataMapping()

        expect(dataMapping.username).not.toBeNull()
        expect(dataMapping.age.value).toBe(24)
    })

    it('Extend DataCollection', () => {
        interface MyData {
            username: string,
            age: number
        }

        interface MyMetadata {
            description: string
        }

        class MyDataCollection extends DataCollection<MyData, MyMetadata> {
            public constructor() {
                const datumCreator = new DatumCreator<MyMetadata>()
                super({
                    username: datumCreator.create('James Chan').setMetadata({
                        description: 'The name of the user.',
                    }),
                    age: datumCreator.create(24).setMetadata({
                        description: 'The age of the user.',
                    }),
                })
            }
        }

        const myDataCollection = new MyDataCollection()
        expect(myDataCollection.getValue('username')).toBe('James Chan')
        expect(myDataCollection.getValue('age')).toBe(24)
        expect(myDataCollection.getMetadata('age').description).toBe('The age of the user.')
    })

    it('Test forEach(), map(), and dataMap()', () => {
        type MyData = {
            username: string,
            age: number
            realAge: number
        }

        const dataCollection = new DataCollection<MyData>({
            username: Datum.of('James Chan'),
            age: Datum.of(24),
            realAge: Datum.of(25),
        })

        dataCollection.forEach(((datum, key) => {
            if (key.slice(-3).toLowerCase() == 'age') {
                datum.setValue(datum.value + 10)
            }
        }))

        expect(dataCollection.getValue('age')).toBe(34)
        expect(dataCollection.getValue('realAge')).toBe(35)

        const data: MyData = dataCollection.getData()
        expect(data.username).toBe('James Chan')
        expect(data.age).toBe(34)

        const distortedData: MyData = dataCollection.map(datum => {
            return '@#$' + datum.value.toString()
        })
        expect(distortedData.username).toBe('@#$James Chan')
        expect(distortedData.realAge).toBe('@#$35')
    })
})
