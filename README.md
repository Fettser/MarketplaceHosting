## Начало работы

Устанавлинваем пакеты:

```bash
npm install
```

Запускаем в режиме разработки:

```bash
npm run dev
```

## Настройка Prettier и ESLint

В Webstorm:

Открываем <strong>File > Settings > Languages & Frameworks > JavaScript > Prettier</strong> ставим галочку на
форматирование сочетание клавиш.

Открываем <strong>File > Settings > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint</strong>.
Выбираем <strong>Manual ESLint configuration</strong>, в Configuration File добавляем путь к нашему .eslintrc.json

Код форматируется по комбинации <i>Ctrl+Alt+L</i>

Перед коммитами выполняем:

```bash
npm run format:fix
npm run lint
```

Удачи!!
