# API

## Register user

```sh
$ curl 'http://localhost:8000/register' \
-H 'Content-Type: application/json' \
-d '{ "name": "Man Zana", "email": "man@zana.com", "password": "123123123" }' \
-v

> POST /register HTTP/1.1
> Host: localhost:8000
> User-Agent: curl/8.1.2
> Accept: */*
> Content-Type: application/json
> Content-Length: 72

< HTTP/1.1 201 Created
< X-Powered-By: Express
< Date: Tue, 12 Dec 2023 20:30:46 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< Content-Length: 0
```