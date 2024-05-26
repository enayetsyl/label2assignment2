## Instruction to run the file locally

### Clone the project in your pc

https://github.com/enayetsyl/label2assignment2.git

### Run following command in terminal

```javascript
npm install
```
### Create a .env file at the root and add following two thing

```javascript
DATABASE_URL=
PORT=5000
```

Put your mongodb database url.

### In the terminal run following command

```javascript
npm run start:dev
```

### Using you can test endpoints

- Create product route  https://label2assignment2.vercel.app/api/products/create-product

- Get all products route  https://label2assignment2.vercel.app/api/products/all-products

- Get single product route  https://label2assignment2.vercel.app/api/products/664eeb202ab2bbd46acc5fbe

- Update single product route. You can update individual field or all fields.  https://label2assignment2.vercel.app/api/products/664eeb202ab2bbd46acc5fbe

- Delete single product route. https://label2assignment2.vercel.app/api/products/664eeb202ab2bbd46acc5fbe

- Search product route  https://label2assignment2.vercel.app/api/products?searchTerm=iphone

- Create new order route https://label2assignment2.vercel.app/api/orders/new-order

- Get all order route.  https://label2assignment2.vercel.app/api/orders/all-orders

- Get order by email route.  https://label2assignment2.vercel.app/api/orders?email=level2@programming-hero.com

- Route not defined.  https://label2assignment2.vercel.app/api/orders/hkkhk


Replace the base url with your base url. 

### Sample data for testing

```javascript
// For creating new product

{
    "name": "iPhone 13",
    "description": "A sleek and powerful smartphone with cutting-edge features.",
    "price": 999,
    "category": "Electronics",
    "tags": ["smartphone", "Apple", "iOS"],
    "variants": [
        {
            "type": "Color",
            "value": "Midnight Blue"
        },
        {
            "type": "Storage Capacity",
            "value": "256GB"
        }
    ],
    "inventory": {
        "quantity": 50,
        "inStock": true
    }
}

// Order creation

{
    "email": "level2@programming-hero.com",
    "productId": "5fd67e890b60c903cd8544a3",
    "price": 999,
    "quantity": 1
}

```

## Live server link https://label2assignment2.vercel.app/

## Github repo link https://github.com/enayetsyl/label2assignment2

