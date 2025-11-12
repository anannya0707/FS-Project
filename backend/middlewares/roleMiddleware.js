/**
 * Role-based access control middleware.
 * @param {Array<string>} allowedRoles - List of roles allowed to access the route.
 */
module.exports = function (allowedRoles = []) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: no user context found' });
    }

    const userRole = req.user.role;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: `Access denied: ${userRole || 'unknown'} role not permitted`
      });
    }

    next(); // ✅ Role allowed
  };
};
