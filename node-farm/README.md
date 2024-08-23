# 🌽 Node Farm 🥦

Welcome to **Node Farm**! This is a Node.js project that creates a simple server to render dynamic HTML content based on data from a JSON file. The project includes routes for an overview page, individual product pages, and an API endpoint.

## 🚀 Getting Started

### 📋 Prerequisites

Before running this project, make sure you have **Node.js** installed on your system.

👉 **[Download Node.js here](https://nodejs.org/en/download)**

### 📂 Project Structure

- **templates/**: This directory contains the HTML templates used to render the pages.
  - `template-overview.html`
  - `template-cart.html`
  - `template-product.html`
- **dev-data/**: This directory contains the `data.json` file, which holds the product data used in the project.
- **index.js**: The main file that runs the server.

### 🌐 Routes

- **Overview Page**: `http://127.0.0.1:8000/overview` - Displays a list of products.
- **Product Page**: `http://127.0.0.1:8000/product?id={PRODUCT_ID}` - Displays detailed information about a specific product.
- **API**: `http://127.0.0.1:8000/api` - Provides the product data in JSON format.
- **404 Page**: For any other routes not defined, the server responds with a 404 error page.

### ⚙️ How to Run the Project

1. Clone this repository.
2. Open your terminal and navigate to the project folder.
3. Run the following command to start the server:


   ```bash
   node index.js
   ```
