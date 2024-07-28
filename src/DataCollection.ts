import { Datum, Metadata, UnknownDatum } from './Datum.js'

/**
 * Manages a collection of datum, ensuring consistency in metadata types.
 * @template D The type of data held in the collection.
 * @template M The type of metadata associated with each datum.
 */
export class DataCollection<
    D extends Data,
    M extends Metadata = Metadata
> {
    /**
     * Creates a new DataCollection instance.
     * @param dataMapping Initial mapping of data names to Datum instances.
     */
    public constructor(protected dataMapping: DataMapping<D, M>) {
    }

    /**
     * Retrieves the data mapping, which associates data names with metadata.
     * @template CM The custom metadata type to retrieve.
     * @returns The data mapping with custom metadata.
     * @since 2.1.0
     */
    public getDataMapping<CM extends M = M>(): DataMapping<D, CM> {
        return this.dataMapping as DataMapping<D, CM>
    }

    /**
     * Retrieves a specific datum by its name.
     * @param name The name of the datum to retrieve.
     * @template K The type of the datum's key.
     * @template CM The custom metadata type to use.
     * @returns The Datum instance associated with the specified name.
     * @since 2.4.0 Renamed from getDatum to get.
     */
    public get<K extends keyof D, CM extends M = M>(name: K): Datum<D[K], CM> {
        return this.dataMapping[name] as Datum<D[K], CM>
    }

    /**
     * Retrieves all datum entries as an array.
     * @template CM The custom metadata type to use.
     * @returns An array of UnknownDatum instances.
     * @since 1.1.0
     * @since 2.4.0 Renamed from getDatumList to getList.
     */
    public getList<CM extends M = M>(): UnknownDatum<CM>[] {
        return Object.values(this.dataMapping)
    }

    /**
     * Retrieves the value of a specific datum.
     * @param name The name of the datum.
     * @template K The type of the datum's key.
     * @returns The value of the specified datum.
     */
    public getValue<K extends keyof D>(name: K): D[K] {
        return this.get(name).value
    }

    /**
     * Retrieves the metadata associated with a specific datum.
     * @param name The name of the datum.
     * @template K The type of the datum's key.
     * @template CM The custom metadata type to use.
     * @returns The metadata associated with the specified datum.
     * @since 1.1.0
     */
    public getMetadata<K extends keyof D, CM extends M = M>(name: K): CM {
        return this.get(name).getMetadata() as CM
    }

    /**
     * Checks if a datum with a given name exists in the collection.
     * @param name The name to check.
     * @returns True if the name exists in the collection, otherwise false.
     * @since 1.1.0
     */
    public exist(name: string): boolean {
        return this.dataMapping.hasOwnProperty(name)
    }

    /**
     * Iterates over each datum in the collection and invokes a callback function.
     * @param callback The function to call for each datum.
     * @since 2.1.0
     */
    public forEach(callback: DataCollectionForEachCallback): void {
        for (const [key, value] of Object.entries(this.dataMapping)) {
            callback(value, key)
        }
    }

    /**
     * Maps over each datum in the collection and transforms the values using a callback function.
     * @param callback The function to transform each datum's value.
     * @returns A new object with transformed values, preserving original keys.
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
     * Retrieves all data as a plain object with transformed values.
     * @returns A new object with transformed values, preserving original keys.
     * @since 2.1.0
     */
    public getData(): D {
        return this.map(datum => datum.getValue())
    }
}

/**
 * Represents a generic data type.
 */
export type Data = Record<string, any>

/**
 * Represents a mapping of data keys to Datum instances.
 */
export type DataMapping<D extends Data, M extends Metadata = Metadata> = {
    [K in keyof D]: Datum<D[K], M>
}

/**
 * Defines the signature for a callback function used with forEach.
 * @param datum The Datum instance.
 * @param key The key associated with the datum.
 * @since 2.1.0
 */
export type DataCollectionForEachCallback = (datum: Datum, key: string) => void

/**
 * Defines the signature for a callback function used with map.
 * @param datum The Datum instance.
 * @param key The key associated with the datum.
 * @since 2.1.0
 */
export type DataCollectionMapCallback = (datum: Datum, key: string) => any
