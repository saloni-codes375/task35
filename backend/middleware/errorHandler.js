const errorHandler = (error, req, res, next) => {
  console.error(error);

  if (error.name === "CastError") {
    return res.status(400).json({ error: "Invalid resource ID." });
  }

  res.status(500).json({
    error: "Something went wrong on the server. Please try again."
  });
};

module.exports = errorHandler;
