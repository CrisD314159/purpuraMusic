export default class NotfoundError extends Error {
  public isNotfoundError = true;
  constructor(message?: string) {
    super(message || "Item not found");
    this.name = "NotfoundError";
  }
}