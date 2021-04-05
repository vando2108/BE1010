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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express_1 = require("express");
var fs_1 = require("fs");
var Log = /** @class */ (function () {
    function Log(a, b, c) {
        if (a === void 0) { a = ""; }
        if (b === void 0) { b = ""; }
        if (c === void 0) { c = ""; }
        this.timestamp = a;
        this.level = b;
        this.message = c;
    }
    return Log;
}());
var router = express_1["default"]();
router.use(express_1["default"].json());
router.use(express_1["default"].urlencoded());
router.get("/timestamp", function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.status(200).json({ timestamp: Date.now() });
        return [2 /*return*/];
    });
}); });
router.post("/logs", function (req, res) {
    var _a = req.body, level = _a.level, message = _a.message;
    var time = Date.now();
    var temp = level + " " + message + " " + time.toString() + '\n';
    console.log(temp);
    fs_1["default"].appendFile("logs.txt", temp, function (err) {
        if (err)
            throw err;
        console.log("Saved!");
    });
    res.status(200).json();
});
router.get("/logs", function (req, res) {
    var n = parseInt(req.query.limit, 10);
    var a = [];
    fs_1["default"].readFile("logs.txt", "utf-8", function (err, data) {
        if (err)
            throw err;
        var logs = data.split("\n");
        for (var i = logs.length - 2; i >= Math.max(logs.length - 2 - n + 1, 0); i--) {
            var temp = logs[i].split(" ");
            var log = new Log;
            log.level = temp[0];
            log.timestamp = temp[temp.length - 1];
            for (var j = 1; j < temp.length - 1; j++)
                log.message = log.message + temp[j] + " ";
            a.push(log);
        }
    });
    res.status(200).json({ "logs": a });
});
router.listen(8080, function () {
    console.log("Server running");
});
