const validateUser = (req, res, next) => {
  const { name, age, gender } = req.body;
  if (!name || !age || !gender) {
    return res.status(400).json({
      success: false,
      message: "Name, age, and gender are required!",
    });
  }

  // Gender must be exactly one character
  const allowedGenders = ["M", "F", "O"];
  if (!allowedGenders.includes(gender.toUpperCase())) {
    return res.status(400).json({
      success: false,
      message:
        "Gender must be a single character (e.g 'M', 'F', or 'O), your current length is " +
        gender.length,
    });
  }

  if (age >= 50) {
    return res.status(400).json({
      success: false,
      message: "Sorry! you're too old to be on this platform",
    });
  }

  next(); // All good, go to controller

};

module.exports = validateUser;
