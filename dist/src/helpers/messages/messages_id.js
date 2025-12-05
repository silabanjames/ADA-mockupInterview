"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messages_id = void 0;
const messagesKey_1 = require("./messagesKey");
exports.messages_id = {
    // Common Error messages
    [messagesKey_1.MessagesKey.NODATAFOUND]: 'Data tidak ditemukan',
    [messagesKey_1.MessagesKey.UNKNOWNERROR]: 'Terjadi kesalahan yang tidak diketahui',
    [messagesKey_1.MessagesKey.BADREQUEST]: 'Permintaan tidak valid.',
    [messagesKey_1.MessagesKey.UNAUTHORIZED]: 'Tidak terotorisasi.',
    [messagesKey_1.MessagesKey.FORBIDDEN]: 'Tidak diizinkan.',
    // Common Success messages
    [messagesKey_1.MessagesKey.SUCCESSGET]: 'Data telah ditemukan.',
    [messagesKey_1.MessagesKey.SUCCESSGETBYID]: 'Data telah ditemukan berdasarkan kriteria yang ditentukan.',
    [messagesKey_1.MessagesKey.SUCCESSCREATE]: 'Data telah dibuat.',
    [messagesKey_1.MessagesKey.SUCCESSUPDATE]: 'Data telah diperbarui.',
    [messagesKey_1.MessagesKey.SUCCESSDELETE]: 'Data telah dihapus.',
    // Repository Error messages
    [messagesKey_1.MessagesKey.ERRORFINDINGALL]: 'Terjadi kesalahan saat mencari semua data',
    [messagesKey_1.MessagesKey.ERRORFINDINGBYID]: 'Terjadi kesalahan saat mencari data berdasarkan ID',
    [messagesKey_1.MessagesKey.ERRORCREATE]: 'Terjadi kesalahan saat membuat data',
    [messagesKey_1.MessagesKey.ERRORDELETE]: 'Terjadi kesalahan saat menghapus data',
    [messagesKey_1.MessagesKey.DUPLICATE_SAVE]: 'Data sudah ada',
    [messagesKey_1.MessagesKey.UNAVAILABLE_IN_COUNTRY]: 'Tidak tersedia di negara ini',
    [messagesKey_1.MessagesKey.NOT_FOUND]: 'Data tidak ditemukan',
    [messagesKey_1.MessagesKey.BAD_REQUEST]: 'Permintaan tidak valid'
};
