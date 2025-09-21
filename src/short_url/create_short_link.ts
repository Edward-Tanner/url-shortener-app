import { ShortUrl } from "../entities/short_url"
import { urlNotFoundError } from "../repositories/errors/short_url_errors"
import { getShortURLFromDB, persistShortURLToDB } from "../repositories/short_url/dynamodb"

export async function createShortLink(longUrl: string): Promise<{url: string}> {
    const shortUrl = await generateShortUrl()
    const newShortUrl = new ShortUrl({
        shortUrl,
        longUrl,
        id: crypto.randomUUID(),
        created: new Date(),
        modified: new Date(),
    })

    await persistShortURLToDB(newShortUrl)
    return { url: newShortUrl.shortUrl }
}

const generateShortUrl = async (): Promise<string> => {
    const url = crypto.randomUUID()
    // If the URL already exists then generate a new one
    try {
        await getShortURLFromDB(url)
    } catch (err) {
        if (err instanceof Error && err.message === urlNotFoundError.message) {
            return url
        }
        throw err
    }

    return generateShortUrl()
}
