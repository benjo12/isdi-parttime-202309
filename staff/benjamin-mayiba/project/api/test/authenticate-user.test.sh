source pepetest.sh

TEST "authenticate-user"

CASE "success on correct credentials"

curl 'http://localhost:3000/users/auth' \
-H 'Content-Type: application/json' \
-d '{ "email": "ben@jamin.com", "password": "123123123" }' \
-v