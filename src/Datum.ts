/**
 * @template T The type of the value.
 * @template M The type of the metadata.
 */
export class Datum<T = any, M extends Metadata = Metadata> {
    /**
     * Creates a datum. This is the recommended method to create a datum instance.
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
     * Creates a new datum. Every datum must have a default value. Even though the type of datum can
     * include undefined, it is always a good practice to let a datum consist with a meaningful type.
     * @param defaultValue The default value for this datum.
     * @param metadata The metadata for this datum.
     * @since 2.0.0 Changed the accessibility from public to protected.
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
     * @since 2.3.0 Renamed from getMeta to meta.
     */
    public meta<K extends keyof M>(name: K): M[K];
    /**
     * Sets the value of a specific piece of metadata associated with this datum.
     * @param name The name of the metadata to get.
     * @param value The value to set.
     * @since 2.3.0 Renamed from setMeta to meta. It no longer returns this.
     */
    public meta<K extends keyof M>(name: K, value: M[K]): void;
    public meta<K extends keyof M>(name: K, value?: M[K]): M[K] | void {
        if (value == undefined) {
            return this.metadata[name]
        } else {
            this.metadata[name] = value
        }
    }

    /**
     * Returns the metadata object.
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

    /**
     * Clones this datum and returns a shallow copied object.
     * @param cloneMetadata Whether to clone (shallow copy) the metadata.
     * @since 2.2.0
     */
    public clone(cloneMetadata: boolean = true): Datum<T, M> {
        const metadata = this.getMetadata()
        return Datum.of(this.getDefaultValue())
            .setMetadata(cloneMetadata ? { ...metadata } : metadata)
            .setValue(this.value)
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
