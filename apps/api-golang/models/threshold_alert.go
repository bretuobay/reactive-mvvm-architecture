package models

import "gorm.io/gorm"

// ThresholdAlert represents an alert threshold for a sensor type in a greenhouse
type ThresholdAlert struct {
	gorm.Model
	GreenhouseID uint       `gorm:"not null;uniqueIndex:idx_greenhouse_sensor_type"`
	Greenhouse   Greenhouse `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	SensorType   SensorType `gorm:"type:varchar(50);not null;uniqueIndex:idx_greenhouse_sensor_type"`
	MinValue     float64    `gorm:"not null"`
	MaxValue     float64    `gorm:"not null"`
}
