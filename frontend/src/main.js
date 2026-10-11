/*
 * Portfolio — Saindou Moudathirou Ben
 * Démonstration « réponse tracée », sommaire mobile, filtres des résultats, formulaire de contact.
 * Tout contenu dynamique passe par textContent / createElement (jamais innerHTML).
 */
(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    function canAnimate() {
        return !reduceMotion.matches && typeof window.gsap !== 'undefined';
    }

    /* ------------------------------------------------------------------
     * Démonstrations (documents fictifs)
     * ------------------------------------------------------------------ */
    var DEMOS = {
        protocole: {
            question: 'Quels sont les critères d’exclusion de l’étude ?',
            answer: [
                'Sont exclus les participants sous traitement hypolipémiant depuis moins de 3 mois ', { cite: 1 },
                ' et les femmes enceintes ou allaitantes ', { cite: 2 }, '.'
            ],
            ref: 'Protocole NUT-042 (fictif), version 2.1, page 12',
            text: [
                { strong: '5.2 Critères de non-inclusion.' }, ' ',
                { mark: 1, text: '(a) traitement hypolipémiant initié depuis moins de 3 mois ;' }, ' ',
                { mark: 2, text: '(b) grossesse ou allaitement en cours ;' },
                ' (c) participation à une autre étude dans les 30 jours précédant l’inclusion.'
            ],
            stamp: '2/2 citations à la source'
        },
        appel: {
            question: 'Cet avis correspond-il à nos prestations ?',
            answer: [
                'Oui : le lot 2 porte sur l’analyse statistique d’un essai clinique ', { cite: 1 },
                '. Date limite de réponse : 14 novembre ', { cite: 2 }, '. Avis transmis à l’équipe commerciale.'
            ],
            ref: 'Avis de marché n° 26-1187 (fictif), page 3',
            text: [
                { strong: 'Section II. Objet.' }, ' Lot 1 : fourniture de matériel de laboratoire. ',
                { mark: 1, text: 'Lot 2 : analyse statistique et rédaction du rapport d’un essai clinique de phase II.' },
                ' ', { strong: 'Section IV.' }, ' ',
                { mark: 2, text: 'Date limite de réception des offres : 14/11/2026 à 12h00.' }
            ],
            stamp: '2/2 citations à la source'
        },
        alerte: {
            question: 'Qu’est-ce qui change pour nos dispositifs de classe IIb ?',
            answer: [
                'Le rapport périodique de sécurité doit être mis à jour au moins une fois par an ', { cite: 1 },
                ', et transmis à l’organisme notifié ', { cite: 2 }, '.'
            ],
            ref: 'Note d’autorité (fictive), juillet 2026, § 4',
            text: [
                { strong: '§ 4. Surveillance après commercialisation.' }, ' Pour les dispositifs de classe IIb et III, ',
                { mark: 1, text: 'le rapport périodique actualisé de sécurité est mis à jour au moins une fois par an' },
                ' ', { mark: 2, text: 'et communiqué à l’organisme notifié concerné.' }
            ],
            stamp: '2/2 citations à la source'
        }
    };

    function el(tag, className, text) {
        var node = document.createElement(tag);
        if (className) node.className = className;
        if (text != null) node.textContent = text;
        return node;
    }

    // Découpe un texte en mots animables, en conservant les espaces.
    function appendWords(parent, text) {
        text.split(/( +)/).forEach(function (chunk) {
            if (!chunk) return;
            if (/^ +$/.test(chunk)) {
                parent.appendChild(document.createTextNode(chunk));
            } else {
                parent.appendChild(el('span', 'w', chunk));
            }
        });
    }

    function initDemo() {
        var panel = document.getElementById('demo-panel');
        if (!panel) return;

        var tabs = Array.prototype.slice.call(document.querySelectorAll('.demo__tab'));
        var slots = {
            question: panel.querySelector('[data-slot="question"]'),
            answer: panel.querySelector('[data-slot="answer"]'),
            ref: panel.querySelector('[data-slot="ref"]'),
            text: panel.querySelector('[data-slot="text"]'),
            stamp: panel.querySelector('[data-slot="stamp"]'),
            stampDetail: panel.querySelector('[data-slot="stamp-detail"]')
        };
        var replay = document.querySelector('[data-replay]');
        var current = 'protocole';
        var timeline = null;

        function render(key) {
            var demo = DEMOS[key];
            slots.question.textContent = demo.question;

            slots.answer.textContent = '';
            demo.answer.forEach(function (part) {
                if (typeof part === 'string') {
                    appendWords(slots.answer, part);
                } else {
                    var cite = el('span', 'cite', '[' + part.cite + ']');
                    cite.setAttribute('data-ref', String(part.cite));
                    slots.answer.appendChild(cite);
                }
            });

            slots.ref.textContent = demo.ref;
            slots.text.textContent = '';
            demo.text.forEach(function (part) {
                if (typeof part === 'string') {
                    slots.text.appendChild(document.createTextNode(part));
                } else if (part.strong) {
                    slots.text.appendChild(el('strong', null, part.strong));
                } else {
                    var mark = el('mark', null, part.text);
                    mark.setAttribute('data-ref', String(part.mark));
                    slots.text.appendChild(mark);
                }
            });

            slots.stampDetail.textContent = demo.stamp;
            slots.stamp.setAttribute('aria-label', 'Vérifié : ' + demo.stamp);
        }

        function play() {
            if (timeline) {
                timeline.kill();
                timeline = null;
            }
            if (!canAnimate()) return;

            var gsap = window.gsap;
            var words = slots.answer.querySelectorAll('.w');
            var cites = slots.answer.querySelectorAll('.cite');
            var marks = slots.text.querySelectorAll('mark');

            gsap.set(words, { opacity: 0, y: 4 });
            gsap.set(cites, { opacity: 0, scale: 0.6 });
            gsap.set(marks, { '--hl': '0%' });
            gsap.set(slots.stamp, { opacity: 0, scale: 1.35, rotation: -12 });

            timeline = gsap.timeline({ defaults: { ease: 'expo.out' } });
            timeline
                .to(words, { opacity: 1, y: 0, duration: 0.4, stagger: 0.035 }, 0.15)
                .to(cites, { opacity: 1, scale: 1, duration: 0.35, stagger: 0.18, ease: 'back.out(2.2)' }, '-=0.25')
                .to(marks, { '--hl': '100%', duration: 0.6, stagger: 0.28, ease: 'power2.inOut' }, '-=0.1')
                .to(slots.stamp, { opacity: 1, scale: 1, rotation: -6, duration: 0.45, ease: 'expo.out' }, '+=0.15');
        }

        function select(key, focus) {
            current = key;
            tabs.forEach(function (tab) {
                var selected = tab.getAttribute('data-demo') === key;
                tab.setAttribute('aria-selected', selected ? 'true' : 'false');
                tab.tabIndex = selected ? 0 : -1;
                if (selected) {
                    panel.setAttribute('aria-labelledby', tab.id);
                    if (focus) tab.focus();
                }
            });
            render(key);
            play();
        }

        tabs.forEach(function (tab, index) {
            tab.addEventListener('click', function () {
                select(tab.getAttribute('data-demo'), false);
            });
            tab.addEventListener('keydown', function (event) {
                var next = null;
                if (event.key === 'ArrowRight') next = tabs[(index + 1) % tabs.length];
                if (event.key === 'ArrowLeft') next = tabs[(index - 1 + tabs.length) % tabs.length];
                if (event.key === 'Home') next = tabs[0];
                if (event.key === 'End') next = tabs[tabs.length - 1];
                if (next) {
                    event.preventDefault();
                    select(next.getAttribute('data-demo'), true);
                }
            });
        });

        if (replay) {
            replay.addEventListener('click', function () {
                render(current);
                play();
            });
        }

        // Survol d'une citation : relie le marqueur au passage source.
        function link(ref, on) {
            panel.querySelectorAll('[data-ref="' + ref + '"]').forEach(function (node) {
                node.classList.toggle('is-active', on);
            });
        }
        panel.addEventListener('mouseover', function (event) {
            var target = event.target.closest('[data-ref]');
            if (target) link(target.getAttribute('data-ref'), true);
        });
        panel.addEventListener('mouseout', function (event) {
            var target = event.target.closest('[data-ref]');
            if (target) link(target.getAttribute('data-ref'), false);
        });

        // Séquence de première visite, une seule fois, une fois les polices prêtes.
        if (canAnimate()) {
            render(current);
            var start = function () { window.setTimeout(play, 250); };
            if (document.fonts && document.fonts.ready) {
                document.fonts.ready.then(start, start);
            } else {
                start();
            }
        }
    }

    /* ------------------------------------------------------------------
     * Sommaire mobile et en-tête
     * ------------------------------------------------------------------ */
    function initNav() {
        var toggle = document.querySelector('.nav-toggle');
        var nav = document.getElementById('site-nav');
        var masthead = document.getElementById('masthead');
        if (!toggle || !nav) return;

        function setOpen(open) {
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            nav.classList.toggle('is-open', open);
        }

        toggle.addEventListener('click', function () {
            setOpen(toggle.getAttribute('aria-expanded') !== 'true');
        });
        nav.addEventListener('click', function (event) {
            if (event.target.closest('a')) setOpen(false);
        });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
                setOpen(false);
                toggle.focus();
            }
        });

        if (masthead) {
            var ticking = false;
            window.addEventListener('scroll', function () {
                if (ticking) return;
                ticking = true;
                window.requestAnimationFrame(function () {
                    masthead.classList.toggle('is-scrolled', window.scrollY > 8);
                    ticking = false;
                });
            }, { passive: true });
        }
    }

    /* ------------------------------------------------------------------
     * Filtres des résultats
     * ------------------------------------------------------------------ */
    function initFilters() {
        var buttons = Array.prototype.slice.call(document.querySelectorAll('.filter'));
        var cases = Array.prototype.slice.call(document.querySelectorAll('.case'));
        var status = document.getElementById('filter-status');
        if (!buttons.length) return;

        buttons.forEach(function (button) {
            button.addEventListener('click', function () {
                var filter = button.getAttribute('data-filter');
                buttons.forEach(function (b) {
                    b.setAttribute('aria-pressed', b === button ? 'true' : 'false');
                });

                var shown = 0;
                cases.forEach(function (item) {
                    var visible = filter === 'all' || item.getAttribute('data-sector') === filter;
                    var wasHidden = item.hidden;
                    item.hidden = !visible;
                    if (visible) {
                        shown += 1;
                        if (wasHidden && !reduceMotion.matches && item.animate) {
                            item.animate(
                                [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }],
                                { duration: 320, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
                            );
                        }
                    }
                });
                if (status) status.textContent = shown + (shown > 1 ? ' projets affichés' : ' projet affiché');
            });
        });
    }

    /* ------------------------------------------------------------------
     * Formulaire de contact
     * ------------------------------------------------------------------ */
    var MESSAGES = {
        name: {
            valueMissing: 'Indiquez votre nom.',
            tooShort: 'Votre nom doit faire au moins 2 caractères.'
        },
        email: {
            valueMissing: 'Indiquez votre email.',
            typeMismatch: 'Cet email ne semble pas valide (exemple : nom@entreprise.fr).'
        },
        message: {
            valueMissing: 'Décrivez votre besoin en quelques mots.',
            tooShort: 'Ajoutez quelques mots de plus (5 caractères minimum).'
        }
    };
    var FALLBACK_ERROR = 'L’envoi n’a pas abouti. Réessayez ou écrivez-moi à kymsaindou@gmail.com.';

    function initForm() {
        var form = document.getElementById('contact-form');
        if (!form) return;

        var status = document.getElementById('form-status');
        var submit = form.querySelector('button[type="submit"]');
        var startedAt = Date.now();
        var attempted = false;

        function fieldError(input) {
            var rules = MESSAGES[input.name];
            if (!rules) return '';
            var v = input.validity;
            if (v.valueMissing || (input.value.trim() === '' && input.required)) return rules.valueMissing;
            if (v.tooShort || (input.minLength > 0 && input.value.trim().length < input.minLength)) return rules.tooShort || '';
            if (v.typeMismatch) return rules.typeMismatch || '';
            return '';
        }

        function showError(input, message) {
            var box = document.getElementById(input.id + '-error');
            if (!box) return;
            box.textContent = message;
            box.hidden = !message;
            if (message) {
                input.setAttribute('aria-invalid', 'true');
            } else {
                input.removeAttribute('aria-invalid');
            }
        }

        function validate(input) {
            var message = fieldError(input);
            showError(input, message);
            return !message;
        }

        ['name', 'email', 'message'].forEach(function (name) {
            var input = form.elements[name];
            input.addEventListener('blur', function () {
                if (attempted || input.value.trim() !== '') validate(input);
            });
            input.addEventListener('input', function () {
                if (input.getAttribute('aria-invalid') === 'true') validate(input);
            });
        });

        function setStatus(message, kind) {
            status.textContent = message;
            status.classList.toggle('is-success', kind === 'success');
            status.classList.toggle('is-error', kind === 'error');
        }

        function readError(response, body) {
            if (response.status === 429) return 'Trop d’envois en peu de temps. Réessayez dans une minute.';
            if (response.status === 422) return 'Vérifiez les champs du formulaire puis renvoyez-le.';
            if (body && typeof body.detail === 'string') return body.detail;
            return FALLBACK_ERROR;
        }

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            attempted = true;

            var invalid = ['name', 'email', 'message']
                .map(function (name) { return form.elements[name]; })
                .filter(function (input) { return !validate(input); });
            if (invalid.length) {
                setStatus('Le formulaire contient ' + invalid.length + (invalid.length > 1 ? ' erreurs.' : ' erreur.'), 'error');
                invalid[0].focus();
                return;
            }

            var payload = {
                name: form.elements.name.value.trim(),
                email: form.elements.email.value.trim(),
                type: form.elements.type.value,
                message: form.elements.message.value.trim(),
                website: form.elements.website.value,
                elapsed_ms: Date.now() - startedAt
            };

            submit.disabled = true;
            submit.textContent = 'Envoi en cours…';
            setStatus('', null);

            fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(payload)
            })
                .then(function (response) {
                    return response.json().catch(function () { return null; }).then(function (body) {
                        if (response.ok) {
                            setStatus((body && body.message) || 'Message envoyé. Je vous réponds sous 24 h ouvrées.', 'success');
                            form.reset();
                            attempted = false;
                            startedAt = Date.now();
                        } else {
                            setStatus(readError(response, body), 'error');
                        }
                    });
                })
                .catch(function () {
                    setStatus('Connexion impossible. Vérifiez votre réseau ou écrivez-moi à kymsaindou@gmail.com.', 'error');
                })
                .then(function () {
                    submit.disabled = false;
                    submit.textContent = submit.getAttribute('data-label') || 'Envoyer la demande';
                });
        });
    }

    function init() {
        initNav();
        initDemo();
        initFilters();
        initForm();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
