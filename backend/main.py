from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

posts = []
next_id = 1


class Post(BaseModel):
    title: str
    body: str


@app.get("/posts")
def get_posts():
    return posts


@app.post("/posts", status_code=status.HTTP_201_CREATED)
def create_post(post: Post):

    global next_id

    new_post = {
        "id": next_id,
        "title": post.title,
        "body": post.body
    }

    posts.append(new_post)

    next_id += 1

    return new_post


@app.delete("/posts/{post_id}")
def delete_post(post_id: int):

    for post in posts:

        if post["id"] == post_id:
            posts.remove(post)

            return {
                "message": "Post deleted"
            }

    raise HTTPException(
        status_code=404,
        detail="Post not found"
    )