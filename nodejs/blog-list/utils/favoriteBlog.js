/*
 * Function to find which blog in array has the most like
 *
 */
function favoriteBlog(blogs) {
  let maxLikes = 0;

  // Find the max likes in blogs
  // using linear search O(n)
  blogs.forEach((item) => {
    maxLikes = item.likes > maxLikes ? item.likes : maxLikes;
  });

  // Filter the blog which has most likes
  const maxLikesBlog = blogs.filter((item) => item.likes === maxLikes);

  return {
    title: maxLikesBlog[0].title,
    author: maxLikesBlog[0].author,
    likes: maxLikesBlog[0].likes,
  };
}

module.exports = favoriteBlog;
