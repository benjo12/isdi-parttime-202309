source pepetest.sh

TEST "create-event"

CASE "success on correct data"

curl 'http://localhost:3000/events' \
-H 'Authorization: Bearer 65cd25d856588d95e5a811d2' \
-H 'Content-Type: application/json' \
-d '{ "serviceId": "65d4fa34ad33d2a683c7b8ad", "date": "2024-02-20", "time": "14:30" }' \
-v
