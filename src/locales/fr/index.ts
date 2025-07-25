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
import zodErrors from './zod-errors';
import notFound from './not-found';

const fr = {
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
    ...zodErrors,
    ...notFound,
}

export default fr;