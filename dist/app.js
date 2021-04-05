"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.get("/timestamp", (_, res) => {
    res.json({ timestamp: Date.now() });
});
app.post("/logs", (req, res) => {
    req.body;
});
app.listen(8080, () => console.log('Server running'));
