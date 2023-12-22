import { Datum, Metadata } from './Datum'

/**
 * Data creator.
 * @since 2.0.0
 */
export class DatumCreator<
    M extends Metadata = Metadata
> {
    /**
     * Creates a datum creator.
     * @param defaultMetaData The default metadata.
     */
    public constructor(protected defaultMetaData?: M) {
    }

    /**
     * Creates a datum.
     * @param defaultValue The default value of the datum.
     */
    public create<T>(defaultValue: T): Datum<T, M> {
        const datum = Datum.of<T, M>(defaultValue)
        if (this.defaultMetaData) {
            datum.setMetadata(this.defaultMetaData)
        }

        return datum
    }
}