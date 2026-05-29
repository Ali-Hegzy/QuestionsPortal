// ================================================================
// UNIVERSAL QUIZ CORE ENGINE (OOP REUSABLE ARCHITECTURE)
// ================================================================
class QuizEngine {
    constructor(dataset, durationInMinutes = 60) {
        if (!dataset || !Array.isArray(dataset)) {
            throw new Error(
                "QuizEngine: Valid dataset array is required for initialization.",
            );
        }

        // أخذ نسخة عميقة وفصلها عن المصفوفة الأصلية لتجنب تدمير الترتيب الأصلي
        // ثم خلط الأسئلة تلقائياً عند توليد الكائن
        this.dataset = this.shuffleDataset([...dataset]);

        this.totalDuration = durationInMinutes * 60;
        this.durationInMinutes = durationInMinutes;
        this.secondsLeft = this.totalDuration;
        this.elapsedSeconds = 0;
        this.activeIndex = 0;

        this.userAnswers = new Array(this.dataset.length).fill(null);
        this.stateLocked = new Array(this.dataset.length).fill(false);
        this.engineTimer = null;

        this.setupDynamicMeta();
    }

    $(id) {
        return document.getElementById(id);
    }

    // خوارزمية Fisher-Yates لخلط كتل المصفوفة الرياضية بشكل عادل
    shuffleDataset(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    evaluateAnswer(i) {
        // الأسئلة المقالية لا تملك تصحيحاً تلقائياً رقمياً
        if (this.dataset[i].type === "essay") return null;
        return (
            this.userAnswers[i] !== null &&
            this.userAnswers[i] === this.dataset[i].ans
        );
    }

    setupDynamicMeta() {
        const splashMaxQ = this.$("quest-num");
        if (splashMaxQ) splashMaxQ.textContent = this.dataset.length;

        const splashMaxTime = this.$("time-num");
        if (splashMaxTime) splashMaxTime.textContent = this.durationInMinutes;

        const clockView = this.$("clock");
        if (clockView) {
            const displayM = String(this.durationInMinutes).padStart(2, "0");
            clockView.textContent = `${displayM}:00`;
        }
    }

    startTimer() {
        if (this.engineTimer) clearInterval(this.engineTimer);

        this.engineTimer = setInterval(() => {
            if (this.secondsLeft <= 0) {
                clearInterval(this.engineTimer);
                this.terminateSession();
                return;
            }
            this.secondsLeft--;
            this.elapsedSeconds++;

            const displayM = String(Math.floor(this.secondsLeft / 60)).padStart(
                2,
                "0",
            );
            const displayS = String(this.secondsLeft % 60).padStart(2, "0");
            const clockView = this.$("clock");
            if (clockView) {
                clockView.textContent = `${displayM}:${displayS}`;
                clockView.className =
                    "timer" +
                    (this.secondsLeft < 120
                        ? " danger"
                        : this.secondsLeft < 300
                          ? " warn"
                          : "");
            }
        }, 1000);
    }

    initEngine() {
        this.$("splash").style.display = "none";
        this.$("app").style.display = "block";
        this.generateNodeMap();
        this.jumpToNode(0);
        this.startTimer();
    }

    generateNodeMap() {
        const mapGrid = this.$("node-map");
        if (!mapGrid) return;
        mapGrid.innerHTML = "";
        this.dataset.forEach((_, i) => {
            const node = document.createElement("div");
            node.className = "map-node";
            node.id = `node-${i}`;
            node.textContent = i + 1;
            node.onclick = () => this.jumpToNode(i);
            mapGrid.appendChild(node);
        });
    }

    updateNodeLayout() {
        this.dataset.forEach((item, i) => {
            const node = this.$(`node-${i}`);
            if (!node) return;
            node.className = "map-node";
            if (i === this.activeIndex) {
                node.classList.add("active");
            } else if (this.userAnswers[i] !== null) {
                if (item.type === "essay") {
                    node.classList.add("essay-done"); // لون مخصص للمقال المكتمل
                } else {
                    node.classList.add(
                        this.evaluateAnswer(i) ? "correct" : "wrong",
                    );
                }
            }
        });

        let correctCount = 0,
            faultCount = 0;
        this.userAnswers.forEach((ans, i) => {
            if (ans !== null && this.dataset[i].type !== "essay") {
                this.evaluateAnswer(i) ? correctCount++ : faultCount++;
            }
        });

        if (this.$("live-ok"))
            this.$("live-ok").textContent = `✓ ${correctCount}`;
        if (this.$("live-bad"))
            this.$("live-bad").textContent = `✗ ${faultCount}`;
    }

    jumpToNode(index) {
        if (index < 0 || index >= this.dataset.length) return;
        this.activeIndex = index;
        this.updateNodeLayout();
        this.refreshProgressMetrics();
        this.renderActivePayload();
    }

    refreshProgressMetrics() {
        const answeredCount = this.userAnswers.filter((a) => a !== null).length;
        if (this.$("ratio-view"))
            this.$("ratio-view").textContent =
                `${answeredCount} / ${this.dataset.length}`;
        if (this.$("track-fill"))
            this.$("track-fill").style.width =
                `${(answeredCount / this.dataset.length) * 100}%`;

        if (this.$("ctrl-prev"))
            this.$("ctrl-prev").disabled = this.activeIndex === 0;
        if (this.$("ctrl-next"))
            this.$("ctrl-next").disabled =
                this.activeIndex === this.dataset.length - 1;
        if (this.$("ctrl-fin"))
            this.$("ctrl-fin").style.display = this.userAnswers.every(
                (a) => a !== null,
            )
                ? "inline-block"
                : "none";
    }

    navigate(direction) {
        this.jumpToNode(this.activeIndex + direction);
    }

    renderActivePayload() {
        const item = this.dataset[this.activeIndex];
        const isLocked = this.stateLocked[this.activeIndex];
        const currentSelection = this.userAnswers[this.activeIndex];

        let payloadBody = "";
        let explanationMarkup = "";

        if (item.type === "tf") {
            const trueClass = this.checkOptionState(
                currentSelection,
                true,
                item.ans,
                isLocked,
            );
            const falseClass = this.checkOptionState(
                currentSelection,
                false,
                item.ans,
                isLocked,
            );
            const lockedFlag = isLocked ? " locked" : "";

            payloadBody = `<div class="tf-container">
        <button class="tf-button${lockedFlag} ${trueClass}" onclick="currentQuiz.commitAnswer(true)">✓ True</button>
        <button class="tf-button${lockedFlag} ${falseClass}" onclick="currentQuiz.commitAnswer(false)">✗ False</button>
      </div>`;
        } else if (item.type === "mcq") {
            const letters = ["A", "B", "C", "D"];
            payloadBody = `<div class="options-stack">${item.opts
                .map((opt, i) => {
                    const optionClass = this.checkOptionState(
                        currentSelection,
                        i,
                        item.ans,
                        isLocked,
                    );
                    const lockedFlag = isLocked ? " locked" : "";
                    return `<div class="option-item${lockedFlag} ${optionClass}" onclick="currentQuiz.commitAnswer(${i})">
          <div class="option-index">${letters[i]}</div>
          <div class="option-title">${opt}</div>
        </div>`;
                })
                .join("")}</div>`;
        } else if (item.type === "essay") {
            const savedText = currentSelection || "";
            const disabledState = isLocked ? "disabled" : "";

            payloadBody = `
        <div class="essay-container">
          <textarea id="essay-input" class="essay-textarea" placeholder="Write your technical analysis/explanation here..." ${disabledState}>${savedText}</textarea>
          ${!isLocked ? `<button class="btn-reveal" onclick="currentQuiz.revealEssayAnswer()">👁 Reveal Answer & Explanation</button>` : ""}
        </div>`;
        }

        if (item.why || item.type === "essay") {
            const titleText =
                item.type === "essay"
                    ? "📘 Model Answer Blueprint:"
                    : "💡 تحليل:";
            const mainContent =
                item.type === "essay"
                    ? `<div class="essay-model-ans">${item.ans}</div>`
                    : "";
            const subContent = item.why
                ? `<div class="explanation-content" style="margin-top:0.6rem; border-top:1px dashed var(--border2); padding-top:0.4rem;">${item.why}</div>`
                : "";

            explanationMarkup = `
        <div id="q-explanation" class="explanation-box" style="display: ${isLocked ? "block" : "none"};">
          <div class="explanation-title">${titleText}</div>
          ${mainContent}
          ${subContent}
        </div>`;
        }

        if (this.$("question-payload")) {
            this.$("question-payload").innerHTML = `
        <div class="q-card">
          <div class="q-card-header">
            <span class="q-type-tag ${item.type}">${item.type === "tf" ? "True / False" : item.type === "mcq" ? "Multiple Choice" : "Essay / Descriptive"}</span>
          </div>
          <div class="q-text">${item.q}</div>
          ${payloadBody}
          ${explanationMarkup}
        </div>`;
        }
    }

    checkOptionState(selection, val, rightAns, locked) {
        if (!locked) return selection === val ? "selected" : "";
        if (val === rightAns) return "correct";
        if (selection === val && val !== rightAns) return "wrong";
        return "";
    }

    commitAnswer(value) {
        if (this.stateLocked[this.activeIndex]) return;
        this.userAnswers[this.activeIndex] = value;
        this.stateLocked[this.activeIndex] = true;

        this.renderActivePayload();
        this.refreshProgressMetrics();
        this.updateNodeLayout();

        const expBox = this.$("q-explanation");
        if (expBox) {
            expBox.style.display = "block";
            expBox.style.animation = "fadeInUp 0.4s ease-out";
        }
    }

    revealEssayAnswer() {
        const txtArea = this.$("essay-input");
        const textValue = txtArea ? txtArea.value.trim() : "";

        this.userAnswers[this.activeIndex] = textValue || "Answer Revealed";
        this.stateLocked[this.activeIndex] = true;

        this.renderActivePayload();
        this.refreshProgressMetrics();
        this.updateNodeLayout();

        const expBox = this.$("q-explanation");
        if (expBox) {
            expBox.style.display = "block";
            expBox.style.animation = "fadeInUp 0.4s ease-out";
        }
    }

    terminateSession() {
        if (this.engineTimer) clearInterval(this.engineTimer);
        this.$("app").style.display = "none";
        this.$("results").style.display = "block";
        window.scrollTo({ top: 0, behavior: "smooth" });

        let correct = 0,
            bypassed = 0,
            mcqTotal = 0,
            mcqCorrect = 0,
            tfTotal = 0,
            tfCorrect = 0,
            essayTotal = 0;

        this.dataset.forEach((item, i) => {
            const allocation = this.userAnswers[i];

            if (item.type === "essay") {
                essayTotal++;
                if (allocation === null) bypassed++;
                return;
            }

            const match = allocation !== null && allocation === item.ans;
            if (allocation === null) bypassed++;
            if (match) correct++;

            if (item.type === "mcq") {
                mcqTotal++;
                if (match) mcqCorrect++;
            } else if (item.type === "tf") {
                tfTotal++;
                if (match) tfCorrect++;
            }
        });

        const objectiveTotal = this.dataset.length - essayTotal;
        const computationalFaults =
            objectiveTotal -
            correct -
            (bypassed -
                this.userAnswers.filter(
                    (a, idx) =>
                        a === null && this.dataset[idx].type === "essay",
                ).length);
        const generalEfficiency =
            objectiveTotal > 0
                ? Math.round((correct / objectiveTotal) * 100)
                : 100;

        this.$("metrics-pct").textContent = generalEfficiency + "%";
        this.$("metrics-c").textContent = correct;
        this.$("metrics-w").textContent = Math.max(0, computationalFaults);
        this.$("metrics-s").textContent = bypassed;

        const usedM = String(Math.floor(this.elapsedSeconds / 60)).padStart(
            2,
            "0",
        );
        const usedS = String(this.elapsedSeconds % 60).padStart(2, "0");
        this.$("metrics-t").textContent = `${usedM}:${usedS}`;

        let reportTitle = "Processor Integrity Cleared";
        let reportMsg =
            "Objective metrics evaluate core alignment accurately. Review descriptive fields manually.";
        if (generalEfficiency < 85) {
            reportTitle = "Structural Optimization Suggested";
            reportMsg =
                "Minor logical cache misses found in high tier subsystems.";
        }
        if (generalEfficiency < 60) {
            reportTitle = "System Critical Fault Parameters";
            reportMsg =
                "Core execution pipeline alignment failed. Core rebuild required.";
        }

        this.$("metrics-title").textContent = reportTitle;
        this.$("metrics-msg").textContent = reportMsg;

        const mcqPct =
            mcqTotal > 0 ? Math.round((mcqCorrect / mcqTotal) * 100) : 0;
        const tfPct = tfTotal > 0 ? Math.round((tfCorrect / tfTotal) * 100) : 0;

        if (this.$("lbl-mcq")) this.$("lbl-mcq").textContent = mcqPct + "%";
        if (this.$("bar-mcq"))
            setTimeout(() => {
                this.$("bar-mcq").style.width = mcqPct + "%";
            }, 150);
        if (this.$("lbl-tf")) this.$("lbl-tf").textContent = tfPct + "%";
        if (this.$("bar-tf"))
            setTimeout(() => {
                this.$("bar-tf").style.width = tfPct + "%";
            }, 150);

        const letters = ["A", "B", "C", "D"];
        const logView = this.$("inspection-log");
        if (logView) {
            logView.innerHTML = this.dataset
                .map((item, i) => {
                    const allocation = this.userAnswers[i];

                    if (item.type === "essay") {
                        return `<div class="review-item" style="border-right: 4px solid var(--accent);">
            <div class="review-question">Block ${i + 1} [ESSAY]. ${item.q}</div>
            <div class="review-answer ok" style="direction:ltr; text-align:left; white-wrap:pre-wrap;">Your input log: ${allocation || "No Entry Saved"}</div>
            <div class="review-answer ok" style="margin-top:0.5rem; direction:ltr; text-align:left; background:rgba(255,255,255,0.02); padding:0.5rem; border-radius:4px;">Expected Blueprint: ${item.ans}</div>
          </div>`;
                    }

                    const match =
                        allocation !== null && allocation === item.ans;
                    const parsedUser =
                        allocation === null
                            ? "Bypassed Node"
                            : item.type === "tf"
                              ? allocation
                                  ? "True"
                                  : "False"
                              : `${letters[allocation]}) ${item.opts[allocation]}`;
                    const parsedRight =
                        item.type === "tf"
                            ? item.ans
                                ? "True"
                                : "False"
                            : `${letters[item.ans]}) ${item.opts[item.ans]}`;

                    return `<div class="review-item">
          <div class="review-question">Block ${i + 1}. ${item.q}</div>
          <div class="review-answer ${match ? "ok" : "ng"}">Vector Allocated: ${parsedUser}</div>
          ${!match ? `<div class="review-answer ok">Model Blueprint: ${parsedRight}</div>` : ""}
        </div>`;
                })
                .join("");
        }
    }

    toggleReviewInspector(button) {
        const log = this.$("inspection-log");
        if (!log) return;
        const visibility = log.classList.toggle("open");
        const glyph = button.querySelector("span");
        if (glyph) glyph.textContent = visibility ? "▲" : "▼";
    }

    resetSimulator() {
        this.userAnswers = new Array(this.dataset.length).fill(null);
        this.stateLocked = new Array(this.dataset.length).fill(false);
        this.activeIndex = 0;
        this.secondsLeft = this.totalDuration;
        this.elapsedSeconds = 0;

        // إعادة خلط الأسئلة عند إعادة المحاولة لتوفير تجربة جديدة تماماً
        this.dataset = this.shuffleDataset([...this.dataset]);

        this.$("results").style.display = "none";
        this.$("app").style.display = "block";
        this.generateNodeMap();
        this.jumpToNode(0);
        this.startTimer();
    }
}
