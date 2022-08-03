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
exports.deleteUser = exports.putUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
const users_model_1 = __importDefault(require("../models/users.model"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield users_model_1.default.findAll();
    res.json(users);
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield users_model_1.default.findByPk(id);
    if (user) {
        res.json(user);
    }
    else {
        return res.status(404).json({
            message: `The user with the id does not exits ${id}`
        });
    }
});
exports.getUser = getUser;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existUser = yield users_model_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existUser) {
            return res.status(404).json({
                message: `There is alredy a user with the email ${body.email}`
            });
        }
        const created_user = yield users_model_1.default.create(body);
        res.json(created_user);
    }
    catch (err) {
        return res.status(500).json({
            message: `An error ocurred while creating the record`
        });
    }
});
exports.postUser = postUser;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const user = yield users_model_1.default.findByPk(id);
        if (!user) {
            return res.status(404).json({
                message: `There user with the id not exists ${id}`
            });
        }
        const update_user = yield user.update(body);
        res.json(update_user);
    }
    catch (err) {
        return res.status(500).json({
            message: `An error ocurred while creating the record`
        });
    }
});
exports.putUser = putUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield users_model_1.default.findByPk(id);
        if (!user) {
            return res.status(404).json({
                message: `There user with the id not exists ${id}`
            });
        }
        //const updated_user = await user.update({state: false});
        //res.json(updated_user);
        const delete_user = yield user.destroy();
        res.json(delete_user);
    }
    catch (err) {
        return res.status(500).json({
            message: `An error ocurred while creating the record`
        });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.controller.js.map