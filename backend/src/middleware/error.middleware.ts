import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  if (process.env.NODE_ENV === "production") {
    return res.status(err.status || 500).json({
      error: "An error occurred. Please try again later.",
    });
  }

  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
    stack: err.stack,
  });
};
