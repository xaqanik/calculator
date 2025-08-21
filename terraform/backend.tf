# backend.tf

terraform {
  backend "gcs" {
    bucket  = var.gcs_bucket_name
    prefix  = "terraform/state"
  }
}