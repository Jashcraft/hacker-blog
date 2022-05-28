const User = require('./User');
const BlogPost = require('./BlogPost');

BlogPost.belongsTo(User, {
  onDelete: 'CASCADE',
  foreignKey: 'userId'
});

module.exports = {User, BlogPost}