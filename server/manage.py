from flask.cli import FlaskGroup
from app import create_app, db
from app.models import User, Article, Category, UserArticle

app = create_app()
cli = FlaskGroup(app)


@cli.command("create_db")
def create_db():
    db.create_all()
    print("Database created")


@cli.command("drop_db")
def drop_db():
    db.drop_all()
    print("Database dropped")


if __name__ == "__main__":
    cli()
