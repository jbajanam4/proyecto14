"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.principal4 = exports.principal3 = exports.menuPrincipal = void 0;
function menuPrincipal(req, res) {
    return res.json("Pagina Principal");
}
exports.menuPrincipal = menuPrincipal;
function principal3(req, res) {
    return res.json("Pagina Departamentos");
}
exports.principal3 = principal3;
function principal4(req, res) {
    return res.json("Pagina Empleados");
}
exports.principal4 = principal4;
