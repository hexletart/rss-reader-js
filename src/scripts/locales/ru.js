export default {
  translation: {
    aggregator: {
      header: 'RSS агрегатор',
      description: 'Начните читать RSS сегодня! Это легко, это красиво.',
      form: {
        label: 'Ссылка RSS',
        submit: 'Добавить',
      },
      hint: 'Пример: https://ru.hexlet.io/lessons.rss',
      notifications: {
        successes: {
          rssUpload: 'RSS успешно загружен',
        },
        errors: {
          validation: {
            notOneOf: 'RSS уже существует',
            url: 'Ссылка должна быть валидным URL',
          },
          process: {
            notValidRss: 'Ресурс не содержит валидный RSS',
            axiosError: 'Ошибка сети',
            internalError: 'Внутренняя ошибка',
          },
        },
      },
      dataSection: {
        feedBlock: {
          header: 'Фиды',
        },
        postBlock: {
          header: 'Посты',
          submit: 'Просмотр',
        },
      },
    },
  },
};
