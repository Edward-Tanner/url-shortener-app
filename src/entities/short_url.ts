
export type ShortUrlProps = 
  {
    shortUrl: string
    longUrl: string
    id: string
    created?: Date
    modified?: Date
    // etag?: string // Usually I add an etag for concurrency control
  }

export type ShortUrlResult = {
    short_url: string
    url: string
}

export class ShortUrl {
    readonly id
    readonly longUrl
    readonly shortUrl
    readonly created
    readonly modified

    constructor(props: ShortUrlProps) {
    ({
        ...props,
    })
    this.id = props.id
    this.longUrl = props.longUrl
    this.shortUrl = props.shortUrl
    this.created = props.created
    this.modified = props.modified
    }

    result(): ShortUrlResult  {
        return {
            url: this.longUrl,
            short_url: this.shortUrl,
        }
    }
}