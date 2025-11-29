package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/manuelarmasme/go-react-fullstack-app/internal/handlers"
)

func SetupRoutes(app *fiber.App) {

	api := app.Group("/api/v1")

	api.Get("/todos", handlers.GetTodos)
	api.Post("/todos", handlers.CreateTodo)
	api.Patch("/todos/:id", handlers.UpdateTodo)
	api.Delete("/todos/:id", handlers.DeleteTodo)

}
