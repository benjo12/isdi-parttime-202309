source pepetest.sh

TEST "toggle-fav-post"

CASE "success on correct data"

curl 'http://localhost:9000/posts/659c625c933826c791d3265e/favs' \
-H 'Authorization: Bearer '65898c9a9a021cf5ab44f35a' \
-X PATCH \
-v

CASE "fails on wrong post id"
curl 'http://localhost:8000/posts/859c4a0d735c5e851dad76cd/favs' \
-H 'Authorization: Bearer '65898c9a9a021cf5ab44f35a' \
-X PATCH \
-v