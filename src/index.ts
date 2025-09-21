import express from 'express'
import { z } from 'zod'
import { getLongLink } from './short_url/get_long_link'
import { createShortLink } from './short_url/create_short_link'

const app = express()
const port = 3000
app.use(express.json())


const postShortUrlSchema = z.object({
  url: z.string().min(1),
})

// Endpoing to handle CREATE short URL
app.post('/short_url', async (req, res) => {
  const parseResult = postShortUrlSchema.safeParse(req.body)

  if (!parseResult.success) {
    // Validation failed
    return res.status(400).json({
      error: 'Validation error',
      issues: parseResult.error.issues,
    })
  }

  const url = parseResult.data.url
  const result = await createShortLink(url)

 return res.status(200).json(result)
})

// Endpoint to get the Long URL from the Short URL
app.get('/short_url/:short_url', async (req, res) => {
  const shortUrl = req.params.short_url
  
  const result = await getLongLink(shortUrl)
   return res.status(200).json(result)
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
