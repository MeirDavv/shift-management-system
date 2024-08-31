"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const employeeRoutes_1 = __importDefault(require("./routes/employeeRoutes"));
const shiftRoutes_1 = __importDefault(require("./routes/shiftRoutes"));
const unavailabilityRouter_1 = __importDefault(require("./routes/unavailabilityRouter"));
const tokenRoutes_1 = __importDefault(require("./routes/tokenRoutes"));
const roleRoutes_1 = __importDefault(require("./routes/roleRoutes"));
const shiftSettingsRoute_1 = __importDefault(require("./routes/shiftSettingsRoute"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["https://shift-management-system.onrender.com/"]
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
app.use("/api", employeeRoutes_1.default);
app.use("/api", shiftRoutes_1.default);
app.use("/api", unavailabilityRouter_1.default);
app.use("/api", tokenRoutes_1.default);
app.use("/api", roleRoutes_1.default);
app.use("/api", shiftSettingsRoute_1.default);
app.get("/api/:name", (req, res) => {
    res.json({ message: `Hello ${req.params.name}, from server!` });
});
// Have Node serve the files for our built React app
app.use(express_1.default.static(path_1.default.join(__dirname, "../../client/dist")));
// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "../../client/dist/index.html"));
});
