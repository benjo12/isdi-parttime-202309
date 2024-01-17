source pepetest.sh

TEST "change-user-email"

CASE "success on new user"

curl 'http://localhost:9000/users/change-email' \
-H 'Content-Type: application/json' \
-d '{ "email": "bon@gamin.com", "newEmail": "char@les.com", "newEmailConfirm": "char@les.com", "password": "234234234" }' \
-v