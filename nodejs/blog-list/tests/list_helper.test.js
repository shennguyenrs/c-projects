const dummy = require('../utils/list_helper');

test('dummy return one', () => {
  const blogs = [];
  expect(dummy(blogs)).toBe(1);
});
