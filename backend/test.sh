baseUrl=http://localhost:3000
curl -G "$baseUrl/query" --data-urlencode 'query={signIn(firstName: "Jeremy")}'
