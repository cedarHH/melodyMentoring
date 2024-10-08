package main

import (
	"flag"
	"fmt"
	common "github.com/cedarHH/mygo/common/middleware"

	"github.com/cedarHH/mygo/app/media/api/internal/config"
	"github.com/cedarHH/mygo/app/media/api/internal/handler"
	"github.com/cedarHH/mygo/app/media/api/internal/svc"

	"github.com/zeromicro/go-zero/core/conf"
	"github.com/zeromicro/go-zero/rest"
)

var configFile = flag.String("f", "etc/media.yaml", "the config file")

func main() {
	flag.Parse()

	var c config.Config
	conf.MustLoad(*configFile, &c)

	server := rest.MustNewServer(c.RestConf, common.WithCustomCORS())
	defer server.Stop()

	ctx := svc.NewServiceContext(c)
	handler.RegisterHandlers(server, ctx)

	fmt.Printf("Starting server at %s:%d...\n", c.Host, c.Port)
	server.Start()
}
