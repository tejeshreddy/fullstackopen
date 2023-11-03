const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const api = supertest(app);
const helper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialBlogs[0]);

  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
});

describe("check initial notes", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all notes are returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("check if blogs contain id as their unique identifier", async () => {
    const response = await api.get("/api/blogs");
    expect(response.status).toBe(200);

    for (const blog of response.body) {
      expect(blog.id).toBeDefined();
    }
  });
});

describe("POST operation validation", () => {
  test("a valid note can be added", async () => {
    const blogObject = {
      title: "a valid note can be added",
      author: "test-author",
      url: "blog/test-author-1",
      likes: "100",
    };

    await api
      .post("/api/blogs")
      .send(blogObject)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsInEnd = await helper.notesInDb();
    const titles = blogsInEnd.map((r) => r.title);

    expect(blogsInEnd).toHaveLength(helper.initialBlogs.length + 1);
    expect(titles).toContain("a valid note can be added");
  });

  test("check if likes is present if not passed in body", async () => {
    const blogObject = {
      title: "a valid note can be added",
      author: "test-author",
      url: "blog/test-author-1",
    };

    await api
      .post("/api/blogs")
      .send(blogObject)
      .expect(201)
      .expect("Content-Type", /application\/json/)
      .then((response) => {
        expect(response.body.hasOwnProperty("likes")).toBe(true);
        expect(response.body.likes).toBe(0);
      });
  });

  test("blog should return 400 on no url or title", async () => {
    let blogObject = {
      title: "a valid note can be added",
      author: "test-author",
    };
    await api.post("/api/blogs").send(blogObject).expect(400);

    blogObject = {
      author: "test-author",
      url: "blog/test-author-1",
    };

    await api.post("/api/blogs").send(blogObject).expect(400);
  });
});

describe("DELETE Actions", () => {
  test("delete a blog using id", async () => {
    const blogsInStart = await helper.notesInDb();

    const id = blogsInStart[0].id;
    const blogsCount = blogsInStart.length;

    await api.delete(`/api/blogs/${id}`).expect(204);
    const blogsInEnd = await helper.notesInDb();

    expect(blogsInEnd.length).toBe(blogsCount - 1);
  });
});

describe("PUT Actions", () => {
  test("update the blog's likes and verify likes", async () => {
    const blogsInStart = await helper.notesInDb();

    const id = blogsInStart[0].id;
    const likes = blogsInStart[0].likes;

    await api
      .put(`/api/blogs/${id}`)
      .send({ likes: likes + 1 })
      .expect(200);
    const blogs = await helper.notesInDb();

    const updatedBlog = blogs.filter((blog) => blog.id === id)[0];

    expect(updatedBlog.likes).toBe(likes + 1);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
