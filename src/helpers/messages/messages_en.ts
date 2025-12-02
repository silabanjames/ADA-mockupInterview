import { MessagesKey } from './messagesKey';

export const messages_en = {
  // Common Error messages
  [MessagesKey.NODATAFOUND]: 'No data found',
  [MessagesKey.UNKNOWNERROR]: 'An unknown error occurred',
  [MessagesKey.BADREQUEST]: 'Bad request.',
  [MessagesKey.UNAUTHORIZED]: 'Unauthorized.',
  [MessagesKey.FORBIDDEN]: 'Forbidden.',

  // Common Success messages
  [MessagesKey.SUCCESSGET]: 'Data has been found.',
  [MessagesKey.SUCCESSGETBYID]:
    'Data has been found by the specified criteria.',
  [MessagesKey.SUCCESSCREATE]: 'Data has been created.',
  // [MessagesKey.SUCCESSBULKCREATE]: 'Data has been bulk created.',
  [MessagesKey.SUCCESSUPDATE]: 'Data has been updated.',
  [MessagesKey.SUCCESSDELETE]: 'Data has been deleted.',

  // Repository Error messages
  [MessagesKey.ERRORFINDINGALL]: 'Error finding all instances',
  [MessagesKey.ERRORFINDINGBYID]: 'Error finding instance by ID',
  [MessagesKey.ERRORCREATE]: 'Error creating instance',
  [MessagesKey.ERRORDELETE]: 'Error deleting instance',
  [MessagesKey.DUPLICATE_SAVE]: 'Duplicate save',
  [MessagesKey.UNAVAILABLE_IN_COUNTRY]: 'Unavailable in country',
  [MessagesKey.NOT_FOUND]: 'Not found',
  [MessagesKey.BAD_REQUEST]: 'Bad request'
}