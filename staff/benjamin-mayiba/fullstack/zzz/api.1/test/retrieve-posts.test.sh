source pepetest.sh

TEST "retrieve-posts"

CASE "success on correct user id"

curl 'http://localhost:8000/posts' \
-H 'Authorization: Bearer 4945v51dd8i0' \
-v

# > GET /posts HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.1.2
# > Accept: */*
# > Authorization: Bearer 4945v51dd8i0

# < HTTP/1.1 200 OK
# < X-Powered-By: Express
# < Access-Control-Allow-Origin: *
# < Access-Control-Allow-Headers: *
# < Access-Control-Allow-Methods: *
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 1470
# < ETag: W/"5be-s4nuchmnnqjGV/LgzE8ILcQs8fU"
# < Date: Tue, 19 Dec 2023 19:28:28 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

# [{"id":"7e5klaogm6o0","author":{"id":"6ttz1tptn2c0","name":"Le Chuga"},"image":"https://media.istockphoto.com/id/181072765/es/foto/lechuga-aislado.jpg?s=612x612&w=0&k=20&c=7spdLdTK_iyTUdpdp6cjdHkDE9dCkahoTtnOvQYY8mE=","text":"what a fresh day","likes":[],"liked":false,"fav":false},{"id":"6hxu3k6tyl00","author":{"id":"4945v51dd8i0","name":"Man Zana"},"image":"https://cdn2.vectorstock.com/i/1000x1000/81/46/hello-world-code-vector-22928146.jpg","text":"Hello, World!","likes":[],"liked":false,"fav":false},{"id":"2aol4l80yiy","author":{"id":"2eqjhn1o45no","name":"Po Peye"},"image":"http://image.com/123","text":"Hola, Popeye!","likes":[],"liked":false,"fav":false},{"id":"7dlqabiv2000","author":{"id":"2eqjhn1o45no","name":"Po Peye"},"image":"http://image.com/123","text":"Hola, Popeye!","likes":[],"liked":false,"fav":false},{"id":"48224osmahc0","author":{"id":"2eqjhn1o45no","name":"Po Peye"},"image":"http://image.com/123","text":"Hola, Popeye!","likes":[],"liked":false,"fav":false},{"id":"97phir9s03c","author":{"id":"2eqjhn1o45no","name":"Po Peye"},"image":"http://image.com/123","text":"Hola, Popeye!","likes":[],"liked":false,"fav":false},{"id":"5ac7angatas0","author":{"id":"2eqjhn1o45no","name":"Po Peye"},"image":"http://image.com/123","text":"Hola, Popeye!","likes":[],"liked":false,"fav":false},{"id":"rkt7zv7tgzk","author":{"id":"2eqjhn1o45no","name":"Po Peye"},"image":"http://image.com/123","text":"Hola, Popeye!","likes":[],"liked":false,"fav":false}]


CASE "fails on non-existing user id"

curl 'http://localhost:8000/posts' \
-H 'Authorization: Bearer 5945v51dd8i0' \
-v

# > GET /posts HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.1.2
# > Accept: */*
# > Authorization: Bearer 5945v51dd8i0

# < HTTP/1.1 400 Bad Request
# < X-Powered-By: Express
# < Access-Control-Allow-Origin: *
# < Access-Control-Allow-Headers: *
# < Access-Control-Allow-Methods: *
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 44
# < ETag: W/"2c-DA3KcjMxbAqH25TOBQigpuC1Bjs"
# < Date: Tue, 19 Dec 2023 19:28:28 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

# {"error":"Error","message":"user not found"}  