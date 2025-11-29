package handlers

import (
	"context"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"

	"github.com/manuelarmasme/go-react-fullstack-app/internal/database"
	"github.com/manuelarmasme/go-react-fullstack-app/internal/models"
)

type Todo = models.Todo

func getCollection() *mongo.Collection {
	return database.GetCollection("todos")
}

func GetTodos(c *fiber.Ctx) error {
	var todos []Todo
	collection := getCollection()

	cursor, err := collection.Find(context.Background(), bson.M{})

	if err != nil {
		return err
	}

	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var todo Todo
		if err := cursor.Decode(&todo); err != nil {
			return err
		}
		todos = append(todos, todo)
	}

	return c.JSON(todos)
}

func CreateTodo(c *fiber.Ctx) error {
	collection := getCollection()
	todo := new(Todo)

	if err := c.BodyParser(todo); err != nil {
		return err
	}

	if todo.Body == "" {
		return c.Status(400).JSON(fiber.Map{
			"error": "Body is required",
		})
	}

	insertResult, err := collection.InsertOne(context.Background(), todo)
	if err != nil {
		return err
	}

	todo.ID = insertResult.InsertedID.(bson.ObjectID)

	return c.Status(201).JSON(todo)
}

func UpdateTodo(c *fiber.Ctx) error {
	collection := getCollection()
	id := c.Params("id")

	objID, err := bson.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "Invalid ID",
		})
	}

	filter := bson.M{"_id": objID}
	update := bson.M{"$set": bson.M{"completed": true}}

	_, err = collection.UpdateOne(context.Background(), filter, update)

	if err != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map{
		"success": true,
	})
}

func DeleteTodo(c *fiber.Ctx) error {
	collection := getCollection()
	id := c.Params("id")

	objID, err := bson.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "Invalid ID",
		})
	}

	filter := bson.M{"_id": objID}

	_, err = collection.DeleteOne(context.Background(), filter)
	if err != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map{
		"success": true,
	})
}
