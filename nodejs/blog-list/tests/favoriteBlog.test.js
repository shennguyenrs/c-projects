/*
 * Testing for finding favortie blog function
 */

const favoriteBlog = require('../utils/favoriteBlog');

describe('Favorite Blog', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ];

  const expectedResult = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    likes: 5,
  };

  test('When the blog has only one item, It is the the blog has most like', () => {
    const maxLikesBlog = favoriteBlog(listWithOneBlog);
    expect(maxLikesBlog).toEqual(expectedResult);
  });
});
