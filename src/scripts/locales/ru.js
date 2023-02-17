export default {
  translation: {
    aggregator: {
      header: 'RSS агрегатор',
      description: 'Начните читать RSS сегодня! Это легко, это красиво.',
      form: {
        label: 'Ссылка RSS',
        submit: 'Добавить',
      },
      hint: 'Пример: https://www.formula1.com/content/fom-website/en/latest/all.xml',
      notifications: {
        successes: {
          rssUpload: 'RSS успешно загружен',
        },
        errors: {
          validation: {
            empty: 'Не должно быть пустым',
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
      modalComponent: {
        modalBodyContent: 'Предосмотр контента ограничен ввиду недопустимости формата. Подробно ознакомиться с содержимым можно на странце источника.',
        btnRead: 'Читать полностью',
        btnClose: 'Закрыть',
      },
      languageButton: {
        passive: 'Рус',
        active: 'Выбрать английский язык',
      },
      footerText: 'Разработчик hexletart',
    },
  },
};
