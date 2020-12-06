"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.CabinetType = exports.PowerAmpType = exports.ReverbType = exports.ModulationType = exports.DelayType = exports.PreAmpType = exports.PedalType = exports.codeApi = void 0;
const marshallcode_1 = __importDefault(require("./marshallcode"));
exports.codeApi = marshallcode_1.default;
const Patch_1 = require("./Patch");
Object.defineProperty(exports, "CabinetType", { enumerable: true, get: function () { return Patch_1.CabinetType; } });
Object.defineProperty(exports, "create", { enumerable: true, get: function () { return Patch_1.create; } });
Object.defineProperty(exports, "DelayType", { enumerable: true, get: function () { return Patch_1.DelayType; } });
Object.defineProperty(exports, "ModulationType", { enumerable: true, get: function () { return Patch_1.ModulationType; } });
Object.defineProperty(exports, "PedalType", { enumerable: true, get: function () { return Patch_1.PedalType; } });
Object.defineProperty(exports, "PowerAmpType", { enumerable: true, get: function () { return Patch_1.PowerAmpType; } });
Object.defineProperty(exports, "PreAmpType", { enumerable: true, get: function () { return Patch_1.PreAmpType; } });
Object.defineProperty(exports, "ReverbType", { enumerable: true, get: function () { return Patch_1.ReverbType; } });
