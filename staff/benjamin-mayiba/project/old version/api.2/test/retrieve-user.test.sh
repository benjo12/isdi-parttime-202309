source pepetest.sh

TEST "retrieve-user"

CASE "success on correct user id"

curl 'http://localhost:3000/users' \
-H 'Authorization: Bearer 65cd25d856588d95e5a811d2' \
-v