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

```shell
    cd web && npm start
```

```shell
    cd backend/app/usercenter/api && go run usercenter.go
```

```shell
    cd backend/app/media/api && go run media.go
```

```shell
    cd backend/app/audioanalysis && source .venv/bin/activate && python3 consumer.py
```