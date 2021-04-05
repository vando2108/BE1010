import express from "express";
import fs from "fs";

class Log {
  timestamp: string
  level: string
  message: string

  constructor(a: string = "", b: string = "", c: string = "") {
    this.timestamp = a
    this.level = b
    this.message = c
  }
}

const router = express();

router.use(express.json());
router.use(express.urlencoded());

router.get("/timestamp", async (_, res) => {
  res.status(200).json({timestamp: Date.now()})
})

router.post("/logs", (req, res) => {
  var {level, message} = req.body
  var time = Date.now()
  
  var temp = level + " " + message + " " + time.toString() + '\n'
  console.log(temp)
  fs.appendFile("logs.txt", temp, function (err) {
    if (err) throw err
    console.log("Saved!")
  }) 

  res.status(200).json()
});

router.get("/logs", (req, res) => {
  const n = parseInt(req.query.limit as string, 10)
  let a:Array<Log> = []
  fs.readFile("logs.txt", "utf-8", (err, data) => {
    if (err) throw err
    let logs = data.split("\n")
    for (let i = logs.length - 2; i >= Math.max(logs.length - 2 - n + 1, 0); i--) {
      let temp = logs[i].split(" ")
      let log:Log = new Log
      log.level = temp[0]
      log.timestamp = temp[temp.length - 1]
      for (let j = 1; j < temp.length - 1; j++) 
	log.message = log.message + temp[j] + " "
      a.push(log)
    }
    res.status(200).json({"logs": a})
  })
})

router.listen(8080, () => {
  console.log("Server running");
});
