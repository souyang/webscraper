
# Product Scraper with Puppeteer

Welcome to the **Product Scraper with Puppeteer** repository! 🚀 This project is a streamlined solution for extracting product details, images, prices, and more from e-commerce sites using [Puppeteer](https://github.com/puppeteer/puppeteer).

## Table of Contents

- [Product Scraper with Puppeteer](#product-scraper-with-puppeteer)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Examples](#examples)
    - [Basic Example](#basic-example)
    - [Selective Scraping](#selective-scraping)
  - [Project Structure](#project-structure)
  - [Contributing](#contributing)
  - [License](#license)

## Overview

This project is designed to help developers scrape specific product information, such as **URLs**, **titles**, **prices**, and **images** directly from online stores. Built with Puppeteer, it’s efficient, headless (or headful, if needed), and robust against anti-scraping measures.

## Features

- 🏷️ **Extract Product Details**: Scrapes product titles, URLs, and prices from specified pages.
- 🖼️ **Image Extraction**: Retrieves high-quality product images for visual references.
- ⏲️ **Headless Mode**: Runs in headless mode by default, with an option for debugging.
- 📈 **Highly Configurable**: Easily customize selectors and parameters for different sites.
- 🛠️ **Error Handling**: Handles missing elements gracefully with fallback values.

## Prerequisites

- **Node.js** v12+ and **pnpm** installed on your machine.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/product-scraper-puppeteer.git
   cd product-scraper-puppeteer
   ```

2. **Install Dependencies**:
   ```bash
   pnpm install
   ```

3. **Configure Environment**:
   - Add a `.env` file in the project root
   ```config
   SBR_WS_ENDPOINT=wss://brd-customer-hl_41f4f3fc-zone-scraping_browser1:7511gld2k3ek@brd.superproxy.io:9222
   ```

## Usage

1. **Run the Scraper**:
   - By default, the scraper runs in headless mode:
     ```bash
     pnpm start:dev
     ```

2. **Customize Selectors**:
   - Modify selectors in the `extractProductDetails` function in `scraper.js` to adapt to different e-commerce sites or element changes.

## Examples

### Basic Example
To scrape product details such as URLs, titles, prices, and images, you can use:

```javascript
const products = await scraper.extractProductDetails(page);
console.log(products);
```

Expected output format:
```json
[
  {
    "url": "https://www.example.com/product/123",
    "title": "Product Title",
    "price": "$19.99",
    "imageUrl": "https://www.example.com/images/product.jpg"
  }
]
```

### Selective Scraping
You can customize `getSearchButtonSelector` and `extractProductDetails` in `scraper.js` for tailored data extraction.

## Project Structure

```
product-scraper-puppeteer/
├── src/
│   ├── index.js              # Main script to run the scraper
│   ├── scraper.js            # Core scraping functions
│   └── utils.js              # Utility functions (e.g., for error handling)
├── .env                      # Environment variables
├── package.json
└── README.md                 # Project documentation
```

## Contributing

We welcome contributions! Feel free to submit issues, fork the repository, and make pull requests. See our [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Thank you for checking out this project! 🌟 Don't forget to leave a star if you found this helpful!