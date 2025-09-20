// This is a mock repository file acting as a DB for short URLs
import { ShortUrl} from "../../entities/short_url"
import { urlNotFoundError } from "../errors/short_url_errors"

const database = [
    new ShortUrl({
        shortUrl: 'someShortUrl',
        longUrl: 'https://www.amazon.co.uk/TypeScript-Crash-Course-Beginners-JavaScript/dp/B0DGV8LW7F/ref=sr_1_3_sspa?crid=342N2HTC9ZH44&dib=eyJ2IjoiMSJ9.40FeBXgqNs5jr3AINqmMhQdkyZA1wuxMWN1CUwQurHxKg229KL5jrjZxfWMx4eJPdoBDRpSd40BWhTBw0igzU0yUnEN5AuoZ-XzO95H0Hhtb3GT-5sd3NSwGcZ_mQoKlsPzZm-IidFDkVW9k3WtX7B2QhRD9welS',
        id: 'some-unique-id-1',
        created: new Date(),
        modified: new Date(),
    })
]

const shortUrlMapper = database.reduce((map, obj) => {
    map[obj.shortUrl] = obj
    return map
}, {} as Record<string, ShortUrl>)

export async function persistShortURLToDB(shortUrl: ShortUrl): Promise<ShortUrl> {
    shortUrlMapper[shortUrl.shortUrl] = shortUrl
    return shortUrl
}

export async function getShortURLFromDB(shortUrl: string): Promise<ShortUrl> {
    const storedShortUrl = shortUrlMapper[shortUrl]
    if (!storedShortUrl) {
        throw urlNotFoundError
    }
    return storedShortUrl
}
