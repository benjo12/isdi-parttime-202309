source pepetest.sh

TEST "retrieve-event"

CASE "success on correct user id"

curl -X GET 'http://localhost:3000/events' \
-H 'Authorization: Bearer 65d65acb74fec91ed48814de' \
-v
