source pepetest.sh

TEST "toggle-like-post"

CASE "success on correct data"

curl 'http://localhost:8000/posts/1h0mciutqx6o/likes' \
-H 'Authorization: Bearer 2g7e6f4id6m8' \
-X PATCH \
-v

