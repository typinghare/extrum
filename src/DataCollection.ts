import { Datum, Metadata, UnknownDatum } from './Datum'

/**
 * DataCollection manages a collection of datum, or data. All datum in a data collection should have
 * the same type of metadata.
 * @type <D> The data to collect.
 * @type <M> The metadata of each datum.
 */
export class DataCollection<
    D extends Data,
    M extends Metadata = Metadata
> {
    /**
     * Creates a data collection.
     * @param dataMapping Data mapping.
     */
    public constructor(protected dataMapping: DataMapping<D, M>) {
    }

    /**
     * Returns data mapping.
     * @type <CM> The custom metadata.
     * @since 2.1.0
     */
    public getDataMapping<CM extends M = M>(): DataMapping<D, CM> {
        return this.dataMapping as DataMapping<D, CM>
    }

    /**
     * Returns a datum by a specified name.
     * @param name The name of the datum to get.
     * @type <K> The name of a specific datum.
     * @type <CM> The custom metadata.
     */
    public getDatum<K extends keyof D, CM extends M = M>(name: K): Datum<D[K], CM> {
        return this.dataMapping[name] as Datum<D[K], CM>
    }

    /**
     * Returns the datum list.
     * @type <CM> The custom metadata.
     * @since 1.1.0
     */
    public getDatumList<CM extends M = M>(): UnknownDatum<CM>[] {
        return Object.values(this.dataMapping)
    }

    /**
     * Returns the value of a specific datum.
     * @param name The name of a specific datum.
     */
    public getValue<K extends keyof D>(name: K): D[K] {
        return this.getDatum(name).value
    }

    /**
     * Returns the metadata object.
     * @param name The name of the datum.
     * @since 1.1.0
     */
    public getMetadata<K extends keyof D, CM extends M = M>(name: K): CM {
        return this.getDatum(name).getMetadata() as CM
    }

    /**
     * check if a name exists.
     * @param name The name to check.
     * @since 1.1.0
     */
    public exist(name: string): boolean {
        return this.dataMapping.hasOwnProperty(name)
    }

    /**
     * Iterates over each pair in the data object and invokes the callback.
     * @param callback A function to be called for each key-value pair.
     * @since 2.1.0
     */
    public forEach(callback: DataCollectionForEachCallback): void {
        for (const [key, value] of Object.entries(this.dataMapping)) {
            callback(value, key)
        }
    }

    /**
     * Maps over each pair in the data object and transform the values using the provided callback.
     * @param callback A function to transform each value.
     * @return A new object with transformed values, maintaining the original keys.
     * @since 2.1.0
     */
    public map(callback: DataCollectionMapCallback): D {
        const object: { [key: string]: any } = {}
        for (const [key, value] of Object.entries(this.dataMapping)) {
            object[key] = callback(value, key)
        }

        return object as D
    }

    /**
     * Maps over each key-value pair in the data object and transform the datum entries to values.
     * @return A new object with transformed values, maintaining the original keys.
     * @since 2.1.0
     */
    public getData(): D {
        return this.map(datum => datum.getValue())
    }
}

/**
 * Data object type.
 */
export type Data = Record<string, any>

/**
 * Data mapping type.
 */
export type DataMapping<D extends Data, M extends Metadata = Metadata> = {
    [K in keyof D]: Datum<D[K], M>
}

/**
 * @since 2.1.0
 */
export type DataCollectionForEachCallback = (datum: Datum, key: string) => void

/**
 * @since 2.1.0
 */
export type DataCollectionMapCallback = (datum: Datum, key: string) => any
