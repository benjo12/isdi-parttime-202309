source pepetest.sh

TEST "comment-post"

CASE "success on correct data"

curl 'http://localhost:9000/posts/65aae36c6123f79fa530da02/comments' \
-H 'Authorization: Bearer "65aae190fb970849c7146d03"' \
-H 'Content-Type: application/json' \
-d '{ "comment": "comentando el post de popeye" }' \
-X POST \
-v

