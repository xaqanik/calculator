# Configure the Google Cloud provider
provider "google" {
  project = var.gcp_project_id
  region  = "us-central1"
}

# Create a firewall rule to allow HTTP and SSH traffic
resource "google_compute_firewall" "allow-http-ssh" {
  name    = "allow-http-ssh-firewall"
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

  # This label is what Ansible's dynamic inventory will use to find this VM.
  labels = {
    ansible-group = "web-server"
  }

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
      // Ephemeral public IP is assigned by default
    }
  }

  # Add the public SSH key to the instance metadata for Ansible to connect
  # The key format should be "username:key_value"
  metadata = {
    ssh-keys = "ansible:${var.ssh_public_key}"
  }
}