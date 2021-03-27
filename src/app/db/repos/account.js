const cs = {}; // Reusable ColumnSet objects.

/*
 This repository mixes hard-coded and dynamic SQL, primarily to show a diverse example of using both
 */

class AccountRepository {

  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
    createColumnsets(pgp);
  }

  async findById(id) {
    return this.db.oneOrNone(`SELECT
            id
            , account
            , user
          FROM public."account" WHERE id = $1`, id);
  }

  async insAccount(account, user) {
    return this.db.oneOrNone(`INSERT INTO public."account"(account, "user")
      VALUES ($1, $2) RETURNING id, account`, [account, user])
  }

  async getAccount(user) {
    return this.db.manyOrNone(`SELECT
            id
            , user
            , account
          FROM public."account" WHERE "user" = $1`, user);
  }
}

function createColumnsets(pgp) {
  if (!cs.insert) {
    const table = new pgp.helpers.TableName({ table: 'account', schema: 'public' });

    cs.insert = new pgp.helpers.ColumnSet([
      'account',
      'user'
    ], { table });

    cs.update = cs.insert.extend(['?id']);
  }
  return cs;
}

module.exports = AccountRepository;