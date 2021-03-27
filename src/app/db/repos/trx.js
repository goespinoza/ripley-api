const cs = {}; // Reusable ColumnSet objects.

/*
 This repository mixes hard-coded and dynamic SQL, primarily to show a diverse example of using both
 */

class TrxRepository {

  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
    createColumnsets(pgp);
  }

  async findById(id) {
    return this.db.oneOrNone(`SELECT
            id,
            user,
            trx_typ,
            des_acc,
            ori_acc,
            trx_date
            amount,
          FROM public."trx" WHERE id = $1`, id);
  }

  async insTrx(user, trx_typ, ori_acc, des_acc, amount, trx_date) {
    return this.db.oneOrNone(`INSERT INTO public."trx"(
      "user", trx_typ, ori_acc, des_acc, amount, trx_date)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING "user", trx_typ, ori_acc, des_acc, amount, trx_date`,
      [user, trx_typ, ori_acc, des_acc, amount, trx_date])
  }

}

function createColumnsets(pgp) {
  if (!cs.insert) {
    const table = new pgp.helpers.TableName({ table: 'trx', schema: 'public' });

    cs.insert = new pgp.helpers.ColumnSet([
      'user',
      'trx_typ',
      'ori_acc',
      'des_acc',
      'amount',
      'trx_date'
    ], { table });

    cs.update = cs.insert.extend(['?id']);
  }
  return cs;
}

module.exports = TrxRepository;