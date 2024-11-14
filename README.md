## Base URL

```
http://localhost:3000
```

## Endpoint

### `GET /ecommerce/products`

Retrieve a list of products from a specified e-commerce website based on a search query.

#### Example Request

```http
GET http://localhost:3000/ecommerce/products?query=cloth&website=walmart
```

#### Query Parameters

| Parameter | Type   | Required | Description                                      |
|-----------|--------|----------|--------------------------------------------------|
| `query`   | string | Yes      | The search term to use for retrieving products.  |
| `website` | string | Yes      | The target e-commerce website (e.g., `walmart` or `amazon`). |

#### Example Request in cURL

```bash
curl -X GET "http://localhost:3000/ecommerce/products?query=cloth&website=walmart"
```

#### Success Response

- **Status Code**: `200 OK`
- **Content**: 
  - JSON array of product details
```json
[
  {
    "title": "Men's Classic Cloth Jacket",
    "price": "current price $29.99",
    "url": "https://www.walmart.com/product/12345678",
    "imageUrl": "https://www.walmartimages.com/images/product.jpg"
  },
  {
    "title": "Women's Summer Cloth Dress",
    "price": "current price $19.99",
    "url": "https://www.walmart.com/product/87654321",
    "imageUrl": "https://www.walmartimages.com/images/product2.jpg"
  }
]
```

#### Sample Response Fields For Walmart

| Field      | Type   | Description                                        |
|------------|--------|----------------------------------------------------|
| `title`    | string | The title of the product.                          |
| `price`    | string | The price of the product (formatted as a string).  |
| `url`      | string | The URL to the product on the e-commerce website.  |
| `imageUrl` | string | A direct link to the product image.                |

Amazon
#### Sample Response Fields For Amazon


#### Error Responses

| Status Code | Description                             |
|-------------|-----------------------------------------|
| `400`       | Invalid query parameters.               |
| `404`       | No Record returned.                     |
| `500`       | Internal server error.                  |

#### Example Error Response

```json
{
  "error": "Invalid query parameters. Please include both 'query' and 'website'."
}
```

## Usage

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/ecommerce-product-scraper-api.git
   cd ecommerce-product-scraper-api
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Server**:
   ```bash
   npm start
   ```

The server will run on `localhost:3000` by default.

## Contributing

We welcome contributions! Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Thank you for using the E-commerce Product Scraper API!