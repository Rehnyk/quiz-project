import {bcrypt} from "../../deps.js";
import * as userService from "../../services/userService.js";
import {validasaur} from "../../deps.js";

const userValidationRules = {
    email: [validasaur.required, validasaur.isEmail],
    password: [validasaur.required, validasaur.minLength(4)]
}

const registerUser = async ({request, response, render, state}) => {
    const usr = await state.session.get("user");
    if(usr && await state.session.get('authenticated')){
        response.redirect("/");
    }
    const body = request.body({type: "form"});
    const params = await body.value;

    const userData = {
        email: params.get("email"),
        password: params.get("password")
    }

    const [passes, errors] = await validasaur.validate(
        userData, userValidationRules
    );

    if (!passes) {
        userData.errors = errors;
        response.status = 403;
        render("registration.eta", userData);
    }

    const user = await userService.findUserByEmail(userData.email);


    if (user.length > 0 ) {
        userData.errors = {authentication: "User already exists."}
        response.status = 400;
        render("registration.eta", userData);

    } else {
        await userService.addUser(userData.email, await bcrypt.hash(userData.password));
        response.status = 201;
        response.redirect("/auth/login");
    }
};

const showRegistrationForm = async ({render, state, response}) => {
    const user = await state.session.get("user");
    if(user && await state.session.get('authenticated')){
        response.redirect("/");
    }
    render("registration.eta", {email: ""});
};

export {registerUser, showRegistrationForm};