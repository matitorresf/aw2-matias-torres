import json
import random
from faker import Faker

fake = Faker("es_AR")

# Generate fake students
def generate_users(num_users):
    users = []
    for i in range(1, num_users + 1):
        user = {
            "user_id": i,
            "user_name": fake.first_name(),
            "user_last_name": fake.last_name(),
            "user_password": fake.password()
        }
        user["user_email"] = f"{user["user_name"].replace(" ", "")}{random.choice(["_","-",""])}{user["user_last_name"].replace(" ", "")}@{random.choice(["gmail.com", "outlook.com.ar", "yahoo.com", "hotmail.com"])}"
        users.append(user)
    return users

# Generate fake teachers
def generate_products(num_products):
    products = []
    for i in range(1, num_products + 1):
        product = {
            "product_id": i,
            "product_name": fake.job(),
            "product_description": fake.text(max_nb_chars=50),
            "product_price": random.randint(2500, 30000),
        }

        product["product_image"] = fake.image_url(width=300, height=400, placeholder_url=f"https://placehold.co/{{width}}x{{height}}?text={product['product_name'].replace(" ", "\n")}")
        products.append(product)
    return products

# Generate fake classes
def generate_sells(num_sells, users, products):
    sells = []
    for i in range(1, num_sells + 1):
        sells_products = random.sample(products, k=random.randint(2, 10))
        sells_products_ids = [product["product_id"] for product in sells_products]

        sell = {
            "sell_id": i,
            "user_id": random.choice(users)['user_id'],
            "sell_date": fake.date_this_year().isoformat(),
            "sell_total": sum([product["product_price"] for product in sells_products]),
            "sell_address": fake.address(),
            "sell_products": sells_products_ids
        }

        sells.append(sell)
    return sells

# Generate the data
users = generate_users(10)
products = generate_products(35)
sells = generate_sells(20, users, products)

# Save data to JSON files
with open('users.json', 'w', encoding='utf-8') as f:
    json.dump(users, f, ensure_ascii=False, indent=4)

with open('products.json', 'w', encoding='utf-8') as f:
    json.dump(products, f, ensure_ascii=False, indent=4)

with open('sells.json', 'w', encoding='utf-8') as f:
    json.dump(sells, f, ensure_ascii=False, indent=4)

print("Fake data generated successfully!")
