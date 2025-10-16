import seo from './seo';
import navigation from './navigation';
import home from './home';
import dashboard from './dashboard';
import about from './about';
import articles from './content';
import uvCheck from './check-uv';
import contact from './contact';
import auth from './auth';
import footer from './footer';
import apiCodes from './apiCodes';
import zodErrors from './zod-errors';
import notFound from './not-found';

const en = {
    ...seo,
    ...navigation,
    ...home,
    ...dashboard,
    ...about,
    ...articles,
    ...uvCheck,
    ...contact,
    ...auth,
    ...footer,
    ...apiCodes,
    ...zodErrors,
    ...notFound,
}

export default en;