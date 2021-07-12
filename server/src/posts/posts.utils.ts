export function computeLikesNumber(posts) {
  posts = posts.map((post) => {
    return {
      ...post,
      likes: post.likes.length,
    };
  });
  console.log('posts : ', posts);
  return posts;
}
