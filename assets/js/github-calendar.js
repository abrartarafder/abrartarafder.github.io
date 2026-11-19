(async function loadGitHubCalendar() {
  const status = document.querySelector('[data-calendar-status]');
  const content = document.querySelector('[data-calendar-content]');
  const grid = document.querySelector('[data-calendar-grid]');
  const detail = document.querySelector('[data-calendar-detail]');
  const monthFormat = new Intl.DateTimeFormat('en-CA', { month: 'short', timeZone: 'UTC' });
  const dateFormat = new Intl.DateTimeFormat('en-CA', { dateStyle: 'full', timeZone: 'UTC' });
  const formatCount = count => `${count.toLocaleString('en-CA')} ${count === 1 ? 'contribution' : 'contributions'}`;

  status.textContent = 'Loading contribution activity…';

  try {
    const response = await fetch('https://github-contributions-api.jogruber.de/v4/abrartarafder?y=last', {
      signal: AbortSignal.timeout(8000),
      referrerPolicy: 'no-referrer',
      credentials: 'omit',
    });
    if (!response.ok) throw new Error('Contribution data unavailable');

    const { contributions } = await response.json();
    const days = contributions.map(({ date, count, level }) => ({
      date: new Date(`${date}T00:00:00Z`), count, level,
    }));
    const dayInMilliseconds = 86_400_000;
    if (!days.length || days.some(({ date, count, level }, index) =>
      !Number.isFinite(date.getTime()) ||
      !Number.isSafeInteger(count) || count < 0 ||
      !Number.isInteger(level) || level < 0 || level > 4 ||
      (index > 0 && date - days[index - 1].date !== dayInMilliseconds)
    )) throw new Error('Invalid contribution data');

    const offset = days[0].date.getUTCDay();
    const weeks = Math.ceil((days.length + offset) / 7);
    const cells = document.createDocumentFragment();
    grid.style.setProperty('--weeks', weeks);

    function addMonthLabel(date, column) {
      const label = document.createElement('span');
      label.className = 'github-calendar__label';
      label.style.gridArea = `1 / ${column}`;
      label.setAttribute('aria-hidden', 'true');
      label.textContent = monthFormat.format(date);
      cells.append(label);
    }

    const buttons = days.map(({ date, count, level }, index) => {
      const column = Math.floor((index + offset) / 7) + 1;
      if (date.getUTCDate() === 1) addMonthLabel(date, Math.min(column, Math.max(1, weeks - 1)));

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'github-calendar__day';
      button.style.gridArea = `${date.getUTCDay() + 2} / ${column}`;
      button.dataset.level = level;
      button.dataset.index = index;
      button.setAttribute('aria-label', `${dateFormat.format(date)} · ${formatCount(count)}`);
      button.tabIndex = -1;
      cells.append(button);
      return button;
    });

    let selectedDay = buttons.at(-1);
    function showDay(day) {
      detail.textContent = day.getAttribute('aria-label');
      detail.hidden = false;
    }
    function selectDay(day) {
      selectedDay.tabIndex = -1;
      selectedDay = day;
      selectedDay.tabIndex = 0;
      showDay(day);
    }

    const daySelector = '.github-calendar__day';
    grid.addEventListener('pointerover', event => {
      if (event.target.matches(daySelector)) showDay(event.target);
    });
    grid.addEventListener('pointerleave', () => {
      if (grid.contains(document.activeElement)) showDay(selectedDay);
      else detail.hidden = true;
    });
    grid.addEventListener('click', event => {
      if (event.target.matches(daySelector)) selectDay(event.target);
    });
    grid.addEventListener('focusin', event => {
      if (event.target.matches(daySelector)) selectDay(event.target);
    });
    grid.addEventListener('keydown', event => {
      if (!event.target.matches(daySelector) || event.altKey || event.ctrlKey || event.metaKey) return;
      const offsets = { ArrowLeft: -7, ArrowRight: 7, ArrowUp: -1, ArrowDown: 1 };
      if (!(event.key in offsets)) return;
      event.preventDefault();
      buttons[Number(event.target.dataset.index) + offsets[event.key]]?.focus();
    });

    grid.replaceChildren(cells);
    selectedDay.tabIndex = 0;
    status.textContent = `${formatCount(days.reduce((total, day) => total + day.count, 0))} in the last year`;
    content.hidden = false;
    grid.parentElement.scrollLeft = grid.parentElement.scrollWidth;
  } catch {
    status.textContent = 'Contribution activity is temporarily unavailable.';
  }
})();
