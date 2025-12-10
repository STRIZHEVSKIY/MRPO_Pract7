const axios = require('axios');
const marked = require('marked');

const githubEvent = require(process.env.GITHUB_EVENT_PATH);
const issue = githubEvent.issue;

const BOOKSTACK_API_URL = process.env.BOOKSTACK_API_URL;
const BOOKSTACK_API_TOKEN_ID = process.env.BOOKSTACK_API_TOKEN_ID;
const BOOKSTACK_API_TOKEN_SECRET = process.env.BOOKSTACK_API_TOKEN_SECRET;

const pageTitle = issue.title;
const pageContent = marked.parse(issue.body);

async function createOrUpdatePage() {
  try {
    const res = await axios.post(
      `${BOOKSTACK_API_URL}/api/pages`,
      {
        name: pageTitle,
        html: pageContent,
        book_id: 1,
        slug: pageTitle.toLowerCase().replace(/ /g, '-')
      },
      {
        auth: {
          username: BOOKSTACK_API_TOKEN_ID,
          password: BOOKSTACK_API_TOKEN_SECRET
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('Page created:', res.data);
  } catch (error) {
    console.error('Error creating/updating page:', error.response?.data || error.message);
    process.exit(1);
  }
}

createOrUpdatePage();
