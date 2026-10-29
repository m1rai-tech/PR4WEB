# Практична робота №4

Варіант A — інтерактивність для сторінки альбому з ПР 3.

## Що зроблено

- **Підключення скрипту:** `app.js` у `<head>` з атрибутом `defer` — скрипт завантажується паралельно і виконується після побудови DOM.
- **Вибірка елементів:** тільки `querySelector` / `querySelectorAll`.
- **Зміна вмісту і класів:** `textContent`, `classList.add / remove / toggle`.
- **Форма відгуків:** `<form>`, подія `submit` з `event.preventDefault()`, валідація імені та тексту, створення відгуку в DOM через `createElement`, лічильник відгуків і символів.
- **Перемикач теми:** `document.body.classList.toggle('light')`.
- **Лайк:** SVG-сердечко, лічильник оновлюється в реальному часі.
- **Плеєр:** клік по треку перемикає пісню, тривалість треків підтягується через `loadedmetadata`, `keydown` Space — пауза / відтворення.
- **Події:** `click`, `input`, `keydown`, `submit`, `scroll`, `play`, `pause`, `loadedmetadata`.
- **BOM:** `window.location.href`, `navigator.clipboard`, `alert`, `window.addEventListener('scroll')`, `window.scrollY`, `setTimeout`.

## Музика

Треки: Kevin MacLeod (incompetech.com), ліцензія Creative Commons: By Attribution 4.0 — https://creativecommons.org/licenses/by/4.0/

## Висновок

У ході роботи я опанував основи роботи з DOM і BOM у JavaScript. Скрипт винесено в окремий файл і підключено з `defer`, тому він виконується тільки після повної побудови DOM-дерева і може одразу знаходити елементи. Елементи вибираються через `querySelector` і `querySelectorAll`, а вигляд інтерфейсу змінюється перемиканням CSS-класів через `classList`, без інлайн-стилів. Усі події призначено через `addEventListener`. Для форми я перехопив подію `submit` і скасував перезавантаження сторінки через `event.preventDefault()`, після чого відгук додається в DOM без перезавантаження. З BOM використано `window.location`, `navigator.clipboard`, `alert` і подію `scroll` об'єкта `window`. У результаті статична сторінка з ПР 3 стала інтерактивною.
