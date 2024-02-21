source pepetest.sh

TEST "register-user"

CASE "success on new user"

curl 'http://localhost:3000/users' \
-H 'Content-Type: application/json' \
-d '{ "name": "Bo Niato", "email": "bo@niato.com", "password": "123123123" }' \
-v