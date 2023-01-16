export default {
  translation: {
    aggregator: {
      headerName: 'RSS агрегатор',
      description: 'Начните читать RSS сегодня! Это легко, это красиво.',
      form: {
        inputLabel: 'Ссылка RSS',
        submitLabel: 'Добавить',
      },
      fieldHint: 'Example: https://ru.hexlet.io/lessons.rss',
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
    },
  },
};
