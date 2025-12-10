const axios = require('axios');
const marked = require('marked');

const githubEvent = require(process.env.GITHUB_EVENT_PATH);
const issue = githubEvent.issue;

const BOOKSTACK_API_URL = process.env.BOOKSTACK_API_URL;
const BOOKSTACK_API_TOKEN = process.env.BOOKSTACK_API_TOKEN;

const pageTitle = issue.title;
const pageContent = marked.parse(issue.body);

async function createOrUpdatePage() {
  try {
    // POST запрос на создание страницы в BookStack
    const res = await axios.post(`${BOOKSTACK_API_URL}/api/pages`, {
      name: pageTitle,
      html: pageContent,
      // id книги или раздела можно настроить заранее
      book_id: 1,
      slug: pageTitle.toLowerCase().replace(/ /g, '-')
    }, {
      headers: {
        Authorization: `Token ${BOOKSTACK_API_TOKEN}`
      }
    });
    console.log('Page created:', res.data);
  } catch (error) {
    console.error('Error creating/updating page:', error.response?.data || error.message);
    process.exit(1);
  }
}

createOrUpdatePage();
