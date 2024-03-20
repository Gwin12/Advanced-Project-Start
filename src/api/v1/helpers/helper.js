const { database } = require('../importedConfig')


let Helper = function (data) {
  this.data = data,
    this.errors = []
}




Helper.repeatUntilSuccessful = async function (fn, times) {
  try {
    let attempts = 0;

    while (attempts < times) {
      try {
        const fnResult = await fn(); // Call the function
        return fnResult; // Exit the loop if successful

      } catch (error) {
        console.error('Attempt ' + (attempts + 1) + ' failed:', error.message);
        attempts++;
      }
    }

    console.error('Function failed ' + times + ' times. Giving up.');

  } catch (error) {
    console.log(error)
  }
}



module.exports = Helper