source pepetest.sh

TEST "change-user-email"

CASE "success on correct email"

curl -X PATCH \
-H 'Authorization: Bearer 65dfa80449d98300510faaa7' \
-H 'Content-Type: application/json' \
-d '{ "newEmail": "bon@gamin.com", "newEmailConfirm": "bon@gamin.com", "password": "123123123" }' \
-v http://localhost:3000/users/change-email

