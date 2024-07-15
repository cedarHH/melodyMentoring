package main

import (
	"flag"
	"fmt"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/config"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/handler"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/svc"
	common "github.com/cedarHH/mygo/common/middleware"
	"github.com/joho/godotenv"
	"github.com/zeromicro/go-zero/core/conf"
	"github.com/zeromicro/go-zero/rest"
	"log"
)

var configFile = flag.String("f", "etc/usercenter.yaml", "the config file")

func main() {
	flag.Parse()

	err := godotenv.Load("../../../.env")
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	var c config.Config
	conf.MustLoad(*configFile, &c)

	server := rest.MustNewServer(c.RestConf, common.WithCustomCORS())
	defer server.Stop()

	ctx := svc.NewServiceContext(c)
	handler.RegisterHandlers(server, ctx)

	fmt.Printf("Starting server at %s:%d...\n", c.Host, c.Port)
	server.Start()
}
