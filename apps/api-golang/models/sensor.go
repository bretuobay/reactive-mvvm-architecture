package models

import "gorm.io/gorm"

// SensorType defines the type of sensor
type SensorType string

const (
	Temperature    SensorType = "temperature"
	Humidity       SensorType = "humidity"
	SoilMoisture   SensorType = "soilMoisture"
	LightIntensity SensorType = "lightIntensity"
)

// SensorStatus defines the status of a sensor
type SensorStatus string

const (
	Active   SensorStatus = "active"
	Inactive SensorStatus = "inactive"
)

// Sensor represents a sensor in a greenhouse
type Sensor struct {
	gorm.Model
	Type         SensorType `gorm:"type:varchar(50);not null"`
	Status       SensorStatus `gorm:"type:varchar(50);not null"`
	GreenhouseID uint       `gorm:"not null"`
	Greenhouse   Greenhouse `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Readings     []SensorReading `gorm:"foreignKey:SensorID"`
}
