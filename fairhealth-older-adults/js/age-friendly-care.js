/* =============================================================
   FAIR Health · Age-Friendly Care — interactions
   Toolkit checklist dropdown. Vanilla JS, no dependencies.
   ============================================================= */
(function () {
  'use strict';

  var dropdown = document.getElementById('checklistDropdown');
  if (!dropdown) return;

  var trigger = dropdown.querySelector('.dropdown-trigger');
  var label = dropdown.querySelector('.dropdown-label');
  var items = dropdown.querySelectorAll('li[role="option"]');

  function close() {
    dropdown.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
  }
  function open() {
    dropdown.classList.add('open');
    trigger.setAttribute('aria-expanded', 'true');
  }
  function select(item) {
    items.forEach(function (i) { i.classList.toggle('selected', i === item); });
    label.textContent = item.textContent;
  }

  trigger.addEventListener('click', function (e) {
    e.stopPropagation();
    if (dropdown.classList.contains('open')) close(); else open();
  });

  items.forEach(function (item) {
    item.addEventListener('click', function () {
      select(item);
      close();
    });
  });

  // "Jump to" tags select the matching checklist by data-value.
  document.querySelectorAll('.toolkit-tag').forEach(function (tag) {
    tag.addEventListener('click', function () {
      var target = tag.getAttribute('data-target');
      var match = Array.prototype.slice.call(items).find(function (i) {
        return i.getAttribute('data-value') === target;
      });
      if (match) select(match);
    });
  });

  document.addEventListener('click', function (e) {
    if (!dropdown.contains(e.target)) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
})();
