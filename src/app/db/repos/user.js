const cs = {}; // Reusable ColumnSet objects.

/*
 This repository mixes hard-coded and dynamic SQL, primarily to show a diverse example of using both
 */

class UserRepository {

  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
    createColumnsets(pgp);
  }

  async findById(id) {
    return this.db.oneOrNone(`SELECT
            id
            , name
            , rut
            , email
            , password
          FROM public."user" WHERE id = $1`, id);
  }

  async findByRut(rut) {
    return this.db.oneOrNone(`SELECT
            id
            , name
            , rut
            , email
          FROM public."user" WHERE rut = $1`, [rut]);
  }

  async findAll() {
    return this.db.manyOrNone(`SELECT
            id
            , name
            , rut
            , email
          FROM public."user"`);
  }

  async register(name, rut, mail, password) {
    return this.db.oneOrNone(`INSERT INTO public."user"(
      name, rut, email, password)
      VALUES ($1, $2, $3, $4) RETURNING id, name, rut, email`, [name, rut, mail, password])
  }

  async login(rut, password) {
    return this.db.oneOrNone(`SELECT
            id
            , name
            , rut
            , email
          FROM public."user" WHERE rut = $1 and password = $2`, [rut, password]);
  }
}

function createColumnsets(pgp) {
  if (!cs.insert) {
    const table = new pgp.helpers.TableName({ table: 'user', schema: 'public' });

    cs.insert = new pgp.helpers.ColumnSet([
      'name',
      'rut',
      'mail',
      'password'
    ], { table });

    cs.update = cs.insert.extend(['?id']);
  }
  return cs;
}

module.exports = UserRepository;