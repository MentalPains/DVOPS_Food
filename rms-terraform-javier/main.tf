terraform {
    required_providers {
        azurerm = {
            source = "hashicorp/azurerm"
        }
    }
}

provider "azurerm" {
    features {}
}

resource "azurerm_resource_group" "dvopsResourceGroup" {
    name = "dvopsResourceGroup"
    location = "East US"
}

resource "azurerm_kubernetes_cluster" "dvopsAKSCluster" {
    name = "dvopsAKSCluster"
    location = azurerm_resource_group.dvopsResourceGroup.location
    resource_group_name = azurerm_resource_group.dvopsResourceGroup.name
    dns_prefix = "rms-aks"

    default_node_pool {
        name = "default"
        node_count = 1
        vm_size = "Standard_DS2_v2"
    }
    
    service_principal {
        client_id = "e4913ed1-c730-45cb-8ca9-f88251828448" 
        client_secret = "bpN8Q~BBcNWp1DogdUEy7NmwRkSJZ4YX_.Ryqc4S"
    }
}