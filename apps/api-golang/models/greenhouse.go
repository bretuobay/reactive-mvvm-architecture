package models

import "gorm.io/gorm"

// Greenhouse represents a greenhouse
type Greenhouse struct {
	gorm.Model
	Name      string `gorm:"not null"`
	Location  string `gorm:"not null"`
	Size      string `gorm:"not null"`
	CropType  string
	Sensors   []Sensor       `gorm:"foreignKey:GreenhouseID"`
	Alerts    []ThresholdAlert `gorm:"foreignKey:GreenhouseID"`
}
