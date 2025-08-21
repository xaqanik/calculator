# backend.tf

terraform {
  backend "gcs" {
    bucket  = "terraform191090" # <-- Replace with your bucket name
    prefix  = "terraform/state"
  }
}