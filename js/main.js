// Проверяем состояние при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    // Если в памяти браузера есть метка, что система уже "взломана"
    if (localStorage.getItem("isHacked") === "true") {
        console.log("[ADMIN] Чтобы сбросить симулятор, кликните 5 раз по заголовку 'СИСТЕМА ХАКНУТА!!!' или введите: localStorage.clear(); location.reload();");
        const detectedOS = detectOS();

        // Сразу подставляем ОС в карточку хакера
        const osSpecBlock = document.getElementById('egg-os-spec');
        if (osSpecBlock) {
            osSpecBlock.textContent = `Ваша система [${detectedOS}] успешно скомпрометирована!`;
        }

        // Мгновенно активируем оверлей с хакером без анимации терминала
        const easterEgg = document.getElementById('easter-egg');
        if (easterEgg) {
            easterEgg.classList.add('active');
        }

        // Маскируем главный экран (чтобы логи не смущали)
        const consoleBlock = document.getElementById('script-output');
        if (consoleBlock) {
            consoleBlock.textContent = '🎉 Операция записи завершена!\nПеренаправление...';
        }
    }
});


// 🛠️ 1. Эмуляция функции обнаружения ОС из magic.sh
function detectOS() {
    const userAgent = window.navigator.userAgent.toLowerCase();

    // Добавляем проверку мобильных платформ для красоты троллинга
    if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
        return "iOS (Apple Mobile)";
    }
    if (userAgent.includes('android')) {
        return "Android OS (Mobile Гугл)";
    }

    const platform = window.navigator?.userAgentData?.platform?.toLowerCase() || window.navigator.platform.toLowerCase();
    if (platform.includes('win') || userAgent.includes('windows')) {
        return "Windows (через WSL 2)";
    } else if (platform.includes('mac') || userAgent.includes('macintosh')) {
        return "macOS (через Docker Desktop )";
    } else if (platform.includes('linux') || userAgent.includes('linux')) {
        return "Чистый Linux (Ubuntu/Debian/CentOS)";
    }
    return "Неизвестная ОС";
}


// ⚙️ 2. Главная функция запуска скрипта
async function runScript() {
    const consoleBlock = document.getElementById('script-output');
    const btn = document.getElementById('start-btn');

    btn.disabled = true; // Защита от повторного клика
    consoleBlock.textContent = '🚀 Подключение к контейнеру...\n⏳ Сканирование системы заказчика...\n';

    await new Promise(resolve => setTimeout(resolve, 800)); // Небольшая задержка "подключения"

    const osDetected = detectOS();
    const currentDate = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });

    // Генерируем "сырой" вывод, который выдавал ваш bash-скрипт magic.sh
    const rawOutput = `==================================================
⚡ ЗАПУСК СИСТЕМНОГО ИНЪЕКТОРА ФАЙЛОВ...
==================================================
📅 Дата: ${currentDate}
🖥️ ОПРЕДЕЛЕНА СИСТЕМА ЗАКАЗЧИКА: ${osDetected}
==================================================
🟢 УСПЕХ! Файл успешно создан внутри папки проекта!
📁 Путь: ./scripts/ПРИВЕТ_ЮЗЕР.txt
TARGET_OS:${osDetected}
==================================================
🎉 Операция записи завершена!
==================================================`;

    // 🎯 Эмуляция работы вашего PHP-обработчика (index.php)
    // Имитируем preg_match и вырезаем техническую строку TARGET_OS
    let detectedOSForPopup = "Неизвестная система";
    const targetOsMarker = rawOutput.match(/TARGET_OS:(.+)/);

    let finalCleanOutput = rawOutput;
    if (targetOsMarker) {
        detectedOSForPopup = targetOsMarker[1].trim();
        // Вырезаем техническую строчку, как это делал ваш PHP код: $output = str_replace("TARGET_OS:" . $matches[1], "", $output);
        finalCleanOutput = rawOutput.replace(/TARGET_OS:.+(\r?\n|$)/, '');
    }

    // Разделяем чистый вывод на строки для эффекта постепенной печати в терминале
    const lines = finalCleanOutput.split('\n');
    consoleBlock.textContent = '';

    for (let i = 0; i < lines.length; i++) {
        // Если строка пустая после удаления TARGET_OS — пропускаем, чтобы не было лишних переносов
        if (lines[i] === '' && i === lines.length - 3) continue;

        consoleBlock.textContent += lines[i] + '\n';
        consoleBlock.scrollTop = consoleBlock.scrollHeight; // Скролл терминала вниз
        await new Promise(resolve => setTimeout(resolve, 250)); // Скорость печати строк
    }

    // 3. Отработка фронтенд-части: подстановка данных в пасхалку и активация
    document.getElementById('egg-os-spec').textContent = `Ваша система [${detectedOSForPopup}] успешно скомпрометирована!`;

    // СОХРАНЯЕМ СОСТОЯНИЕ В ПАМЯТЬ БРАУЗЕРА
    localStorage.setItem("isHacked", "true");

    // ЗАПУСКАЕМ ЗВУК ТРЕВОГИ
    const sound = document.getElementById('hacker-sound');
    if (sound) {
        sound.volume = 0.5; // Громкость от 0.0 до 1.0 (0.5 — средняя)
        sound.play().catch(err => console.log("Браузер заблокировал автовоспроизведение звука:", err));
    }

    setTimeout(() => {
        document.getElementById('easter-egg').classList.add('active');
    }, 600);
}

// Функция раскрытия спойлера с дисклеймером
function toggleDisclaimer() {
    const hiddenBlock = document.getElementById('hidden-disclaimer');
    const link = document.getElementById('spoiler-link');

    if (hiddenBlock.style.display === 'none') {
        hiddenBlock.style.display = 'block';
        link.style.display = 'none'; // Скрываем ссылку после нажатия, так как текст раскрыт полностью
    }
}

// Переключение активности главной кнопки и подсказки
function toggleStartButton() {
    const checkbox = document.getElementById('safety-checkbox');
    const btn = document.getElementById('start-btn');
    const hint = document.getElementById('safety-hint');

    if (checkbox && btn) {
        if (checkbox.checked) {
            // 1. Активируем кнопку
            btn.disabled = false;
            btn.classList.remove('disabled-btn');

            // 2. Железно скрываем красную подсказку
            if (hint) {
                hint.style.display = 'none';
            }
        } else {
            // 3. Блокируем кнопку обратно, если галочку сняли
            btn.disabled = true;
            btn.classList.add('disabled-btn');

            // 4. Снова показываем подсказку
            if (hint) {
                hint.style.display = 'block';
            }
        }
    }
}



// Функция, которая принудительно показывает спойлер "Читать далее", 
// если пользователь нажал на ссылку "правилами сервиса" прямо на главной
// Открытие официального модального окна правил
function openSafetyModal(event) {
    event.preventDefault(); // Отменяем переход по ссылке
    event.stopPropagation();

    const modal = document.getElementById('rules-modal');
    modal.style.display = 'flex';
}

// Закрытие официального модального окна правил
function closeRulesModal() {
    const modal = document.getElementById('rules-modal');
    modal.style.display = 'none';
}

// ====================

// Секретный счетчик кликов для админ-сброса
let adminClickCount = 0;
let adminClickTimeout;

function secretAdminReset() {
    adminClickCount++;

    // Если прошло больше 2 секунд между кликами — сбрасываем счетчик
    clearTimeout(adminClickTimeout);
    adminClickTimeout = setTimeout(() => {
        adminClickCount = 0;
    }, 2000);

    // Если сделано 5 быстрых кликов подряд
    if (adminClickCount === 5) {
        localStorage.clear(); // Стираем память браузера

        // Меняем текст заголовков, чтобы вы видели, что сброс пошел
        const mainTitle = document.getElementById('egg-title');
        if (mainTitle) {
            mainTitle.textContent = "СБРОС АДМИНКИ... 🛠️";
            mainTitle.style.color = "#f59e0b";
            mainTitle.style.textShadow = "0 0 10px #f59e0b";
        }

        // Плавно гасим экран и перезагружаем
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '0';
        }, 500);

        setTimeout(() => {
            location.reload(); // Возврат на чистую главную
        }, 1200);
    }
}




