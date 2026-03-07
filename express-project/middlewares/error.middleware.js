function errorMiddleware(err, req, res, _next) {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
    //stack: err.stack,
  });
}

export default errorMiddleware;
