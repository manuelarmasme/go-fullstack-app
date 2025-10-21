package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/joho/godotenv"
)

type Todo struct {
	ID        string `json:"id"`
	Body      string `json:"body"`
	Completed bool   `json:"completed"`
}

func main() {
	fmt.Println("Hello, World!")

	app := fiber.New()

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	PORT := os.Getenv("PORT")

	todos := []Todo{}

	app.Get("/api/todos", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(todos)
	})

	// create todo
	app.Post("/api/todos", func(c *fiber.Ctx) error {
		// &Todo{} = pointer to Todo
		todo := &Todo{}

		if err := c.BodyParser(todo); err != nil {
			return err
		}

		if todo.Body == "" {
			return c.Status(400).JSON(fiber.Map{
				"message": "Body is required",
			})
		}

		todo.ID = uuid.New().String()
		// *var = save value of todo
		// var = memory address of todo
		todos = append(todos, *todo)

		return c.Status(200).JSON(todo)
	})

	// update todo completed
	app.Patch("/api/todos/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")

		for i, todo := range todos {
			if todo.ID == id {
				todos[i].Completed = !todos[i].Completed
				return c.Status(200).JSON(todos[i])
			}
		}

		return c.Status(404).JSON(fiber.Map{
			"message": "Todo not found",
		})
	})

	// delete todo
	app.Delete("/api/todos/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")

		for i, todo := range todos {
			if todo.ID == id {
				// todo list 1 2 3 4 5
				// delete todo 3
				// 1 2 4 5
				todos = append(todos[:i], todos[i+1:]...)
				return c.Status(200).JSON(fiber.Map{
					"message": "Todo deleted",
				})
			}
		}

		return c.Status(404).JSON(fiber.Map{
			"message": "Todo not found",
		})
	})

	log.Fatal(app.Listen(":" + PORT))
}
