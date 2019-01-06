# WebDevTalk

This is a forum made for the Web Development "webdev" community.

It's a demonstration of modern technology, including: Serverless, NodeJs, GraphQL and React.

## Backend

A "Serverless" function backend.

### Start Offline (Development)

`sls offline start`

Listing tables:

`aws dynamodb --endpoint-url http://localhost:8000 list-tables`

Scan the table:

`aws dynamodb --endpoint-url http://localhost:8000 scan --table-name webdevtalk-dev-users`

## Frontend

A "React" frontend client.

### Start locally (Development)

`npm run start`
