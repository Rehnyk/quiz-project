import * as userService from "../../services/userService.js";
import {bcrypt} from "../../deps.js";
import {validasaur} from "../../deps.js";

const userValidationRules = {
    email: [validasaur.required, validasaur.isEmail],
    password: [validasaur.required, validasaur.minLength(4)]
}

const processLogin = async ({request, response, state, render}) => {
    const usr = await state.session.get("user");
    if(usr && await state.session.get('authenticated')){
        response.redirect("/");
    }
    const body = request.body({type: "form"});
    const params = await body.value;

    const redirectToLoginPage = async ({
        status,
        email,
        errors
                                       })=>{
        response.status = status;
        await state.session.set('invalidUser', {
            email,
            errors
        });
        response.redirect("/auth/login");
    };

    const userData = {
        email: "",
        password: ""
    };
    delete userData.body;

    userData.email = params.get("email");
    userData.password = params.get("password");

    const [passes, errors] = await validasaur.validate(
        userData, userValidationRules
    );


    if (!passes) {
        userData.errors = errors;
        response.status = 403;
        render("login.eta", userData);
    } else {

        const userFromDB = await userService.findUserByEmail(userData.email);

        if (userFromDB.length !== 1) {
            return redirectToLoginPage({
                errors: {authentication: "Wrong email or password."},
                status: 400,
                email: userData.email
            });
        }

        const user = userFromDB[0];


        const passwordMatches = bcrypt.compare(
            userData.password, user.password,
        );

        if (!passwordMatches) {
            return redirectToLoginPage({
                errors: {authentication: "Wrong email or password."},
                status: 400,
                email: userData.email
            });
        }

        await state.session.set("authenticated", true);
        await state.session.set("user", {
            id: user.id,
            email: user.email,
            admin: user.admin
        });

        userData.email = "";
        userData.password = "";

        response.redirect("/topics");
    }
};

const logoutUser = async ({request, response, state}) => {
    await state.session.deleteSession();
    response.redirect("/auth/login");
};

const showLoginForm = async ({state, render, response}) => {
    const user = await state.session.get("user");
    if(user && await state.session.get('authenticated')){
        response.redirect("/");
    }
    const invalidUser = await state.session.get('invalidUser');
    await state.session.set('invalidUser', null);
    const userData = {
        email: invalidUser?.email || "",
        password: "",
        errors: invalidUser?.errors || []
    };

    render("login.eta", userData);
};

export {
    processLogin,
    showLoginForm,
    logoutUser
};