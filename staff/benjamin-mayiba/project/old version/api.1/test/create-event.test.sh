source pepetest.sh

TEST "create-event"

CASE "success on correct data"

curl 'http://localhost:3000/events' \
-H 'Authorization: Bearer 65cd2bc1b744ba93c2af2011' \
-H 'Content-Type: application/json' \
-d '{ "serviceId": "65d3a0e8eaee7024897bfbf9","date": "2024-02-20", "time": "14:30" }' \
-v
