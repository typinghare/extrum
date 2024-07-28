# Extrum

## Get Started

Create a `MyConfig` interface and a `MyConfigMetadata` interface, then create a data collection.

```ts
import { DataCollection, Datum } from '@typinghare/extrum'

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
```

Get values from the data collection and set values.

```ts
const username = dataCollection.getValue('username')     // TypingHare 
const fontSize = dataCollection.getValue('fontSize')     // 16

dataCollection.setValue('username', 'James Chan')
dataCollection.setValue('fontSize', 20)
```

Get and set metadata.

```ts
dataCollection.getDatum('username').meta('label')
dataCollection.getDatum('fontSize').meta('optionList')

dataCollection.getDatum('username').meta('label')
dataCollection.getDatum('fontSize').meta('optionList', [8, 12, 16, 20, 24])
```
