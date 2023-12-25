import * as userService from "../../services/userService.js";
import {bcrypt} from "../../deps.js";
import {validasaur} from "../../deps.js";

const userValidationRules = {
    email: [validasaur.required, validasaur.isEmail],
    password: [validasaur.required, validasaur.minLength(4)]
}

const userData = {
    email: "",
    password: ""
}

const processLogin = async ({request, response, state, render}) => {
    const body = request.body({type: "form"});
    const params = await body.value;

    userData.email = params.get("email");
    userData.password = params.get("password");

    const [passes, errors] = await validasaur.validate(
        userData, userValidationRules
    );

    if (!passes) {
        console.log('VALIDATION ERROR:', errors);
        userData.errors = errors;
        response.status = 403;
        console.log('USER DATA', userData)
        render("login.eta", userData);

    } else {

        const userFromDB = await userService.findUserByEmail(userData.email);

        if (userFromDB.length !== 1) {
            console.log('NO USER FOUND')
            userData.errors = {authentication: "Wrong email or password."};
            response.status = 400;
            response.redirect("/auth/login");
            return;
        }

        const user = userFromDB[0];

        const passwordMatches = await bcrypt.compare(
            userData.password, user.password,
        );

        if (!passwordMatches) {
            console.log('WRONG PASSWORD')
            userData.errors = {authentication: "Wrong email or password."};
            response.status = 400;
            response.redirect("/auth/login");
            return;
        }

        await state.session.set("authenticated", true);
        await state.session.set("user", {
            id: user.id,
            email: user.email,
            admin: user.admin
        });

        response.redirect("/topics");
    }
};

const showLoginForm = ({render}) => {
    render("login.eta", userData);
};

export {processLogin, showLoginForm};