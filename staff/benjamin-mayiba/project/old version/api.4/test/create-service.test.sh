source pepetest.sh

TEST "create-service"

CASE "success on correct data"

curl 'http://localhost:3000/services' \
-H 'Authorization: Bearer 65cd2bc1b744ba93c2af2011' \
-H 'Content-Type: application/json' \
-d '{ "name": "gym", "description": "Hay que ponerse en forma" }' \
-v
