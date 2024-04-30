from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from models import Product, Price

from sqlalchemy import create_engine, ForeignKey, Column, String, Integer, CHAR
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

engine = create_engine("sqlite:///products.db", echo=True)

Session = sessionmaker(bind=engine)

session = Session()


app = Flask(__name__)



@app.route('/api/products', methods=['GET'])
def get_products():
    # Retrieve all products from the database
    products = session.query(Product).all()

    # Convert products to a list of dictionaries
    products_list = [{'id': product.id, 'name': product.name, 'price': product.price, 'timestamp': product.timestamp} for product in products]

    # Return JSON response
    return jsonify(products_list)

@app.route('/api/search', methods=['GET'])
def search_products():
    # Get search query from request parameters
    query = request.args.get('q')

    # Search products in the database based on the query
    products = session.query(Product).filter(Product.name.ilike(f'%{query}%')).all()

    # Convert products to a list of dictionaries
    products_list = []

    for product in products:
        prices = [{'value': price.value, 'timestamp': price.timestamp} for price in product.prices]
        product_data = {'id': product.id, 'name': product.name, 'prices': prices}
        products_list.append(product_data)
    # Return JSON response
    return jsonify(products_list)

if __name__ == '__main__':
    app.run(debug=True)

