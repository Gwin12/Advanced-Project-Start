

exports.loadTest = async function(req, res) {
    try {
        let total = 0;
        for (let i = 0; i < 50_000_000; i++) {
            total++;
        }
        // console.log("heavy ran")

        res.send(`The result of the CPU task is ${total}\n`)

    } catch (error) {
        console.log(error)
    }
}