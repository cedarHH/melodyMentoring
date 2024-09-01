## It's MYGO!!!

### How to run
- Run server
```shell
cd backend && docker compose up -d --build
```
- Remove images
```shell
cd backend && docker compose down --rmi all
```

- Start each microservice separately; the web and mobile terminals are used for debugging.
- web
```shell
cd web && npm start
```
- mobile
```shell
cd mobile/App && npm start
```
- user microservice
```shell
cd backend/app/usercenter/api && go run usercenter.go
```
- media microservice
```shell
cd backend/app/media/api && go run media.go
```
- audio analysis microservice
```shell
cd backend/app/audioanalysis && source .venv/bin/activate && python3 consumer.py
```


