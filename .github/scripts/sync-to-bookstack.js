const axios = require('axios');
const marked = require('marked');
const fs = require('fs');

// Загружаем GitHub Event
const githubEvent = require(process.env.GITHUB_EVENT_PATH);
const issue = githubEvent.issue;

// Переменные окружения
const BOOKSTACK_API_URL = process.env.BOOKSTACK_API_URL;
const BOOKSTACK_API_TOKEN = process.env.BOOKSTACK_API_TOKEN;

// Название и содержимое страницы
const pageTitle = issue.title;
const pageContent = marked.parse(issue.body);

// Функция создания или обновления страницы
async function createOrUpdatePage() {
  try {
    const res = await axios.post(`${BOOKSTACK_API_URL}/api/pages`, {
      name: pageTitle,
      html: pageContent,
      book_id: 1, // замените на нужный ID книги
      slug: pageTitle.toLowerCase().replace(/ /g, '-')
    }, {
      headers: {
        'Authorization': `Bearer ${BOOKSTACK_API_TOKEN}`, // исправлено
        'Content-Type': 'application/json'
      },
      timeout: 10000 // 10 секунд
    });

    console.log('Page created/updated successfully:', res.data);
  } catch (error) {
    // Более информативный вывод ошибки
    if (error.response) {
      console.error('Error creating/updating page:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('No response received from BookStack API:', error.message);
    } else {
      console.error('Request setup error:', error.message);
    }
    process.exit(1);
  }
}

createOrUpdatePage();
