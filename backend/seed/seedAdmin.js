const db = require('../config/db');
const bcrypt = require('bcrypt');

async function seedAdminUser() {
  try {
    const [users] = await db.query('SELECT * FROM users WHERE role = ?', ['admin']);
    if (!users.length) {
      const hashed = await bcrypt.hash('admin123', 10);
      await db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', ['admin', hashed, 'admin']);
      console.log('Default admin user seeded');
    } else {
      console.log('Admin user already exists');
    }
  } catch (err) {
    console.error('Error seeding admin user:', err.message);
  }
}

// If run directly, seed and exit
if (require.main === module) {
  seedAdminUser().then(() => process.exit());
}

module.exports = seedAdminUser;