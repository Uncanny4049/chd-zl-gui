package main

import (
	"changeme/backend"
	"embed"
	"github.com/Uncanny4049/chd-zl-client/database/zlnew"
	"github.com/Uncanny4049/chd-zl-client/database/zlold"
	"github.com/Uncanny4049/chd-zl-client/module/services"
	"github.com/Uncanny4049/chd-zl-client/module/types"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	config := types.ReadConfig()
	zlold.Init(config)
	zlnew.Init(config)
	services.Tran()
	// Create an instance of the app structure
	app := backend.NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "chd-zl-gui",
		Width:  1280,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.Startup,
		Bind: []interface{}{
			app,
		},
		Debug: options.Debug{
			OpenInspectorOnStartup: true,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
