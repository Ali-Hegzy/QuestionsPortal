// ================================================================
// UNIVERSAL FLASHCARD CORE ENGINE (SIMPLE FRONT / BACK)
// ================================================================
class FlashcardEngine {
    constructor(dataset) {
        this.rawDataset = Array.isArray(dataset) ? dataset : null;
        this.validationError = this.rawDataset
            ? null
            : new Error("Flashcard data is missing or is not an array.");

        if (!this.validationError) {
            try {
                this.validateDataset();
            } catch (error) {
                this.validationError = error;
            }
        }

        this.dataset = this.rawDataset ? [...this.rawDataset] : [];
        this.activeIndex = 0;
        this.isFlipped = false;

        this.stats = {
            known: 0,
            unknown: 0,
            total: this.dataset.length,
        };
    }

    validateDataset() {
        this.rawDataset.forEach((item, index) => {
            if (!item || typeof item !== "object") {
                throw new Error(`Card ${index + 1}: item must be an object.`);
            }
            if (typeof item.front !== "string" || !item.front.trim()) {
                throw new Error(`Card ${index + 1}: "front" text is required.`);
            }
            if (typeof item.back !== "string" || !item.back.trim()) {
                throw new Error(`Card ${index + 1}: "back" text is required.`);
            }
        });
        if (!this.rawDataset.length) {
            throw new Error(
                "FlashcardEngine: at least one valid card is required.",
            );
        }
    }

    $(id) {
        return document.getElementById(id);
    }

    initEngine() {
        if (this.validationError) {
            this.$("splash").innerHTML =
                `<p class="warning-note" role="alert">Cannot start: ${this.validationError.message}</p>`;
            return;
        }
        this.$("splash").style.display = "none";
        this.$("app").style.display = "block";
        this.renderCard();
        this.updateProgress();
    }

    renderCard() {
        const item = this.dataset[this.activeIndex];
        const cardInner = this.$("flashcard-inner");

        if (!cardInner) return;

        this.isFlipped = false;
        cardInner.classList.remove("flipped");

        this.$("fc-front-text").innerHTML = this.escapeHTML(item.front);

        this.$("fc-back-content").innerHTML = this.safeReferenceHTML(item.back);

        this.updateProgress();
    }

    flipCard() {
        this.isFlipped = !this.isFlipped;
        const cardInner = this.$("flashcard-inner");
        if (cardInner) {
            if (this.isFlipped) {
                cardInner.classList.add("flipped");
            } else {
                cardInner.classList.remove("flipped");
            }
        }
    }

    rateCard(known) {
        if (known) {
            this.stats.known++;
        } else {
            this.stats.unknown++;
        }

        const cardInner = this.$("flashcard-inner");

        // إذا كانت البطاقة مقلوبة، نقوم بقلبها للوجه الأمامي أولاً وننتظر حتى تنتهي الحركة
        if (this.isFlipped && cardInner) {
            this.isFlipped = false;
            cardInner.classList.remove("flipped");

            // الانتظار لمدة 300 ملي ثانية (نصف مدة الأنيميشن) قبل تغيير محتوى البطاقة التالية لتجربة سلسة
            setTimeout(() => {
                this.proceedToNextCard();
            }, 300);
        } else {
            this.proceedToNextCard();
        }
    }

    proceedToNextCard() {
        if (this.activeIndex < this.dataset.length - 1) {
            this.activeIndex++;
            this.renderCard();
        } else {
            this.terminateSession();
        }
    }

    updateProgress() {
        const current = this.activeIndex + 1;
        const total = this.dataset.length;
        if (this.$("ratio-view"))
            this.$("ratio-view").textContent = `${current} / ${total}`;
        if (this.$("track-fill"))
            this.$("track-fill").style.width = `${(current / total) * 100}%`;
    }

    terminateSession() {
        this.$("app").style.display = "none";
        this.$("results").style.display = "block";

        const accuracy =
            Math.round((this.stats.known / this.stats.total) * 100) || 0;
        this.$("metrics-pct").textContent = `${accuracy}%`;
        this.$("metrics-known").textContent = this.stats.known;
        this.$("metrics-unknown").textContent = this.stats.unknown;
    }

    resetSimulator() {
        this.activeIndex = 0;
        this.stats = { known: 0, unknown: 0, total: this.dataset.length };
        this.$("results").style.display = "none";
        this.$("app").style.display = "block";
        this.renderCard();
    }

    escapeHTML(value) {
        return String(value ?? "").replace(
            /[&<>"']/g,
            (char) =>
                ({
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;",
                })[char],
        );
    }

    safeReferenceHTML(value) {
        const template = document.createElement("template");
        template.innerHTML = String(value ?? "");
        return template.innerHTML;
    }
}
