from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
from datetime import datetime, timedelta
import random

Base = declarative_base()

class Product(Base):
    __tablename__ = 'products'
    id = Column(Integer, primary_key=True)
    name = Column(String)

    # Define one-to-many relationship with Price
    prices = relationship("Price", back_populates="product")

class Price(Base):
    __tablename__ = 'prices'
    id = Column(Integer, primary_key=True)
    value = Column(Float)
    timestamp = Column(DateTime, default=datetime.now)

    # Define foreign key relationship with Product
    product_id = Column(Integer, ForeignKey('products.id'))
    product = relationship("Product", back_populates="prices")

# Create database engine and session
engine = create_engine('sqlite:///products.db')
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
session = Session()

# Generate dummy product data
product_names = ["Product A", "Product B", "Product C"]
for name in product_names:
    product = Product(name=name)
    session.add(product)
session.commit()

# Generate dummy price data
for product in session.query(Product).all():
    for _ in range(10):  # Generate 10 random prices for each product
        price = Price(value=random.uniform(5.0, 50.0), timestamp=datetime.now() - timedelta(days=random.randint(1, 365)))
        product.prices.append(price)
session.commit()

# Retrieve and print product data with prices
for product in session.query(Product).all():
    print("Product:", product.name)
    print("Prices:")
    for price in product.prices:
        print("Value:", price.value, "Timestamp:", price.timestamp)

# Close session
session.close()

