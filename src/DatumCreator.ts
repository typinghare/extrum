import { Datum, Metadata } from './Datum'

/**
 * Data creator.
 * @since 2.0.0
 * @example
 *      const datumCreator = new DatumCreator({ state: 'OK' })
 *      const datum1 = datumCreator.create(5)
 *      const datum2 = datumCreator.create('Hello world!')
 */
export class DatumCreator<M extends Metadata = Metadata> {
    /**
     * Creates a datum creator.
     * @param defaultMetaData The default metadata.
     * @param cloneMetadata Whether to clone metadata when creating a datum.
     */
    public constructor(
        protected defaultMetaData?: M,
        protected cloneMetadata: boolean = true,
    ) {
    }

    /**
     * Creates a datum.
     * @param defaultValue The default value of the datum.
     */
    public create<T>(defaultValue: T): Datum<T, M> {
        const datum = Datum.of<T, M>(defaultValue)
        if (this.defaultMetaData) {
            datum.setMetadata(this.cloneMetadata ? { ...this.defaultMetaData } : this.defaultMetaData)
        }

        return datum
    }
}
