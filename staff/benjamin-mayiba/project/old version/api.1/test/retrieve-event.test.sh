source pepetest.sh

TEST "retrieve-event"

CASE "success on correct user id"

curl 'http://localhost:3000/events?userId=65cd2bc1b744ba93c2af2011&serviceId=65d3a0e8eaee7024897bfbf9' \
-H 'Authorization: Bearer 65cd2bc1b744ba93c2af2011' \
-v
