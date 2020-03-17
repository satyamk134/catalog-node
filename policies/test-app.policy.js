var acl = require('acl');
acl = new acl(new acl.memoryBackend());

exports.invokeRolesPolicies = function () {
    acl.allow([
        {
            roles: ['admin'],
            allows: [
                { resources: '/getData', permissions: 'get' },

            ]
        },
        {
            roles: ['writer'],
            allows: [
                { resources: 'cash', permissions: ['sell', 'exchange'] },

            ]
        }
    ])
}

exports.isAllowed = function (req, res, next) {
    console.log("came inside is allowed");
    //console.log("request user is",req.user);
    console.log("req.route is",req.method)
    var roles = (req.user) ? req.user.roles : ['guest'];
    roles = ['admin'];
    // Check for user roles
    acl.areAnyRolesAllowed(roles, req.path, req.method.toLowerCase(), function (err, isAllowed) {
        if (err) {
            // An authorization error occurred
            return res.status(500).send('Unexpected authorization error');
        } else {
            if (isAllowed) {
                console.log("allowed")
                // Access granted! Invoke next middleware
                return next();
            } else {
                return res.status(403).json(errorHandler.getJsonError('not_authorized', err));
            }
        }
    });
};