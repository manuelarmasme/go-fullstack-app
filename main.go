package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"github.com/manuelarmasme/go-react-fullstack-app/internal/database"
	"github.com/manuelarmasme/go-react-fullstack-app/internal/routes"
)

func main() {
	if os.Getenv("ENV") != "production" {
		err := godotenv.Load(".env")

		if err != nil {
			log.Fatal("Error loading .env file")
		}
	}

	database.ConnectDB()

	app := fiber.New()

	app.Use(
		cors.New(cors.Config{
			AllowOrigins: os.Getenv("CLIENT_URL"),
			AllowHeaders: "Origin, Content-Type, Accept",
		}),
	)

	routes.SetupRoutes(app)

	port := os.Getenv("PORT")
	if port == "" {
		port = "4000"
	}

	log.Fatal(app.Listen("0.0.0.0:" + port))
}
