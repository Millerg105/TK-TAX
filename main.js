/* ============================================================
   TK TAX CONSULTANTS - Main JavaScript
   Navigation, smooth scroll, form validation, FAQ
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');
  var nav = document.getElementById('nav');
  var hero = document.getElementById('top');
  var pagesDropdown = document.getElementById('pagesDropdown');
  var pagesDropdownToggle = document.getElementById('pagesDropdownToggle');

  function closePagesDropdown() {
    if (pagesDropdown) {
      pagesDropdown.classList.remove('is-open');
    }
    if (pagesDropdownToggle) {
      pagesDropdownToggle.setAttribute('aria-expanded', 'false');
    }
  }

  function togglePagesDropdown() {
    if (!pagesDropdown || !pagesDropdownToggle) {
      return;
    }

    var willOpen = !pagesDropdown.classList.contains('is-open');
    pagesDropdown.classList.toggle('is-open', willOpen);
    pagesDropdownToggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
  }

  function closeMobileMenu() {
    if (hamburger) {
      hamburger.classList.remove('active');
    }
    if (navLinks) {
      navLinks.classList.remove('open');
    }
    closePagesDropdown();
    document.body.style.overflow = '';
  }

  function getScrollTop(target) {
    var navHeight = nav ? nav.offsetHeight : 0;
    return target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        closeMobileMenu();
      });
    });
  }

  if (pagesDropdownToggle) {
    pagesDropdownToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      togglePagesDropdown();
    });
  }

  document.addEventListener('click', function (e) {
    if (pagesDropdown && !pagesDropdown.contains(e.target)) {
      closePagesDropdown();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closePagesDropdown();
      closeMobileMenu();
    }
  });

  if (nav) {
    var updateNavState = function () {
      if (window.scrollY > 10) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }

      if (nav.classList.contains('nav--overlay') && hero) {
        var solidThreshold = Math.max(hero.offsetHeight - nav.offsetHeight - 48, 40);
        nav.classList.toggle('nav--solid', window.scrollY > solidThreshold);
      }
    };

    window.addEventListener('scroll', updateNavState);
    window.addEventListener('resize', updateNavState);
    updateNavState();
  }

  var navAnchorLinks = document.querySelectorAll('.nav__primary-links > a[href^="#"]');
  var sections = document.querySelectorAll('section[id]');

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href').substring(1);
      var target = document.getElementById(targetId);

      if (target) {
        e.preventDefault();
        window.scrollTo({ top: getScrollTop(target), behavior: 'smooth' });
        if (targetId) {
          window.history.replaceState(null, '', '#' + targetId);
        }
      }
    });
  });

  if (window.location.hash) {
    setTimeout(function () {
      var targetId = window.location.hash.substring(1);
      var target = document.getElementById(targetId);
      if (target) {
        window.scrollTo({ top: getScrollTop(target), behavior: 'smooth' });
      }
    }, 120);
  }

  if (sections.length > 0 && navAnchorLinks.length > 0 && 'IntersectionObserver' in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navAnchorLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, {
      rootMargin: '-45% 0px -45% 0px',
      threshold: 0
    });

    sections.forEach(function (section) {
      navObserver.observe(section);
    });
  }

  function setupForm(options) {
    var form = document.getElementById(options.formId);
    var success = document.getElementById(options.successId);

    if (!form) {
      return;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var isValid = true;

      options.fields.forEach(function (fieldConfig) {
        var field = document.getElementById(fieldConfig.id);
        var group = document.getElementById(fieldConfig.groupId);

        if (!field || !group) {
          return;
        }

        var value = field.value.trim();
        var valid = true;

        if (fieldConfig.required && !value) {
          valid = false;
        }

        if (valid && fieldConfig.type === 'email' && value && !emailRegex.test(value)) {
          valid = false;
        }

        group.classList.toggle('error', !valid);
        if (!valid) {
          isValid = false;
        }
      });

      if (isValid) {
        form.style.display = 'none';
        if (success) {
          success.style.display = 'block';
        }
      }
    });

    form.querySelectorAll('input, textarea, select').forEach(function (field) {
      field.addEventListener('input', function () {
        var group = this.closest('.form-group');
        if (group) {
          group.classList.remove('error');
        }
      });
      field.addEventListener('change', function () {
        var group = this.closest('.form-group');
        if (group) {
          group.classList.remove('error');
        }
      });
    });
  }

  setupForm({
    formId: 'contactForm',
    successId: 'formSuccess',
    fields: [
      { id: 'name', groupId: 'nameGroup', required: true },
      { id: 'email', groupId: 'emailGroup', required: true, type: 'email' },
      { id: 'message', groupId: 'messageGroup', required: true }
    ]
  });

  setupForm({
    formId: 'heroForm',
    successId: 'heroFormSuccess',
    fields: [
      { id: 'heroName', groupId: 'heroNameGroup', required: true },
      { id: 'heroEmail', groupId: 'heroEmailGroup', required: true, type: 'email' }
    ]
  });

  document.querySelectorAll('.faq-question').forEach(function (button) {
    button.addEventListener('click', function () {
      var item = this.closest('.faq-item');
      var answer = item ? item.querySelector('.faq-answer') : null;
      var isOpen = item ? item.classList.contains('is-open') : false;

      document.querySelectorAll('.faq-item').forEach(function (faqItem) {
        faqItem.classList.remove('is-open');
        var faqButton = faqItem.querySelector('.faq-question');
        var faqAnswer = faqItem.querySelector('.faq-answer');
        if (faqButton) {
          faqButton.setAttribute('aria-expanded', 'false');
        }
        if (faqAnswer) {
          faqAnswer.style.maxHeight = null;
        }
      });

      if (!isOpen && item && answer) {
        item.classList.add('is-open');
        this.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  var revealElements = document.querySelectorAll(
    '.service-card, .audience-block, .why-item, .value-card, .resource-card, .trust-bar__item, .journey-step, .stat-card, .faq-item, .logo-pill, .reveal-on-scroll'
  );

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    revealElements.forEach(function (el) {
      if (!el.classList.contains('reveal-on-scroll')) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      }
    });

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var parent = entry.target.parentElement;
          var delay = parent ? Array.from(parent.children).indexOf(entry.target) * 90 : 0;

          setTimeout(function () {
            if (entry.target.classList.contains('reveal-on-scroll')) {
              entry.target.classList.add('is-visible');
            } else {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }
          }, delay);

          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }
});
