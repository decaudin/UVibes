import navigation from './navigation';
import home from './home';
import dashboard from './dashboard';
import about from './about';
import uvCheck from './check-uv';
import contact from './contact';
import auth from './auth';
import footer from './footer';
import zodErrors from './zod-errors';

const fr = {
    ...navigation,
    ...home,
    ...dashboard,
    ...about,
    ...uvCheck,
    ...contact,
    ...auth,
    ...footer,
    ...zodErrors,
}

export default fr;