"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFields = exports.paginate = void 0;
const paginate = (page = 1, count = 10) => {
    let pageModel = { offset: (page - 1) * count, limit: Number(count) };
    return pageModel;
};
exports.paginate = paginate;
const getFields = (fields) => {
    return fields.split(',');
};
exports.getFields = getFields;
