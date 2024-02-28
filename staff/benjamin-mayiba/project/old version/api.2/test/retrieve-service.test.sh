source pepetest.sh

TEST "retrieve-service"

CASE "success on correct user id"

curl 'http://localhost:3000/services' \
-H 'Authorization: Bearer 65cd25d856588d95e5a811d2' \
-v