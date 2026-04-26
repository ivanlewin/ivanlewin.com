export class APIError extends Error {
  code: string;
  description?: string;
  status: number;
  details?: Record<string, unknown>;

  constructor({
    code,
    description,
    details,
    message,
    status = 500,
  }: {
    code: string;
    description?: string;
    details?: Record<string, unknown>;
    message: string;
    status?: number;
  }) {
    super(message);
    this.code = code;
    this.description = description;
    this.details = details;
    this.name = "APIError";
    this.status = status;
  }
}
