#!/usr/bin/env python3

# Standard library imports
import random

# Remote library imports
from faker import Faker

# Local imports
from app import app, db
from models import User, Article, Category

fake = Faker()

def seed_database():
    # Create some categories
    business_category = Category(name='Business')
    sports_category = Category(name='Sports')
    db.session.add_all([business_category, sports_category])
    db.session.commit()

    # Create some users
    for i in range(5):
        username = fake.user_name()
        email = fake.email()
        password = fake.password()
        user = User(username=username, email=email, password=password)
        db.session.add(user)
        db.session.commit()

        # Create some articles
        for j in range(3):
            title = fake.sentence()
            content = fake.paragraph(nb_sentences=10)
            category = random.choice([business_category, sports_category])
            article = Article(title=title, content=content, category=category)
            article.users.append(user)
            db.session.add(article)
            db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")
        seed_database()
        print("Finished seeding database.")
