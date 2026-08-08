import home from '../../data/home.json';

/*
 * A tiny in-browser fake API. It mimics a REST backend that serves Rayaan's
 * profile data — same shapes you'd expect from a real service, wrapped in a
 * consistent envelope with a request id + server-side timing.
 *
 * resolve(method, path) -> { status, statusText, headers, data }
 */

const ok = (data) => ({ status: 200, statusText: 'OK', data });
const created = (data) => ({ status: 201, statusText: 'Created', data });
const notFound = (message) => ({
  status: 404,
  statusText: 'Not Found',
  data: { error: 'not_found', message },
});
const methodNotAllowed = (method, path) => ({
  status: 405,
  statusText: 'Method Not Allowed',
  data: {
    error: 'method_not_allowed',
    message: `${method} is not supported on ${path}. This is a read-only portfolio API.`,
  },
});

// Ordered list of route matchers. First match wins.
const ROUTES = [
  {
    method: 'GET',
    match: /^\/api\/v1\/profile$/,
    handler: () =>
      ok({
        name: 'Rayaan Pasha',
        handle: 'mdrayaanpasha',
        title: home.hero.subtitle,
        headline: home.hero.title,
        status: 'open_to_work',
        education: 'BCA @ St Joseph\'s University',
        currentlyAt: 'Manaverse',
      }),
  },
  {
    method: 'GET',
    match: /^\/api\/v1\/about$/,
    handler: () =>
      ok({
        tagline: home.about.eyebrow.replace(/[^\w\s]/g, '').trim(),
        summary: home.about.statement,
        yearsOfExperience: 1,
        focus: ['Distributed Systems', 'CI/CD', 'Data Pipelines', 'Backend'],
      }),
  },
  {
    method: 'GET',
    match: /^\/api\/v1\/experience$/,
    handler: () => {
      const results = home.experience.experiences.map(stripExperience);
      return ok({ count: results.length, results });
    },
  },
  {
    method: 'GET',
    match: /^\/api\/v1\/experience\/([\w-]+)$/,
    handler: (m) => {
      const exp = home.experience.experiences.find((e) => e.id === m[1]);
      return exp
        ? ok(stripExperience(exp))
        : notFound(`No experience with id "${m[1]}"`);
    },
  },
  {
    method: 'GET',
    match: /^\/api\/v1\/work$/,
    handler: () => {
      const results = home.work.projects.map(stripProject);
      return ok({ count: results.length, results });
    },
  },
  {
    method: 'GET',
    match: /^\/api\/v1\/work\/([\w-]+)$/,
    handler: (m) => {
      const project = home.work.projects.find((p) => p.id === m[1]);
      return project
        ? ok(stripProject(project))
        : notFound(`No project with id "${m[1]}"`);
    },
  },
  {
    method: 'GET',
    match: /^\/api\/v1\/social$/,
    handler: () => ok({ count: home.social.length, results: home.social }),
  },
  {
    method: 'GET',
    match: /^\/api\/v1\/contact$/,
    handler: () =>
      ok({
        email: 'dipanshu.refers@gmail.com',
        github: 'https://github.com/mdrayaanpasha',
        linkedin: 'https://www.linkedin.com/in/mdrayaanpasha/',
        preferred: 'email',
      }),
  },
];

function stripExperience(e) {
  return {
    id: e.id,
    role: e.role,
    company: e.company,
    type: e.type,
    period: e.period,
    duration: e.duration,
    location: e.location,
    isCurrent: e.isCurrent,
    highlights: e.description,
    skills: e.skills,
  };
}

function stripProject(p) {
  return {
    id: p.id,
    title: p.title,
    category: p.category,
    description: p.description,
    stack: p.tags,
    repo: p.ctaLink,
  };
}

export function resolve(method, path) {
  const cleanPath = path.split('?')[0].replace(/\/+$/, '') || '/';

  // Does the path exist under any method?
  const pathExists = ROUTES.some((r) => r.match.test(cleanPath));
  const route = ROUTES.find((r) => r.method === method && r.match.test(cleanPath));

  if (route) {
    const m = cleanPath.match(route.match);
    return route.handler(m);
  }
  if (pathExists) return methodNotAllowed(method, cleanPath);
  return notFound(`Cannot ${method} ${cleanPath}`);
}

// The collection shown in the sidebar.
export const COLLECTION = [
  {
    name: 'Profile',
    icon: '◈',
    requests: [
      { method: 'GET', path: '/api/v1/profile', name: 'Get identity' },
      { method: 'GET', path: '/api/v1/about', name: 'Get about / summary' },
      { method: 'GET', path: '/api/v1/contact', name: 'Get contact' },
    ],
  },
  {
    name: 'Experience',
    icon: '❯',
    requests: [
      { method: 'GET', path: '/api/v1/experience', name: 'List experience' },
      { method: 'GET', path: '/api/v1/experience/01', name: 'Get by id' },
      { method: 'POST', path: '/api/v1/experience', name: 'Create (read-only demo)' },
    ],
  },
  {
    name: 'Work',
    icon: '◆',
    requests: [
      { method: 'GET', path: '/api/v1/work', name: 'List projects' },
      { method: 'GET', path: '/api/v1/work/01', name: 'Get project by id' },
      { method: 'GET', path: '/api/v1/work/404', name: 'Missing project (404)' },
    ],
  },
  {
    name: 'Social',
    icon: '⌘',
    requests: [{ method: 'GET', path: '/api/v1/social', name: 'List social links' }],
  },
];
