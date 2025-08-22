# variables.tf

# Define a variable for the project ID
variable "gcp_project_id" {
  description = "The GCP project ID where resources will be created."
  type        = string
}

# Define a variable for the SSH public key
variable "ssh_public_key" {
  description = "The public SSH key for the 'ansible' user on the VM instance."
  type        = string
}

# Define a variable for the GCS bucket name used for the Terraform backend
variable "gcs_bucket_name" {
  description = "The GCS bucket name for storing Terraform state."
  type        = string
}
