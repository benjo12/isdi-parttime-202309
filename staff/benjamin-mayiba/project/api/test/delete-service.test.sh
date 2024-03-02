source pepetest.sh

TEST "delete-service"

CASE "success on correct data"

curl -X DELETE \
-H 'Authorization: Bearer 65df88309553a9a72adf53a1' \
-H 'Content-Type: application/json' \
-d '{"serviceId": "65e1cf30225b4ac43864a665"}' \
-v http://localhost:3000/services/del


