# How to start without .env

Please use following command:
## docker run  -p 3000:3000 -e BEARER_TOKEN="secret" redirekt

With -e BEARER_TOKEN="secret" you set the authentication token to "secret", which could also be anything you want to name your access key after
So you are able to connect when using your token

With a .env you would be able to preset an authentication token, but it is not necessary
