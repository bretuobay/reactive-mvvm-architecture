package models

import (
	"gorm.io/gorm"
	"time"
)

// SensorReading represents a reading from a sensor
type SensorReading struct {
	gorm.Model
	SensorID  uint      `gorm:"not null"`
	Sensor    Sensor    `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Timestamp time.Time `gorm:"not null"`
	Value     float64   `gorm:"not null"`
}
