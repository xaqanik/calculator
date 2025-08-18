# Configure the Google Cloud provider
provider "google" {
  project = var.gcp_project_id
  region  = "us-central1"
  zone    = "us-central1-c"
}

# Define a variable for the project ID
variable "gcp_project_id" {
  description = "The GCP project ID"
  type        = string
}

# Define a variable for the SSH public key
variable "ssh_public_key" {
  description = "The public SSH key for the VM instance"
  type        = string
}

# Create a firewall rule to allow HTTP traffic
resource "google_compute_firewall" "allow-http" {
  name    = "allow-http-firewall"
  network = "default"
  allow {
    protocol = "tcp"
    ports    = ["80", "22"] # Allow HTTP (80) and SSH (22)
  }
  source_ranges = ["0.0.0.0/0"] # Allow traffic from any IP
  target_tags   = ["web-server"]
}

# Create the virtual machine instance
resource "google_compute_instance" "app_instance" {
  name         = "app-server-instance"
  machine_type = "e2-micro"
  zone         = "us-central1-c"
  tags         = ["web-server"] # Apply the firewall rule tag

  # Use a standard Debian image
  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  # Define the network interface with a public IP
  network_interface {
    network = "default"
    access_config {
      // Ephemeral public IP
    }
  }

  # Add the public SSH key to the instance metadata for Ansible to connect
  metadata = {
    ssh-keys = "ansible:${var.ssh_public_key}"
  }
}

# Output the public IP address of the instance
output "instance_ip" {
  value = google_compute_instance.app_instance.network_interface[0].access_config[0].nat_ip
}