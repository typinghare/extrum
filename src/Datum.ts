/**
 * @type <T> The type of the value.
 * @type <M> The type of the metadata.
 */
export class Datum<T = any, M extends Metadata = Metadata> {
    /**
     * Creates a datum. This is the recommended method to create a datum instance.
     * @param defaultValue The default value of the datum.
     */
    public static of<T, M extends Metadata = Metadata>(defaultValue: T): Datum<T, M> {
        return new Datum<T, M>(defaultValue)
    }

    /**
     * The internal value of this datum.
     * @private
     */
    protected internalValue: T

    /**
     * Creates a new datum.
     * @param defaultValue The default value for this datum.
     * @param metadata The metadata for this datum.
     * @since 2.0.0 The accessibility changes from public to protected.
     */
    protected constructor(
        protected defaultValue: T,
        protected metadata: M = {} as M,
    ) {
        this.internalValue = defaultValue
    }

    /**
     * Returns the value of this datum.
     * @returns The current value of this datum.
     */
    public get value(): T {
        return this.internalValue
    }

    /**
     * Sets the value of this datum.
     * @param newValue The new value to set.
     */
    public set value(newValue: T) {
        this.internalValue = newValue
    }

    /**
     * Returns the default value.
     */
    public getDefaultValue(): T {
        return this.defaultValue
    }

    /**
     * Returns the value of a specific piece of metadata associated with this datum.
     * @param name the name of the metadata to get.
     */
    public getMeta<K extends keyof M>(name: K): M[K] {
        return this.metadata[name]
    }

    /**
     * Sets the value of a specific piece of metadata associated with this datum.
     * @param name The name of the metadata to get.
     * @param value The value to set.
     */
    public setMeta<K extends keyof M>(name: K, value: M[K]): this {
        this.metadata[name] = value

        return this
    }

    /**
     * Returns metadata.
     * @since 1.1.0
     */
    public getMetadata(): M {
        return this.metadata
    }

    /**
     * Returns the value of this datum.
     * @since 1.2.0
     */
    public getValue(): T {
        return this.value
    }

    /**
     * Sets the value of this datum.
     * @since 2.0.0
     */
    public setValue(newValue: T): this {
        this.value = newValue

        return this
    }

    /**
     * Sets the metadata.
     * @param metadata The metadata to set.
     * @since 2.0.0
     */
    public setMetadata<CM extends M = M>(metadata: CM): Datum<T, CM> {
        this.metadata = metadata

        return this as unknown as Datum<T, CM>
    }
}

/**
 * Metadata type.
 */
export type Metadata = Record<string, any>

/**
 * Datum that the type of the value is unknown.
 */
export type UnknownDatum<M extends Metadata = Metadata> = Datum<unknown, M>