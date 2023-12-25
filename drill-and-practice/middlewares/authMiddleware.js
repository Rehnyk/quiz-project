/*
const acl = [
    {
        path: '/topics',
        needsAuthentication: true
    },
    {
        path: '/quiz',
        needsAuthentication: true
    }
    ]

const authMiddleware = async (context, next) => {
    const pathname = context.request.url.pathname;

    for (const aclRule of acl) {

        if (!pathname.startsWith(aclRule.path)) {
            continue;
        }

        if (!aclRule.needsAuthentication) {
            await next();
            return;
        }

        if (!(await state.session.get("authenticated"))) {
            context.response.redirect("/auth/login");
            return;
        }

        // if the user has one of the expected roles, grant access,
        // otherwise deny access.
        const user = await state.session.get("user");

        if (aclRule.expectedOneOfRoles.some((r) => user.roles)) {
            await next();
            return;
        } else {
            response.status = 401;
            return;
        }
    }

    // deny all others!
    response.status = 401;
};*/


const restrictedPaths = ["/topics", "/quiz"];

const authMiddleware = async (context, next) => {
    const user = await context.state.session.get("user");

    if (user) {
        context.user = user;
    }

    if (
        !user && restrictedPaths.some((path) =>
            context.request.url.pathname.startsWith(path)
        )
    ) {
        context.response.redirect("/auth/login");
    } else {
        await next();
    }
};


export { authMiddleware };