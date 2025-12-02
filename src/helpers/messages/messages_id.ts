import { MessagesKey } from './messagesKey';

export const messages_id = {
  // Common Error messages
  [MessagesKey.NODATAFOUND]: 'Data tidak ditemukan',
  [MessagesKey.UNKNOWNERROR]: 'Terjadi kesalahan yang tidak diketahui',
  [MessagesKey.BADREQUEST]: 'Permintaan tidak valid.',
  [MessagesKey.UNAUTHORIZED]: 'Tidak terotorisasi.',

  // Common Success messages
  [MessagesKey.SUCCESSGET]: 'Data telah ditemukan.',
  [MessagesKey.SUCCESSGETBYID]:
    'Data telah ditemukan berdasarkan kriteria yang ditentukan.',
  [MessagesKey.SUCCESSCREATE]: 'Data telah dibuat.',
  [MessagesKey.SUCCESSUPDATE]: 'Data telah diperbarui.',
  [MessagesKey.SUCCESSDELETE]: 'Data telah dihapus.',

  // Repository Error messages
  [MessagesKey.ERRORFINDINGALL]: 'Terjadi kesalahan saat mencari semua data',
  [MessagesKey.ERRORFINDINGBYID]:
    'Terjadi kesalahan saat mencari data berdasarkan ID',
  [MessagesKey.ERRORCREATE]: 'Terjadi kesalahan saat membuat data',
  [MessagesKey.ERRORDELETE]: 'Terjadi kesalahan saat menghapus data',
  [MessagesKey.DUPLICATE_SAVE]: 'Data sudah ada',
  [MessagesKey.UNAVAILABLE_IN_COUNTRY]: 'Tidak tersedia di negara ini',
  [MessagesKey.NOT_FOUND]: 'Data tidak ditemukan',
  [MessagesKey.BAD_REQUEST]: 'Permintaan tidak valid'
};