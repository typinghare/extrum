/**
 * Represents a single piece of data with a value and associated metadata.
 * @template T The type of the datum's value.
 * @template M The type of the datum's metadata.
 */
export class Datum<T = any, M extends Metadata = Metadata> {
    /**
     * Creates a Datum instance with a specified default value.
     * @param defaultValue The default value of the datum.
     * @example Datum.of(5)
     * @example Datum.of('Hello world!')
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
     * Creates a new Datum instance with a default value and optional metadata.
     * @param defaultValue The default value for this datum.
     * @param metadata The metadata associated with this datum.
     * @since 2.0.0 Changed accessibility from public to protected.
     */
    protected constructor(
        protected defaultValue: T,
        protected metadata: M = {} as M,
    ) {
        this.internalValue = defaultValue
    }

    /**
     * Retrieves the current value of this datum.
     * @returns The current value of this datum.
     */
    public get value(): T {
        return this.internalValue
    }

    /**
     * Sets a new value for this datum.
     * @param newValue The new value to set.
     */
    public set value(newValue: T) {
        this.internalValue = newValue
    }

    /**
     * Retrieves the default value of this datum.
     * @returns The default value of this datum.
     */
    public getDefaultValue(): T {
        return this.defaultValue
    }

    /**
     * Returns the value of a specific piece of metadata associated with this datum.
     * @param name T¬he name of the metadata to retrieve.
     * @since 2.4.0 Renamed from getMeta to meta.
     */
    public meta<K extends keyof M>(name: K): M[K];
    /**
     * Sets the value of a specific piece of metadata associated with this datum.
     * @param name The name of the metadata to set.
     * @param value The value to set.
     * @since 2.4.0 Renamed from setMeta to meta. It no longer returns this.
     */
    public meta<K extends keyof M>(name: K, value?: M[K]): M[K] | void {
        if (value === undefined) {
            return this.metadata[name]
        } else {
            this.metadata[name] = value
        }
    }

    /**
     * Retrieves the metadata associated with this datum.
     * @returns The metadata associated with this datum.
     * @since 1.1.0
     */
    public getMetadata(): M {
        return this.metadata
    }

    /**
     * Retrieves the current value of this datum.
     * @returns The current value of this datum.
     * @since 1.2.0
     */
    public getValue(): T {
        return this.value
    }

    /**
     * Sets a new value for this datum.
     * @param newValue The new value to set.
     * @returns The Datum instance for method chaining.
     * @since 2.0.0
     */
    public setValue(newValue: T): this {
        this.value = newValue
        return this
    }

    /**
     * Sets the metadata associated with this datum.
     * @param metadata The metadata to set.
     * @returns The Datum instance with the updated metadata.
     * @since 2.0.0
     */
    public setMetadata<CM extends M = M>(metadata: CM): Datum<T, CM> {
        this.metadata = metadata
        return this as unknown as Datum<T, CM>
    }

    public clone(cloneMetadata: boolean = true): Datum<T, M> {
        const metadata = this.getMetadata()
        return Datum.of(this.getDefaultValue())
            .setMetadata(cloneMetadata ? { ...metadata } : metadata)
            .setValue(this.value)
    }
}

/**
 * Represents metadata associated with a Datum instance.
 */
export type Metadata = Record<string, any>

/**
 * Represents a Datum instance with an unknown value type.
 */
export type UnknownDatum<M extends Metadata = Metadata> = Datum<unknown, M>
