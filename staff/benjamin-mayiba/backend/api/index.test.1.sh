curl 'http://127.0.0.1:8000' -v

# > GET / HTTP/1.1
# > Host: 127.0.0.1:8000
# > User-Agent: curl/8.1.2
# > Accept: */*

# < HTTP/1.1 200 OK
# < Content-Type: application/json
# < Date: Tue, 12 Dec 2023 19:36:20 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5
# < Transfer-Encoding: chunked

# {"data":"Hello World!"}