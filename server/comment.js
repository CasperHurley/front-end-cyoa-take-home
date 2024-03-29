class Comment {
  constructor(dataAccessObject) {
    this.dataAccessObject = dataAccessObject;
  }

  // Added the ability to edit a comment plus an updated column to track when that happened

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      message TEXT,
      created DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated DATETIME DEFAULT CURRENT_TIMESTAMP)`;
    return this.dataAccessObject.run(sql);
  }

  deleteAllComments() {
    const sql = 'DELETE FROM comments';
    return this.dataAccessObject.run(sql);
  }

  deleteComment(id) {
    return this.dataAccessObject.run(
      'DELETE FROM comments WHERE id = ?',
      [id]
    );
  }

  createComment({ name, message }) {
    return this.dataAccessObject.run(
      'INSERT INTO comments (name, message) VALUES (?, ?)',
      [name, message]
    );
  }

  getComment(id) {
    return this.dataAccessObject.get(
      'SELECT * FROM comments WHERE id = ?',
      [id]
    );
  }

  getAllComments() {
    return this.dataAccessObject.all('SELECT * FROM comments');
  }

  editComment({name, message, id}) {
    return this.dataAccessObject.run(
      'UPDATE comments SET name = ?, message = ?, updated = CURRENT_TIMESTAMP WHERE id = ?',
      [name, message, id]
    )
  }
  
}

module.exports = Comment;
