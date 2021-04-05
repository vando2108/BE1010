"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
class Log {
    constructor(a = "", b = "", c = "") {
        this.timestamp = a;
        this.level = b;
        this.message = c;
    }
}
const router = express_1.default();
router.use(express_1.default.json());
router.use(express_1.default.urlencoded());
router.get("/timestamp", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ timestamp: Date.now() });
}));
router.post("/logs", (req, res) => {
    var { level, message } = req.body;
    var time = Date.now();
    var temp = level + " " + message + " " + time.toString() + '\n';
    console.log(temp);
    fs_1.default.appendFile("logs.txt", temp, function (err) {
        if (err)
            throw err;
        console.log("Saved!");
    });
    res.status(200).json();
});
router.get("/logs", (req, res) => {
    const n = parseInt(req.query.limit, 10);
    let a = [];
    fs_1.default.readFile("logs.txt", "utf-8", (err, data) => {
        if (err)
            throw err;
        let logs = data.split("\n");
        for (let i = logs.length - 2; i >= Math.max(logs.length - 2 - n + 1, 0); i--) {
            let temp = logs[i].split(" ");
            let log = new Log;
            log.level = temp[0];
            log.timestamp = temp[temp.length - 1];
            for (let j = 1; j < temp.length - 1; j++)
                log.message = log.message + temp[j] + " ";
            a.push(log);
        }
        res.status(200).json({ "logs": a });
    });
});
router.listen(8080, () => {
    console.log("Server running");
});
