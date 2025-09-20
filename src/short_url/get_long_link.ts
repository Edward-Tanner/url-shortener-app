import { ShortUrlResult } from "../entities/short_url"
import { getShortURLFromDB } from "../repositories/short_url/dynamodb"

export async function getLongLink(url: string): Promise<ShortUrlResult> {
   const storedShortUrl = await getShortURLFromDB(url)
   return storedShortUrl.result()
}
