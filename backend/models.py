from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    prices = relationship("Price", back_populates="product")

    def __repr__(self):
        return f'<Product {self.name}>'

class Price(Base):
    __tablename__ = 'prices'

    id = Column(Integer, primary_key=True)
    value = Column(Float, nullable=False)
    timestamp = Column(DateTime, nullable=False)
    product_id = Column(Integer, ForeignKey('products.id'))
    product = relationship("Product", back_populates="prices")

    def __repr__(self):
        return f'<Price {self.value} {self.timestamp}>'

