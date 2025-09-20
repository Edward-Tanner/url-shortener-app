# URL Shortener App
## Setup

```bash
npm install
npx ts-node src/index.ts
```
Then in Postman you can make these requests

To get the Long URL from the short url

GET: http://localhost:3000/short_url/:id

Path Variable   
````
Key   |     Value
id    |     someShortUrl
````


To Store a Long URL and get a Short one back

POST: http://localhost:3000/short_url
````
Body: {
    "url": "someShortUrl"
}
````
