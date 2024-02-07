source pepetest.sh

TEST "retrieve-posts"

CASE "success on correct user id"

curl 'http://localhost:9000/posts' \
-H 'Authorization: Bearer 65898c9a9a021cf5ab44f35a' \
-v