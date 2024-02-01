source pepetest.sh

TEST "create-post"

CASE "success on correct data"

curl 'http://localhost:9000/posts' \
-H 'Authorization: Bearer 730thx7n4n4' \
-H 'Content-Type: application/json' \
-d '{ "image": "https://cdn2.vectorstock.com/i/1000x1000/81/46/hello-world-code-vector-22928146.jpg", "text": "Hello, World!" }' \
-v

