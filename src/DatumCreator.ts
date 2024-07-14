import { Datum, Metadata } from './Datum'

/**
 * A utility class for creating Datum instances with default metadata.
 * @since 2.0.0
 * @example
 *      const datumCreator = new DatumCreator({ state: 'OK' })
 *      const datum1 = datumCreator.create(5)
 *      const datum2 = datumCreator.create('Hello world!')
 */
export class DatumCreator<M extends Metadata = Metadata> {
    /**
     * Creates a new DatumCreator instance.
     * @param defaultMetaData The default metadata to assign to created Datum instances.
     * @param cloneMetadata Whether to clone the metadata when creating Datum instances.
     */
    public constructor(
        protected defaultMetaData?: M,
        protected cloneMetadata: boolean = true,
    ) {
    }

    /**
     * Creates a new Datum instance with a specified default value and optional metadata.
     * @param defaultValue The default value for the Datum instance.
     * @returns A new Datum instance initialized with the default value and metadata.
     */
    public create<T>(defaultValue: T): Datum<T, M> {
        const datum = Datum.of<T, M>(defaultValue)
        if (this.defaultMetaData) {
            datum.setMetadata(this.cloneMetadata ? { ...this.defaultMetaData } : this.defaultMetaData)
        }

        return datum
    }
}
