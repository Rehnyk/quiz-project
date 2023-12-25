import {bcrypt} from "../../deps.js";
import * as userService from "../../services/userService.js";
import {validasaur} from "../../deps.js";

const userValidationRules = {
    email: [validasaur.required, validasaur.isEmail],
    password: [validasaur.required, validasaur.minLength(4)]
}

const registerUser = async ({request, response, render}) => {
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
        console.log('VALIDATION ERROR:', errors);
        userData.errors = errors;
        response.status = 403;
        console.log('USER DATA', userData)
        render("registration.eta", userData);

    } else if (await userService.findUserByEmail(userData.email).length > 0 ) {
        userData.errors = {authentication: "User already exist."}
        render("registration.eta", userData);

    } else {
        await userService.addUser(userData.email, await bcrypt.hash(userData.password));
        response.redirect("/auth/login");
    }
};

const showRegistrationForm = async ({render}) => {
    render("registration.eta", {email: ""});
};

export {registerUser, showRegistrationForm};