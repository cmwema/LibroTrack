export enum routesEnum {
  LOGIN = "/",
  PASSWORD_REST = "/password-reset",
  BOOKS = "/books",
  NEW_BOOK = "/books/new",
  BOOK_DETAILS = "/books/:id",
  EDIT_BOOK = "/books/edit/:id",
  DELETE_BOOK = "/books/:id/delete",

  MEMBERS = "/members",
  MEMBER_DETAILS = "/members/:id",
  NEW_MEMBER = "/members/new",
  EDIT_MEMBER = "/members/edit/:id",
  DELETE_MEMBER = "/members/:id/delete",

  TRANSACTIONS = "/transactions",
  TRANSACTION_DETAILS = "/transactions/:id",
  NEW_TRANSACTION = "/transactions/new",
  EDIT_TRANSACTION = "/transactions/edit/:id",
  DELETE_TRANSACTION = "/transactions/:id/delete",
}
