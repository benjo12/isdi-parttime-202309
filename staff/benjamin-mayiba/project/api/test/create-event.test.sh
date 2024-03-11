source pepetest.sh

TEST "create-event"

CASE "success on correct data"

curl 'http://localhost:3000/events' \
-H 'Authorization: Bearer 65df84fab4327e0d70c56111' \
-H 'Content-Type: application/json' \
-d '{ "serviceId": "65e743353a3a90cbf8d3b8b9", "date": "2024-02-02", "time": "14:30" }' \
-v
