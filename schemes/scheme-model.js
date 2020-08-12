const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
};

//returns a promise that resolves to an array of all schemes in the database
function find() {
  return db("schemes");
}

//returns a single scheme object
function findById(id) {
  return db("schemes").where({ id }).first();
}

//returns an array of correctly ordered steps for the given scheme
//array should include scheme_name not scheme_id
function findSteps(id) {
  return db("steps as s")
    .join("schemes as sc", "s.scheme_id", "sc.id")
    .select("s.step_number", "s.instructions", "sc.scheme_name");
}

function add(scheme) {}

function update(changes, id) {}

function remove(id) {}
