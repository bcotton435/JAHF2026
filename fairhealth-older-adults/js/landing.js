/* =============================================================
   FAIR Health · Older Adults landing — interactions
   Vanilla JS, no dependencies. Mirrors the IIFE pattern used on
   the Alzheimer's pages.
   ============================================================= */
(function () {
  'use strict';

  // ---- Generic dropdown wiring -------------------------------
  // Returns helpers so other controls (chips) can drive selection.
  function wireDropdown(dropdown) {
    if (!dropdown) return null;
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
    function selectByText(text) {
      var matched = null;
      items.forEach(function (i) {
        var on = i.textContent.trim() === text.trim();
        i.classList.toggle('selected', on);
        if (on) matched = i;
      });
      if (matched) label.textContent = matched.textContent;
      return matched;
    }
    function selectByValue(val) {
      var matched = null;
      items.forEach(function (i) {
        var on = i.getAttribute('data-value') === val;
        i.classList.toggle('selected', on);
        if (on) matched = i;
      });
      if (matched) label.textContent = matched.textContent;
      return matched;
    }

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (dropdown.classList.contains('open')) close(); else open();
    });

    items.forEach(function (item) {
      item.addEventListener('click', function () {
        selectByText(item.textContent);
        close();
        dropdown.dispatchEvent(new CustomEvent('fh:select', {
          detail: { text: item.textContent.trim() }
        }));
      });
    });

    document.addEventListener('click', function (e) {
      if (!dropdown.contains(e.target)) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });

    return { selectByText: selectByText, selectByValue: selectByValue, items: items };
  }

  // ---- Chip groups synced to a dropdown ----------------------
  // Clicking a chip prefills the matching dropdown and lights the chip.
  function wireChips(groupKey, dd) {
    var group = document.querySelector('[data-chips="' + groupKey + '"]');
    if (!group || !dd) return;
    var chips = group.querySelectorAll('.chip');

    function paint(text) {
      chips.forEach(function (c) {
        var accent = c.getAttribute('data-accent') || 'purple';
        var on = c.textContent.trim() === (text || '').trim();
        c.classList.toggle('is-selected--orange', on && accent === 'orange');
        c.classList.toggle('is-selected--purple', on && accent === 'purple');
      });
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var text = chip.textContent.trim();
        dd.selectByText(text);
        paint(text);
      });
    });

    // Keep chips in sync when the dropdown itself changes.
    var dropdownEl = document.querySelector('[data-sync="' + groupKey + '"]');
    if (dropdownEl) {
      dropdownEl.addEventListener('fh:select', function (e) {
        paint(e.detail.text);
      });
    }
  }

  // ---- Init --------------------------------------------------
  var conditionDD = wireDropdown(document.getElementById('conditionDropdown'));
  var procedureDD = wireDropdown(document.getElementById('procedureDropdown'));
  var checklistDD = wireDropdown(document.getElementById('checklistDropdown'));

  wireChips('condition', conditionDD);
  wireChips('procedure', procedureDD);

  // Toolkit "Jump to" chips set the checklist dropdown by data-value.
  document.querySelectorAll('.jump-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      if (checklistDD) checklistDD.selectByValue(chip.getAttribute('data-target'));
    });
  });

  // Zip input — digits only, max 5.
  var zip = document.getElementById('zipInput');
  if (zip) {
    zip.addEventListener('input', function () {
      zip.value = zip.value.replace(/[^0-9]/g, '').slice(0, 5);
    });
  }
})();
