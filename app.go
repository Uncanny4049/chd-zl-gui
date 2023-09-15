package main

import (
	"context"
	"github.com/Uncanny4049/chd-zl-client/module/services"
	"log"
	"time"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	go func() {
		ticker := time.NewTicker(30 * time.Second)
		for {
			select {
			case <-ticker.C:
				services.Tran()
			}
		}
	}()
	a.ctx = ctx
}

func (a *App) GetAllRole() []string {
	return services.GetAllRole()
}

func (a *App) GetCopyByDate(role string, date string) []CopyRecord {
	if len(date) < 10 {
		return []CopyRecord{}
	}
	parsedTime, err := time.ParseInLocation("2006-01-02", date[0:10], time.Local)
	if err != nil {
		log.Println(err.Error())
		return []CopyRecord{}
	}
	log.Println(parsedTime)
	byDate := services.GetCopyByDate(role, parsedTime)
	crs := make([]CopyRecord, 0)
	for _, item := range byDate {
		crs = append(crs, CopyRecord{
			Id:         item.Idx,
			CopyRecord: item,
		})
	}
	return crs
}
