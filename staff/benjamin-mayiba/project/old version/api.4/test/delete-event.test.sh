source pepetest.sh

TEST "delete-event"

CASE "success on correct data"

curl -X DELETE \
-H 'Authorization: Bearer 65df88309553a9a72adf53a1' \
-H 'Content-Type: application/json' \
-d '{"eventId": "65e1e11467f40cca93676c95"}' \
-v http://localhost:3000/events/del


