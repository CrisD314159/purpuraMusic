export default class NotauthorizedError extends Error {
  public isNotauthorizedError = true;
  constructor(message?: string) {
    super(message || "You are not authorized");
    this.name = "NotauthorizedError";
  }
}