source pepetest.sh

TEST "change-user-password"

CASE "success on correct password"

curl -X PATCH \
-H 'Authorization: Bearer 65dfa80449d98300510faaa7' \
-H 'Content-Type: application/json' \
-d '{ "password": "234234234", "newPassword": "123123123", "newPasswordConfirm": "123123123" }' \
-v http://localhost:3000/users/change-password

