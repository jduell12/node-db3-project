const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
  addStep,
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
    .join("schemes as sc", "sc.id", "s.scheme_id")
    .where({ scheme_id: id })
    .select("s.step_number", "s.instructions", "sc.scheme_name")
    .orderBy("s.step_number");
}

// inserts scheme into the database
//resolves to newly inserted scheme including id
function add(scheme) {
  return db("schemes")
    .insert(scheme)
    .returning("id")
    .then((ids) => {
      return findById(ids[0]);
    });
}

//updates the scheme with the gieven id
//resolves to the newly updated scheme object
function update(changes, id) {
  return db("schemes")
    .where({ id })
    .update(changes)
    .then((count) => {
      return findById(id);
    });
}

//removes the scheme object with the provided id
function remove(id) {
  return db("schemes").where({ id }).del();
}

//adds the step object into the steps database and links it to the correct scheme
function addStep(step, scheme_id) {
  return db("steps")
    .insert({
      scheme_id: scheme_id,
      step_number: step.step_number,
      instructions: step.instructions,
    })
    .then((result) => {
      return findSteps(scheme_id);
    });
}
