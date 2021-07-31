/*
 * Function to return the author who has the most blogs
 */

function mostBlog(blogs) {
  let maxBlog = 0;
  blogs.forEach(
    (item) => (maxBlog = item.blogs > maxBlog ? item.blogs : maxBlog)
  );
  const mostBlogResult = blogs.filter((item) => item.blogs === maxBlog);
  return {
    author: mostBlogResult[0].author,
    blogs: mostBlogResult[0].blogs,
  };
}
module.exports = mostBlog;
