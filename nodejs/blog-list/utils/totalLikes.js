// Function to calculate of all likes
// when received blogs as a parameter
const totalLikes = (blogs) => {
  let sum = 0;
  blogs.forEach((item) => (sum += item.likes));
  return sum;
};

// Using module.exports to export module in CommonJs
module.exports = totalLikes;
