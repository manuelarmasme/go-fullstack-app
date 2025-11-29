package models

import (
	"go.mongodb.org/mongo-driver/v2/bson"
)

type Todo struct {
	ID        bson.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Body      string        `json:"body"`
	Completed bool          `json:"completed"`
}
