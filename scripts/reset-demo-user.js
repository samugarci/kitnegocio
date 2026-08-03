const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const email = 'cliente.demo@kitnegocio.com';
const password = 'Cliente-MUCpNkdD!9';
const storePath = path.join(__dirname, 'data', 'users.json');

(async () => {
  const hash = await bcrypt.hash(password, 10);
  const ok = await bcrypt.compare(password, hash);
  if (!ok) throw new Error('hash verify failed');

  const store = JSON.parse(fs.readFileSync(storePath, 'utf8'));
  const user = store.users.find((u) => u.email === email);
  if (!user) throw new Error('demo user missing');

  user.passwordHash = hash;
  user.status = 'active';
  user.plan = 'full';
  user.role = 'buyer';
  fs.writeFileSync(storePath, JSON.stringify(store, null, 2), 'utf8');
  console.log('UPDATED_OK');
})().catch((err) => {
  console.error('FAIL', err.message);
  process.exit(1);
});
