package database

import (
	"context"
	"fmt"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

var DB *mongo.Database

func ConnectDB() {
	MONGODB_URI := os.Getenv("MONGODB_URI")

	if MONGODB_URI == "" {
		log.Fatal("MONGODB_URI is not set")
	}

	serverAPI := options.ServerAPI(options.ServerAPIVersion1)

	clientOptions := options.Client().ApplyURI(MONGODB_URI).SetServerAPIOptions(serverAPI)

	client, err := mongo.Connect(clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	// defer client.Disconnect(context.Background())

	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")

	DB = client.Database("golang_db")

}

func GetCollection(name string) *mongo.Collection {
	return DB.Collection(name)
}
